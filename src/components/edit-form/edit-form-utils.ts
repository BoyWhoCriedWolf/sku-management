/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldRequiredType, FieldType, StaticField } from "types/ui-types";

export function validatePassword(str: string): boolean {
  const pattern = /^[a-zA-Z0-9!@#$%^&*()_+~`|}{[\]:;?<>,./-=]{12,}$/;
  return pattern.test(str);
}

export function validatePhoneNumber(phoneNumber: string): boolean {
  const phoneNumberRegex = /^\+\d{1,3}\s\(\d{3}\)\s\d{3}-\d{4}$/;
  return phoneNumberRegex.test(phoneNumber);
}

export const checkValidField = ({
  data = {} as any,
  value: propsValue,
  field = {} as StaticField,
}: {
  data?: any;
  value?: any;
  field?: Partial<StaticField>;
}) => {
  if (field.required === FieldRequiredType.Required) {
    const value = propsValue ?? data?.[field?.name ?? ""];

    // text
    if (field.type === FieldType.Text) {
      const formattedValue = ((value ?? "") as string).trim();
      return formattedValue.length > 0;
    }
    if (field.type === FieldType.MultiLineText) {
      const formattedValue = ((value ?? "") as string).trim();
      return formattedValue.length > 0;
    }
    if (field.type === FieldType.Password) {
      const formattedValue = ((value ?? "") as string).trim();
      return validatePassword(formattedValue);
    }
  }

  return true;
};
