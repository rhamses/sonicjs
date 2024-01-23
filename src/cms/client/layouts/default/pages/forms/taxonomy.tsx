import { pageProps } from "../../interface";
import { FormInput } from "../../components/form/inputs"
export const FormTaxonomy = (props: pageProps) =>
  <>
    <FormInput id="taxonomy" type="text" label="Nome da Taxonomia" class="text-lg" />
  </>