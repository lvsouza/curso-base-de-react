


interface IPageLayoutProps {
  title: string;
  children: React.ReactNode;
}
export const PageLayout = ({ children, title }: IPageLayoutProps) => {

  return (
    <div className="flex justify-center mt-4">
      <div className="w-full max-w-200 bg-white shadow-md rounded-md p-4 flex flex-col gap-2">
        <h1 className="text-4xl font-bold">{title}</h1>

        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
