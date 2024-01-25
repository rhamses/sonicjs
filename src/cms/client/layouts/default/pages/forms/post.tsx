import { pageProps } from "../../interface";
import { FormInput } from "../../components/form/inputs"
import { MetaData } from "../../components/form/components/metadata";
export const FormPosts = (props: pageProps) =>
  <>
    <FormInput value={(props.body?.data?.post_title) ? props.body?.data?.post_title : ""} id="posts['post_title']" type="text" label="Titulo" class="text-lg" />
    <FormInput id="posts['post_content']" label="Conteúdo" type="textarea">{(props.body?.data?.post_content) ? props.body?.data?.post_content : ""}</FormInput>
    <FormInput value={(props.body?.data?.post_excerpt) ? props.body?.data?.post_excerpt : ""} id="posts['post_excerpt']" label="Resumo" type="text" />
    <FormInput value={(props.body?.data?.post_slug) ? props.body?.data?.post_slug : ""} id="posts['post_slug']" type="hidden" />
    <FormInput value={props?.posttype} id="posts['post_type']" type="hidden" />
    <FormInput value={(props?.postauthor) ? props.postauthor : "1"} id="posts['post_author']" type="hidden" />
    <hr />
    <MetaData props={props} />
  </>