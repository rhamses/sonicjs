import Default from '../index';
import { MainContent } from '../partials/MainContent';
export const List = (props: {
  ctx: any;
  menu: string;
  posttype: string;
  title: string;
  msg?: {
    success: boolean;
    content: string;
  };
  data?: any;
}) => {
  return (
    <Default>
      <MainContent title={props.title}>
        <div id='table'></div>
        <input
          type='hidden'
          name='host'
          value={`menu=${props.menu}&posttype=${props.posttype}`}
        />
        <input
          type='hidden'
          name='dataField'
          value={JSON.stringify(props.data)}
        />
        <button
          style='visibility: hidden'
          class='hide py-2 mb-4 px-4 border rounded-md text-white bg-blue-600 bg-red-600 bg-green-600'
        >
          teste
        </button>
      </MainContent>
    </Default>
  );
};
