/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, InputLabel } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { DispatchFunction, FieldType, StaticField } from "types/ui-types";
import EditFormControlPassword from "./EditFormControlPassword";
import EditFormControlText from "./EditFormControlText";

const EditFormControl: FC<
  PropsWithChildren<{
    data?: any;
    onChangeData?: DispatchFunction<any>;
    field?: Partial<StaticField>;
    readOnly?: boolean;
    value?: string | any;
    onChange?: DispatchFunction<any>;
    onClick?: (value?: Partial<StaticField>) => void;
    onBlur?: () => void;
    isLabel?: boolean;
    isValid?: boolean;
  }>
> = ({
  data,
  onChangeData = () => null,
  field = {} as StaticField,
  readOnly = false,
  value = "",
  onChange = () => null,
  onClick = () => null,
  onBlur = () => null,
  isLabel = true,
  isValid = true,
}) => {
  return field.type === FieldType.Text ||
    field.type === FieldType.MultiLineText ? (
    <EditFormControlText
      field={field}
      readOnly={readOnly || field.readOnly}
      value={value}
      onChange={onChange}
      onClick={onClick}
      onBlur={onBlur}
      isLabel={isLabel}
      isValid={isValid}
    />
  ) : field.type === FieldType.Password ? (
    <EditFormControlPassword
      field={field}
      readOnly={readOnly || field.readOnly}
      value={value}
      onChange={onChange}
      onClick={onClick}
      onBlur={onBlur}
      isLabel={isLabel}
      isValid={isValid}
    />
  ) : field.type === FieldType.Custom ? (
    <div className="w-full" onClick={() => onClick(field)}>
      {field?.isLabel ?? isLabel ? (
        <InputLabel>{field.displayName}</InputLabel>
      ) : null}
      {field?.renderF || field?.render ? (
        <Box className="p-2">
          {field?.renderF
            ? field?.renderF(data, onChangeData)
            : field?.render
            ? field?.render
            : null}
        </Box>
      ) : null}
    </div>
  ) : (
    <EditFormControlText
      field={field}
      readOnly={readOnly || field.readOnly}
      value={value}
      onChange={onChange}
      onClick={onClick}
      onBlur={onBlur}
      isLabel={isLabel}
      isValid={isValid}
    />
  );
};

export default EditFormControl;
