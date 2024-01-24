import AsideItem from "./aside-item"
import { FormButton, FormSelect, FormInput } from "../../../inputs"
import { AsideWrapper } from "../../../../../interface"
const selectData = [{ value: "draft", label: "Rascunho"}, {value: "published", label:"Público"}, {value: "protected", label:"Protegido por Senha"}]
export default (props: AsideWrapper) => {
  let html;
  if (props.posttype && props.posttype == "posts") {
    html = <>
      <AsideItem title="Status da publicação" description="">
        <FormSelect data={selectData} emptySelectText="Selecione um Status" id="posts['post_status']" type="select" />
      </AsideItem>
      <AsideItem title="Imagem em Destaque" description="Selecione a imagem em destaque do post">
        <FormInput id="imageHighlight" type="file" />
      </AsideItem>
      <AsideItem title="Categorias" description="Selecione as categorias">
        {
          (props.body.category) ?
          props.body.category.map(
            cat => 
              <FormInput id="reltermpost['category'][]" type="checkbox" label={ cat.name }
              value={ cat.id }
              classWrapper="flex"
              classInput="order-1 flex-initial h-5 mr-2 !w-auto"
              classLabel="order-2" />
            )
            : ""
        }
      </AsideItem>
      <AsideItem title="Titulo do Post Type" description="Selecione um post type para relacionadar" /></>
  }
  return (
    <>
      <AsideItem title="Dados da publicação" description="">
        <FormButton id="postSubmit" label="Salvar novo" type="submit" class="w-full" />
      </AsideItem>
      {html}
    </>
  )
}
