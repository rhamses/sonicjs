export interface pageProps {
  pageName?: string;
  children?: any;
  action?: string;
  url?: string;
}
export interface optionalValues {
  label?: string;
  class?: string;
  classWrapper?: string;
  classLabel?: string;
  classInput?: string;
}
export interface defaultValues extends optionalValues {
  id: string;
  type: string;
}
export interface FormButton extends defaultValues {
  href?: string;
}
export interface FormSelectData {
  value: string;
  label: string;
  selected?: boolean;
}
export interface FormInputGeneral extends defaultValues {
  value?: string;
}
export interface FormSelect extends defaultValues {
  data: Array<FormSelectData>;
  emptySelectText: String;
}
export interface AsideItemData {
  title: string;
  description?: string;
  children?: any;
}
export interface FormWrapper {
  children?: any;
}
export interface MetaDataItem {
  index?: number;
}
