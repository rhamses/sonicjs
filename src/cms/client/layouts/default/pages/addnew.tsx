import { pageProps } from "../../../utils/interfaces"
import { PageWrapper } from "../../../utils/page-wrapper";
import { FormWrapper } from "../components/form/wrapper";
import { FormItem } from "../components/form/item";
import { Metadata } from "../components/form/metadata";
export const AddNew = (props: pageProps) =>
<PageWrapper action="Add new" pageName={props.pageName}>
    <FormWrapper>
      <FormItem id="title" type="text" label="Titulo" class="text-lg" />
      <FormItem id="content" label="Conteúdo" type="textarea" />
      <hr />
      <Metadata />
    </FormWrapper>
</PageWrapper>