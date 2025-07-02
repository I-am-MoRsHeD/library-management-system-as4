import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './routes/routes.tsx'
import { Provider } from 'react-redux';
import store from './redux/store/store.ts'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            padding: "0.725rem",
            color: "#08195E",
          },
          success: {
            style: {
              // border: '1px solid #723eeb',
            },
            iconTheme: {
              primary: "#08195E",
              secondary: "#fff",
            },
          },
          error: {
            style: {
              // border: '1px solid #dc3545',
              color: "#08195E",
            },
            iconTheme: {
              primary: "#dc3545",
              secondary: "#fff",
            },
          },
          iconTheme: {
            primary: "#08195E",
            secondary: "#FFFAEE",
          },
        }}
      />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
