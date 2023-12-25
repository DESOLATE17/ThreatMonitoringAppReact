import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppRouter from './components/AppRouter'
import { QueryClient, QueryClientProvider } from "react-query";
import { store, persistor } from './store/store.ts'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={ queryClient }>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
