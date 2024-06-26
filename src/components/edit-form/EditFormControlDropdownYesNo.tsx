import {
  Box,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import {
  FC,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DispatchFunction, StaticField } from "types/ui-types";

const EditFormControlDropdownYesNo: FC<
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

  const label = useMemo(() => field?.displayName ?? "", [field.displayName]);

  const value = useMemo(() => {
    if (field.getOptionValue) {
      return field.getOptionValue(propsValue);
    }
    return propsValue;
  }, [propsValue, field]);

  const renderValue = useMemo(
    () => (typeof value === "boolean" ? (value ? "Yes" : "No") : ""),
    [value]
  );

  const [isValid, setIsValid] = useState(true);

  const handleChange: (
    event: SelectChangeEvent<"Yes" | "No">,
    child: ReactNode
  ) => void = (e, child) => {
    const checked = e.target.value === "Yes";
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
          {renderValue || defaultDisplayValue}
        </Typography>
      </Box>
      {isValid ? null : (
        <FormHelperText error>{isValid ? "" : errorMessage}</FormHelperText>
      )}
    </div>
  ) : (
    <div className="w-full" onClick={() => onClick(field)}>
      {isLabel ? <InputLabel>{label}</InputLabel> : null}
      <Select
        value={renderValue}
        label={label}
        onChange={handleChange}
        fullWidth
      >
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Select>
      {isValid ? null : (
        <FormHelperText error>{isValid ? "" : errorMessage}</FormHelperText>
      )}
    </div>
  );
};

export default EditFormControlDropdownYesNo;
