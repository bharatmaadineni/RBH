/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Users, Send, MessageSquare, Flame } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FriendFeed: React.FC = () => {
  const { friendActivity, chatMessages, sendChatMessage, user } = useApp();
  const [chatText, setChatText] = useState('');
  const [activeSideTab, setActiveSideTab] = useState<'activity' | 'chat'>('activity');
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, activeSideTab]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatText.trim()) return;
    sendChatMessage(chatText.trim());
    setChatText('');
  };

  return (
    <aside 
      id="right-activity-sidebar"
      className="hidden xl:flex flex-col w-72 bg-white/5 backdrop-blur-xl border-l border-solid border-white/10 h-full"
    >
      {/* Tab Selectors */}
      <div className="flex border-b border-solid border-white/10 p-2 gap-1.5" id="right-side-tabs">
        <button
          onClick={() => setActiveSideTab('activity')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all ${
            activeSideTab === 'activity'
              ? 'bg-white/5 text-[#FF3B5C] border border-solid border-[#FF3B5C]/20'
              : 'text-white/40 hover:text-white'
          }`}
          id="tab-activity-btn"
        >
          <Users className="w-4 h-4" />
          <span>Friends</span>
        </button>
        <button
          onClick={() => setActiveSideTab('chat')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all ${
            activeSideTab === 'chat'
              ? 'bg-white/5 text-[#FF3B5C] border border-solid border-[#FF3B5C]/20'
              : 'text-white/40 hover:text-white'
          }`}
          id="tab-chat-btn"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Lounge Chat</span>
        </button>
      </div>

      {/* 1. Friend Activity List */}
      {activeSideTab === 'activity' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4" id="friends-activity-list">
          <div className="flex items-center gap-2 mb-2 text-white/60">
            <Users className="w-4 h-4 text-[#FF3B5C]" />
            <h4 className="text-xs font-extrabold uppercase tracking-wider">Friend Activity</h4>
          </div>

          {friendActivity.map(friend => (
            <div 
              key={friend.id} 
              className="flex items-start gap-3 p-2 hover:bg-white/5 rounded-xl transition-all border border-solid border-transparent hover:border-white/5"
              id={`friend-card-${friend.id}`}
            >
              {/* Avatar + Status Indicator */}
              <div className="relative flex-shrink-0">
                <img src={friend.avatarUrl} alt={friend.username} className="w-9 h-9 rounded-full object-cover border border-solid border-white/15" />
                <span 
                  className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-solid border-neutral-900 ${
                    friend.status === 'listening' ? 'bg-[#FF3B5C] animate-pulse' : 'bg-neutral-600'
                  }`}
                />
              </div>

              {/* Status details */}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold text-[#F5F5F5] truncate">{friend.username}</span>
                  <span className="text-[9px] text-white/40 flex-shrink-0">{friend.timestamp}</span>
                </div>

                {friend.status === 'listening' && friend.trackTitle ? (
                  <div className="mt-1" id={`friend-track-view-${friend.id}`}>
                    <p className="text-[10px] text-[#FF3B5C] font-extrabold truncate flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B5C] animate-ping inline-block" />
                      Streaming:
                    </p>
                    <p className="text-xs text-neutral-100 font-bold truncate mt-0.5">{friend.trackTitle}</p>
                    <p className="text-[10px] text-white/40 truncate mt-0.5">{friend.trackArtist}</p>
                  </div>
                ) : (
                  <p className="text-[10px] text-white/40 mt-1 italic">Offline</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Chat lounge panel */}
      {activeSideTab === 'chat' && (
        <div className="flex-1 flex flex-col justify-between overflow-hidden h-full" id="chat-lounge-view">
          {/* Messages block */}
          <div 
            ref={chatScrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none"
            id="chat-messages-container"
          >
            <div className="text-center py-2 bg-white/5 border border-solid border-white/10 rounded-xl mb-4">
              <p className="text-[10px] font-extrabold text-white/60 uppercase tracking-widest flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5 text-[#FF3B5C]" />
                RBH Community Lounge
              </p>
              <p className="text-[9px] text-white/40 mt-1">Converse in real-time with other RBH users!</p>
            </div>

            {chatMessages.map(msg => {
              const isSelf = user && msg.userId === user.uid;
              return (
                <div 
                  key={msg.id} 
                  className={`flex gap-2.5 items-start max-w-[85%] ${isSelf ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                  id={`chat-bubble-${msg.id}`}
                >
                  <img src={msg.avatarUrl} alt={msg.username} className="w-7 h-7 rounded-full object-cover" />
                  <div className="text-left">
                    <p className={`text-[10px] font-bold text-white/40 ${isSelf ? 'text-right' : ''}`}>
                      {msg.username}
                    </p>
                    <div 
                      className={`p-3 rounded-2xl text-xs mt-1 leading-relaxed ${
                        isSelf 
                          ? 'bg-gradient-to-r from-[#FF3B5C] to-[#FF6B81] text-white rounded-tr-none shadow-[0_4px_12px_rgba(255,59,92,0.15)]' 
                          : 'bg-white/5 text-neutral-200 border border-solid border-white/10 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <p className={`text-[8px] text-white/30 mt-1 ${isSelf ? 'text-right' : ''}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form input */}
          <form 
            onSubmit={handleSendChat}
            className="p-3 border-t border-solid border-white/10 bg-black/40 flex gap-2 items-center"
            id="chat-send-form"
          >
            <input
              type="text"
              value={chatText}
              onChange={e => setChatText(e.target.value)}
              placeholder="Send message to lounge..."
              className="bg-white/5 border border-solid border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-white/30 flex-1 focus:outline-none focus:border-[#FF3B5C] transition-colors"
            />
            <button
              type="submit"
              className="p-2 bg-[#FF3B5C] text-white hover:brightness-110 active:scale-95 rounded-xl transition-all flex-shrink-0 cursor-pointer"
              id="send-chat-btn"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </aside>
  );
};
