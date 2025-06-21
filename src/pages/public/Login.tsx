import { useState } from 'react';

import { useAuthContext } from '../../shared/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


export const Login = () => {

  const { login } = useAuthContext();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  const handleLogin = () => {
    console.log('Entrar');

    login(email, password);
  }


  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='w-full max-w-75 bg-white p-4 rounded-xl shadow-md flex flex-col gap-2 justify-center items-center'>
        <h1 className='font-bold text-2xl mb-4'>
          Login
        </h1>


        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Label htmlFor='password'>Senha</Label>
        <Input
          id='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <Button onClick={handleLogin}>
          Entrar
        </Button>
      </div>
    </div>
  );
};
