import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import reducers from './reducers';
import App from './App';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const staticStyles = {
  header: { backgroundColor: '#000', color: '#fff', padding: '20px', textAlign: 'center', borderBottom: '5px solid #F37021' },
  logo: { fontSize: '1.8rem', fontWeight: 'bold' },
  linkBar: { display: 'flex', justifyContent: 'center', gap: '20px', padding: '15px', backgroundColor: '#f8f9fa' },
  btn: { backgroundColor: '#000', color: '#fff', padding: '10px 20px', textDecoration: 'none', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold' },
  appContainer: { padding: '20px', minHeight: '60vh' },
  footer: { backgroundColor: '#F37021', color: '#fff', padding: '5px', textAlign: 'center', fontSize: '0.8rem', marginTop: '20px' }
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* HEADER */}
      <header style={staticStyles.header}>
        <div style={staticStyles.logo}>AUM VA Work Study Resources</div>
      </header>

      {/* LINKS */}
      <nav style={staticStyles.linkBar}>
        <a href="https://www.aum.edu/admissions/military/veteran-military-resource-center/" 
           style={staticStyles.btn} target="_blank" rel="noreferrer">AUM VMRC Page</a>
        <a href="https://www.aum.edu/clubs/student-veterans-of-america-association/" 
           style={staticStyles.btn} target="_blank" rel="noreferrer">AUM SVA Page</a>
      </nav>

      {/* DYNAMIC CONTENT */}
      <div style={staticStyles.appContainer}>
        <App />
      </div>

      {/* FOOTER */}
      <footer style={staticStyles.footer}>
        <p>© {new Date().getFullYear()} Auburn University at Montgomery</p>
        <p>Taylor Center, Room 325 | (334) 244-3799</p>
      </footer>
    </BrowserRouter>
  </Provider>
);