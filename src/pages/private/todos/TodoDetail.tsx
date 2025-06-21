import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseISO, isValid } from 'date-fns';
import { z } from 'zod/v4';

import { TodoAPI, type ITodoWithoutId } from '../../../shared/services/api/TodoAPI';
import { PageLayout } from '../../../shared/layout/page-layout/PageLayout';


const todoSchema = z
  .object({
    complete: z.boolean(),
    label: z.string().min(3, 'Deve ter pelo menos 3 caracteres'),
    description: z.string().min(3, 'Deve ter pelo menos 3 caracteres'),
    completeAt: z
      .string()
      .optional()
      .refine((datetimeLocal) => {
        if (!datetimeLocal) return true;

        const parsedDate = parseISO(datetimeLocal);
        return isValid(parsedDate);
      }, 'A data não está correta'),
  })
  .refine((data) => {
    if (data.complete && !data.completeAt) return false;
    return true;
  }, { path: ['completeAt'], error: 'A data precisa ser informada' })

export const TodoDetail = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();


  const { register, handleSubmit, reset, watch, formState: { isSubmitting, errors } } = useForm<ITodoWithoutId>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      label: '',
      description: '',
      complete: false,
      completeAt: '',
    }
  });

  const complete = watch('complete');


  useEffect(() => {
    if (!id || id === 'adicionar') {
      reset();
      return;
    }

    setIsLoading(true);
    TodoAPI
      .getById(id)
      .then(data => {
        reset(data);
        setIsLoading(false);
      })
  }, [id]);


  const handleOnSubmit: SubmitHandler<ITodoWithoutId> = async ({ label, description, complete, completeAt }) => {
    if (!id || id === 'adicionar') {
      await TodoAPI.create({ label, description, complete, completeAt });
    } else {
      await TodoAPI.updateById(id, { label, description, complete, completeAt });
    }

    navigate('/todos');
  }


  return (
    <PageLayout title={id === 'adicionar' ? 'Adicionar' : 'Detalhes'}>
      <form className='flex flex-col gap-6' onSubmit={handleSubmit(handleOnSubmit)}>
        <div className='flex flex-col gap-1 w-90'>
          <label htmlFor='label' className='font-bold'>Título</label>
          <input
            id='label'
            className='p-2 px-3 border border-gray-300 rounded outline-0 disabled:bg-gray-100 focus:border-blue-600'
            {...register('label')}
            disabled={isSubmitting || isLoading}
          />
          {errors.label?.message
            ? <span className='text-xs text-red-400'>{errors.label.message}</span>
            : <span className='text-xs text-gray-400'>Título identificador do item</span>
          }
        </div>
        <div className='flex flex-col gap-1 w-90'>
          <label htmlFor='description' className='font-bold'>Descrição</label>
          <input
            id='description'
            className='p-2 px-3 border border-gray-300 rounded outline-0 disabled:bg-gray-100 focus:border-blue-600'
            {...register('description')}
            disabled={isSubmitting || isLoading}
          />
          {errors.description?.message
            ? <span className='text-xs text-red-400'>{errors.description.message}</span>
            : <span className='text-xs text-gray-400'>Descreva em mais detalhes o item a fazer</span>
          }
        </div>
        <div className='flex flex-col gap-1 w-90'>
          <label htmlFor='complete' className='font-bold'>Finalizado</label>
          <input
            id='complete'
            type='checkbox'
            className='p-2 px-3 border border-gray-300 rounded outline-0 disabled:bg-gray-100 focus:border-blue-600 h-5 w-5'
            {...register('complete')}
            disabled={isSubmitting || isLoading}
          />
          {errors.complete?.message
            ? <span className='text-xs text-red-400'>{errors.complete.message}</span>
            : <span className='text-xs text-gray-400'>Marca o item como finalizado</span>
          }
        </div>
        {complete && (
          <div className='flex flex-col gap-1 w-90'>
            <label htmlFor='completeAt' className='font-bold'>Data de finalização</label>
            <input
              id='completeAt'
              type='datetime-local'
              className='p-2 px-3 border border-gray-300 rounded outline-0 disabled:bg-gray-100 focus:border-blue-600'
              {...register('completeAt')}
              disabled={isSubmitting || isLoading}
            />
            {errors.completeAt?.message
              ? <span className='text-xs text-red-400'>{errors.completeAt.message}</span>
              : <span className='text-xs text-gray-400'>Data em que o item foi finalizado</span>
            }
          </div>
        )}

        <button type='submit' className='custom-bg-gradiente custom-bg-gradiente-hover p-2 cursor-pointer px-4 rounded self-start' disabled={isSubmitting || isLoading}>
          Salvar
        </button>
      </form>
    </PageLayout>
  );
};
