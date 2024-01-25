import { Taxonomy } from "./../controllers/sections/taxonomy";
export interface pageProps {
  posttype?: string;
  postauthor?: string;
  children?: any;
  action?: string;
  url?: string;
  query?: Object;
  ctx?: Object;
  d1Data?: D1Database;
  taxonomy?: any;
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
  checked?: string;
  children?: string;
}
export interface FormSelect extends defaultValues {
  data: Array<FormSelectData>;
  emptySelectText: String;
}
export interface AsideWrapper {
  posttype: string;
  body: any;
  props?: any;
  taxonomy?: any;
  ctx?: any;
}
export interface AsideItemData {
  title: string;
  description?: string;
  children?: any;
}
export interface FormWrapper {
  children?: any;
  posttype: string;
  body: any;
  taxonomy: any;
  props?: any;
}
export interface MetaDataItem {
  index?: number;
  posttype?: string;
  body?: any;
  postId?: string;
  ctx?: any;
  props?: any;
  record?: any;
}

export interface metaTable {
  id: string;
  meta_key: string;
  meta_value: any;
  table: string;
}
