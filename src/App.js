import logo from './logo.svg';
import './App.css';
import { Header, Footer } from './components';
import { AllRoutes } from './routes/AllRoutes';
import React from 'react';
import AuthProvider from './hooks/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <main className="App w-full">
      <AuthProvider>
        <ToastContainer />
        <AllRoutes />
      </AuthProvider>
    </main>
  );
}

export default App;
