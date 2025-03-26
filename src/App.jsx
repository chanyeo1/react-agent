import { createContext, useState } from 'react'
import './App.css'
import ChatRoom from './ChatRoom'
import ThemeContext from './contexts/ThemeContext';

function App() {
  const [theme, setTheme] = useState('light');
  return (
      <ThemeContext.Provider value={theme}>
        <ChatRoom />
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{ theme === 'light' ? '다크모드' : '라이트모드' }</button>
      </ThemeContext.Provider>
  )
}

export default App
