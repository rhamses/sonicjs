import AsideItem from "./aside-item"
import { FormButton, FormSelect, FormInput } from "../../../inputs"
const selectData = [{ value: "draft", label: "Rascunho"}, {value: "published", label:"Público"}, {value: "protected", label:"Protegido por Senha"}]
export default () =>
  <>
  <AsideItem title="Dados da publicação" description="">
    <FormButton id="postSubmit" label="Salvar novo" type="submit" class="w-full" />
  </AsideItem>
  <AsideItem title="Status da publicação" description="">
    <FormSelect data={selectData} emptySelectText="Selecione um Status" id="post_status" type="select" />
  </AsideItem>
  <AsideItem title="Imagem em Destaque" description="Selecione a imagem em destaque do post">
    <FormInput id="imageHighlight" type="file" />
  </AsideItem>
  <AsideItem title="Categorias" description="Selecione as categorias">
      <FormInput id="categories[]" type="checkbox" label="Default Category 1"
        value="cat1"
        classWrapper="flex"
        classInput="order-1 flex-initial h-5 mr-2 !w-auto"
        classLabel="order-2" />
      <FormInput id="categories[]" type="checkbox" label="Default Category 2"
        value="cat2"
        classWrapper="flex"
        classInput="order-1 flex-initial h-5 mr-2 !w-auto"
        classLabel="order-2" />
  </AsideItem>
  <AsideItem title="Titulo do Post Type" description="Selecione um post type para relacionadar" />
</>