import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Transmissions from './pages/Transmissions'
import Events from './pages/Events'
import About from './pages/About'
import GlobalContainer from './comp/Templates/GlobalContainer'
import Header from './comp/Organisms/Header'
import Player from './comp/Organisms/Player'
import Footer from './comp/Organisms/Footer'
import Error from './comp/Organisms/Error'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Router>
        <div className='global-container'>
          <Header />
          <Player />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/transmissions' element={<Transmissions />}/>
            <Route path='/events' element={<Events />}/>
            <Route path='/about' element={<About />}/>
            <Route path='*' element={<Error />} />
          </Routes>
          <Footer />
        </div>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
