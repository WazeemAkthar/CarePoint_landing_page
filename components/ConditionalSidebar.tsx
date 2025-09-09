"use client";
import { usePathname } from 'next/navigation';
import SideNavigation from './SideNavigation';

const SIDEBAR_ROUTES = ['/dashboard', '/appointments', '/health-tips', '/profile'];

// Get active tab based on pathname
const getActiveTab = (pathname: string) => {
  if (pathname === '/dashboard') return 'hospitals';
  if (pathname === '/appointments') return 'appointments';
  if (pathname === '/health-tips') return 'health-tips';
  if (pathname === '/profile') return 'profile';
  return undefined;
};

interface ConditionalSidebarProps {
  children: React.ReactNode;
}

const ConditionalSidebar: React.FC<ConditionalSidebarProps> = ({ children }) => {
  const pathname = usePathname();
  const shouldShowSidebar = SIDEBAR_ROUTES.includes(pathname);
  const activeTab = getActiveTab(pathname);
  
  if (!shouldShowSidebar) {
    // Return content without sidebar
    return <>{children}</>;
  }
  
  // Return content with sidebar layout
  return (
    <div className="min-h-screen bg-gray-50">
      <SideNavigation activeTab={activeTab} />
      <main className="lg:ml-24 min-h-screen transition-all duration-300">
        <div className="pt-16 lg:pt-0 py-4 lg:py-6">
          <div className="mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConditionalSidebar;