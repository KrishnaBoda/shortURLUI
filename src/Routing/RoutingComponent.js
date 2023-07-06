import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GenerateURL from '../Components/GenerateURL';
import URLExpired from '../Components/URLExpired';
import GenerateNewShortURL from '../Components/GenerateNewShortURL';

export default function RoutingComponent() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path='/' element = {<GenerateURL/>}></Route>
       <Route path='generateNewShortURL' element ={<GenerateNewShortURL/>}/>
       <Route path='expiredURL' element ={<URLExpired/>}/>
      </Routes>
      </BrowserRouter>
  )
}
