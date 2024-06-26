/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Collapse,
  Grid,
  GridDirection,
  GridSize,
  GridSpacing,
  GridWrap,
  Theme,
} from "@mui/material";
import { ResponsiveStyleValue } from "@mui/system";
import {
  ForwardedRef,
  PropsWithChildren,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import {
  DispatchFunction,
  FieldRequiredType,
  StaticField,
} from "types/ui-types";
import { formatArray } from "utils/array-utils";
import EditFormControl from "./EditFormControl";
import { checkValidField } from "./edit-form-utils";

type FlexProperty = "flex-start" | "flex-end" | "center" | "stretch";

type EditFormProps<T> = PropsWithChildren<{
  data?: T;
  onChange?: DispatchFunction<T>;
  fields?: Array<Partial<StaticField>>;
  justifyContent?:
    | ResponsiveStyleValue<string[] | FlexProperty | undefined>
    | ((
        theme: Theme
      ) => ResponsiveStyleValue<string[] | FlexProperty | undefined>);
  alignItems?:
    | ResponsiveStyleValue<string[] | FlexProperty | undefined>
    | ((
        theme: Theme
      ) => ResponsiveStyleValue<string[] | FlexProperty | undefined>);
  lg?: boolean | GridSize;
  md?: boolean | GridSize;
  sm?: boolean | GridSize;
  xs?: boolean | GridSize;
  spacing?: ResponsiveStyleValue<GridSpacing>;
  direction?: ResponsiveStyleValue<GridDirection>;
  isLabel?: boolean;
  readOnly?: boolean;
  flexWrap?: ResponsiveStyleValue<GridWrap>;
}>;

export type EditFormRefType<T> = { prepare: () => boolean | T };

const EditForm = function <T = { [key: string]: any }>(
  {
    data,
    onChange = () => null,
    fields = [],
    justifyContent,
    alignItems,
    lg = 12,
    md = 12,
    sm = 12,
    xs = 12,
    spacing = 1,
    direction = "row",
    isLabel = true,
    readOnly = false,
    flexWrap = "wrap",
  }: EditFormProps<T>,
  ref?: ForwardedRef<EditFormRefType<T>>
) {
  const [isValidFields, setIsValidFields] = useState<{
    [key: string]: boolean;
  }>({});

  const checkFormValid = useCallback(() => {
    const newIsValidFields = formatArray<StaticField>(fields).reduce(
      (ret, field, fieldIndex, self) => {
        if (field?.required === FieldRequiredType.Required) {
          const isValidField = checkValidField({ field, data });
          return { ...(ret ?? {}), [field.name]: isValidField };
        }
        return ret;
      },
      {} as { [key: string]: boolean }
    );

    setIsValidFields(newIsValidFields);

    const isValid = Object.values(newIsValidFields).reduce(
      (ret, cur) => ret && cur,
      true
    );

    return isValid && data ? data : false;
  }, [data, fields]);

  useImperativeHandle(ref, () => ({ prepare: checkFormValid }), [
    checkFormValid,
  ]);

  const handleChange = (name = "", value: any) => {
    onChange({ ...data, [name]: value } as T, name);
  };

  return (
    <Grid
      container
      spacing={spacing}
      justifyContent={justifyContent}
      alignItems={alignItems}
      direction={direction}
      flexWrap={flexWrap}
    >
      {fields.map((field, fieldIndex) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const value = data?.[field?.name];

        const isHide =
          typeof field?.isHide === "boolean"
            ? field?.isHide
            : typeof field?.isHide === "function"
            ? field?.isHide(data)
            : false;

        return isHide ? null : (
          <Grid
            key={fieldIndex.toString() + field.name}
            item
            lg={field?.lg ?? lg}
            md={field?.md ?? md}
            sm={field?.sm ?? sm}
            xs={field?.xs ?? xs}
            flexGrow={field?.flexGrow}
            sx={field?.sx}
          >
            <Collapse in={!isHide}>
              <Box>
                <EditFormControl
                  data={data}
                  onChangeData={onChange}
                  field={field}
                  value={value}
                  onChange={(v: any) => handleChange(field.name, v)}
                  readOnly={
                    readOnly ||
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    (field.readOnlyEdit && !!data.id && !(data.id === "new"))
                  }
                  isLabel={isLabel}
                  isValid={isValidFields[field?.name ?? ""] ?? true}
                />
              </Box>
            </Collapse>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default forwardRef(EditForm) as <T>(
  props: EditFormProps<T> & {
    ref?: ForwardedRef<EditFormRefType<T>>;
  }
) => JSX.Element;
