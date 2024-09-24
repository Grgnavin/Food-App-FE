import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout: React.FC = () => {
    return (
        <div className='flex flex-col min-h-screen m-2 md:m-0'>
            <header>
                <Navbar />
            </header>
            {/* Main content */}
            <div className='flex-1'>
                <Outlet />
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default MainLayout