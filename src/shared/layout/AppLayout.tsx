
import { NavLink } from 'react-router';


export const AppLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='h-full flex flex-col'>
      <div className='flex gap-4 justify-center p-6 shadow-md custom-bg-gradiente'>
        <NavLink className='p-2 px-4 no-underline rounded hover:bg-[#ffffff33] active:bg-[#ffffff4d] [.active]:bg-[#ffffff4d]' to='/'>
          Página inicial
        </NavLink>
        <NavLink className='p-2 px-4 no-underline rounded hover:bg-[#ffffff33] active:bg-[#ffffff4d] [.active]:bg-[#ffffff4d]' to='/todos'>
          TODOs
        </NavLink>
        <NavLink className='p-2 px-4 no-underline rounded hover:bg-[#ffffff33] active:bg-[#ffffff4d] [.active]:bg-[#ffffff4d]' to='/sobre'>
          Sobre
        </NavLink>
      </div>

      <div>
        {children}
      </div>
    </div>
  );
}
