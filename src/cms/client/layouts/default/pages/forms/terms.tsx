import { pageProps } from "../../interface";
import { FormInput } from "../../components/form/inputs"
export const FormTerms = (props: pageProps) => {
  return (
    <>
      <FormInput value={(props.body?.data?.name) ? props.body?.data?.name : ""} id="terms['name']" type="text" label="Nome" class="text-lg" />
      <FormInput value={(props.body?.data?.description) ? props.body?.data?.description : ""} id="terms['description']" type="text" label="Descrição" class="text-lg" />
      <FormInput value={ Object.values(props.query)[0]}  id="taxonomy['taxonomy']" type="hidden" />
    </>
  )
}