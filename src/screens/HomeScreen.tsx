import React, { useState } from 'react';
import type { HeritageItem } from '../types/disan';
import type { ScreenId } from '../components/Header';
import { HmongSunEmblem, HmongBatikMotif } from '../components/HmongPattern';
import {
  Search,
  MapPin,
  Calendar,
  Utensils,
  Shirt,
  Music,
  Users,
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle2,
  FileCheck2,
} from 'lucide-react';

interface HomeScreenProps {
  items: HeritageItem[];
  onNavigate: (screen: ScreenId) => void;
  onSelectItem: (item: HeritageItem) => void;
  onSearchQuery: (query: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  items,
  onNavigate,
  onSelectItem,
  onSearchQuery,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearchQuery(searchTerm.trim());
      onNavigate('directory');
    }
  };

  const sampleHighlights = [
    {
      title: 'Lịch họp Chợ phiên',
      native: 'Kiab khw',
      desc: 'Họp định kỳ vào mỗi sáng thứ Bảy hàng tuần từ 5h30 sáng đến trưa tại trung tâm bản.',
      category: 'khong_gian' as const,
      icon: <Calendar className="w-5 h-5 text-amber-500" />,
      tag: 'Định kỳ hàng tuần',
    },
    {
      title: 'Ẩm thực Thắng cố ngựa',
      native: 'thắng cố',
      desc: 'Nấu trong chảo gang lớn cùng 12 loại thảo mộc núi rừng Sin Suối Hồ, thơm nồng ngây ngất.',
      category: 'am_thuc' as const,
      icon: <Utensils className="w-5 h-5 text-orange-500" />,
      tag: 'Ẩm thực linh hồn',
    },
    {
      title: 'Váy lanh vẽ sáp ong',
      native: 'Tiab / Tiab Hmoob',
      desc: 'Sợi lanh tự nhiên vẽ họa tiết kỷ hà bằng sáp ong rừng, nhuộm chàm nhiều lần công phu.',
      category: 'trang_phuc' as const,
      icon: <Shirt className="w-5 h-5 text-indigo-500" />,
      tag: 'Kỹ nghệ thủ công',
    },
    {
      title: 'Điệu Khèn gọi bạn tình',
      native: 'Qeej / Kềnh',
      desc: 'Tiếng khèn 6 ống trúc réo rắt ngân vang cùng những bước múa điêu luyện giữa hội chợ.',
      category: 'nghe_thuat' as const,
      icon: <Music className="w-5 h-5 text-emerald-500" />,
      tag: 'Nghệ thuật dân gian',
    },
  ];

  // Quick keywords for quick search
  const quickKeywords = [
    'Thắng cố',
    'Mèn mén',
    'Bánh dày',
    'Rượu ngô',
    'Váy lanh',
    'Khèn H\'Mông',
    'Ném Pa Pao',
    'Đánh Tù Lu',
    'Vàng A Chỉnh',
  ];

  const glossaryItems = [
    { native: 'Kiab khw', meaning: 'Chợ phiên trung tâm bản Sin Suối Hồ' },
    { native: 'thắng cố', meaning: 'Món Thắng cố ngựa truyền thống nấu thảo mộc' },
    { native: 'Mov pob kws', meaning: 'Cơm ngô mèn mén hấp hai lần lửa' },
    { native: 'Ncuav', meaning: 'Bánh dày nếp nương giã tay gói lá chuối rừng' },
    { native: 'Cawv', meaning: 'Rượu ngô nương ủ men lá thảo dược' },
    { native: 'Tiab / Tiab Hmoob', meaning: 'Váy lanh thổ cẩm xếp nếp nhuộm chàm vẽ sáp ong' },
    { native: 'Qeej / Kềnh', meaning: 'Cây Khèn bè 6 ống trúc linh thiêng của người H\'Mông' },
    { native: 'Tshuab nplooj', meaning: 'Nghệ thuật ngậm lá rừng thổi điệu giao duyên' },
    { native: 'Pao', meaning: 'Quả pao thổ cẩm tung ném giao duyên nam nữ' },
    { native: 'Tù lu', meaning: 'Con cù gỗ rừng nặng thi đấu quay tít trên sân' },
  ];

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-stone-900 text-stone-100 p-6 sm:p-10 shadow-xl border border-indigo-900/60">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 opacity-10 pointer-events-none">
          <HmongSunEmblem size={256} className="text-amber-400" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-900/80 border border-amber-400/40 text-amber-300 text-xs font-semibold mb-4 tracking-wide uppercase">
            <MapPin className="w-3.5 h-3.5" />
            <span>Xã Sin Suối Hồ • Huyện Phong Thổ • Tỉnh Lai Châu</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Hồ sơ số hóa Di sản Văn hóa <br className="hidden sm:inline" />
            <span className="text-amber-300">Chợ Phiên H'Mông Sin Suối Hồ</span>
          </h1>

          <p className="text-stone-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
            Không gian lưu giữ và lan tỏa tri thức bản địa của cộng đồng người H'Mông tại vùng cao Tây Bắc.
            Nơi bà con họp mặt vào mỗi <strong className="text-amber-200 font-semibold">sáng thứ Bảy hàng tuần</strong> để
            trao đổi nông sản vùng cao, cùng thưởng thức ẩm thực thắng cố mèn mén, trình diễn điệu khèn giao duyên và gìn giữ nét văn hóa độc bản.
          </p>

          {/* Quick Stats Pill */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 px-4 rounded-xl bg-stone-900/80 border border-stone-800 text-stone-200 text-xs sm:text-sm mb-6">
            <div className="flex flex-col">
              <span className="text-amber-400 font-bold text-lg sm:text-xl">1.500m</span>
              <span className="text-stone-400">Độ cao bản làng</span>
            </div>
            <div className="flex flex-col">
              <span className="text-amber-400 font-bold text-lg sm:text-xl">Sáng Thứ 7</span>
              <span className="text-stone-400">Lịch họp chợ phiên</span>
            </div>
            <div className="flex flex-col">
              <span className="text-amber-400 font-bold text-lg sm:text-xl">10 Bản</span>
              <span className="text-stone-400">Cùng hội tụ giao lưu</span>
            </div>
            <div className="flex flex-col">
              <span className="text-amber-400 font-bold text-lg sm:text-xl">ASEAN</span>
              <span className="text-stone-400">Bản du lịch tiêu biểu</span>
            </div>
          </div>

          {/* Search Box - Screen 1 Core Feature */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-stone-900/95 p-2 rounded-xl border-2 border-amber-400/80 shadow-2xl focus-within:ring-4 focus-within:ring-amber-400/20">
              <div className="flex items-center flex-1 px-3 py-2">
                <Search className="w-6 h-6 text-amber-400 mr-3 shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tra cứu thực hành di sản, ẩm thực, trang phục, tên bản địa..."
                  className="w-full bg-transparent text-white placeholder-stone-400 text-base sm:text-lg focus:outline-none"
                  aria-label="Ô tìm kiếm hồ sơ số di sản chợ phiên"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-base rounded-lg transition-colors flex items-center justify-center space-x-2 shrink-0 shadow"
              >
                <span>Tìm kiếm</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Quick search tags */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-stone-400 font-medium mr-1">Gợi ý nhanh:</span>
              {quickKeywords.map((kw) => (
                <button
                  key={kw}
                  type="button"
                  onClick={() => {
                    setSearchTerm(kw);
                    onSearchQuery(kw);
                    onNavigate('directory');
                  }}
                  className="px-2.5 py-1 rounded-md bg-stone-800/90 hover:bg-amber-500 hover:text-stone-950 text-stone-300 font-medium transition-colors border border-stone-700"
                >
                  {kw}
                </button>
              ))}
            </div>
          </form>
        </div>
      </section>

      {/* Direct Navigation Action Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigate('directory')}
          className="p-5 rounded-xl bg-white hover:bg-amber-50/50 border border-stone-200 hover:border-amber-400 shadow-sm transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Compass className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-stone-900 group-hover:text-indigo-900 mb-1">
            Bản đồ & Danh sách điểm chợ
          </h2>
          <p className="text-sm text-stone-600 line-clamp-2">
            Khám phá sơ đồ không gian phân khu chợ và lọc 12 bản ghi thực hành di sản theo từng danh mục.
          </p>
        </button>

        <button
          onClick={() => onNavigate('detail')}
          className="p-5 rounded-xl bg-white hover:bg-amber-50/50 border border-stone-200 hover:border-amber-400 shadow-sm transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-stone-900 group-hover:text-amber-900 mb-1">
            Toàn cảnh Phiên chợ thứ Bảy
          </h2>
          <p className="text-sm text-stone-600 line-clamp-2">
            Xem lịch trình chi tiết từ rạng sáng: nổi lửa thắng cố, họp chợ, diễn tấu khèn và giao lưu văn nghệ.
          </p>
        </button>

        <button
          onClick={() => onNavigate('qa')}
          className="p-5 rounded-xl bg-white hover:bg-amber-50/50 border border-stone-200 hover:border-amber-400 shadow-sm transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-stone-900 group-hover:text-emerald-900 mb-1">
            Trợ lý tra cứu di sản AI
          </h2>
          <p className="text-sm text-stone-600 line-clamp-2">
            Đặt câu hỏi và nhận câu trả lời đối chiếu chuẩn xác, trích dẫn rõ nguồn từ hồ sơ di sản.
          </p>
        </button>
      </section>

      {/* Featured Heritage Pillars */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              Các trụ cột Di sản Chợ phiên Sin Suối Hồ
            </h2>
            <p className="text-sm text-stone-600">
              Những nét văn hóa đặc sắc được cộng đồng người H'Mông gìn giữ nguyên vẹn qua nhiều thế hệ
            </p>
          </div>
          <button
            onClick={() => onNavigate('directory')}
            className="text-sm font-semibold text-indigo-700 hover:text-indigo-900 flex items-center space-x-1"
          >
            <span>Xem tất cả ({items.filter(i => i.ten_theo_danh_muc).length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sampleHighlights.map((hl, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-5 border border-stone-200 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-lg bg-stone-100">{hl.icon}</div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                    {hl.tag}
                  </span>
                </div>
                <h3 className="font-bold text-base text-stone-900 mb-1">{hl.title}</h3>
                <p className="text-xs font-semibold text-indigo-800 italic mb-2">
                  {hl.native}
                </p>
                <p className="text-sm text-stone-600 leading-relaxed mb-4">{hl.desc}</p>
              </div>

              <button
                onClick={() => {
                  onSearchQuery(hl.title);
                  onNavigate('directory');
                }}
                className="w-full mt-2 py-2 px-3 rounded-lg bg-stone-50 hover:bg-amber-100 text-stone-800 hover:text-stone-950 text-xs font-bold transition-colors flex items-center justify-center space-x-1"
              >
                <span>Xem hồ sơ di sản</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Cultural Glossary Table: Native Language & Vietnamese Explanation */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-indigo-900 font-bold text-sm mb-1">
              <HmongBatikMotif className="w-4 h-4 text-indigo-700" />
              <span>BẢNG TRA CỨU NGÔN NGỮ BẢN ĐỊA</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              Tên gọi bản địa & Chú giải tiếng Việt phổ thông
            </h2>
            <p className="text-sm text-stone-600">
              Giúp bà con dân bản, sinh viên và du khách hiểu rõ ngữ nghĩa nguyên bản của các phong tục, ẩm thực và nhạc cụ.
            </p>
          </div>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300 shrink-0 self-start">
            Chuẩn hóa 10 thuật ngữ cốt lõi
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 text-xs font-bold text-stone-700 uppercase tracking-wider">
                <th className="py-3 px-4">STT</th>
                <th className="py-3 px-4">Tên gọi bản địa người H'Mông</th>
                <th className="py-3 px-4">Chú giải tiếng Việt phổ thông</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-sm">
              {glossaryItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                  <td className="py-3 px-4 text-stone-400 font-mono text-xs">{idx + 1}</td>
                  <td className="py-3 px-4 font-extrabold text-indigo-950 text-base">
                    {item.native}
                  </td>
                  <td className="py-3 px-4 text-stone-700 font-medium">
                    {item.meaning}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        onSearchQuery(item.native.split('(')[0].trim());
                        onNavigate('directory');
                      }}
                      className="text-xs font-bold text-indigo-700 hover:text-amber-600 underline underline-offset-2"
                    >
                      Tra cứu
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Community & Ethic Commitments */}
      <section className="rounded-2xl bg-amber-50/70 border border-amber-200 p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm mb-2">
            <FileCheck2 className="w-5 h-5 text-amber-700" />
            <span>NGUYÊN TẮC BẢO TỒN VĂN HÓA CƠ SỞ</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-3">
            Cam kết tôn trọng chủ thể văn hóa cộng đồng H'Mông
          </h2>
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed mb-4">
            Hồ sơ số hóa này được xây dựng trên nguyên tắc tôn trọng tuyệt đối tính xác thực của di sản.
            Mọi thông tin về ẩm thực, trang phục, nghi lễ và kỹ nghệ thủ công đều được ghi nhận trực tiếp từ các nghệ nhân,
            trưởng bản và già làng tại xã Sin Suối Hồ, không hư cấu, không chuyển giao sai lệch từ vùng văn hóa khác.
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-stone-800">
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Ghi nhận quyền tác giả dân gian</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Phi lợi nhuận vì cộng đồng</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Bảo vệ không gian di sản số</span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
