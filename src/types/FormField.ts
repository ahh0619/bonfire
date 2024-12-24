export type FormField<T> = {
  id: keyof T;
  label: string;
  type: string;
  placeholder: string;
  validation?: object;
};
