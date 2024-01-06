import { pageProps } from "../interface"
import { PageWrapper } from "../../../utils/page-wrapper";
import { FormWrapper } from "../components/form/components/form";
import { FormInput } from "../components/form/inputs";
import { MetaData } from "../components/form/components/metadata";
export const AddNew = (props: pageProps) =>
  <PageWrapper action="Add new" pageName={props.pageName}>
      <FormWrapper>
        <FormInput id="post_title" type="text" label="Titulo" class="text-lg" />
        <FormInput id="post_content" label="Conteúdo" type="textarea" />
        <FormInput id="post_excerpt" label="Resumo" type="text" />
        <FormInput id="post_slug" type="hidden" />
        <FormInput id="post_type" type="hidden" value={props.pageName} />
        <hr />
        <MetaData />
      </FormWrapper>
  </PageWrapper>