import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { TodoAPI, type ITodo } from '../../../shared/services/api/TodoAPI';
import { PageLayout } from '../../../shared/layout/page-layout/PageLayout';
import { TodoItem } from '../../../components/TodoItem';
import { List } from '../../../components/List';
import { Button } from '@/components/ui/button';


export const Todo = () => {
  const [list, setList] = useState<ITodo[]>([]);


  useEffect(() => {
    TodoAPI.getAll()
      .then(data => setList(data));
  }, []);


  const handleRemove = (id: string) => {
    TodoAPI.deleteById(id)
      .then(() => {
        setList([
          ...list.filter(item => item.id !== id),
        ]);
      });
  }

  const handleComplete = (id: string) => {
    TodoAPI.updateById(id, { complete: true })
      .then(() => {
        setList([
          ...list.map(item => ({
            ...item,
            complete: item.id === id ? true : item.complete
          }))
        ]);
      });
  }


  return (
    <PageLayout title='TODO List'>
      <div className='flex items-center justify-end'>
        <Button variant='default' asChild>
          <Link to='/todos/detalhe/adicionar'>
            Adicionar
          </Link>
        </Button>
      </div>

      <List>
        {list.map((listItem) => (
          <TodoItem
            key={listItem.id}

            id={listItem.id}
            label={listItem.label}
            complete={listItem.complete}

            onRemove={() => handleRemove(listItem.id)}
            onComplete={() => handleComplete(listItem.id)}
          />
        ))}
      </List>
    </PageLayout>
  )
}
