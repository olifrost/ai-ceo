import { useState } from 'react'
import LandingScreen from './components/LandingScreen'
import Chatbot from './components/Chatbot'
import CEOVoting from './components/CEOVoting'
import './App.css'

type AppScreen = 'landing' | 'chatbot' | 'voting';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');

  const handleStart = () => {
    setCurrentScreen('chatbot');
  };

  const handleBackToChat = () => {
    setCurrentScreen('chatbot');
  };

  switch (currentScreen) {
    case 'landing':
      return <LandingScreen onStart={handleStart} />;
    case 'chatbot':
      return <Chatbot onBack={() => setCurrentScreen('landing')} />;
    case 'voting':
      return <CEOVoting onBack={handleBackToChat} />;
    default:
      return <LandingScreen onStart={handleStart} />;
  }
}

export default App
