import React from 'react';
import { HmongSunEmblem } from './HmongPattern';
import { Search, HelpCircle, BookOpen, MapPin, Info, Home } from 'lucide-react';

export type ScreenId = 'home' | 'directory' | 'detail' | 'qa' | 'about';

interface HeaderProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  fontSize?: 'normal' | 'large' | 'huge';
  onCycleFontSize?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  onNavigate,
}) => {
  const navItems: Array<{ id: ScreenId; label: string; icon: React.ReactNode }> = [
    { id: 'home', label: 'Trang chủ', icon: <Home className="w-4 h-4" /> },
    { id: 'directory', label: 'Bản đồ & Điểm chợ', icon: <MapPin className="w-4 h-4" /> },
    { id: 'detail', label: 'Chi tiết phiên chợ', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'qa', label: 'Hỏi đáp di sản', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'about', label: 'Giới thiệu', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 shadow-md border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-3 text-left focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg p-1 group"
          aria-label="Về trang chủ Hồ sơ số Chợ phiên H'Mông Sin Suối Hồ"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-700 to-indigo-900 border border-amber-400/50 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
            <HmongSunEmblem className="text-amber-300" size={26} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-base sm:text-lg tracking-tight text-amber-100 group-hover:text-amber-200">
                Chợ Bản Sin
              </span>
              <span className="hidden md:inline-block text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-900/80 text-amber-300 border border-amber-400/30">
                Sắc mây chợ phiên người H'Mông
              </span>
            </div>
            <p className="text-xs text-stone-300 font-medium line-clamp-1">
              Xã Sin Suối Hồ, tỉnh Lai Châu
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1" aria-label="Điều hướng chính">
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Utility Actions */}
        <div className="flex items-center space-x-2">
          {/* Quick search button on mobile */}
          <button
            onClick={() => onNavigate('home')}
            className="lg:hidden p-2 rounded-md bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700"
            aria-label="Tìm kiếm nhanh hồ sơ di sản"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
