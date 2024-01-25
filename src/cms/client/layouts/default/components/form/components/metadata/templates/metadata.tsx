import MetadataItem from "./metadata-item"
import { FormButton } from "../../../inputs"
import { MetaDataItem } from "../../../../../interface"
import { WPLike } from "../../../../../../../../data/wplike-data"
export default async (props: MetaDataItem) => {
  const initialMetadata = 3
  const data = []
  if (props.props.body?.data?.post_type && props.props.body?.data?.id) {
    const wp = new WPLike(props.props.d1Data, props.props.kvdata)
    const tablemetaarr = props.props.body.data.post_type.split("");
    tablemetaarr.pop();
    const tablemeta = tablemetaarr.join("") + "meta";
    const records = await wp.listRecords(tablemeta, {id: props.props.body.data.id}, props.props.body.data.id)
    if (records.length > 0) {
      for (const record of records) {
        data.push(MetadataItem({record}))
      }
    }
  }
  if (data.length == 0) {
    for (let index = 0; index < initialMetadata; index++) {
      data.push(MetadataItem({index}))
    } 
  }
  return (
    <section id="metaDataWrapper">
      <h2 class="text-xl font-bold text-black dark:text-white">Meta dados</h2>
      <p class="text-sm mb-5">Insira informações adicionais sobre o post</p>
      <div id="metaDataList">
        {data}
        </div>
        <FormButton type="button" id="metadataAdd" label="Adicionar mais um" class="!bg-body" />
    </section>
  )
}
