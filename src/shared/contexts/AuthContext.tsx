import { createContext, useContext, useState } from 'react';


interface IAuthContextProps {
  email: string | undefined;
  accessToken: string | undefined;

  logout(): void;
  login(email: string, password: string): void;
}
const AuthContext = createContext({} as IAuthContextProps);


export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState<string>();
  const [email, setEmail] = useState<string>();


  const logout = () => {
    setEmail(undefined);
    setAccessToken(undefined);
  }

  const login = (email: string, password: string) => {
    console.log(email, password);

    // chamar o backend para conseguir um token de autenticação

    setEmail(email);
    setAccessToken(crypto.randomUUID());
  }

  return (
    <AuthContext.Provider value={{ login, logout, accessToken, email }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext);
}
