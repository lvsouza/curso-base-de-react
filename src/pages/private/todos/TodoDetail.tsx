import { useNavigate, useParams } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { PageLayout } from '../../../shared/layout/page-layout/PageLayout';
import { TodoAPI, type ITodoWithoutId } from '../../../shared/services/api/TodoAPI';
import TodoDetailStyles from './Todo.module.css';


export const TodoDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();


  const { register, handleSubmit, formState: { isSubmitting } } = useForm<ITodoWithoutId>({
    defaultValues: {
      label: '',
      description: '',
      complete: false,
    }
  });

  const handleOnSubmit: SubmitHandler<ITodoWithoutId> = async ({ label, description, complete }) => {
    await TodoAPI.create({ label, description, complete });

    navigate('/todos');
  }


  return (
    <PageLayout title='Detalhes'>
      <form className={TodoDetailStyles.Form} onSubmit={handleSubmit(handleOnSubmit)}>
        <div className={TodoDetailStyles.FormLabelContainer}>
          <label htmlFor='label' className={TodoDetailStyles.FormLabel}>Título</label>
          <input
            id='label'
            className={TodoDetailStyles.FormInput}
            {...register('label', { disabled: isSubmitting })}
          />
          <span className={TodoDetailStyles.FormHelpText}>Título identificador do item</span>
        </div>
        <div className={TodoDetailStyles.FormLabelContainer}>
          <label htmlFor='description' className={TodoDetailStyles.FormLabel}>Descrição</label>
          <input
            id='description'
            className={TodoDetailStyles.FormInput}
            {...register('description', { disabled: isSubmitting })}
          />
          <span className={TodoDetailStyles.FormHelpText}>Descreva em mais detalhes o item a fazer</span>
        </div>
        <div className={TodoDetailStyles.FormLabelContainer}>
          <label htmlFor='complete' className={TodoDetailStyles.FormLabel}>Finalizado</label>
          <input
            id='complete'
            type='checkbox'
            className={TodoDetailStyles.FormInput}
            {...register('complete', { disabled: isSubmitting })}
          />
          <span className={TodoDetailStyles.FormHelpText}>Marca o item como finalizado</span>
        </div>

        <button type='submit' className={TodoDetailStyles.Button} disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </PageLayout>
  );
};
