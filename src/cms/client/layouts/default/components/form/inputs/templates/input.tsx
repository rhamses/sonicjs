import { FormInputGeneral } from "../../../../interface"
const labelCSS = " mb-3 block font-medium text-sm text-black dark:text-white "
const inputCSS = " w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary "
export default (props: FormInputGeneral) =>
<div class={ props.classWrapper}>
    {(props.label) ? <label for={props.id} class={ (props.classLabel) ? labelCSS + props.classLabel : labelCSS }>{ props.label}</label>: ""}
  {
    (props.type === "textarea")
    ? <textarea id={props.id} name={props.id} class={ (props.classInput) ? inputCSS + props.classInput: inputCSS }></textarea>
    : <input id={props.id} name={props.id} type={props.type} class={ (props.classInput) ? inputCSS + props.classInput : inputCSS } value={(props.value ? props.value : "")} />
  }
</div>