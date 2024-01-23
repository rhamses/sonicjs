import { pageProps } from "../../interface";
import { FormInput } from "../../components/form/inputs"
export const FormTerms = (props: pageProps) => {
  return (
    <>
      <FormInput id="name" type="text" label="Nome" class="text-lg" />
      <FormInput id="description" type="text" label="Descrição" class="text-lg" />
      <FormInput id="taxonomy" type="hidden" value={ Object.values(props.query)[0]} />
    </>
  )
}