import React, { Fragment, useState } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './components/GlobalStyles/Layout';
import ScrollToTop from './components/GlobalStyles/Layout/components/ScrollToTop';
import { getAllProducts } from './api/ProductAPI';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './utils/AuthContext';

function App() {
  const [keyword, setKeyword] = useState<string>('');
  return (
    <AuthProvider>
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
                      <DefaultLayout keyword={keyword} setKeyword={setKeyword}>
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
    </AuthProvider>
  );
}

export default App;
