import { pageProps } from "../../interface";
import { FormInput } from "../../components/form/inputs"
import { MetaData } from "../../components/form/components/metadata";
export const FormPosts = (props: pageProps) =>
  <>
    <FormInput id="post_title" type="text" label="Titulo" class="text-lg" />
    <FormInput id="post_content" label="Conteúdo" type="textarea" />
    <FormInput id="post_excerpt" label="Resumo" type="text" />
    <FormInput id="post_slug" type="hidden" />
    <FormInput id="post_type" type="hidden" value={props.posttype} />
    <hr />
    <MetaData />
  </>