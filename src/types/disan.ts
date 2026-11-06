export interface HeritageItem {
  id: string;
  ten_theo_danh_muc: string;
  ten_goi_ban_dia: string;
  thuc_hanh_di_san: string;
  vung_van_hoa: string;
  dan_toc: string;
  dia_danh_hien_nay: string;
  dia_danh_tai_thoi_diem_tu_lieu: string;
  mo_ta: string;
  boi_canh: string;
  nguoi_cung_cap: string;
  pham_vi_duoc_phep_su_dung: string;
  nguon_tu_lieu: string;
  // Visual metadata (respecting constraint: no AI generation of humans/costumes/rituals)
  loai_hinh?: 'am_thuc' | 'trang_phuc' | 'khong_gian' | 'nghe_thuat' | 'nguoi_gin_giu';
  toa_do?: {
    lat: number;
    lng: number;
    dia_diem_cu_the: string;
  };
}

export type HeritageCategory = 'all' | 'khong_gian' | 'am_thuc' | 'trang_phuc' | 'nghe_thuat' | 'nguoi_gin_giu';

export interface HeritageCitation {
  ten_ban_ghi: string;
  dan_toc: string;
  dia_danh: string;
  nguon_tu_lieu: string;
  nguoi_cung_cap?: string;
  thuc_hanh_di_san?: string;
}

export interface AskResponse {
  answer: string;
  citations: HeritageCitation[];
  hasInformation: boolean;
  modelUsed?: string;
}
