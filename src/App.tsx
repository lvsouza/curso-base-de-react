import { AuthProvider } from './shared/contexts/AuthContext';
import { AppRoutes } from './Routes';


import pt from 'zod/v4/locales/pt.js';
import { z } from 'zod/v4';

z.config(pt());


export function App() {

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
