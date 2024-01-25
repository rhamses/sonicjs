import { FormInput } from "../../../inputs"
import { MetaDataItem } from "../../../../../interface"

export default (props: MetaDataItem) =>
  <div class="flex flex-wrap items-center justify-between metadata--item txt-sm mb-5">
    <FormInput value={(props?.record?.meta_key) ? props?.record?.meta_key : ""} id={ "postmeta['meta_key'][]" } type="text" label="Nome da informação" class="font-bold" classWrapper="flex-1 mr-5" />
    <FormInput value={(props?.record?.meta_value) ? props?.record?.meta_value : ""} id={ "postmeta['meta_value'][]" } type="text" label="Valor da informação" classWrapper="flex-1" />
  </div>