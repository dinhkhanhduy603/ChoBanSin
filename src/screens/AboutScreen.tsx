import React from 'react';
import { HmongSunEmblem, HmongBatikMotif, HmongBrocadeBorder } from '../components/HmongPattern';
import {
  GraduationCap,
  Heart,
  ShieldCheck,
  Building,
  Target,
  Sparkles,
  Users,
  Compass,
  CheckCircle2,
  MapPin,
  Calendar,
} from 'lucide-react';

export const AboutScreen: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Official Mandatory Internship Declaration Box */}
      <section className="bg-gradient-to-br from-indigo-950 via-slate-900 to-stone-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border-2 border-amber-400/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-44 h-44 opacity-15 pointer-events-none">
          <HmongSunEmblem size={176} className="text-amber-400" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Thông Tin Công Bố Đề Tài Thực Tập</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-200 tracking-tight leading-tight">
            Hồ Sơ Số Hóa Văn Hóa Chợ Phiên H'Mông Sin Suối Hồ
          </h1>

          {/* EXACT MANDATORY CLAUSE */}
          <div className="p-4 sm:p-5 rounded-xl bg-stone-900/90 border border-amber-400 text-amber-100 text-sm sm:text-base leading-relaxed font-semibold shadow-inner">
            <p>
              Đây là sản phẩm thực tập của Đinh Khánh Duy, mã sinh viên TH05056, Nhóm 2, Chương trình Thực tập sinh Đợt 15 FPT Polytechnic và IMTA TECH, dự án xã hội phi lợi nhuận.
            </p>
          </div>

          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Dự án được xây dựng với mục tiêu ứng dụng công nghệ thông tin và trí tuệ nhân tạo vào công tác bảo tồn, lưu trữ và phổ biến tri thức di sản văn hóa phi vật thể của đồng bào các dân tộc thiểu số tại vùng cao biên giới Tây Bắc.
          </p>
        </div>
      </section>

      {/* Detailed Project Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Bối cảnh đề tài */}
        <section className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-indigo-950 font-bold text-base">
            <MapPin className="w-5 h-5 text-indigo-700" />
            <h2>Bối cảnh và Ý nghĩa Địa bàn</h2>
          </div>
          <p className="text-sm text-stone-700 leading-relaxed">
            Xã Sin Suối Hồ thuộc huyện Phong Thổ, tỉnh Lai Châu, nằm ở độ cao gần 1.500m so với mực nước biển trên dãy Hoàng Liên Sơn hùng vĩ.
            Bản Sin Suối Hồ là một trong những điểm sáng du lịch cộng đồng tiêu biểu của Việt Nam và khu vực, từng vinh dự đón nhận <strong>Giải thưởng Du lịch cộng đồng ASEAN</strong>.
          </p>
          <p className="text-sm text-stone-700 leading-relaxed">
            Chợ phiên thứ Bảy hàng tuần tại bản không đơn thuần là nơi mua bán sản vật, mà là không gian cố kết cộng đồng thiêng liêng, nơi hội tụ trang phục lanh thổ cẩm sáp ong, ẩm thực thắng cố ngào ngạt, điệu khèn giao duyên và những nếp sinh hoạt văn hóa thuần phác của người H'Mông.
          </p>
        </section>

        {/* Card 2: Mục tiêu & Đối tượng phục vụ */}
        <section className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-indigo-950 font-bold text-base">
            <Target className="w-5 h-5 text-amber-600" />
            <h2>Mục tiêu & Đối tượng Người dùng</h2>
          </div>
          <p className="text-sm text-stone-700 leading-relaxed">
            Hồ sơ số hướng đến việc phục vụ thiết thực 4 nhóm đối tượng người dùng chính:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Người dân trong cộng đồng:</strong> Có công cụ tra cứu, tự hào và tự bổ sung dữ liệu bản địa của chính gia đình, dòng họ.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Khách du lịch:</strong> Hiểu đúng ý nghĩa văn hóa, lịch họp chợ, thưởng thức ẩm thực đúng cách và hành xử văn minh.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Sinh viên & Nhà nghiên cứu:</strong> Tiếp cận nguồn tư liệu chuẩn mực 12 trường khoa học, trích dẫn minh bạch.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Cán bộ văn hóa cơ sở:</strong> Làm căn cứ xây dựng hồ sơ di sản phi vật thể tại địa phương.</span>
            </li>
          </ul>
        </section>
      </div>

      {/* Program & Institutional Credits */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 text-indigo-950 font-bold text-lg border-b border-stone-200 pb-3">
          <Building className="w-5 h-5 text-indigo-700" />
          <h2>Thông Tin Đơn Vị Đào Tạo & Doanh Nghiệp Hướng Dẫn</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
              Cơ sở đào tạo
            </span>
            <h3 className="font-bold text-stone-900 text-base">Trường Cao đẳng FPT Polytechnic</h3>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
              Doanh nghiệp đồng hành
            </span>
            <h3 className="font-bold text-stone-900 text-base">IMTA TECH</h3>
          </div>
        </div>

        {/* Student Bio Metadata */}
        <div className="bg-indigo-50/70 p-4 rounded-xl border border-indigo-200 text-xs sm:text-sm text-stone-800 space-y-1.5">
          <div className="font-bold text-indigo-950 text-base mb-2 flex items-center space-x-2">
            <Users className="w-4 h-4 text-indigo-700" />
            <span>Thực tập sinh thực hiện:</span>
          </div>
          <p>• <strong>Họ và tên:</strong> Đinh Khánh Duy</p>
          <p>• <strong>Mã sinh viên:</strong> TH05056</p>
          <p>• <strong>Phân nhóm thực tập:</strong> Nhóm 2</p>
          <p>• <strong>Chương trình:</strong> Thực tập sinh Đợt 15 FPT Polytechnic và IMTA TECH</p>
          <p>• <strong>Tính chất dự án:</strong> Dự án xã hội phi lợi nhuận vì cộng đồng</p>
        </div>
      </section>

      {/* Ethics and Technology Commitments */}
      <section className="bg-amber-50/70 rounded-2xl p-6 sm:p-8 border border-amber-200 space-y-3">
        <div className="flex items-center space-x-2 text-amber-900 font-bold text-base">
          <ShieldCheck className="w-5 h-5 text-amber-700" />
          <h2>Cam kết Đạo đức Trí tuệ Nhân tạo & Bảo tồn Di sản</h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          1. <strong>Không sinh ảnh giả mạo con người, trang phục hay nghi lễ:</strong> Ứng dụng tuân thủ nghiêm ngặt nguyên tắc tôn trọng diện mạo và trang phục dân tộc thực tế, không sử dụng AI tạo sinh các hình ảnh sai lệch thực tế.
        </p>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          2. <strong>Bảo mật khóa API & Không đưa lên mã nguồn phía trình duyệt:</strong> Mọi lệnh gọi tới mô hình Gemini được ủy quyền an toàn qua máy chủ backend Express, bảo vệ tuyệt đối thông tin xác thực.
        </p>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          3. <strong>Chống thiên kiến và bảo vệ tính xác thực:</strong> Không tự suy đoán hoặc sao chép văn hóa từ các cộng đồng dân tộc khác sang người H'Mông Sin Suối Hồ.
        </p>
      </section>
    </div>
  );
};
