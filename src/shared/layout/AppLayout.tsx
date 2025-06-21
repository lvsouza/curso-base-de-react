
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router';


export const AppLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='h-full flex flex-col'>
      <div className='flex gap-4 justify-center p-6 shadow-md custom-bg-gradiente'>
        <Button variant='ghost' asChild className='[.active]:bg-accent [.active]:text-accent-foreground'>
          <NavLink to='/'>
            Página inicial
          </NavLink>
        </Button>
        <Button variant='ghost' asChild className='[.active]:bg-accent [.active]:text-accent-foreground'>
          <NavLink to='/todos'>
            TODOs
          </NavLink>
        </Button>
        <Button variant='ghost' asChild className='[.active]:bg-accent [.active]:text-accent-foreground'>
          <NavLink to='/sobre'>
            Sobre
          </NavLink>
        </Button>
      </div>

      <div>
        {children}
      </div>
    </div>
  );
}
