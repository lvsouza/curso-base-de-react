import { Link } from 'react-router';

import { Button } from './ui/button';


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
      <Button variant='link' asChild className='[[data-complete="true"]_&]:line-through'>
        <Link to={`/todos/detalhe/${id}`}>
          {label}
        </Link>
      </Button>

      <div className='flex gap-1'>
        {!complete && (
          <Button variant='outline' onClick={onComplete}>
            Concluir
          </Button>
        )}
        <Button variant='destructive' onClick={onRemove}>
          Remover
        </Button>
      </div>
    </li>
  );
}
