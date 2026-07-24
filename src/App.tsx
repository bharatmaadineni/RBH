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

const AuraAppContent: React.FC = () => {
  const { activeView, user, upgradeSubscription } = useApp();
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

          {/* Promotional Top Upgrade Ribbon */}
          {user?.subscriptionStatus !== 'premium' && (
            <div 
              id="pro-promotion-ribbon"
              className="bg-gradient-to-r from-[#FF6B81]/20 via-[#FF3B5C]/20 to-[#FF6B81]/20 py-1.5 px-4 text-center text-[10px] font-black uppercase tracking-widest text-[#F5F5F5] flex items-center justify-center gap-2 border-b border-solid border-white/10 relative z-40 backdrop-blur-md"
            >
              <span>⭐️ Unlock synchronized scrolling AI lyrics, audio equalizers and pristine Hi-Fi audio formats!</span>
              <button 
                onClick={() => upgradeSubscription('premium')} 
                className="px-2.5 py-0.5 bg-[#FF3B5C] hover:bg-[#FF3B5C]/80 text-white rounded font-black text-[9px] transition-all cursor-pointer"
              >
                Activate Free Trial
              </button>
            </div>
          )}

          {/* Main split dashboard view */}
          <div className="flex-1 flex overflow-hidden relative z-10" id="workspace-grid-split">
            {/* Responsive Navigation Sidebar */}
            <Sidebar />

            {/* Central view contents panel */}
            <div className="flex-1 flex flex-col overflow-hidden relative bg-black/20" id="central-viewport-stack">
              {/* Top navigation controls navbar & voice assistant console */}
              <Navbar />

              {/* Central router viewport */}
              <main className="flex-1 overflow-hidden relative" id="router-viewport-outlet">
                {activeView === 'home' && <Dashboard />}
                {activeView === 'search' && <SearchPage />}
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
