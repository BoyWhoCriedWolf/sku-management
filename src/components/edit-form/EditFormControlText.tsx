import {
  Box,
  FormHelperText,
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
import { checkValidField } from "./edit-form-utils";
import {
  DispatchFunction,
  FieldType,
  FieldRequiredType,
  StaticField,
} from "types/ui-types";

const DEFAULT_MULTI__LINE_ROWS = 4;

const EditFormControlText: FC<
  PropsWithChildren<{
    field?: Partial<StaticField>;
    readOnly?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: string | number | any;
    onChange?: DispatchFunction<string | number>;
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
  onClick = () => null,
  onBlur = () => null,
  isLabel = true,
  autoFocus = false,
  isValid: propsIsValid = true,
  defaultDisplayValue = "",
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const errorMessage = useMemo(
    () => field.errorMessage ?? "This field is required",
    [field.errorMessage]
  );

  const value = useMemo(() => {
    if (field.getOptionValue) {
      return field.getOptionValue(propsValue);
    }
    return propsValue;
  }, [propsValue, field]);

  const renderValue = useMemo(
    () => (typeof value === "string" && !value ? defaultDisplayValue : value),
    [value, defaultDisplayValue]
  );

  const isNumber = useMemo(
    () =>
      field.type === FieldType.Integer || field.type === FieldType.Decimal,
    [field.type]
  );

  const [isValid, setIsValid] = useState(true);

  const handleChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    const { value: newValue = "" } = e?.target ?? {};
    onChange(isNumber ? Number(newValue) : newValue);
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
          {renderValue}
        </Typography>
      </Box>
      {isValid ? null : (
        <FormHelperText error>{isValid ? "" : errorMessage}</FormHelperText>
      )}
    </div>
  ) : (
    <div className="w-full" onClick={() => onClick(field)}>
      {isLabel ? <InputLabel>{field?.displayName ?? ""}</InputLabel> : null}
      <TextField
        inputRef={ref}
        name={field?.name}
        value={value ?? ""}
        onChange={handleChange}
        fullWidth
        size="small"
        multiline={field.type === FieldType.MultiLineText}
        rows={
          field.type === FieldType.MultiLineText
            ? DEFAULT_MULTI__LINE_ROWS
            : 1
        }
        placeholder={
          field.placeholder === true
            ? `Enter ${(field.displayName ?? "").toLowerCase()}`
            : field.placeholder
            ? field.placeholder
            : ""
        }
        type={isNumber ? "number" : "text"}
        onBlur={handleBlur}
        error={!isValid}
        helperText={isValid ? "" : errorMessage}
      />
    </div>
  );
};

export default EditFormControlText;
