export const Input = (props: {
  type: string;
  label?: string;
  id: string;
  name?: string;
  placeholder?: string;
  cssClass?: string;
  value?: string;
  checked?: boolean;
  step: string;
}) => {
  let inputCss = 'rounded-lg border border-gray ';
  let cssWrapper = '';
  let labelCss = '';
  let inputValue = '';
  if (
    (props.type === 'button') |
    (props.type === 'reset') |
    (props.type === 'image') |
    (props.type === 'submit')
  ) {
    inputCss += ' bg-gray-300';
  }
  if (props.type !== 'color') {
    inputCss += ' p-3';
  }
  if (props.type === 'checkbox' || props.type === 'radio') {
    cssWrapper += 'flex items-center';
    inputCss += ' p-0 mr-3 order-1';
    labelCss += ' order-2';
  } else {
    inputCss += ' w-full';
  }
  if (props.type === 'textarea') {
    inputCss += ' min-h-60';
  }
  if (props.cssClass) {
    cssWrapper += ' ' + props.cssClass;
  }
  if (props.value) {
    inputValue = props.value;
  }
  if (!props.name && props.id) {
    props.name = props.id;
  }
  return (
    <div class={'my-5 ' + cssWrapper}>
      <label class={labelCss} for={props.id}>
        {props.label}
      </label>
      {props.type == 'textarea' ? (
        <textarea
          placeholder={props.placeholder}
          class={inputCss}
          name={props.name}
          id={props.id}
        >
          {props.value}
        </textarea>
      ) : (
        <input
          class={inputCss}
          type={props.type}
          name={props.name}
          id={props.id}
          placeholder={props.placeholder}
          value={props.value}
          checked={props.checked}
          step={props.step}
        />
      )}
    </div>
  );
};
