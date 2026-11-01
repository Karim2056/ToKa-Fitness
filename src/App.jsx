import { useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Link, NavLink } from 'react-router'
import Pages from './routing'

function App() {

// Global listener for text highlighting
  useEffect(() => {

    const handleTextSelection = () => {
      const ttsEnabled = localStorage.getItem("tts_enabled") === "true";
      if (!ttsEnabled) return;

      const selectedText = window.getSelection().toString().trim();

      if (selectedText) {
        if (window.responsiveVoice) {
          window.responsiveVoice.cancel();
          window.responsiveVoice.speak(selectedText);
        } else if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(selectedText);
          window.speechSynthesis.speak(utterance);
        }
      }
    };

    document.addEventListener('mouseup', handleTextSelection);

    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
    };
  }, []);
  
  return (
    <>
      <Header />
      <Pages />
      <Footer />
    </>
  )
}

export default App