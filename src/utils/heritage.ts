import type { HeritageCategory, HeritageItem } from '../types/disan';

export function getCategoryFromItem(item: HeritageItem): HeritageCategory {
  if (item.loai_hinh) return item.loai_hinh;

  const primaryText = `${item.ten_theo_danh_muc} ${item.ten_goi_ban_dia} ${item.thuc_hanh_di_san}`.toLowerCase();
  const fullText = `${primaryText} ${item.mo_ta}`.toLowerCase();

  const matchCategory = (text: string): HeritageCategory | null => {
    if (text.includes('người gìn giữ') || text.includes('trưởng bản') || text.includes('tiên phong')) {
      return 'nguoi_gin_giu';
    }
    if (text.includes('không gian sinh hoạt') || text.includes('không gian chợ') || text.includes('lịch họp')) {
      return 'khong_gian';
    }
    if (text.includes('khèn') || text.includes('thổi lá') || text.includes('pao') || text.includes('tù lu') || text.includes('trò chơi') || text.includes('nghệ thuật trình diễn')) {
      return 'nghe_thuat';
    }
    if (text.includes('trang phục') || text.includes('váy') || text.includes('thổ cẩm') || text.includes('lanh') || text.includes('bạc') || text.includes('sáp ong') || text.includes('trang sức')) {
      return 'trang_phuc';
    }
    if (text.includes('ẩm thực') || text.includes('thắng cố') || text.includes('mèn mén') || text.includes('bánh dày') || text.includes('rượu') || text.includes('lương thực')) {
      return 'am_thuc';
    }
    return null;
  };

  return matchCategory(primaryText) ?? matchCategory(fullText) ?? 'khong_gian';
}

export const CATEGORY_LABELS: Record<HeritageCategory, { title: string; desc: string; icon: string }> = {
  all: {
    title: 'Tất cả danh mục',
    desc: 'Toàn bộ hồ sơ số hóa di sản Chợ phiên Sin Suối Hồ',
    icon: 'Layers',
  },
  khong_gian: {
    title: 'Không gian & Lịch họp',
    desc: 'Khuôn viên chợ phiên, gian hàng truyền thống và lịch họp định kỳ',
    icon: 'Store',
  },
  am_thuc: {
    title: 'Ẩm thực truyền thống',
    desc: 'Thắng cố, mèn mén, bánh dày nếp nương, rượu ngô men lá',
    icon: 'Utensils',
  },
  trang_phuc: {
    title: 'Trang phục & Thủ công',
    desc: 'Váy lanh vẽ sáp ong, vải nhuộm chàm, trang sức bạc thủ công',
    icon: 'Shirt',
  },
  nghe_thuat: {
    title: 'Nghệ thuật & Trò chơi',
    desc: 'Múa khèn, thổi lá giao duyên, ném pa pao, đánh cù tù lu',
    icon: 'Music',
  },
  nguoi_gin_giu: {
    title: 'Người gìn giữ di sản',
    desc: 'Trưởng bản, các nghệ nhân và người cao tuổi truyền dạy tri thức',
    icon: 'Users',
  },
};

export function filterHeritageItems(
  items: HeritageItem[],
  query: string,
  category: HeritageCategory = 'all'
): HeritageItem[] {
  const normalizedQuery = query.trim().toLowerCase();
  
  return items.filter((item) => {
    // Ignore pure empty template records unless query specifically asks for them
    const isTemplate = !item.ten_theo_danh_muc && !item.ten_goi_ban_dia && !item.mo_ta;
    if (isTemplate && normalizedQuery === '') return false;

    // Check category
    if (category !== 'all') {
      const itemCat = getCategoryFromItem(item);
      if (itemCat !== category) return false;
    }

    if (!normalizedQuery) return true;

    // Search across all 11 fields
    const searchableFields = [
      item.ten_theo_danh_muc,
      item.ten_goi_ban_dia,
      item.thuc_hanh_di_san,
      item.vung_van_hoa,
      item.dan_toc,
      item.dia_danh_hien_nay,
      item.dia_danh_tai_thoi_diem_tu_lieu,
      item.mo_ta,
      item.boi_canh,
      item.nguoi_cung_cap,
      item.pham_vi_duoc_phep_su_dung,
      item.nguon_tu_lieu,
    ];

    return searchableFields.some(
      (val) => typeof val === 'string' && val.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function createEmptyHeritageRecord(): HeritageItem {
  return {
    id: `ds-${Date.now().toString(36)}`,
    ten_theo_danh_muc: '',
    ten_goi_ban_dia: '',
    thuc_hanh_di_san: '',
    vung_van_hoa: 'Vùng văn hóa Tây Bắc',
    dan_toc: "H'Mông",
    dia_danh_hien_nay: 'Xã Sin Suối Hồ, huyện Phong Thổ, tỉnh Lai Châu',
    dia_danh_tai_thoi_diem_tu_lieu: 'Bản Sin Suối Hồ, xã Sin Suối Hồ, huyện Phong Thổ, tỉnh Lai Châu',
    mo_ta: '',
    boi_canh: '',
    nguoi_cung_cap: '',
    pham_vi_duoc_phep_su_dung: 'Sử dụng cho nghiên cứu văn hóa, giáo dục di sản và quảng bá du lịch cộng đồng phi lợi nhuận',
    nguon_tu_lieu: '',
  };
}
