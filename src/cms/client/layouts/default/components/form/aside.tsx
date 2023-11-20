import { FormItem } from "./item"
import { FormButton } from "./button"
import { AsideItem } from "./aside-item"
export const FormAside = () =>
<>
    <AsideItem title="Dados da publicação" description="Clique abaixo para salvar o post.">
      <FormButton label="Salvar novo" type="submit" class="w-full" />
  </AsideItem>
  <AsideItem title="Imagem em Destaque" description="Selecione a imagem em destaque do post">
    <FormItem id="imageHighlight" type="file" />
  </AsideItem>
  <AsideItem title="Categorias" description="Selecione as categorias">
      <FormItem id="categories[]" type="checkbox" label="Default Category 1"
        value="cat1"
        classWrapper="flex"
        classInput="order-1 flex-initial h-5 mr-2 !w-auto"
        classLabel="order-2" />
      <FormItem id="categories[]" type="checkbox" label="Default Category 2"
        value="cat2"
        classWrapper="flex"
        classInput="order-1 flex-initial h-5 mr-2 !w-auto"
        classLabel="order-2" />
  </AsideItem>
  <AsideItem title="Titulo do Post Type" description="Selecione um post type para relacionadar" />
</>