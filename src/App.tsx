/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';
import { Toast } from './components/Toast';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { FriendFeed } from './components/FriendFeed';
import { AudioPlayer } from './components/AudioPlayer';
import { SplashScreen } from './components/SplashScreen';

import { AuthPage } from './pages/AuthPage';
import { Dashboard } from './pages/Dashboard';
import { SearchPage } from './pages/SearchPage';
import { LibraryPage } from './pages/LibraryPage';
import { ProfilePage } from './pages/ProfilePage';
import { PlaylistPage } from './pages/PlaylistPage';
import { AdminPanel } from './pages/AdminPanel';
import { SingersPage } from './pages/SingersPage';
import { FavoriteSingersModal } from './components/FavoriteSingersModal';

const AuraAppContent: React.FC = () => {
  const { activeView, user } = useApp();
  const [showSplash, setShowSplash] = useState<boolean>(true);

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      {/* Session check or Auth view */}
      {(!user || activeView === 'auth') ? (
        <div id="public-auth-view" className="w-screen h-screen bg-[#0B0B0B] relative overflow-hidden flex flex-col justify-center items-center scrollbar-none text-[#F5F5F5] font-sans">
          <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#E50914] rounded-full blur-[140px] opacity-20 pointer-events-none z-0"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-[#E50914] rounded-full blur-[160px] opacity-15 pointer-events-none z-0"></div>
          <div className="z-10 relative w-full flex justify-center items-center">
            <AuthPage />
          </div>
          <Toast />
        </div>
      ) : (
        /* Authenticated full-dashboard workspace */
        <div id="authenticated-workspace-container" className="w-screen h-screen bg-[#0B0B0B] text-[#F5F5F5] flex flex-col relative overflow-hidden font-sans select-none">
          
          {/* Background blobs */}
          <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#FF3B5C] rounded-full blur-[140px] opacity-20 pointer-events-none z-0"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-[#FF6B81] rounded-full blur-[160px] opacity-15 pointer-events-none z-0"></div>



          {/* Main split dashboard view */}
          <div className="flex-1 flex overflow-hidden relative z-10" id="workspace-grid-split">
            {/* Responsive Navigation Sidebar */}
            <Sidebar />

            {/* Central view contents panel */}
            <div className="flex-1 flex flex-col overflow-hidden relative bg-black/20" id="central-viewport-stack">
              {/* Top navigation controls navbar & voice assistant console */}
              <Navbar />

              {/* Central router viewport */}
              <main className="flex-1 overflow-y-auto relative" id="router-viewport-outlet">
                {activeView === 'home' && <Dashboard />}
                {activeView === 'search' && <SearchPage />}
                {activeView === 'singers' && <SingersPage />}
                {activeView === 'library' && <LibraryPage />}
                {activeView === 'profile' && <ProfilePage />}
                {activeView === 'playlist' && <PlaylistPage />}
                {activeView === 'admin' && <AdminPanel />}
              </main>
            </div>

            {/* Right side social panel & real-time chat lounge */}
            <FriendFeed />
          </div>

          {/* Bottom sticky audio control center */}
          <AudioPlayer />

          {/* Onboarding favorite singers modal */}
          <FavoriteSingersModal />

          {/* Dynamic globally broadcasted toasts notifications */}
          <Toast />
        </div>
      )}
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AuraAppContent />
    </AppProvider>
  );
}
