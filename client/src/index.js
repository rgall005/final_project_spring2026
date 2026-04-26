import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import reducers from './reducers';
import App from './App';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

// --- INTERACTIVE BUTTON COMPONENT ---
const LogoButton = ({ href, src, alt, label }) => {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const styles = {
    btnWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textDecoration: 'none',
      color: '#000',
      transition: 'transform 0.2s ease',
      transform: hover ? 'scale(1.1)' : 'scale(1)', // Gets bigger on hover
    },
    logoBtn: { 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: active ? '#F37021' : '#fff', // Highlights orange when clicked
      border: '3px solid #F37021',
      borderRadius: '20px',
      padding: '5px',
      marginBottom: '10px',
      boxShadow: hover ? '0 8px 12px rgba(0,0,0,0.2)' : '0 4px 6px rgba(0,0,0,0.1)',
      width: '120px',
      height: '100px',
      transition: 'all 0.2s ease'
    }, 
    logoImg: { 
      maxWidth: '80%', 
      maxHeight: '80%', 
      display: 'block',
      // Optional: makes logo white when button turns orange
      filter: active ? 'brightness(0) invert(1)' : 'none' 
    },
    label: {
      fontSize: '0.9rem',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    }
  };

  return (
    <a 
      href={href} 
      style={styles.btnWrapper} 
      target="_blank" 
      rel="noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
    >
      <div style={styles.logoBtn}>
        <img src={src} alt={alt} style={styles.logoImg} />
      </div>
      <span style={styles.label}>{label}</span>
    </a>
  );
};

const staticStyles = {
  header: { backgroundColor: '#000', color: '#fff', padding: '20px', textAlign: 'center', borderBottom: '5px solid #F37021' },
  logo: { fontSize: '1.8rem', fontWeight: 'bold' },
  linkBar: { display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '40px', padding: '20px', backgroundColor: '#f8f9fa' },
  appContainer: { padding: '20px', minHeight: '60vh' },
  footer: { backgroundColor: '#F37021', color: '#fff', padding: '10px', textAlign: 'center', fontSize: '0.8rem', marginTop: '20px' }
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

      {/* LINKS - Interactive Logo Buttons */}
      <nav style={staticStyles.linkBar}>
        <LogoButton 
          href="https://aum.edu" 
          src="/files/VMRC_Logo.png" 
          alt="VMRC Logo" 
          label="VMRC Page" 
        />
        <LogoButton 
          href="https://aum.edu" 
          src="/files/SVA_Logo.png" 
          alt="SVA Logo" 
          label="SVA Page" 
        />
      </nav>

      <div style={staticStyles.appContainer}>
        <App />
      </div>

      <footer style={staticStyles.footer}>
        <p>© {new Date().getFullYear()} Auburn University at Montgomery</p>
        <p>Taylor Center, Room 325 | (334) 244-3799</p>
      </footer>
    </BrowserRouter>
  </Provider>
);
