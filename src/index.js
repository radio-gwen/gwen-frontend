import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AudioProvider } from './utils/context'
import Home from './pages/Home'
import Transmissions from './pages/Transmissions'
import Events from './pages/Events'
import About from './pages/About'
import Transmission from './pages/Transmission'
import Event from './pages/Event'
import Track from './pages/Track'
import Board from './pages/Board'
import FormTransmission from './comp/Templates/FormTransmission'


import Header from './comp/Templates/Header'
import Player from './comp/Organisms/Player'
import Banner from './comp/Organisms/Banner'
import Footer from './comp/Templates/Footer'
import Error from './comp/Organisms/Error'
import reportWebVitals from './reportWebVitals'

const App = () => {

  const [isNavOpen, setIsNavOpen ] = useState(true)
  const [ isMobile, setIsMobile ] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setIsNavOpen(false);
      } else {
        setIsMobile(false);
        setIsNavOpen(true);
      }
    };
  
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return(
    <Router>
        <AudioProvider>
          <div className='global-container'>
            <Header isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} isMobile={isMobile} />
            <Player isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} isMobile={isMobile}/>
            <Banner />
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/transmissions' element={<Transmissions />}/>
              <Route path='/events' element={<Events />}/>
              <Route path='/about' element={<About />}/>
              <Route path='/transmission/:transId' element={<Transmission />}/>
              <Route path='/event/:eventId' element={<Event />}/>
              <Route path='track/:trackId' element={<Track />}/>
              <Route path='/board' element={<Board />}>
                <Route path=':formId' element={<FormTransmission />}/>
              </Route>
              <Route path='*' element={<Error />} />
            </Routes>
            <Footer />
          </div>
        </AudioProvider>
    </Router>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
