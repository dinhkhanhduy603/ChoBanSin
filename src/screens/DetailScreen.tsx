import React, { useState } from 'react';
import type { HeritageItem } from '../types/disan';
import type { ScreenId } from '../components/Header';
import { getCategoryFromItem, CATEGORY_LABELS } from '../utils/heritage';
import { HmongSunEmblem, HmongBatikMotif } from '../components/HmongPattern';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Shield,
  BookOpen,
  ArrowLeft,
  Share2,
  Copy,
  Check,
  Utensils,
  Shirt,
  Music,
  Users,
  Info,
  Layers,
  Sparkles,
} from 'lucide-react';

interface DetailScreenProps {
  items: HeritageItem[];
  selectedItem: HeritageItem | null;
  onSelectItem: (item: HeritageItem) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({
  items,
  selectedItem,
  onSelectItem,
  onNavigate,
}) => {
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'dossier'>(
    selectedItem ? 'dossier' : 'overview'
  );

  // If no item selected yet, default to first valid item for dossier view
  const currentItem = selectedItem || items.find((i) => i.ten_theo_danh_muc) || items[0];

  const handleCopyCitation = (item: HeritageItem) => {
    const citation = `[Hồ sơ di sản số] "${item.ten_theo_danh_muc}" (${item.ten_goi_ban_dia || ''}). Dân tộc: ${item.dan_toc}. Địa danh: ${item.dia_danh_hien_nay}. Người cung cấp: ${item.nguoi_cung_cap}. Nguồn tư liệu: ${item.nguon_tu_lieu}. Dự án số hóa văn hóa Chợ phiên H'Mông Sin Suối Hồ (2026).`;
    navigator.clipboard?.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  // Group items for market overview
  const cuisineItems = items.filter((i) => getCategoryFromItem(i) === 'am_thuc');
  const attireItems = items.filter((i) => getCategoryFromItem(i) === 'trang_phuc');
  const artsItems = items.filter((i) => getCategoryFromItem(i) === 'nghe_thuat');
  const bearers = items.filter((i) => getCategoryFromItem(i) === 'nguoi_gin_giu');

  return (
    <div className="space-y-8">
      {/* Navigation & Tab Toggle */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => onNavigate('directory')}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại danh sách điểm chợ</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Chi Tiết Phiên Chợ & Hồ Sơ Di Sản
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Khảo sát lịch họp, ẩm thực, trang phục và thực hành diễn xướng tại Chợ phiên Sin Suối Hồ
          </p>
        </div>

        {/* Tab switch */}
        <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-200 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Toàn cảnh Phiên chợ thứ Bảy
          </button>
          <button
            onClick={() => setActiveTab('dossier')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'dossier'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Hồ sơ chi tiết từng bản ghi
          </button>
        </div>
      </div>

      {activeTab === 'overview' ? (
        /* MARKET OVERVIEW VIEW (Lịch họp, Ẩm thực, Trang phục, Sinh hoạt văn hóa) */
        <div className="space-y-8 animate-fadeIn">
          {/* Market Schedule Banner */}
          <section className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-stone-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg border border-indigo-800">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-bold mb-3 uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                <span>Lịch Họp Chợ Phiên Định Kỳ</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black mb-3 text-amber-200">
                Sáng thứ Bảy hàng tuần • Bản Sin Suối Hồ
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
                Chợ phiên Sin Suối Hồ họp vào mỗi sáng sớm thứ Bảy từ 5h30 đến 12h00 trưa.
                Khác với chợ thị trấn ồn ào khói bụi, chợ phiên Sin Suối Hồ diễn ra trên khuôn viên lát đá tự nhiên ở độ cao gần 1.500m,
                bao quanh bởi vườn địa lan ngát hương và nếp nhà gỗ truyền thống của đồng bào H'Mông.
              </p>

              {/* Timeline steps */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-white/10 p-3 rounded-lg border border-white/15 backdrop-blur-sm">
                  <span className="text-amber-400 font-bold block text-sm">05:30 - 07:00</span>
                  <span className="font-semibold text-white">Nổi lửa & Gánh hàng</span>
                  <p className="text-stone-300 mt-1 text-[11px]">Bếp thắng cố đỏ lửa, bà con gùi thảo quả, rau rừng xuống chợ.</p>
                </div>
                <div className="bg-white/10 p-3 rounded-lg border border-white/15 backdrop-blur-sm">
                  <span className="text-amber-400 font-bold block text-sm">07:00 - 09:30</span>
                  <span className="font-semibold text-white">Chợ đông náo nức</span>
                  <p className="text-stone-300 mt-1 text-[11px]">Trao đổi nông sản, mua bán váy lanh, ăn mèn mén và thắng cố.</p>
                </div>
                <div className="bg-white/10 p-3 rounded-lg border border-white/15 backdrop-blur-sm">
                  <span className="text-amber-400 font-bold block text-sm">09:30 - 11:30</span>
                  <span className="font-semibold text-white">Hội diễn & Giao duyên</span>
                  <p className="text-stone-300 mt-1 text-[11px]">Múa khèn, thổi lá, thi đấu cù tù lu và ném quả pao thổ cẩm.</p>
                </div>
                <div className="bg-white/10 p-3 rounded-lg border border-white/15 backdrop-blur-sm">
                  <span className="text-amber-400 font-bold block text-sm">11:30 - 12:30</span>
                  <span className="font-semibold text-white">Vãn chợ & Hẹn ước</span>
                  <p className="text-stone-300 mt-1 text-[11px]">Bà con các bản xa rộn ràng ra về, hẹn gặp phiên thứ Bảy kế tiếp.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 1: Ẩm thực chợ phiên */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 border-b border-stone-200 pb-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                  1. Ẩm thực Chợ phiên Truyền thống
                </h2>
                <p className="text-xs sm:text-sm text-stone-600">
                  Hương vị đại ngàn kết tinh trong chảo thắng cố nghi ngút, cơm ngô mèn mén và rượu men lá
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cuisineItems.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-xl bg-stone-50 border border-stone-200 hover:border-amber-400 transition-all space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-orange-700 italic">
                        {c.ten_goi_ban_dia}
                      </span>
                      <span className="text-[11px] font-mono text-stone-400">{c.id}</span>
                    </div>
                    <h3 className="font-extrabold text-stone-900 text-base">{c.ten_theo_danh_muc}</h3>
                    <p className="text-xs text-stone-600 leading-relaxed mt-1">{c.mo_ta}</p>
                  </div>
                  <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs">
                    <span className="text-stone-500">Cung cấp: <strong>{c.nguoi_cung_cap}</strong></span>
                    <button
                      onClick={() => {
                        onSelectItem(c);
                        setActiveTab('dossier');
                      }}
                      className="text-indigo-700 font-bold hover:underline"
                    >
                      Xem hồ sơ số →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Trang phục & Nghề thủ công */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 border-b border-stone-200 pb-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <Shirt className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                  2. Trang phục & Kỹ nghệ Thủ công
                </h2>
                <p className="text-xs sm:text-sm text-stone-600">
                  Tác phẩm vải lanh dệt tay, vẽ sáp ong rừng, nhuộm chàm sâu và trang sức bạc thủ công
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {attireItems.map((a) => (
                <div
                  key={a.id}
                  className="p-4 rounded-xl bg-stone-50 border border-stone-200 hover:border-amber-400 transition-all space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-indigo-800 italic">
                        {a.ten_goi_ban_dia}
                      </span>
                      <span className="text-[11px] font-mono text-stone-400">{a.id}</span>
                    </div>
                    <h3 className="font-extrabold text-stone-900 text-base">{a.ten_theo_danh_muc}</h3>
                    <p className="text-xs text-stone-600 leading-relaxed mt-1">{a.mo_ta}</p>
                  </div>
                  <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs">
                    <span className="text-stone-500">Cung cấp: <strong>{a.nguoi_cung_cap}</strong></span>
                    <button
                      onClick={() => {
                        onSelectItem(a);
                        setActiveTab('dossier');
                      }}
                      className="text-indigo-700 font-bold hover:underline"
                    >
                      Xem hồ sơ số →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Sinh hoạt văn hóa & Trò chơi */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 border-b border-stone-200 pb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                  3. Sinh hoạt Văn nghệ & Trò chơi Dân gian
                </h2>
                <p className="text-xs sm:text-sm text-stone-600">
                  Khèn H'Mông linh thiêng, tiếng thổi lá tỏ tình, ném quả pao giao duyên và tài nghệ đánh cù tù lu
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {artsItems.map((ar) => (
                <div
                  key={ar.id}
                  className="p-4 rounded-xl bg-stone-50 border border-stone-200 hover:border-amber-400 transition-all space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-emerald-800 italic">
                        {ar.ten_goi_ban_dia}
                      </span>
                      <span className="text-[11px] font-mono text-stone-400">{ar.id}</span>
                    </div>
                    <h3 className="font-extrabold text-stone-900 text-base">{ar.ten_theo_danh_muc}</h3>
                    <p className="text-xs text-stone-600 leading-relaxed mt-1">{ar.mo_ta}</p>
                  </div>
                  <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs">
                    <span className="text-stone-500">Cung cấp: <strong>{ar.nguoi_cung_cap}</strong></span>
                    <button
                      onClick={() => {
                        onSelectItem(ar);
                        setActiveTab('dossier');
                      }}
                      className="text-indigo-700 font-bold hover:underline"
                    >
                      Xem hồ sơ số →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Người gìn giữ di sản */}
          <section className="bg-amber-50/70 rounded-2xl p-6 sm:p-8 border border-amber-200 space-y-4">
            <div className="flex items-center space-x-3 border-b border-amber-200 pb-3">
              <div className="w-10 h-10 rounded-lg bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                  4. Những Người Gìn Giữ & Truyền Dạy Di Sản
                </h2>
                <p className="text-xs sm:text-sm text-stone-700">
                  Trưởng bản, các nghệ nhân và người có uy tín tại bản Sin Suối Hồ
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bearers.map((b) => (
                <div key={b.id} className="p-4 rounded-xl bg-white border border-amber-300 space-y-2">
                  <h3 className="font-bold text-stone-900 text-base">{b.ten_theo_danh_muc}</h3>
                  <p className="text-xs font-semibold text-amber-900 italic">{b.ten_goi_ban_dia}</p>
                  <p className="text-xs text-stone-700 leading-relaxed">{b.mo_ta}</p>
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-medium">Bản Sin Suối Hồ</span>
                    <button
                      onClick={() => {
                        onSelectItem(b);
                        setActiveTab('dossier');
                      }}
                      className="text-amber-700 font-bold hover:underline"
                    >
                      Xem hồ sơ cá nhân →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        /* DOSSIER VIEW (Chi tiết 11 trường dữ liệu khoa học của 1 bản ghi) */
        <div className="space-y-6 animate-fadeIn">
          {/* Item Selector Dropdown */}
          <div className="bg-stone-100 p-3 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <label className="text-xs font-bold text-stone-700 flex items-center space-x-1">
              <Layers className="w-4 h-4 text-indigo-700" />
              <span>Chọn bản ghi di sản để xem chi tiết:</span>
            </label>
            <select
              value={currentItem.id}
              onChange={(e) => {
                const found = items.find((i) => i.id === e.target.value);
                if (found) onSelectItem(found);
              }}
              className="bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400 max-w-full sm:max-w-md"
            >
              {items
                .filter((i) => i.ten_theo_danh_muc)
                .map((i) => (
                  <option key={i.id} value={i.id}>
                    [{i.id}] {i.ten_theo_danh_muc} - {i.ten_goi_ban_dia}
                  </option>
                ))}
            </select>
          </div>

          {/* Main Scientific Record Sheet */}
          <article className="bg-white rounded-2xl p-6 sm:p-10 border-2 border-stone-200 shadow-md space-y-8">
            {/* Header info */}
            <div className="border-b border-stone-200 pb-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-indigo-900 text-amber-300 font-bold uppercase tracking-wider">
                  Mã hồ sơ: {currentItem.id}
                </span>
                <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 font-semibold border border-stone-200">
                  {CATEGORY_LABELS[getCategoryFromItem(currentItem)].title}
                </span>
                <button
                  onClick={() => handleCopyCitation(currentItem)}
                  className="ml-auto inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold border border-stone-300 transition-colors"
                >
                  {copiedCitation ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Đã sao chép trích dẫn</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-500" />
                      <span>Sao chép trích dẫn</span>
                    </>
                  )}
                </button>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
                {currentItem.ten_theo_danh_muc}
              </h2>

              {currentItem.ten_goi_ban_dia && (
                <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200">
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-wide block mb-0.5">
                    Tên gọi bản địa (Tiếng H'Mông) & Chú giải:
                  </span>
                  <span className="text-base sm:text-lg font-extrabold text-indigo-950">
                    {currentItem.ten_goi_ban_dia}
                  </span>
                </div>
              )}
            </div>

            {/* Core Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm bg-stone-50 p-5 rounded-xl border border-stone-200">
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                  Dân tộc
                </span>
                <span className="font-bold text-stone-900 text-base">{currentItem.dan_toc}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                  Vùng văn hóa
                </span>
                <span className="font-bold text-stone-900 text-base">{currentItem.vung_van_hoa}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                  Người cung cấp thông tin
                </span>
                <span className="font-bold text-indigo-950 text-base">{currentItem.nguoi_cung_cap}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                  Địa danh hiện nay
                </span>
                <span className="font-semibold text-stone-800">{currentItem.dia_danh_hien_nay}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                  Địa danh tại thời điểm tư liệu
                </span>
                <span className="font-semibold text-stone-800">
                  {currentItem.dia_danh_tai_thoi_diem_tu_lieu || currentItem.dia_danh_hien_nay}
                </span>
              </div>
            </div>

            {/* Field: Thực hành di sản */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-900 flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-indigo-700" />
                <span>Loại hình thực hành di sản:</span>
              </h3>
              <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 text-stone-800 font-medium text-sm sm:text-base leading-relaxed">
                {currentItem.thuc_hanh_di_san}
              </div>
            </div>

            {/* Field: Mô tả chi tiết */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Mô tả chi tiết kỹ thuật và diễn trình di sản:</span>
              </h3>
              <div className="text-stone-800 text-sm sm:text-base leading-relaxed whitespace-pre-line p-4 rounded-xl bg-stone-50/60 border border-stone-200">
                {currentItem.mo_ta}
              </div>
            </div>

            {/* Field: Bối cảnh văn hóa */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Bối cảnh diễn xướng / không gian sinh hoạt tại chợ phiên:</span>
              </h3>
              <div className="text-stone-800 text-sm sm:text-base leading-relaxed p-4 rounded-xl bg-stone-50/60 border border-stone-200">
                {currentItem.boi_canh}
              </div>
            </div>

            {/* Field: Phạm vi cho phép & Nguồn tư liệu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-stone-200 text-xs">
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
                <span className="font-bold uppercase tracking-wider text-emerald-900 block mb-1 flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-emerald-700" />
                  <span>Phạm vi được phép sử dụng:</span>
                </span>
                <p className="text-stone-700 font-medium leading-relaxed">
                  {currentItem.pham_vi_duoc_phep_su_dung}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200">
                <span className="font-bold uppercase tracking-wider text-indigo-900 block mb-1 flex items-center space-x-1">
                  <BookOpen className="w-4 h-4 text-indigo-700" />
                  <span>Nguồn tư liệu lưu trữ:</span>
                </span>
                <p className="text-stone-700 font-medium leading-relaxed">
                  {currentItem.nguon_tu_lieu}
                </p>
              </div>
            </div>

            {/* Direct AI Ask CTA for this item */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-indigo-50 border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Muốn tìm hiểu thêm về bản ghi này?</h4>
                  <p className="text-xs text-stone-600">Đặt câu hỏi với trợ lý Gemini được đối sánh nghiêm ngặt từ hồ sơ di sản</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('qa')}
                className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-amber-600 text-white font-bold text-xs transition-colors shrink-0"
              >
                Hỏi đáp AI ngay →
              </button>
            </div>
          </article>
        </div>
      )}
    </div>
  );
};
