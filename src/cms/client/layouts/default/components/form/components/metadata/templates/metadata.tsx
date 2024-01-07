import MetadataItem from "./metadata-item"
import { FormButton } from "../../../inputs"

const initialMetadata = 3
const data = []

for (let index = 0; index < initialMetadata; index++) {
  data.push(MetadataItem({index}))
}

export default () =>
<section id="metaDataWrapper">
  <h2 class="text-xl font-bold text-black dark:text-white">Meta dados</h2>
  <p class="text-sm mb-5">Insira informações adicionais sobre o post</p>
  <div id="metaDataList">
    {data}
    </div>
    <FormButton type="button" id="metadataAdd" label="Adicionar mais um" class="!bg-body" />
</section>