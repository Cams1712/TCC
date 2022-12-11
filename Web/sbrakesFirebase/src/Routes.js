import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { CadastrarProvider } from './hooks/useCadastrarContext';
import { ComponentProvider } from './hooks/useComponentContext';
import { EditProvider } from './hooks/useEditContext';
import { LoginContext, LoginProvider } from './hooks/useLoginContext';
import CadCaminhao from './pages/CadCaminhao';
import CadFuncionario from './pages/CadFuncionario';
import Contato from './pages/Contato';
import Dashboard from './pages/Dashboard';
import Duvidas from './pages/Duvidas';
import EditCaminhao from './pages/EditCaminhao';
import EditFuncionario from './pages/EditFuncionario';
import Home from './pages/Home';
import { ListCaminhao } from './pages/ListCaminhao';
import { ListFuncionario } from './pages/ListFuncionario';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Smais from './pages/Smais';
import Kommunicate from './services/Kommunicate';

// Rotas privadas do site
const PrivateRoutes = ({ children }) => {
  const { local } = React.useContext(LoginContext);

  return local ? children : <Navigate to="/" />;
};

// Todas as rotas do site
export function AllRoutes() {
  return (
    <BrowserRouter>
      <ComponentProvider>
        <CadastrarProvider>
          <LoginProvider>
            <EditProvider>
              <Header />
              <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/saiba-mais" element={<Smais />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/duvidas" element={<Duvidas />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoutes>
                      <Dashboard />
                    </PrivateRoutes>
                  }
                >
                  <Route path="/dashboard/" element={<CadFuncionario />} />
                  <Route path="cad-funcionario" element={<CadFuncionario />} />
                  <Route path="cad-caminhao" element={<CadCaminhao />} />
                  <Route path="lis-funcionario" element={<ListFuncionario />} />
                  <Route
                    path="lis-funcionario/:id"
                    element={<EditFuncionario />}
                  />
                  <Route path="lis-caminhao" element={<ListCaminhao />} />
                  <Route path="lis-caminhao/:id" element={<EditCaminhao />} />
                  <Route path="perfil/:id" element={<EditFuncionario />} />
                </Route>
              </Routes>
              <Kommunicate />
            </EditProvider>
          </LoginProvider>
        </CadastrarProvider>
      </ComponentProvider>
    </BrowserRouter>
  );
}
