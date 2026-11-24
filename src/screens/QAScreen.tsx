import React, { useState } from 'react';
import type { AskResponse, HeritageItem } from '../types/disan';
import { HmongSunEmblem, HmongBatikMotif } from '../components/HmongPattern';
import {
  HelpCircle,
  Send,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  BookOpen,
  MapPin,
  User,
  CheckCircle2,
  RefreshCw,
  Info,
} from 'lucide-react';

interface QAMessage {
  id: string;
  sender: 'user' | 'assistant';
  question?: string;
  answer?: string;
  citations?: AskResponse['citations'];
  hasInformation?: boolean;
  timestamp: string;
}

export const QAScreen: React.FC = () => {
  const [questionInput, setQuestionInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [history, setHistory] = useState<QAMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      answer:
        'Xin chào quý khách và bà con dân bản! Tôi là trợ lý tra cứu hồ sơ số hóa di sản Chợ phiên Sin Suối Hồ, vận hành bằng mô hình trí tuệ nhân tạo Gemini. Mọi câu trả lời của tôi đều được đối sánh nghiêm ngặt từ kho hồ sơ số hóa di sản, có trích dẫn rõ tên bản ghi, địa danh, tên cộng đồng và nguồn tư liệu. Nếu trong dữ liệu chưa ghi nhận, tôi sẽ thông báo rõ ràng là chưa có tư liệu, tuyệt đối không tự suy đoán hay bịa đặt.',
      hasInformation: true,
      citations: [],
      timestamp: 'Hệ thống đã sẵn sàng',
    },
  ]);

  const exampleQuestions = [
    'Chợ phiên Sin Suối Hồ họp vào thời gian nào và có những phân khu nào?',
    'Món Thắng cố ngựa truyền thống nấu với những gia vị gì đặc trưng?',
    'Kỹ thuật vẽ sáp ong và nhuộm chàm váy lanh H\'Mông Đen được thực hiện thế nào?',
    'Món cơm ngô Mèn mén (Mov pob kws) được chế biến qua mấy lần đồ lửa?',
    'Trưởng bản Vàng A Chỉnh có đóng góp gì trong mô hình bảo tồn bản văn hóa?',
    'Lễ hội Lồng Tồng của người Tày diễn ra thế nào? (Kiểm tra không bịa thông tin)',
  ];

  const handleAsk = async (queryText: string) => {
    const q = queryText.trim();
    if (!q || isLoading) return;

    setErrorMessage(null);
    const userMsgId = `user-${Date.now()}`;
    const userMsg: QAMessage = {
      id: userMsgId,
      sender: 'user',
      question: q,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setHistory((prev) => [...prev, userMsg]);
    setQuestionInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: q }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Lỗi máy chủ (${response.status})`);
      }

      const data: AskResponse = await response.json();

      const assistantMsg: QAMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        answer: data.answer,
        citations: data.citations || [],
        hasInformation: data.hasInformation,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      setHistory((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Lỗi tra cứu Gemini:', err);
      setErrorMessage(
        err.message || 'Không thể gửi câu hỏi đến máy chủ tra cứu. Vui lòng thử lại sau.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAsk(questionInput);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-indigo-900 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Màn hình 4 • Trợ lý tra cứu di sản Gemini</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Hỏi Đáp Di Sản Văn Hóa
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Hệ thống trả lời hoàn toàn dựa trên kho hồ sơ số hóa di sản văn hóa, kèm trích dẫn bản ghi và nguồn tư liệu.
            </p>
          </div>
        </div>

        {/* Strict Ethical Guardrails Notice */}
        <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-300 text-xs text-amber-950 flex items-start space-x-2.5">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-bold">Nguyên tắc ràng buộc bắt buộc:</strong> Trợ lý tuyệt đối không tự suy đoán hoặc bịa đặt thông tin. Nếu nội dung không có trong hồ sơ di sản đã xác thực, hệ thống sẽ trả lời rõ ràng là <em>chưa có tư liệu</em> và không gán ghép văn hóa vùng khác.
          </div>
        </div>
      </div>

      {/* Suggested Questions */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm space-y-2">
        <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
          Gợi ý câu hỏi tra cứu phổ biến:
        </span>
        <div className="flex flex-wrap gap-2">
          {exampleQuestions.map((eq, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(eq)}
              disabled={isLoading}
              className="text-left px-3 py-1.5 rounded-lg bg-stone-50 hover:bg-amber-100/70 border border-stone-200 text-stone-800 text-xs font-medium transition-colors disabled:opacity-50 flex items-center space-x-1"
            >
              <span className="text-amber-600 font-bold">💬</span>
              <span>{eq}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages History */}
      <div className="space-y-4">
        {history.map((msg) => {
          if (msg.sender === 'user') {
            return (
              <div key={msg.id} className="flex justify-end animate-fadeIn">
                <div className="max-w-[85%] bg-indigo-900 text-white rounded-2xl rounded-tr-sm p-4 shadow-sm space-y-1">
                  <div className="flex items-center justify-between gap-4 text-[11px] text-indigo-200 font-semibold mb-1">
                    <span>Bạn đọc tra cứu</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <p className="text-sm sm:text-base font-medium leading-relaxed">
                    {msg.question}
                  </p>
                </div>
              </div>
            );
          }

          // Assistant message
          return (
            <div key={msg.id} className="flex justify-start animate-fadeIn">
              <div className="max-w-[95%] sm:max-w-[90%] bg-white rounded-2xl rounded-tl-sm p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-indigo-900 text-amber-300 flex items-center justify-center">
                      <HmongSunEmblem size={18} />
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-stone-900">
                      Trợ lý Hồ sơ Di sản Chợ phiên Sin Suối Hồ
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-400 font-mono">{msg.timestamp}</span>
                </div>

                {/* Answer Content */}
                <div className="text-stone-800 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {msg.answer}
                </div>

                {/* Has Information / No Information Badge */}
                {msg.hasInformation === false && (
                  <div className="p-3 rounded-lg bg-stone-100 border border-stone-300 text-xs text-stone-700 flex items-center space-x-2">
                    <Info className="w-4 h-4 text-stone-500 shrink-0" />
                    <span>
                      Nội dung này chưa được ghi nhận trong tệp dữ liệu di sản hiện tại của xã Sin Suối Hồ.
                    </span>
                  </div>
                )}

                {/* Mandatory Citations Block */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-4 pt-4 border-t-2 border-amber-200 bg-amber-50/50 -mx-5 sm:-mx-6 -mb-5 sm:-mb-6 p-4 sm:p-5 rounded-b-2xl space-y-3">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-950 uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Trích dẫn nguồn tư liệu bắt buộc ({msg.citations.length} bản ghi):</span>
                    </div>

                    <div className="space-y-2">
                      {msg.citations.map((cite, cIdx) => (
                        <div
                          key={cIdx}
                          className="bg-white p-3 rounded-lg border border-amber-300/80 text-xs text-stone-800 space-y-1 shadow-2xs"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-1 font-bold text-indigo-950">
                            <span className="text-sm">📌 {cite.ten_ban_ghi}</span>
                            <span className="text-[11px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded font-normal">
                              Dân tộc: <strong>{cite.dan_toc || "H'Mông"}</strong>
                            </span>
                          </div>

                          <div className="flex items-start space-x-1.5 text-stone-600">
                            <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                            <span>Địa danh: <strong>{cite.dia_danh}</strong></span>
                          </div>

                          {cite.nguoi_cung_cap && (
                            <div className="flex items-start space-x-1.5 text-stone-600">
                              <User className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                              <span>Người cung cấp: <strong>{cite.nguoi_cung_cap}</strong></span>
                            </div>
                          )}

                          <div className="flex items-start space-x-1.5 text-stone-700 pt-1 border-t border-stone-100">
                            <BookOpen className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <span>Nguồn tư liệu: <em>{cite.nguon_tu_lieu}</em></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-white rounded-2xl rounded-tl-sm p-4 border border-stone-200 shadow-sm flex items-center space-x-3">
              <RefreshCw className="w-4 h-4 text-amber-500 animate-spin" />
              <span className="text-xs font-semibold text-stone-600">
                Mô hình Gemini đang đối chiếu với kho hồ sơ di sản và trích xuất nguồn tư liệu...
              </span>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-xs sm:text-sm flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Lỗi tra cứu:</p>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}
      </div>

      {/* Question Input Form */}
      <form onSubmit={handleFormSubmit} className="sticky bottom-16 lg:bottom-4 z-20">
        <div className="bg-white p-2 rounded-2xl border-2 border-stone-300 focus-within:border-amber-500 focus-within:ring-4 focus-within:ring-amber-200 shadow-xl flex items-center gap-2">
          <input
            type="text"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
            disabled={isLoading}
            placeholder="Nhập câu hỏi tra cứu về Chợ phiên H'Mông Sin Suối Hồ..."
            className="flex-1 px-3 py-2.5 bg-transparent text-stone-900 placeholder-stone-400 text-sm sm:text-base focus:outline-none"
            aria-label="Nhập câu hỏi tra cứu di sản"
          />
          <button
            type="submit"
            disabled={isLoading || !questionInput.trim()}
            className="px-5 py-2.5 bg-indigo-900 hover:bg-indigo-800 disabled:opacity-40 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center space-x-1.5 shrink-0 shadow"
            aria-label="Gửi câu hỏi"
          >
            <span>Hỏi trợ lý</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
