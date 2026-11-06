import React from 'react';
import type { ScreenId } from './Header';
import { Home, MapPin, BookOpen, HelpCircle, Info } from 'lucide-react';

interface BottomNavProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate }) => {
  const items: Array<{ id: ScreenId; label: string; icon: React.ReactNode }> = [
    { id: 'home', label: 'Trang chủ', icon: <Home className="w-5 h-5" /> },
    { id: 'directory', label: 'Điểm chợ', icon: <MapPin className="w-5 h-5" /> },
    { id: 'detail', label: 'Chi tiết', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'qa', label: 'Hỏi đáp AI', icon: <HelpCircle className="w-5 h-5" /> },
    { id: 'about', label: 'Giới thiệu', icon: <Info className="w-5 h-5" /> },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 text-stone-300 pb-safe shadow-2xl"
      aria-label="Thanh điều hướng dưới màn hình điện thoại"
    >
      <div className="grid grid-cols-5 h-15">
        {items.map((item) => {
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-1 transition-colors relative ${
                isActive
                  ? 'text-amber-400 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-amber-400 rounded-b-full" />
              )}
              <div className="mb-0.5">{item.icon}</div>
              <span className="text-[10px] leading-tight tracking-tight line-clamp-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
