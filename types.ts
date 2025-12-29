
export enum UserRole {
  ADMIN = 'ADMIN', // 建築師
  MANAGER = 'MANAGER', // 經理
  DESIGNER = 'DESIGNER', // 設計師
  VIEWER = 'VIEWER' // 檢視者
}

export enum ProjectStatus {
  QUOTING = '預備報價',
  QUOTE_REVIEW = '報價審查',
  CONTRACTING = '簽約',
  PLANNING = '規劃中',
  PRE_PERMIT = '建照前期',
  PERMIT_REVIEW = '建照審查',
  CONSTRUCTION = '施工中',
  STRUCTURE_COMPLETE = '結構體完成',
  OCCUPANCY_PERMIT = '請使照',
  CLOSED = '結案',
  DROPPED = '流案'
}

export interface Project {
  id: string;
  projectCode: string;
  name: string;
  client: string;
  caseName: string;
  location: string;
  productType: string;
  natures: string[]; // A, C, U, E, etc.
  studioCode: string; // '-', 'L-', 'C-'
  year: number;
  serial: number;
  status: ProjectStatus;
  progress: number; // 0-100
  createdAt: string;
}

export interface Client {
  id: string;
  companyName: string;
  taxId: string;
  contacts: Contact[];
  paymentHabit: string;
}

export interface Contact {
  name: string;
  title: string;
  phone: string;
  email: string;
}

export interface Quotation {
  id: string;
  projectId: string;
  projectCode: string;
  status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';
  printNo: number;
  items: QuotationItem[];
  totalAmount: number;
  notes: string;
  bankInfo: string;
  approvedBy?: string;
}

export interface QuotationItem {
  phase: string;
  percentage: number;
  amount: number;
  condition: string;
}
