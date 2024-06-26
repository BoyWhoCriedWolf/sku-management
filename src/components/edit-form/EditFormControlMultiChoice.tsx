/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Chip,
  CircularProgress,
  FormHelperText,
  Grid,
  InputLabel,
  TextField,
} from "@mui/material";
import React, {
  FC,
  FocusEventHandler,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  DispatchFunction,
  FieldRequiredType,
  StaticField,
} from "types/ui-types";
import { formatArray } from "utils/array-utils";
import { checkValidField } from "./edit-form-utils";

const EditFormControlMultiChoice: FC<
  PropsWithChildren<{
    field?: Partial<StaticField>;
    readOnly?: boolean;
    value?: string | any;
    onChange?: DispatchFunction<any>;
    onClick?: (value?: Partial<StaticField>) => void;
    onBlur?: () => void;
    isLabel?: boolean;
    autoFocus?: boolean;
    isValid?: boolean;
  }>
> = ({
  field = {} as StaticField,
  readOnly = false,
  value: propsValue,
  onChange = () => null,
  onClick = () => null,
  onBlur = () => null,
  isLabel = true,
  autoFocus = false,
  isValid: propsIsValid = true,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const errorMessage = useMemo(
    () => field.errorMessage ?? "This field is required",
    [field.errorMessage]
  );

  const getOptionLabel =
    field.getOptionLabel ??
    ((option: any) =>
      typeof option === "string" ? option : option?.displayName ?? "");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getOptionValue = field.getOptionValue ?? ((option: any) => option);

  const [options, setOptions] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const label = useMemo(() => field?.displayName ?? "", [field.displayName]);
  const value = useMemo(() => {
    if (
      readOnly &&
      formatArray(propsValue).length > 0 &&
      !(typeof formatArray(propsValue)?.[0] === "string") &&
      !(typeof formatArray(propsValue)?.[0] === "number")
    ) {
      return formatArray(propsValue);
    }

    return formatArray(propsValue).map((propsValueItem) => {
      const gotPropsValue = getOptionValue(propsValueItem);
      const tValue =
        typeof propsValueItem === "string" || typeof propsValueItem === "number"
          ? propsValueItem
          : typeof gotPropsValue === "string" ||
            typeof gotPropsValue === "number"
          ? gotPropsValue
          : propsValueItem?.id ?? propsValueItem?._id;

      return (options ?? []).find((option) => {
        const gotOptionValue = getOptionValue(option);
        const optionValue =
          typeof option === "string" || typeof option === "number"
            ? option
            : typeof gotOptionValue === "string" ||
              typeof gotOptionValue === "number"
            ? gotOptionValue
            : option?.id ?? option?._id;

        return (
          (typeof optionValue === "number" ||
            typeof optionValue === "string") &&
          (typeof tValue === "number" || typeof tValue === "string") &&
          optionValue === tValue
        );
      });
    });
  }, [readOnly, propsValue, getOptionValue, options]);

  const handleChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: any,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any> | undefined
  ) => void = (e, v) => {
    onChange(formatArray(v).map((item) => getOptionValue(item)));
  };

  const handleBlur: FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    onBlur();
    if (field.required === FieldRequiredType.Required) {
      setIsValid(checkValidField({ field, value: e?.target?.value ?? "" }));
    }
  };

  const handleOpen = async () => {
    if (!options.length) {
      if (field.getOptions) {
        setIsLoading(true);
        const ret = await field.getOptions();
        setOptions(ret);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!field.getOptions && field.options) {
      setOptions(field.options);
    }
  }, [field]);

  useEffect(() => {
    if (ref.current && autoFocus && !readOnly) {
      ref.current.focus();
    }
  }, [ref, autoFocus, readOnly]);

  useEffect(() => {
    setIsValid(propsIsValid);
  }, [propsIsValid]);

  return readOnly ? (
    <div className="w-full" onClick={() => onClick(field)}>
      {isLabel ? <InputLabel>{label}</InputLabel> : null}
      <Grid container spacing={1} className="p-2">
        {value.map((item, itemIndex) => (
          <Grid key={itemIndex} item>
            <Chip label={getOptionLabel(item)} />
          </Grid>
        ))}
      </Grid>
      {isValid ? null : (
        <FormHelperText error>{isValid ? "" : errorMessage}</FormHelperText>
      )}
    </div>
  ) : (
    <div className="w-full" onClick={() => onClick(field)}>
      {isLabel ? <InputLabel>{label}</InputLabel> : null}
      <Autocomplete
        multiple
        loading={isLoading}
        value={value ?? null}
        onChange={handleChange}
        options={options ?? []}
        renderInput={(params) => (
          <TextField
            {...params}
            inputRef={ref}
            placeholder={
              field.placeholder === true
                ? `Enter ${(field.displayName ?? "").toLowerCase()}`
                : field.placeholder
                ? field.placeholder
                : ""
            }
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
            onBlur={handleBlur}
            error={!isValid}
            helperText={isValid ? "" : errorMessage}
          />
        )}
        size="small"
        getOptionLabel={getOptionLabel}
        fullWidth
        disabled={field.disableIfNoOption && !options?.length}
        onOpen={handleOpen}
        disableCloseOnSelect={true}
      />
    </div>
  );
};

export default EditFormControlMultiChoice;
