import { FormSelect } from "../../../../interface"
export default (props: FormSelect) => {
  const options = []
  const inputCSS = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  if (props.data.length > 0) {
    for (const item of props.data) {
      const isSelected = (item.selected ? "selected" : "")
      options.push(<option value={item.value}>{item.label}</option>)
    }
  }
  return (
    <select name={ props.id } id={ props.id } class={inputCSS}>
      <option value="" selected>{(props.emptySelectText) ? props.emptySelectText : "Select"}</option>
      {options}
    </select>
  )
}