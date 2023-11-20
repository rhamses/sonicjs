import { FormAside } from "./aside"
interface formWrapperData {
  children?: any
}
export const FormWrapper = (props: formWrapperData) =>
  <form method="POST" class="flex rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <section class="flex flex-col gap-5.5 p-6.5 basis-9/12">
      { props.children }
    </section>
    <aside class="flex flex-col gap-5.5 py-6.5 basis-3/12 border-l border-stroke">
      <FormAside />
    </aside>
</form>