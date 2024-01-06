import { pageProps } from "./interfaces"
import { FormButton } from "../layouts/default/components/form/inputs"
export const PageWrapper = (props: pageProps) =>
<div class="bg-black/5 h-screen rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
  <header class="flex justify-between items-center mb-6">
    <h4 class="text-xl font-bold text-black dark:text-white">
      {(props.pageName) ? props.action + " " + props.pageName : "List"}
    </h4>
    {
      props.action.includes("List")
        ? <FormButton href={"/client/add/" + props.pageName} type="submit" label="Adicionar Novo" />
        : ""
    }
  </header>
  {props.children}
</div>