
import React from 'react';

export const NATURE_CODES = [
  { code: 'A', name: '建築設計', order: 1 },
  { code: 'C', name: '變更設計', order: 2 },
  { code: 'U', name: '變更使用', order: 3 },
  { code: 'E', name: '室內裝修', order: 4 },
  { code: 'S', name: '公安檢查申報', order: 5 },
  { code: 'D', name: '拆除執照', order: 6 },
  { code: 'P', name: '公共工程', order: 7 },
  { code: 'L', name: '建築線', order: 8 },
  { code: 'B', name: '基地調整', order: 9 },
  { code: 'O', name: '其他', order: 10 },
];

export const STUDIO_CODES = [
  { label: '如果', code: '-' },
  { label: '樂果', code: 'L-' },
  { label: '成果', code: 'C-' },
];

export const PRODUCT_TYPES = ['H2透天', 'C1工廠', 'R2集合住宅', 'B2商辦', '其他'];

export const STATUS_PROGRESS: Record<string, number> = {
  '預備報價': 5,
  '報價審查': 10,
  '簽約': 20,
  '規劃中': 35,
  '建照前期': 50,
  '建照審查': 65,
  '施工中': 80,
  '結構體完成': 90,
  '請使照': 95,
  '結案': 100,
  '流案': 0
};
