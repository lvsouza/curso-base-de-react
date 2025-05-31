import { BrowserRouter, Route, Routes, Navigate } from "react-router";

import { AppLayout } from './shared/layout/AppLayout';

import { Detail } from './pages/Detail';
import { About } from './pages/About';
import { Home } from './pages/Home';


export function App() {

  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sobre' element={<About />} />
          <Route path='/detalhe/:id' element={<Detail />} />

          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}
