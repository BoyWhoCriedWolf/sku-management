/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, InputLabel } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { DispatchFunction, FieldType, StaticField } from "types/ui-types";
import EditFormControlCheckbox from "./EditFormControlCheckbox";
import EditFormControlChoice from "./EditFormControlChoice";
import EditFormControlDate from "./EditFormControlDate";
import EditFormControlDateTime from "./EditFormControlDateTime";
import EditFormControlDropdownYesNo from "./EditFormControlDropdownYesNo";
import EditFormControlMoney from "./EditFormControlMoney";
import EditFormControlMultiChoice from "./EditFormControlMultiChoice";
import EditFormControlPassword from "./EditFormControlPassword";
import EditFormControlPercent from "./EditFormControlPercent";
import EditFormControlPhone from "./EditFormControlPhone";
import EditFormControlRadio from "./EditFormControlRadio";
import EditFormControlSwitch from "./EditFormControlSwitch";
import EditFormControlText from "./EditFormControlText";
import EditFormControlTime from "./EditFormControlTime";

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
    field.type === FieldType.Decimal ||
    field.type === FieldType.Integer ||
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
  ) : field.type === FieldType.Phone ? (
    <EditFormControlPhone
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
  ) : field.type === FieldType.Money ? (
    <EditFormControlMoney
      field={field}
      readOnly={readOnly || field.readOnly}
      data={data}
      onChangeData={onChangeData}
      value={value}
      onChange={onChange}
      onClick={onClick}
      onBlur={onBlur}
      isLabel={isLabel}
      isValid={isValid}
    />
  ) : field.type === FieldType.Percent ? (
    <EditFormControlPercent
      field={field}
      readOnly={readOnly || field.readOnly}
      value={value}
      onChange={onChange}
      onClick={onClick}
      onBlur={onBlur}
      isLabel={isLabel}
      isValid={isValid}
    />
  ) : field.type === FieldType.DateOnly ? (
    <EditFormControlDate
      field={field}
      readOnly={readOnly || field.readOnly}
      value={value}
      onChange={onChange}
      onClick={onClick}
      onBlur={onBlur}
      isLabel={isLabel}
      isValid={isValid}
    />
  ) : field.type === FieldType.DateTime ? (
    <EditFormControlDateTime
      field={field}
      readOnly={readOnly || field.readOnly}
      value={value}
      onChange={onChange}
      onClick={onClick}
      onBlur={onBlur}
      isLabel={isLabel}
      isValid={isValid}
    />
  ) : field.type === FieldType.TimeOnly ? (
    <EditFormControlTime
      field={field}
      readOnly={readOnly || field.readOnly}
      value={value}
      onChange={onChange}
      onClick={onClick}
      onBlur={onBlur}
      isLabel={isLabel}
      isValid={isValid}
    />
  ) : field.type === FieldType.Choice ? (
    <EditFormControlChoice
      field={field}
      readOnly={readOnly || field.readOnly}
      value={value}
      data={data}
      onChangeData={onChangeData}
      onChange={onChange}
      onClick={onClick}
      onBlur={onBlur}
      isLabel={isLabel}
      isValid={isValid}
      defaultOptionLabel={
        data?.[field?.optionLabelField ?? ""] ?? field?.defaultOptionLabel ?? ""
      }
    />
  ) : field.type === FieldType.MultiSelectChoice ? (
    <EditFormControlMultiChoice
      field={field}
      readOnly={readOnly || field.readOnly}
      value={value}
      onChange={onChange}
      onClick={onClick}
      onBlur={onBlur}
      isLabel={isLabel}
      isValid={isValid}
    />
  ) : field.type === FieldType.Radio ? (
    <EditFormControlRadio
      field={field}
      readOnly={readOnly || field.readOnly}
      value={value}
      onChange={onChange}
      onClick={onClick}
      onBlur={onBlur}
      isLabel={isLabel}
      isValid={isValid}
    />
  ) : field.type === FieldType.TwoChoices ? (
    <EditFormControlSwitch
      field={field}
      readOnly={readOnly || field.readOnly}
      value={value}
      onChange={onChange}
      onClick={onClick}
      onBlur={onBlur}
      isLabel={isLabel}
      isValid={isValid}
    />
  ) : field.type === FieldType.DropDownYesNo ? (
    <EditFormControlDropdownYesNo
      field={field}
      readOnly={readOnly || field.readOnly}
      value={value}
      onChange={onChange}
      onClick={onClick}
      onBlur={onBlur}
      isLabel={isLabel}
      isValid={isValid}
    />
  ) : field.type === FieldType.Checkbox ? (
    <EditFormControlCheckbox
      field={field}
      readOnly={readOnly || field.readOnly}
      value={value}
      onChange={onChange}
      onClick={onClick}
      onBlur={onBlur}
      isLabel={isLabel}
      isValid={isValid}
    />
  ) : field.type === FieldType.Toggle ? (
    <EditFormControlSwitch
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
