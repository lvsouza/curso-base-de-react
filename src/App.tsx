import { BrowserRouter, Route, Routes, Navigate } from "react-router";

import { AppLayout } from './shared/layout/AppLayout';
import { Login } from './pages/public/Login';
import { Detail } from './pages/Detail';
import { About } from './pages/About';
import { Home } from './pages/Home';


export function App() {
  const isAuthenticated = false;


  return (
    <BrowserRouter>
      {isAuthenticated && (
        <AppLayout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sobre' element={<About />} />
            <Route path='/detalhe/:id' element={<Detail />} />

            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </AppLayout>
      )}
      {!isAuthenticated && (
        <Routes>
          <Route path='*' element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}
