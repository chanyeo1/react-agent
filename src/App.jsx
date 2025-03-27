import { useState } from 'react'
import './App.css'
import ThemeContext from './contexts/ThemeContext';
import AppBody from './layout/AppBody';
import AppHeader from './layout/AppHeader';
import AppFooter from './layout/AppFooter';


function App() {
  const [theme, setTheme] = useState('light');
  return (
      <ThemeContext.Provider value={theme}>
        <AppHeader />
        <AppBody />
        <AppFooter />
      </ThemeContext.Provider>
  )
}

export default App
