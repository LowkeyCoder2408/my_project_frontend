import React, { Fragment, useState } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './components/GlobalStyles/Layout';
import ScrollToTop from './components/GlobalStyles/Layout/components/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './utils/AuthContext';
import { ConfirmProvider } from 'material-ui-confirm';
import { CartItemProvider } from './utils/CartItemContext';

function App() {
  const [keyword, setKeyword] = useState<string>('');
  return (
    <AuthProvider>
      <CartItemProvider>
        <ConfirmProvider>
          <Router>
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
              </Routes>
            </div>
          </Router>
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

export default App;
