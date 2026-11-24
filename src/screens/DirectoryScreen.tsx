import React, { useState, useMemo } from 'react';
import type { HeritageItem, HeritageCategory } from '../types/disan';
import type { ScreenId } from '../components/Header';
import {
  CATEGORY_LABELS,
  filterHeritageItems,
  getCategoryFromItem,
} from '../utils/heritage';
import {
  Search,
  Filter,
  MapPin,
  List,
  Map as MapIcon,
  BookOpen,
  User,
  Shield,
  Layers,
  ArrowRight,
  Eye,
  Check,
} from 'lucide-react';

interface DirectoryScreenProps {
  items: HeritageItem[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectItem: (item: HeritageItem) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const DirectoryScreen: React.FC<DirectoryScreenProps> = ({
  items,
  searchQuery,
  onSearchChange,
  onSelectItem,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<HeritageCategory>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'map'>('cards');
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);

  // Filter items
  const filteredItems = useMemo(() => {
    return filterHeritageItems(items, searchQuery, selectedCategory);
  }, [items, searchQuery, selectedCategory]);

  // Map spots mapping with coordinates for SVG rendering
  const mapSpots = [
    {
      id: 'ds-01',
      x: 50, // % from left
      y: 48, // % from top
      label: 'Khuôn viên Chợ phiên trung tâm',
      native: 'Kiab khw',
      category: 'khong_gian',
      color: '#4f46e5',
    },
    {
      id: 'ds-02',
      x: 38,
      y: 58,
      label: 'Chảo Thắng cố ngựa nghi ngút khói',
      native: 'thắng cố',
      category: 'am_thuc',
      color: '#ea580c',
    },
    {
      id: 'ds-03',
      x: 32,
      y: 45,
      label: 'Cơm ngô Mèn mén hấp chõ gỗ',
      native: 'Mov pob kws',
      category: 'am_thuc',
      color: '#ea580c',
    },
    {
      id: 'ds-04',
      x: 48,
      y: 65,
      label: 'Cối đá giã bánh dày Ncuav',
      native: 'Ncuav',
      category: 'am_thuc',
      color: '#ea580c',
    },
    {
      id: 'ds-05',
      x: 28,
      y: 62,
      label: 'Quầy Rượu ngô men lá thảo dược',
      native: 'Cawv',
      category: 'am_thuc',
      color: '#ea580c',
    },
    {
      id: 'ds-06',
      x: 62,
      y: 42,
      label: 'Gian hàng Vải lanh & Vẽ sáp ong',
      native: 'Tiab / Tiab Hmoob',
      category: 'trang_phuc',
      color: '#0284c7',
    },
    {
      id: 'ds-12',
      x: 72,
      y: 38,
      label: 'Bàn thợ bạc thủ công chạm khắc',
      native: 'Xauv',
      category: 'trang_phuc',
      color: '#0284c7',
    },
    {
      id: 'ds-07',
      x: 52,
      y: 32,
      label: 'Sân khấu biểu diễn Khèn H\'Mông',
      native: 'Qeej / Kềnh',
      category: 'nghe_thuat',
      color: '#10b981',
    },
    {
      id: 'ds-08',
      x: 82,
      y: 28,
      label: 'Vườn địa lan & Góc Thổi lá giao duyên',
      native: 'Tshuab nplooj',
      category: 'nghe_thuat',
      color: '#10b981',
    },
    {
      id: 'ds-09',
      x: 68,
      y: 68,
      label: 'Bãi cỏ sinh hoạt Ném Pa Pao',
      native: 'Ném Pao',
      category: 'nghe_thuat',
      color: '#10b981',
    },
    {
      id: 'ds-10',
      x: 35,
      y: 78,
      label: 'Sân đất thi tài Đánh Cù Tù Lu',
      native: 'Tù lu',
      category: 'nghe_thuat',
      color: '#10b981',
    },
    {
      id: 'ds-11',
      x: 20,
      y: 30,
      label: 'Nhà cộng đồng Trưởng bản Vàng A Chỉnh',
      native: 'Trưởng bản Vàng A Chỉnh',
      category: 'nguoi_gin_giu',
      color: '#8b5cf6',
    },
  ];

  const activeSpotItem = useMemo(() => {
    if (!selectedPinId) return null;
    return items.find((i) => i.id === selectedPinId) || null;
  }, [items, selectedPinId]);

  return (
    <div className="space-y-6">
      {/* Top Header & Search Controls */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-indigo-900 mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Màn hình 2 • Bản đồ & Danh sách thực hành di sản</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Điểm Chợ & Thực Hành Văn Hóa
            </h1>
            <p className="text-sm text-stone-600 mt-1">
              Tra cứu không gian sinh hoạt, gian hàng và các thực hành văn hóa của người H'Mông tại Sin Suối Hồ
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-200 self-start md:self-auto shrink-0">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                viewMode === 'cards'
                  ? 'bg-white text-stone-900 shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              aria-label="Hiển thị dạng thẻ danh sách"
            >
              <List className="w-4 h-4 text-indigo-600" />
              <span>Dạng danh sách ({filteredItems.length})</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                viewMode === 'map'
                  ? 'bg-white text-stone-900 shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              aria-label="Hiển thị dạng sơ đồ bản đồ văn hóa"
            >
              <MapIcon className="w-4 h-4 text-amber-600" />
              <span>Sơ đồ văn hóa chợ</span>
            </button>
          </div>
        </div>

        {/* Search input in directory */}
        <div className="relative">
          <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo tên bản địa, tên danh mục, món ăn, trang phục, người cung cấp..."
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-stone-900 text-sm sm:text-base transition-colors bg-stone-50/50"
            aria-label="Ô lọc danh sách di sản chợ phiên"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-700 bg-stone-200 rounded-full w-5 h-5 flex items-center justify-center"
              aria-label="Xóa từ khóa tìm kiếm"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filters (Pill Carousel / Wrap) */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider shrink-0 flex items-center mr-1">
            <Filter className="w-3.5 h-3.5 mr-1" /> Bộ lọc:
          </span>
          {(['all', 'khong_gian', 'am_thuc', 'trang_phuc', 'nghe_thuat', 'nguoi_gin_giu'] as HeritageCategory[]).map(
            (cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-sm font-bold'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                  aria-pressed={isActive}
                >
                  {CATEGORY_LABELS[cat].title}
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Main Content Area based on View Mode */}
      {viewMode === 'map' ? (
        /* INTERACTIVE MAP VIEW */
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
            <div>
              <h2 className="text-lg font-bold text-stone-900 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-amber-600" />
                <span>Sơ đồ Không gian Văn hóa Chợ phiên Sin Suối Hồ</span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Nhấp vào từng điểm toạ độ trên sơ đồ để xem thông tin thực hành di sản tương ứng
              </p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="inline-flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                <span className="text-stone-600">Ẩm thực</span>
              </span>
              <span className="inline-flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                <span className="text-stone-600">Trang phục</span>
              </span>
              <span className="inline-flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span className="text-stone-600">Nghệ thuật</span>
              </span>
              <span className="inline-flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                <span className="text-stone-600">Chợ phiên</span>
              </span>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-stone-900 rounded-xl overflow-hidden shadow-inner border border-stone-800">
            {/* SVG Background illustration of mountain terrain, river, stone paths */}
            <svg
              className="w-full h-full object-cover"
              viewBox="0 0 1000 600"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="60%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id="mountainGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1e3a5f" />
                  <stop offset="100%" stopColor="#142438" />
                </linearGradient>
                <linearGradient id="streamGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Sky / Altitude backdrop */}
              <rect width="1000" height="600" fill="url(#skyGrad)" />

              {/* Mountain ridges (Hoàng Liên Sơn range) */}
              <path
                d="M 0 250 Q 200 120 400 200 T 800 160 Q 900 190 1000 140 L 1000 600 L 0 600 Z"
                fill="url(#mountainGrad)"
                opacity="0.7"
              />
              <path
                d="M 0 320 Q 250 240 500 290 T 1000 280 L 1000 600 L 0 600 Z"
                fill="#132337"
              />

              {/* Terraced slope contour lines */}
              <path d="M 50 360 Q 200 340 380 370" stroke="#334155" strokeWidth="2" fill="none" strokeDasharray="4 4" />
              <path d="M 80 400 Q 250 380 450 410" stroke="#334155" strokeWidth="2" fill="none" strokeDasharray="4 4" />
              <path d="M 600 350 Q 800 330 950 360" stroke="#334155" strokeWidth="2" fill="none" strokeDasharray="4 4" />

              {/* Dòng suối Sin Suối Hồ ("Suối có vàng" - flowing down) */}
              <path
                d="M 120 180 Q 220 280 200 380 T 180 600"
                stroke="url(#streamGrad)"
                strokeWidth="18"
                fill="none"
                strokeLinecap="round"
              />
              <text x="140" y="560" fill="#38bdf8" fontSize="14" fontWeight="600" opacity="0.8" transform="rotate(-70 140 560)">
                Dòng suối Sin Suối Hồ
              </text>

              {/* Central stone paved courtyard of the market */}
              <polygon
                points="350,220 700,200 780,480 280,490"
                fill="#1e293b"
                stroke="#475569"
                strokeWidth="2"
              />
              <text x="500" y="270" fill="#94a3b8" fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="2">
                KHUÔN VIÊN CHỢ PHIÊN SIN SUỐI HỒ
              </text>

              {/* Wooden village houses representation */}
              <rect x="160" y="220" width="70" height="50" rx="4" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
              <polygon points="150,220 195,195 240,220" fill="#475569" />
              <text x="195" y="250" fill="#cbd5e1" fontSize="11" textAnchor="middle">Nhà Trưởng bản</text>

              <rect x="740" y="200" width="80" height="50" rx="4" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
              <polygon points="730,200 780,180 830,200" fill="#475569" />
              <text x="780" y="230" fill="#cbd5e1" fontSize="11" textAnchor="middle">Vườn Địa Lan</text>

              {/* Stone path connection */}
              <path
                d="M 230 250 L 350 270 M 500 480 L 520 580"
                stroke="#64748b"
                strokeWidth="4"
                strokeDasharray="6 6"
              />
              <text x="520" y="585" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">
                Cổng vào bản Sin Suối Hồ
              </text>
            </svg>

            {/* Interactive Pins on Map */}
            {mapSpots.map((spot) => {
              const isSelected = selectedPinId === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => setSelectedPinId(spot.id)}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group focus:outline-none transition-transform ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                  aria-label={`Điểm toạ độ: ${spot.label} (${spot.native})`}
                >
                  <span className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center">
                    {isSelected && (
                      <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{ backgroundColor: spot.color }}
                      />
                    )}
                    <span
                      className={`relative inline-flex items-center justify-center rounded-full h-7 w-7 sm:h-8 sm:w-8 text-white font-bold text-xs shadow-lg border-2 ${
                        isSelected ? 'border-white scale-110' : 'border-stone-900'
                      }`}
                      style={{ backgroundColor: spot.color }}
                    >
                      <MapPin className="w-4 h-4" />
                    </span>
                  </span>

                  {/* Pin Tooltip */}
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-md bg-stone-900/95 text-white text-[11px] font-semibold whitespace-nowrap pointer-events-none transition-opacity border border-stone-700 shadow-lg ${
                      isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <span>{spot.native}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pin Detail Card in Map View */}
          {activeSpotItem ? (
            <div className="bg-amber-50/80 rounded-xl p-4 sm:p-5 border border-amber-300 shadow-sm transition-all animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="inline-flex items-center space-x-2 text-xs font-semibold text-amber-900 mb-1">
                    <span className="px-2 py-0.5 rounded bg-amber-200 text-stone-900 font-bold">
                      {CATEGORY_LABELS[getCategoryFromItem(activeSpotItem)].title}
                    </span>
                    <span>{activeSpotItem.dia_danh_hien_nay}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                    {activeSpotItem.ten_theo_danh_muc}
                  </h3>
                  <p className="text-sm font-semibold text-indigo-900 italic mt-0.5">
                    Tên gọi bản địa: {activeSpotItem.ten_goi_ban_dia}
                  </p>
                  <p className="text-xs sm:text-sm text-stone-700 mt-2 line-clamp-2">
                    {activeSpotItem.mo_ta}
                  </p>
                </div>

                <div className="shrink-0 flex sm:flex-col items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectItem(activeSpotItem);
                      onNavigate('detail');
                    }}
                    className="w-full px-4 py-2 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center space-x-1 shadow"
                  >
                    <span>Xem hồ sơ chi tiết</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setSelectedPinId(null)}
                    className="px-3 py-2 text-stone-600 hover:text-stone-900 text-xs font-semibold"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600 text-center">
              💡 Chạm hoặc nhấp vào bất kỳ điểm toạ độ tròn nào trên sơ đồ để xem thông tin chi tiết của khu vực đó.
            </div>
          )}
        </div>
      ) : (
        /* CARDS VIEW */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-600 font-medium px-1">
            <span>
              Tìm thấy <strong className="text-stone-900 font-bold">{filteredItems.length}</strong> bản ghi thực hành di sản
            </span>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-indigo-700 hover:text-indigo-900 underline font-semibold"
              >
                Xóa bộ lọc danh mục
              </button>
            )}
          </div>

          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-stone-200 space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-800">Không tìm thấy bản ghi phù hợp</h3>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                Không có dữ liệu phù hợp với từ khóa "{searchQuery}" trong danh mục đã chọn. Thử tìm với từ khóa khác như "thắng cố", "váy lanh", "khèn", hoặc xóa bộ lọc.
              </p>
              <button
                onClick={() => {
                  onSearchChange('');
                  setSelectedCategory('all');
                }}
                className="mt-2 px-4 py-2 rounded-lg bg-stone-800 text-white text-xs font-semibold hover:bg-stone-700"
              >
                Xem toàn bộ di sản
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => {
                const cat = getCategoryFromItem(item);
                return (
                  <article
                    key={item.id}
                    className="bg-white rounded-2xl p-5 border border-stone-200 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2.5">
                      {/* Category Tag & Informant */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-900 font-bold border border-indigo-200">
                          {CATEGORY_LABELS[cat].title}
                        </span>
                        <span className="text-stone-500 font-mono text-[11px]">{item.id}</span>
                      </div>

                      {/* Title & Native Name */}
                      <div>
                        <h2 className="text-lg font-extrabold text-stone-900 leading-snug">
                          {item.ten_theo_danh_muc || 'Bản ghi di sản'}
                        </h2>
                        {item.ten_goi_ban_dia && (
                          <p className="text-sm font-extrabold text-indigo-900 italic mt-0.5">
                            Tên bản địa: {item.ten_goi_ban_dia}
                          </p>
                        )}
                      </div>

                      {/* Practice & Location */}
                      <div className="space-y-1 text-xs text-stone-600">
                        <div className="flex items-start space-x-1.5">
                          <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item.dia_danh_hien_nay}</span>
                        </div>
                        <div className="flex items-start space-x-1.5">
                          <Layers className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item.thuc_hanh_di_san}</span>
                        </div>
                      </div>

                      {/* Description excerpt */}
                      <p className="text-sm text-stone-700 leading-relaxed line-clamp-3">
                        {item.mo_ta}
                      </p>

                      {/* Informant & Permission */}
                      <div className="pt-2 border-t border-stone-100 flex flex-col gap-1 text-[11px] text-stone-500">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3 text-stone-400" />
                          <span>Người cung cấp: <strong className="text-stone-700">{item.nguoi_cung_cap}</strong></span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Shield className="w-3 h-3 text-stone-400" />
                          <span className="line-clamp-1">{item.pham_vi_duoc_phep_su_dung}</span>
                        </div>
                      </div>
                    </div>

                    {/* View Button */}
                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-stone-500">
                        Dân tộc: <strong className="text-stone-800">{item.dan_toc}</strong>
                      </span>
                      <button
                        onClick={() => {
                          onSelectItem(item);
                          onNavigate('detail');
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-amber-600 text-white font-bold text-xs transition-colors flex items-center space-x-1.5 shadow-sm"
                        aria-label={`Xem chi tiết hồ sơ ${item.ten_theo_danh_muc}`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Xem chi tiết</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
