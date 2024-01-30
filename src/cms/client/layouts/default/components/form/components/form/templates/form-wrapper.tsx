import { AsideWrapper } from "../../aside"
import { FormWrapper } from "../../../../../interface"
export default (props: FormWrapper) =>
  <form method="POST" enctype="multipart/form-data" class="flex rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <section class="flex flex-col gap-5.5 p-6.5 basis-9/12">
      { props.children }
    </section>
    <aside class="flex flex-col gap-5.5 py-6.5 basis-3/12 border-l border-stroke">
      <AsideWrapper ctx={props.props.ctx} taxonomy={props.taxonomy} props={props} body={props.body} posttype={props.posttype} />
    </aside>
</form>