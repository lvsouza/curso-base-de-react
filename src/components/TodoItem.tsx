import { Link } from 'react-router';


interface ITodoItemProps {
  id: string;
  label: string;
  complete: boolean;

  onRemove(): void;
  onComplete(): void;
}
export const TodoItem = ({ id, label, complete, onComplete, onRemove }: ITodoItemProps) => {
  return (
    <li key={id} className='flex gap-1 items-center justify-between p-1 px-2 -mx-4 hover:bg-gray-100 rounded' data-complete={complete}>
      <Link to={`/todos/detalhe/${id}`} className='[[data-complete="true"]_&]:line-through'>
        {label}
      </Link>

      <div className='flex gap-1'>
        {!complete && (
          <button onClick={onComplete} className='custom-bg-gradiente custom-bg-gradiente:hover cursor-pointer p-2 px-4 rounded-full'>
            Concluir
          </button>
        )}
        <button onClick={onRemove} className='cursor-pointer bg-red-500 text-white hover:bg-red-400 active:bg-red-600 p-2 px-4 rounded-full'>
          Remover
        </button>
      </div>
    </li>
  );
}
