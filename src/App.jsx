import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Link, NavLink } from 'react-router'
import Pages from './routing'

function App() {


  return (
    <>
      <Header />
        <Pages />
      <Footer />
    </>
  )
}

export default App