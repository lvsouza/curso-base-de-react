import { useState } from 'react';

import { useAuthContext } from '../../shared/contexts/AuthContext';


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


        <b>Email</b>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          className='p-2 px-3 border border-gray-300 rounded outline-0 disabled:bg-gray-100 focus:border-blue-600'
        />

        <b>Senha</b>
        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          className='p-2 px-3 border border-gray-300 rounded outline-0 disabled:bg-gray-100 focus:border-blue-600'
        />

        <br />

        <button className='custom-bg-gradiente custom-bg-gradiente-hover p-2 cursor-pointer px-4 rounded' onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
};
