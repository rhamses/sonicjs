export const SectionHeader = (props: { title: string; url: string }) => {
  return (
    <header class='flex justify-between'>
      <h2 class='text-2xl font-semibold text-black dark:text-white'>
        {props.title}
      </h2>
    </header>
  );
};
