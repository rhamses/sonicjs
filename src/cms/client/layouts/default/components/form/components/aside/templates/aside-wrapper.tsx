import AsideItem from "./aside-item"
import { FormButton, FormSelect, FormInput } from "../../../inputs"
import { AsideWrapper } from "../../../../../interface"
import { WPLike } from "../../../../../../../../data/wplike-data"
const selectData = [{ value: "draft", label: "Rascunho"}, {value: "published", label:"Público"}, {value: "protected", label:"Protegido por Senha"}]
export default async (props: AsideWrapper) => {
  let html;
  let htmlTaxonomies = [];
  let taxonomies = []
  const { data: userData }  = props.body
  if (userData?.post_type && userData?.id) { 
    const wp = new WPLike(props.ctx.env.D1DATA, props.ctx.env.KVDATA)
    taxonomies = await wp.listRecords("reltermpost", { post_id: userData?.id }, userData?.id)
    selectData.map(item => {
      if (item.value === userData.post_status) {
        return item["selected"] = true
      }
    })
  }
  if (props.taxonomy.category) {
    props.taxonomy.category.map(cat => {
      if (taxonomies && taxonomies.find(tax => tax.term_id === cat.id)) {
        htmlTaxonomies.push(<FormInput id="reltermpost['category'][]" type="checkbox" label={ cat.name }
          value={cat.id}
          checked="checked"
          classWrapper="flex"
          classInput="order-1 flex-initial h-5 mr-2 !w-auto"
          classLabel="order-2" />) 
      } else {
        htmlTaxonomies.push(<FormInput id="reltermpost['category'][]" type="checkbox" label={ cat.name }
        value={ cat.id }
        classWrapper="flex"
        classInput="order-1 flex-initial h-5 mr-2 !w-auto"
        classLabel="order-2" />)
      }
    })
  }
  if (props.posttype && props.posttype == "posts") {
    html = <>
      <AsideItem title="Status da publicação" description="">
        <FormSelect data={selectData} emptySelectText="Selecione um Status" id="posts['post_status']" type="select" />
      </AsideItem>
      <AsideItem title="Imagem em Destaque" description="Selecione a imagem em destaque do post">
        <FormInput id="imageHighlight" type="file" />
      </AsideItem>
      <AsideItem title="Categorias" description="Selecione as categorias">
        {htmlTaxonomies.map(item => item)}
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
