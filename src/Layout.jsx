import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
        <Header />
        <div className='pt-20'>
            <Outlet />
        </div>
        <Footer />
    </>
  )
}

export default Layout
