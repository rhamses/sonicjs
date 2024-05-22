import { html, raw } from 'hono/html';
import Default from '../index';
import { MainContent } from '../partials/MainContent';
import { Input } from '../components/Input';
import { Aside } from './fullAside';
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
          name='dataField'
          value={JSON.stringify(props.data)}
        />
        <button
          style='visibility: hidden'
          class='hide py-2 mb-4 px-4 border rounded-md text-white bg-blue-600'
        >
          teste
        </button>
        <button
          style='visibility: hidden'
          class='hide py-2 mb-4 px-4 border rounded-md text-white bg-red-600'
        >
          teste
        </button>
      </MainContent>
    </Default>
  );
};
