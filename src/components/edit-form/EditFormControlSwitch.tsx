import {
  Box,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  Switch,
  Typography,
} from "@mui/material";
import {
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DispatchFunction, StaticField } from "types/ui-types";

const EditFormControlSwitch: FC<
  PropsWithChildren<{
    field?: Partial<StaticField>;
    readOnly?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: boolean | any;
    onChange?: DispatchFunction<boolean>;
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
  value: propsValue = false,
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
    () =>
      typeof value === "boolean" ? (value ? "Yes" : "No") : defaultDisplayValue,
    [value, defaultDisplayValue]
  );

  const [isValid, setIsValid] = useState(true);

  const handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void = (e, checked) => {
    onChange(field.setOptionValue ? field.setOptionValue(checked) : checked);
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
      {isLabel ? <InputLabel>{field.displayName ?? ""}</InputLabel> : null}
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
      <FormControlLabel
        label={field?.displayName ?? ""}
        control={
          <Switch
            inputRef={ref}
            checked={Boolean(value)}
            onChange={handleChange}
            size="small"
          />
        }
        onBlur={onBlur}
      />
      {isValid ? null : (
        <FormHelperText error>{isValid ? "" : errorMessage}</FormHelperText>
      )}
    </div>
  );
};

export default EditFormControlSwitch;
