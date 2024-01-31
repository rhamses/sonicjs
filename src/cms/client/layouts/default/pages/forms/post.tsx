import { pageProps } from "../../interface";
import { FormInput } from "../../components/form/inputs"
import { MetaData } from "../../components/form/components/metadata";
export const FormPosts = (props: pageProps) =>
  <>
    <FormInput
      value={(props.body?.data?.post_title) ? props.body?.data?.post_title : ""}
      id={props?.posttype + "['post_title']"}
      type="text"
      label="Titulo"
      class="text-lg"
    />
    <div id="editorjs"></div>
    <FormInput
      id={props?.posttype + "['post_content']"}
      type="textarea"
      label="Conteúdo">
      {(props.body?.data?.post_content) ? props.body?.data?.post_content : ""}
    </FormInput>
    <FormInput
      value={(props.body?.data?.post_excerpt) ? props.body?.data?.post_excerpt : ""}
      id={props?.posttype + "['post_excerpt']"}
      type="text"
      label="Resumo"
    />
    <FormInput
      value={(props.body?.data?.post_slug) ? props.body?.data?.post_slug : ""}
      id={props?.posttype + "['post_slug']"}
      type="hidden"
    />
    <FormInput
      value={props?.posttype}
      id={props?.posttype + "['post_type']"}
      type="hidden"
    />
    <FormInput
      value={(props?.postauthor) ? props.postauthor : "1"}
      id={props?.posttype + "['post_author']"}
      type="hidden"
    />
    <hr />
    <MetaData ctx={props.ctx} body={props.body} props={props} />
  </>