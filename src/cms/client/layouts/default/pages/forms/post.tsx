import { pageProps } from "../../interface";
import { FormInput } from "../../components/form/inputs"
import { MetaData } from "../../components/form/components/metadata";
export const FormPosts = (props: pageProps) =>
  <>
    <FormInput id="posts['post_title']" type="text" label="Titulo" class="text-lg" />
    <FormInput id="posts['post_content']" label="Conteúdo" type="textarea" />
    <FormInput id="posts['post_excerpt']" label="Resumo" type="text" />
    <FormInput id="posts['post_slug']" type="hidden" />
    <FormInput id="posts['post_type']" type="hidden" value={props.posttype} />
    <FormInput id="posts['post_author']" type="hidden" value={(props.postauthor) ? props.postauthor : "1"} />
    <hr />
    <MetaData />
  </>