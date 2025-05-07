import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/common/Navbar.jsx'
import Sidebar from '../components/common/Sidebar.jsx'

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const location = useLocation()

  // Close sidebar by default on mobile
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile && sidebarOpen) {
        setSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [sidebarOpen])

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [location, isMobile])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} />
      <main className="content-container" style={{ marginLeft: sidebarOpen && !isMobile ? '250px' : '0' }}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default MainLayout