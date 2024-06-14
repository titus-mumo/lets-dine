import logo from './logo.svg';
import './App.css';
import { Header, Footer } from './components';
import { AllRoutes, CommonRoutes, ProtectedRoutesAll } from './routes/AllRoutes';
import React from 'react';
import AuthProvider from './hooks/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserPreferenceProvider from './hooks/UserPreferenceProvider';
import { Padding } from '@mui/icons-material';

function App() {
  return (
    <main className="App w-full scroll-smooth overflow-x-hidden">
      <AuthProvider>
        <UserPreferenceProvider>
          <ToastContainer  
          style={{ fontSize: "14px", zIndex: 10000000, Padding: "2px" }}
          />
          <AllRoutes />
        </UserPreferenceProvider>
      </AuthProvider>
    </main>
  );
}

export default App;
