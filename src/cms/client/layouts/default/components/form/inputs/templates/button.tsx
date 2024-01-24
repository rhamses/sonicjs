import { FormButton } from "../../../../interface"
export default (props: FormButton) => { 
  const buttonCSS = "block text-white bg-meta-5 hover:bg-meta-5/40 focus:ring-4 focus:ring-meta-5/60 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-5 dark:bg-meta-5/80 dark:hover:bg-meta-5/80 focus:outline-none dark:focus:ring-meta-5/80 " + props.class
  let button;
  if (props.href) {
    button = <a id={ props.id } href={props.href} class={buttonCSS} >
      {props.label}
    </a>
  } else {
    button = <button id={ props.id } type={(props.type) ? props.type : "button"} class={buttonCSS} >
      {props.label}
    </button >
  }
  return button
}
