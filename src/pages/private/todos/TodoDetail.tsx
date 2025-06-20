import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseISO, isValid } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';
import { z } from 'zod/v4';

import { TodoAPI, type ITodoWithoutId } from '../../../shared/services/api/TodoAPI';
import { PageLayout } from '../../../shared/layout/page-layout/PageLayout';
import TodoDetailStyles from './Todo.module.css';


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
      }, 'A data não está correta')
      .transform((datetimeLocal) => {
        if (!datetimeLocal) throw new Error("A data não está correta");

        const parsedDatetime = parseISO(datetimeLocal);
        const utcDatetime = fromZonedTime(parsedDatetime, 'America/Sao_Paulo');
        return utcDatetime.toISOString();
      }),
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
      <form className={TodoDetailStyles.Form} onSubmit={handleSubmit(handleOnSubmit)}>
        <div className={TodoDetailStyles.FormLabelContainer}>
          <label htmlFor='label' className={TodoDetailStyles.FormLabel}>Título</label>
          <input
            id='label'
            className={TodoDetailStyles.FormInput}
            {...register('label')}
            disabled={isSubmitting || isLoading}
          />
          {errors.label?.message
            ? <span className={TodoDetailStyles.FormErrorMessage}>{errors.label.message}</span>
            : <span className={TodoDetailStyles.FormHelpText}>Título identificador do item</span>
          }
        </div>
        <div className={TodoDetailStyles.FormLabelContainer}>
          <label htmlFor='description' className={TodoDetailStyles.FormLabel}>Descrição</label>
          <input
            id='description'
            className={TodoDetailStyles.FormInput}
            {...register('description')}
            disabled={isSubmitting || isLoading}
          />
          {errors.description?.message
            ? <span className={TodoDetailStyles.FormErrorMessage}>{errors.description.message}</span>
            : <span className={TodoDetailStyles.FormHelpText}>Descreva em mais detalhes o item a fazer</span>
          }
        </div>
        <div className={TodoDetailStyles.FormLabelContainer}>
          <label htmlFor='complete' className={TodoDetailStyles.FormLabel}>Finalizado</label>
          <input
            id='complete'
            type='checkbox'
            className={TodoDetailStyles.FormInput}
            {...register('complete')}
            disabled={isSubmitting || isLoading}
          />
          {errors.complete?.message
            ? <span className={TodoDetailStyles.FormErrorMessage}>{errors.complete.message}</span>
            : <span className={TodoDetailStyles.FormHelpText}>Marca o item como finalizado</span>
          }
        </div>
        {complete && (
          <div className={TodoDetailStyles.FormLabelContainer}>
            <label htmlFor='completeAt' className={TodoDetailStyles.FormLabel}>Data de finalização</label>
            <input
              id='completeAt'
              type='datetime-local'
              className={TodoDetailStyles.FormInput}
              {...register('completeAt')}
              disabled={isSubmitting || isLoading}
            />
            {errors.completeAt?.message
              ? <span className={TodoDetailStyles.FormErrorMessage}>{errors.completeAt.message}</span>
              : <span className={TodoDetailStyles.FormHelpText}>Data em que o item foi finalizado</span>
            }
          </div>
        )}

        <button type='submit' className={TodoDetailStyles.Button} disabled={isSubmitting || isLoading}>
          Submit
        </button>
      </form>
    </PageLayout>
  );
};
