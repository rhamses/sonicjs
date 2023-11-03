const Alert = (props: {
  text?: string,
  color?: string
}) => {
  let bgColor = "bg-sky-500"
  if (props.color) {
    bgColor = "bg-" + props.color + "-500"
  }
  return (
    <section
      id="alert"
      class="relative max-w-xs text-xs bg-white border border-solid border-gray-100 py-3 px-5 leading-normal my-5"
    >
      <span
        class={"h-full w-1.5 absolute top-0 block left-0 " + bgColor}
      ></span>
      {props.text}
    </section>
  )
}

export { Alert }