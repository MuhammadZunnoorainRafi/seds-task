import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '@radix-ui/themes/styles.css';

import { Theme } from '@radix-ui/themes';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Tasks from './pages/Tasks';
import { Provider } from 'react-redux';
import { store } from './store';
import Protect from './protect/RouteProtect';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : undefined;

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        index
        element={
          <Protect>
            <Tasks />
          </Protect>
        }
      />

      <Route path="/signUp" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Theme>
          <RouterProvider router={router} />
        </Theme>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
