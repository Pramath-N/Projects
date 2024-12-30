import { useState } from 'react'
import './App.css'
import Home from './components/Home/Home'
import TemperatureTrend from './components/TempTrend/TemperatureTrend'
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/temperature-trend" element={<TemperatureTrend />} />
      </Routes>
    </>
  )
}

export default App
