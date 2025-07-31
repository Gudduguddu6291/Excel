import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
function AppLayout() {
  return (
    <div>
        <div className='grid-background'></div>
        <main className='min-h-screen w-full px-4'>
          <Header/>
          <Outlet/>
        </main>
        <footer className='text-center text-white w-full py-10 bottom-0 position-fixed'>Made with 💗 by Pritam, Aditya and Pratyush</footer>
    </div>
  )
}

export default AppLayout;