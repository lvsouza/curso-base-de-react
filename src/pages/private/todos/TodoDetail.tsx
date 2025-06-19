import { useParams } from 'react-router';

import { PageLayout } from '../../../shared/layout/page-layout/PageLayout';


export const TodoDetail = () => {
  const { id } = useParams();


  return (
    <PageLayout title='Detalhes'>
      Detail {id === 'adicionar' ? 'Adicionando' : 'Editando'}
    </PageLayout>
  );
};
