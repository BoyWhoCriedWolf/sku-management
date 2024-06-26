/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Box,
  CircularProgress,
  FormHelperText,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { isEmpty } from "lodash";
import React, {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  PropsWithChildren,
  SyntheticEvent,
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
import { checkValidField } from "./edit-form-utils";

const EditFormControlChoice: FC<
  PropsWithChildren<{
    field?: Partial<StaticField>;
    readOnly?: boolean;
    value?: string | any;
    data?: any;
    onChangeData?: DispatchFunction<any>;
    onChange?: DispatchFunction<any>;
    onClick?: (value?: Partial<StaticField>) => void;
    onBlur?: () => void;
    isLabel?: boolean;
    autoFocus?: boolean;
    defaultOptionLabel?: string;
    isValid?: boolean;
    defaultDisplayValue?: string;
  }>
> = ({
  field = {} as StaticField,
  readOnly = false,
  value: propsValue,
  data = {},
  onChangeData = () => null,
  onChange = () => null,
  onClick = () => null,
  onBlur = () => null,
  isLabel = true,
  autoFocus = false,
  defaultOptionLabel = "",
  isValid: propsIsValid = true,
  defaultDisplayValue = "",
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const errorMessage = useMemo(
    () => field.errorMessage ?? "This field is required",
    [field.errorMessage]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getOptionLabel =
    field.getOptionLabel ??
    ((option: any) =>
      typeof option === "string" ? option : option?.displayName ?? "");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getOptionValue = field.getOptionValue ?? ((option: any) => option);

  const [options, setOptions] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const label = useMemo(() => field?.displayName ?? "", [field.displayName]);
  const insideValue = useMemo(() => {
    const gotPropsValue =
      typeof propsValue === "string" || typeof propsValue === "number"
        ? propsValue
        : getOptionValue(propsValue);
    const tValue =
      typeof gotPropsValue === "string" || typeof gotPropsValue === "number"
        ? gotPropsValue
        : propsValue?.id ?? propsValue?._id;

    return tValue;
  }, [getOptionValue, propsValue]);

  const value = useMemo(() => {
    if (
      readOnly &&
      propsValue &&
      !(typeof propsValue === "string") &&
      !(typeof propsValue === "number")
    ) {
      return propsValue;
    }

    const tValue = insideValue;

    return (options ?? []).find((option) => {
      const gotOptionValue =
        typeof option === "string" || typeof option === "number"
          ? option
          : getOptionValue(option);
      const optionValue =
        typeof gotOptionValue === "string" || typeof gotOptionValue === "number"
          ? gotOptionValue
          : option?.id ?? option?._id;

      return (
        (typeof optionValue === "number" || typeof optionValue === "string") &&
        (typeof tValue === "number" || typeof tValue === "string") &&
        optionValue === tValue
      );
    });
  }, [readOnly, propsValue, insideValue, options, getOptionValue]);

  const renderValue = useMemo(
    () =>
      inputValue ||
      getOptionLabel(value) ||
      getOptionLabel(propsValue) ||
      defaultDisplayValue,
    [inputValue, getOptionLabel, value, propsValue, defaultDisplayValue]
  );

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  const handleChange: (
    event: SyntheticEvent<Element, Event>,
    value: any,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any> | undefined
  ) => void = (e, v) => {
    if (field.joinedFieldName) {
      onChangeData({
        ...(data ?? {}),
        [field.name ?? ""]: getOptionValue(v),
        [field.joinedFieldName ?? ""]: v,
      });
    } else {
      onChange(getOptionValue(v));
    }
    setInputValue(getOptionLabel(v));
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
      <Box className="p-2">
        <Typography sx={{ minHeight: "1rem" }} fontWeight={600}>
          {renderValue || defaultOptionLabel}
        </Typography>
      </Box>
      {isValid ? null : (
        <FormHelperText error>{isValid ? "" : errorMessage}</FormHelperText>
      )}
    </div>
  ) : (
    <div className="w-full" onClick={() => onClick(field)}>
      {isLabel ? <InputLabel>{label}</InputLabel> : null}
      <Autocomplete
        loading={isLoading}
        value={value ?? null}
        onChange={handleChange}
        options={options ?? []}
        renderInput={(params) => {
          return (
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
                onChange: handleInputChange,
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
          );
        }}
        size="small"
        getOptionLabel={getOptionLabel}
        fullWidth
        disabled={field.disableIfNoOption && !options?.length}
        onOpen={handleOpen}
        inputValue={
          isEmpty(options) && insideValue ? defaultOptionLabel : renderValue
        }
      />
    </div>
  );
};

export default EditFormControlChoice;
