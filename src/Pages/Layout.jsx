import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/layoutComponents/Sidebar';
import Header from '../Components/layoutComponents/Header';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
     <div  className='layout-main'>

<div className="flex h-screen overflow-hidden">
 
      <div
        className={`
          ${sidebarOpen ? 'block' : 'hidden'}
          fixed md:relative
          w-[170px] md:w-[200px] lg:w-[230px]
          h-full
          z-50 transition-all duration-300
        `}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

  
      <div className="flex-1 flex flex-col h-full overflow-hidden">
     
        <div className="flex-shrink-0">
          <Header toggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        </div>

      
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
     </div>
    
  );
}