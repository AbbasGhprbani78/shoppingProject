import React from 'react'
import { Route, Routes, useRoutes } from 'react-router-dom';
import './App.css'
import routes from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
export const IP = ""

function App() {

  let router = useRoutes(routes)

  return (
    <>
      {router}
    </>
  )
}

export default App
