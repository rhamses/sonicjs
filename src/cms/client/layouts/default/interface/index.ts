export interface pageProps {
  posttype?: string;
  children?: any;
  action?: string;
  url?: string;
  query?: Object;
  ctx?: Object;
  d1Data?: D1Database;
  body?: {
    headers: Array<string>;
    data: any;
  };
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

export interface metaTable {
  id: string;
  meta_key: string;
  meta_value: any;
  table: string;
}
