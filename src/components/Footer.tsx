import React from 'react';
import { Heart, ShieldCheck, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-16 pb-20 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Col 1 */}
          <div>
            <div className="flex items-center space-x-2 text-amber-300 font-bold text-base mb-3">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Cộng đồng H'Mông Sin Suối Hồ</span>
            </div>
            <p className="text-sm text-stone-300 leading-relaxed">
              Xã Sin Suối Hồ, tỉnh Lai Châu. Điểm sáng du lịch văn hóa cộng đồng Tây Bắc, bảo tồn nguyên vẹn nếp sống, kiến trúc nhà gỗ, chợ phiên truyền thống và tri thức dân gian đặc sắc.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <div className="flex items-center space-x-2 text-amber-300 font-bold text-base mb-3">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Nguyên tắc đạo đức & Di sản</span>
            </div>
            <p className="text-sm text-stone-300 leading-relaxed">
              Dự án tuân thủ nghiêm ngặt nguyên tắc tôn trọng chủ thể văn hóa: không xuyên tạc, không thương mại hóa sai lệch tri thức bản địa, lưu trữ có trích dẫn nguồn tư liệu và người cung cấp từ cộng đồng.
            </p>
          </div>

          {/* Col 3 */}
          <div>
            <div className="flex items-center space-x-2 text-amber-300 font-bold text-base mb-3">
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Ghi nhận đề tài thực tập</span>
            </div>
            <div className="bg-stone-800/80 p-3.5 rounded-lg border border-stone-700/80 text-xs text-stone-200 leading-relaxed">
              <p className="font-semibold text-amber-200 mb-1">
                Sản phẩm thực tập của Đinh Khánh Duy, mã sinh viên TH05056, Nhóm 2, Chương trình Thực tập sinh Đợt 15 FPT Polytechnic và IMTA TECH, dự án xã hội phi lợi nhuận.
              </p>
              <p className="text-stone-400">
                Mục đích lưu trữ số hóa di sản văn hóa phi vật thể phục vụ bà con dân bản, khách tham quan, sinh viên và cán bộ văn hóa cơ sở.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-800 text-center text-xs text-stone-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Hồ sơ số hóa Chợ phiên H'Mông Sin Suối Hồ. Đề tài xã hội phi lợi nhuận.</p>
          <p className="text-stone-400 font-medium">Bản mã chuẩn tiếng Việt UTF-8 • Giao diện tối ưu thiết bị di động</p>
        </div>
      </div>
    </footer>
  );
};
