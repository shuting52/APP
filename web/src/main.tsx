import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import SplashScreen from './components/SplashScreen.tsx';
import { PreventHorizontalSwipe } from './components/PreventHorizontalSwipe.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PreventHorizontalSwipe />
    <SplashScreen />
    <App />
  </StrictMode>,
);
