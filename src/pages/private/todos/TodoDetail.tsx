import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';

import { PageLayout } from '../../../shared/layout/page-layout/PageLayout';


export const TodoDetail = () => {
  const { id } = useParams();

  const { register, handleSubmit, } = useForm({
    defaultValues: {
      label: 'Default',
      description: 'Default',
      complete: false,
    }
  });


  return (
    <PageLayout title='Detalhes'>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <input {...register('label')} />
        <input {...register('description')} />
        <input type='checkbox' {...register('complete')} />

        <button type='submit'>
          Submit
        </button>
      </form>
    </PageLayout>
  );
};
