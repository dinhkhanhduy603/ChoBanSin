import React, { useState, useEffect } from 'react';
import type { HeritageItem } from './types/disan';
import { Header, type ScreenId } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';

// Screens
import { HomeScreen } from './screens/HomeScreen';
import { DirectoryScreen } from './screens/DirectoryScreen';
import { DetailScreen } from './screens/DetailScreen';
import { QAScreen } from './screens/QAScreen';
import { AboutScreen } from './screens/AboutScreen';

// Initial local data
import initialDisanData from './data/disan.json';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');
  const [items, setItems] = useState<HeritageItem[]>(initialDisanData as HeritageItem[]);
  const [selectedItem, setSelectedItem] = useState<HeritageItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>('normal');

  // Fetch latest data from server on mount
  useEffect(() => {
    fetch('/api/disan')
      .then((res) => res.json())
      .then((json) => {
        if (json && Array.isArray(json.data) && json.data.length > 0) {
          setItems(json.data);
        }
      })
      .catch((err) => {
        console.warn('Using bundled initial disan.json data:', err);
      });
  }, []);

  // Handle font size cycling
  const handleCycleFontSize = () => {
    setFontSize((prev) => {
      if (prev === 'normal') return 'large';
      if (prev === 'large') return 'huge';
      return 'normal';
    });
  };

  const fontSizeClass = {
    normal: 'text-base',
    large: 'text-lg text-scale-large',
    huge: 'text-xl text-scale-huge',
  }[fontSize];

  return (
    <div className={`min-h-screen flex flex-col bg-stone-50 text-stone-900 ${fontSizeClass}`}>
      {/* Top Header */}
      <Header
        activeScreen={activeScreen}
        onNavigate={(s) => {
          setActiveScreen(s);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        fontSize={fontSize}
        onCycleFontSize={handleCycleFontSize}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {activeScreen === 'home' && (
          <HomeScreen
            items={items}
            onNavigate={(s) => {
              setActiveScreen(s);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectItem={(item) => setSelectedItem(item)}
            onSearchQuery={(q) => setSearchQuery(q)}
          />
        )}

        {activeScreen === 'directory' && (
          <DirectoryScreen
            items={items}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectItem={(item) => setSelectedItem(item)}
            onNavigate={(s) => {
              setActiveScreen(s);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeScreen === 'detail' && (
          <DetailScreen
            items={items}
            selectedItem={selectedItem}
            onSelectItem={(item) => setSelectedItem(item)}
            onNavigate={(s) => {
              setActiveScreen(s);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeScreen === 'qa' && <QAScreen />}
        {activeScreen === 'about' && <AboutScreen />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        activeScreen={activeScreen}
        onNavigate={(s) => {
          setActiveScreen(s);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
