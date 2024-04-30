export const Alert = async (props: {
  content: string;
  color: string;
  children?: any;
}) => {
  const cssClass = `bg-${props.color}-300 text-${props.color}-900 p-3 border border-${props.color}-400 mb-5`;
  return <div class={cssClass}>{props.content}</div>;
};
