import { Box, FormHelperText, InputLabel, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import OutsideClickDetector from "components/outside-click-detector";
import dayjs from "dayjs";
import { ymd2dmy } from "utils/datetime-utils";
import {
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { checkValidField } from "./edit-form-utils";
import {
  DispatchFunction,
  FieldRequiredType,
  StaticField,
} from "types/ui-types";

const EditFormControlDateTime: FC<
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
  const [isValid, setIsValid] = useState(true);

  const renderValue = useMemo(() => value || "", [value]);

  const handleBlur = () => {
    onBlur();

    if (field.required === FieldRequiredType.Required) {
      setIsValid(checkValidField({ field, value: value ?? "" }));
    }
  };

  const [isOpen, setIsOpen] = useState(false);

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
          {ymd2dmy(renderValue) || defaultDisplayValue}
        </Typography>
      </Box>
      {isValid ? null : (
        <FormHelperText error>{isValid ? "" : errorMessage}</FormHelperText>
      )}
    </div>
  ) : (
    <div className="w-full" onClick={() => onClick(field)}>
      <OutsideClickDetector onClickOutside={isOpen ? undefined : handleBlur}>
        {isLabel ? <InputLabel>{field?.displayName ?? ""}</InputLabel> : null}
        <DateTimePicker
          ref={ref}
          value={dayjs(value ?? "")}
          onChange={(newValue) =>
            onChange(newValue?.format("YYYY-MM-DDTHH:mm:ss") ?? "", field.name)
          }
          format="DD-MM-YYYY HH:mm:ss"
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          // name={field?.name}
          // fullWidth
          // size="small"
          // // placeholder={
          // // 	field.placeholder === true ? `Enter ${(field.displayName ?? "").toLowerCase()}` : field.placeholder ? field.placeholder : ""
          // // }
          // onBlur={onBlur}
          slotProps={{ textField: { size: "small" } }}
        />
        {isValid ? null : (
          <FormHelperText error>{isValid ? "" : errorMessage}</FormHelperText>
        )}
      </OutsideClickDetector>
    </div>
  );
};

export default EditFormControlDateTime;
