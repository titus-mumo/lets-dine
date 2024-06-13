import logo from './logo.svg';
import './App.css';
import { Header, Footer } from './components';
import { AllRoutes, CommonRoutes, ProtectedRoutesAll } from './routes/AllRoutes';
import React from 'react';
import AuthProvider from './hooks/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserPreferenceProvider from './hooks/UserPreferenceProvider';
import UserCuisineProvider from './hooks/CuisineNumber';

function App() {
  return (
    <main className="App w-full scroll-smooth overflow-x-hidden">
      <AuthProvider>
        <UserCuisineProvider>
          <UserPreferenceProvider>
            <ToastContainer />
            <AllRoutes />
          </UserPreferenceProvider>
        </UserCuisineProvider>
      </AuthProvider>
    </main>
  );
}

export default App;
