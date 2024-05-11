import React, { Fragment, useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate, // Thêm Navigate từ react-router-dom
} from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './components/GlobalStyles/Layout';
import ScrollToTop from './components/GlobalStyles/Layout/components/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './utils/AuthContext';
import { ConfirmProvider } from 'material-ui-confirm';
import { CartItemProvider } from './utils/CartItemContext';

function MyRoutes() {
  const [keyword, setKeyword] = useState<string>('');
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <CartItemProvider>
        <ConfirmProvider>
          <ScrollToTop />
          <div className="App">
            <Routes>
              {publicRoutes.map((route, index) => {
                const Page = route.component;
                if (route.layout === 'default') {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <DefaultLayout
                          keyword={keyword}
                          setKeyword={setKeyword}
                        >
                          <Page keyword={keyword} />
                        </DefaultLayout>
                      }
                    />
                  );
                } else if (route.layout === 'none') {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <Fragment>
                          <Page keyword={keyword} />
                        </Fragment>
                      }
                    />
                  );
                }
              })}
              {/* Thêm Route cho trang 404 */}
              <Route path="*" element={<Navigate to="*" />} />
            </Routes>
          </div>
          <ToastContainer
            theme="light"
            position="bottom-left"
            autoClose={3000}
            pauseOnFocusLoss={false}
            style={{ left: '30px', bottom: '30px', transition: '.5s' }}
          />
        </ConfirmProvider>
      </CartItemProvider>
    </AuthProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  );
}

export default App;
