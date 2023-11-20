import { FormItem } from "./item"
import { AsideItem } from "./aside-item"
export const FormAside = () =>
<>
  <AsideItem title="Dados da publicação" description="Clique abaixo para salvar o post.">
    <button type="submit" class="block w-full text-white bg-meta-5 hover:bg-meta-5/40 focus:ring-4 focus:ring-meta-5/60 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-5 dark:bg-meta-5/80 dark:hover:bg-meta-5/80 focus:outline-none dark:focus:ring-meta-5/80">Salvar Novo</button>
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