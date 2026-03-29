import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
