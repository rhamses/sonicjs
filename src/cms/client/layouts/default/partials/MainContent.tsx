import { SectionHeader } from '../components/SectionTitle';
import { Alert } from '../components/alert';

export const MainContent = (props: {
  title: string;
  feedback?: any;
  children: any;
}) => {
  return (
    <>
      <section class='sm:ml-64'>
        <article class='p-8 border border-gray bg-white shadow-md dark:border-gray-700'>
          {props.feedback ? (
            <Alert
              content={props.feedback.content}
              color={props.feedback.color}
            />
          ) : (
            ''
          )}

          <SectionHeader title={props.title} url='/' />
          {props.children}
        </article>
      </section>
    </>
  );
};
