// src/components/ProtectedLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import BackgroundGrid from './Background';


const ProtectedLayout = () => {
  return (
    <BackgroundGrid>
        <div className="flex h-screen overflow-hidden">
      <SideBar/>
      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>
    </div>
    </BackgroundGrid>
  );
};

export default ProtectedLayout;
