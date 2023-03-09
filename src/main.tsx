import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SelectedCityProvider } from './hooks/useFetchWeathers';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SelectedCityProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </SelectedCityProvider>
  </React.StrictMode>
);
