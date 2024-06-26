import {
  Box,
  FormHelperText,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import {
  ChangeEventHandler,
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
  FieldType,
  GeneralOption,
  StaticField,
} from "types/ui-types";
import CurrencyUSDFormatInput from "./CurrencyUSDFormatInput";
import { checkValidField } from "./edit-form-utils";
import EditForm from "./EditForm";
import { CURRENCY_TYPES, CurrencyType } from "services/types/currency.types";
import CurrencyGBPFormatInput from "./CurrencyGBPFormatInput";
import CurrencyEURFormatInput from "./CurrencyEURFormatInput";

const EditFormControlMoney: FC<
  PropsWithChildren<{
    field?: Partial<StaticField>;
    readOnly?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: string | number | any;
    onChange?: DispatchFunction<string | number>;
    data?: any;
    onChangeData?: DispatchFunction<string | number>;
    onClick?: (value?: Partial<StaticField>) => void;
    onBlur?: () => void;
    isLabel?: boolean;
    autoFocus?: boolean;
    isValid?: boolean;
    defaultDisplayValue?: string;
  }>
> = ({
  field = {} as StaticField,
  readOnly = false,
  value: propsValue = "",
  onChange = () => null,
  data = {},
  onChangeData = () => null,
  onClick = () => null,
  onBlur = () => null,
  isLabel = true,
  autoFocus = false,
  isValid: propsIsValid = true,
  defaultDisplayValue = "",
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const errorMessage = useMemo(
    () => field.errorMessage ?? "Please input a valid amount",
    [field.errorMessage]
  );

  const value = useMemo(() => {
    if (field.getOptionValue) {
      return field.getOptionValue(propsValue);
    }
    return propsValue;
  }, [propsValue, field]);

  const renderValue = useMemo(() => value || "", [value]);

  const currencyValue = data[field.secondaryName ?? ""] as CurrencyType;

  const [isValid, setIsValid] = useState(true);

  const handleChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    const { value: newValue = "" } = e?.target ?? {};
    onChange(newValue);
  };

  const handleBlur: FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    onBlur();
    if (field.required === FieldRequiredType.Required) {
      setIsValid(checkValidField({ field, value: e?.target?.value ?? "" }));
    }
  };

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
      {isLabel ? <InputLabel>{field.displayName}</InputLabel> : null}
      <Box className="p-2">
        <Typography sx={{ minHeight: "1rem" }} fontWeight={600}>
          {renderValue || defaultDisplayValue}
        </Typography>
      </Box>
      {isValid ? null : (
        <FormHelperText error>{isValid ? "" : errorMessage}</FormHelperText>
      )}
    </div>
  ) : (
    <div className="w-full" onClick={() => onClick(field)}>
      {isLabel ? <InputLabel>{field?.displayName ?? ""}</InputLabel> : null}
      <Grid
        container
        alignItems={"center"}
        flexWrap={"nowrap"}
        className="w-full"
      >
        {field.secondaryName ? (
          <Grid item>
            <EditForm
              data={data}
              onChange={onChangeData}
              fields={[
                {
                  name: field.secondaryName,
                  type: FieldType.Choice,
                  options: CURRENCY_TYPES,
                  getOptionLabel: (option?: GeneralOption) =>
                    option?.name ?? "",
                  getOptionValue: (option?: GeneralOption) =>
                    option?.value ?? "",
                },
              ]}
            />
          </Grid>
        ) : null}
        <Grid item flexGrow={1}>
          <TextField
            inputRef={ref}
            name={field?.name}
            value={value ?? ""}
            onChange={handleChange}
            fullWidth
            size="small"
            placeholder={
              field.placeholder === true
                ? `Enter ${(field.displayName ?? "").toLowerCase()}`
                : field.placeholder
                ? field.placeholder
                : ""
            }
            onBlur={handleBlur}
            error={!isValid}
            helperText={isValid ? "" : errorMessage}
            InputProps={{
              inputComponent:
                currencyValue === CurrencyType.GBP
                  ? CurrencyGBPFormatInput
                  : currencyValue === CurrencyType.USD
                  ? CurrencyUSDFormatInput
                  : CurrencyEURFormatInput,
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default EditFormControlMoney;
