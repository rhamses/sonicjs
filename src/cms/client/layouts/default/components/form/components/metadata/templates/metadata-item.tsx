import { FormInput } from "../../../inputs"
import { MetaDataItem } from "../../../../../interface"

export default (props: MetaDataItem) =>
  <div class="flex flex-wrap items-center justify-between metadata--item txt-sm mb-5">
    <FormInput id={ "metadata[title_" + props.index + "]" } type="text" label="Nome da informação" class="font-bold" classWrapper="flex-1 mr-5" />
    <FormInput id={ "metadata[value_" + props.index + "]" } type="text" label="Valor da informação" classWrapper="flex-1" />
  </div>