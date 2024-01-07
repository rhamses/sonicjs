import { AsideItemData } from "../../../../../interface"
export default (props: AsideItemData) =>
  <div class="px-6.5 pb-5 border-b border-stroke">
    { props.title ? <h2 class="mb-3 block font-medium text-sm text-body dark:text-white">{ props.title }</h2> : ""}
    { props.description ? <p class="text-sm">{ props.description }</p> : ""}
    { props.children }
</div>