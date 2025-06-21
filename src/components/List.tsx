

export const List = ({ children }: React.PropsWithChildren) => {

  return (
    <ol className='flex flex-col p-2'>
      {children}
    </ol>
  );
}
