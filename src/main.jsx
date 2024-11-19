import { StrictMode } from 'react'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import { createRoot } from 'react-dom/client'
import Registration from './components/Forms/Registration.jsx'
import Login from './components/Forms/Login.jsx'
import MyNotes from './components/MyNotes/MyNotes.jsx'
import About from './components/About/About.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='/register' element={<Registration />} />
      <Route path='/login' element={<Login />} />
      <Route path='/notes' element={<MyNotes />} />
      <Route path='/about' element={<About />} />
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
