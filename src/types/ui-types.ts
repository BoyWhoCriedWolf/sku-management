import { GridSize, SxProps, Theme } from "@mui/material";
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
  // Text
  Text = "Text",
  Email = "Email",
  MultiLineText = "MultiLine Text",
  Password = "Password",
  Decimal = "Decimal",
  Integer = "Integer",

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
  
  getOptionValue?: (option: any) => any;
  setOptionValue?: (option: any) => any;

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

  // show label
  isLabel?: boolean;

  // style
  sx?: SxProps<Theme>;
}
