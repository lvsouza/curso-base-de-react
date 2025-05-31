
import './AppLayout.css';


export const AppLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='layout-base'>
      <div className='layout-header'>
        <a>Página inicial</a>
        <a>Sobre</a>
      </div>

      <div className='layout-content'>
        {children}
      </div>
    </div>
  );
}
