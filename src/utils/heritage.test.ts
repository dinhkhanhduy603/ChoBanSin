import test from 'node:test';
import assert from 'node:assert/strict';
import { filterHeritageItems, getCategoryFromItem, createEmptyHeritageRecord } from './heritage';
import type { HeritageItem } from '../types/disan';

const sampleItems: HeritageItem[] = [
  {
    id: 'test-1',
    ten_theo_danh_muc: 'Ẩm thực Thắng cố ngựa truyền thống',
    ten_goi_ban_dia: 'thắng cố',
    thuc_hanh_di_san: 'Tri thức dân gian về ẩm thực truyền thống',
    vung_van_hoa: 'Vùng văn hóa Tây Bắc',
    dan_toc: "H'Mông",
    dia_danh_hien_nay: 'Bản Sin Suối Hồ, xã Sin Suối Hồ, huyện Phong Thổ, tỉnh Lai Châu',
    dia_danh_tai_thoi_diem_tu_lieu: 'Bản Sin Suối Hồ, xã Sin Suối Hồ, huyện Phong Thổ, tỉnh Lai Châu',
    mo_ta: 'Thắng cố ngựa nấu trong chảo gang lớn đun trên bếp củi...',
    boi_canh: 'Nấu từ rạng sáng phiên chợ thứ Bảy...',
    nguoi_cung_cap: 'Cháng A Páo',
    pham_vi_duoc_phep_su_dung: 'Nghiên cứu văn hóa',
    nguon_tu_lieu: 'Tư liệu điền dã 2024',
  },
  {
    id: 'test-2',
    ten_theo_danh_muc: 'Váy lanh thổ cẩm vẽ sáp ong H\'Mông Đen',
    ten_goi_ban_dia: 'Tiab / Tiab Hmoob',
    thuc_hanh_di_san: 'Nghề thủ công dệt lanh vẽ sáp ong',
    vung_van_hoa: 'Vùng văn hóa Tây Bắc',
    dan_toc: "H'Mông",
    dia_danh_hien_nay: 'Bản Sin Suối Hồ, xã Sin Suối Hồ, huyện Phong Thổ, tỉnh Lai Châu',
    dia_danh_tai_thoi_diem_tu_lieu: 'Bản Sin Suối Hồ, xã Sin Suối Hồ, huyện Phong Thổ, tỉnh Lai Châu',
    mo_ta: 'Vải lanh tự nhiên vẽ họa tiết sáp ong...',
    boi_canh: 'Mặc đi chợ phiên thứ Bảy...',
    nguoi_cung_cap: 'Vàng Thị Mai',
    pham_vi_duoc_phep_su_dung: 'Bảo tồn văn hóa',
    nguon_tu_lieu: 'Hồ sơ di sản',
  },
  {
    id: 'test-empty',
    ten_theo_danh_muc: '',
    ten_goi_ban_dia: '',
    thuc_hanh_di_san: '',
    vung_van_hoa: 'Vùng văn hóa Tây Bắc',
    dan_toc: "H'Mông",
    dia_danh_hien_nay: 'Xã Sin Suối Hồ, huyện Phong Thổ, tỉnh Lai Châu',
    dia_danh_tai_thoi_diem_tu_lieu: '',
    mo_ta: '',
    boi_canh: '',
    nguoi_cung_cap: '',
    pham_vi_duoc_phep_su_dung: '',
    nguon_tu_lieu: '',
  },
];

test('getCategoryFromItem identifies cuisine and attire correctly', () => {
  assert.equal(getCategoryFromItem(sampleItems[0]), 'am_thuc');
  assert.equal(getCategoryFromItem(sampleItems[1]), 'trang_phuc');
});

test('filterHeritageItems filters by search keyword case-insensitively', () => {
  const resultThangCo = filterHeritageItems(sampleItems, 'thắng cố');
  assert.equal(resultThangCo.length, 1);
  assert.equal(resultThangCo[0].id, 'test-1');

  const resultLocalName = filterHeritageItems(sampleItems, 'thắng cố');
  assert.equal(resultLocalName.length, 1);
  assert.equal(resultLocalName[0].id, 'test-1');

  const resultInformant = filterHeritageItems(sampleItems, 'Vàng Thị Mai');
  assert.equal(resultInformant.length, 1);
  assert.equal(resultInformant[0].id, 'test-2');
});

test('filterHeritageItems skips empty template when query is empty', () => {
  const allResults = filterHeritageItems(sampleItems, '', 'all');
  assert.equal(allResults.length, 2);
  assert.ok(!allResults.some((i) => i.id === 'test-empty'));
});

test('filterHeritageItems filters by category', () => {
  const cuisineOnly = filterHeritageItems(sampleItems, '', 'am_thuc');
  assert.equal(cuisineOnly.length, 1);
  assert.equal(cuisineOnly[0].id, 'test-1');
});

test('createEmptyHeritageRecord returns proper skeleton', () => {
  const emptyRec = createEmptyHeritageRecord();
  assert.ok(emptyRec.id.startsWith('ds-'));
  assert.equal(emptyRec.dan_toc, "H'Mông");
  assert.equal(emptyRec.vung_van_hoa, 'Vùng văn hóa Tây Bắc');
});

test('getCategoryFromItem classifies real disan.json records accurately (ds-11 is nguoi_gin_giu)', async () => {
  const { default: disanData } = await import('../data/disan.json');
  const byId = new Map((disanData as HeritageItem[]).map((item) => [item.id, item]));

  assert.equal(getCategoryFromItem(byId.get('ds-01')!), 'khong_gian');
  assert.equal(getCategoryFromItem(byId.get('ds-02')!), 'am_thuc');
  assert.equal(getCategoryFromItem(byId.get('ds-03')!), 'am_thuc');
  assert.equal(getCategoryFromItem(byId.get('ds-04')!), 'am_thuc');
  assert.equal(getCategoryFromItem(byId.get('ds-05')!), 'am_thuc');
  assert.equal(getCategoryFromItem(byId.get('ds-06')!), 'trang_phuc');
  assert.equal(getCategoryFromItem(byId.get('ds-07')!), 'nghe_thuat');
  assert.equal(getCategoryFromItem(byId.get('ds-08')!), 'nghe_thuat');
  assert.equal(getCategoryFromItem(byId.get('ds-09')!), 'nghe_thuat');
  assert.equal(getCategoryFromItem(byId.get('ds-10')!), 'nghe_thuat');
  assert.equal(getCategoryFromItem(byId.get('ds-11')!), 'nguoi_gin_giu');
  assert.equal(getCategoryFromItem(byId.get('ds-12')!), 'trang_phuc');
});
