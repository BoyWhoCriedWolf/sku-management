import { GridSize, SxProps, Theme } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ReactNode } from "react";

export type ColorVariant =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DispatchFunction<T = any> {
  // (value: T | ((p: T) => T), name?: string): void;
  (value: T, name?: string): void;
}

export interface GeneralOption {
  name?: string;
  value?: number | string;
}

export enum FieldType {
  // TwoChoices
  TwoChoices = "Two Choices",
  DropDownYesNo = "Drop Down",
  Checkbox = "Checkbox",
  Toggle = "Toggle",

  // Text
  Text = "Text",
  Email = "Email",
  URL = "URL",
  Age = "Age",
  Phone = "Phone",
  Decimal = "Decimal",
  Integer = "Integer",
  Money = "Money",
  Percent = "Percent",
  MultiLineText = "MultiLine Text",
  Password = "Password",

  // Date time
  DateTime = "Date Time",
  DateOnly = "Date Only",
  TimeOnly = "Time Only",

  // Radio
  Radio = "Radio",

  // Integer
  None = "None",
  TimeDuration = "Time Duration",
  WholeNumber = "Whole Number",

  // Lookup
  Lookup = "Lookup",

  // Money

  // Choice
  Choice = "Choice",
  MultiSelectChoice = "Multi-select Choice",

  // Custom
  Custom = "Custom",
  // SelectTable = "SelectTable",
}

export enum FieldRequiredType {
  Optional = 0,
  Recommended = 1,
  Required = 2,
}

export const FIELDS_REQUIRED_TYPES: Array<GeneralOption> = [
  { value: FieldRequiredType.Optional, name: "Optional" },
  { value: FieldRequiredType.Recommended, name: "Recommended" },
  { value: FieldRequiredType.Required, name: "Required" },
];

export interface StaticField {
  name: string;
  secondaryName: string;
  displayName: string;

  type?: FieldType;

  required: FieldRequiredType;

  placeholder?: string | boolean;
  errorMessage?: string;

  // for select fields
  disableIfNoOption?: boolean;
  options?: Array<any>;
  getOptions?: () => Promise<Array<any>>;
  getOptionLabel?: (option: any) => string;
  getOptionValue?: (option: any) => any;
  setOptionValue?: (option: any) => any;

  // for table fields
  columns?: Array<GridColDef>;
  rowSelection?: "single" | "multiple";
  fields?: Array<Partial<StaticField>>;

  // readOnly
  readOnly?: boolean;
  readOnlyEdit?: boolean;

  // hide/show
  isHide?: boolean | ((p?: any) => boolean);

  // grid size
  lg?: GridSize | false;
  md?: GridSize | false;
  sm?: GridSize | false;
  xs?: GridSize | false;
  flexGrow?: 0 | 1;

  // for custom render
  render?: ReactNode;
  renderF?: (p?: any, onChange?: DispatchFunction) => ReactNode;

  // for choice
  optionLabelField?: string;
  defaultOptionLabel?: string;
  joinedFieldName?: string;

  // show label
  isLabel?: boolean;

  // style
  sx?: SxProps<Theme>;
}

export type Total = { [key: string]: number | Total };
