export interface AuthResponse {
  userId: string;
  fullName: string;
  email: string;
  companyName: string;
  role: 'Client' | 'Admin';
  token: string;
}

export interface ProjectFile {
  id: string;
  fileName: string;
  contentType: string;
  fileSizeBytes: number;
  isClientUpload: boolean;
  category: string;
  uploadedAt: string;
  downloadUrl: string;
}

export interface ProjectMessage {
  id: string;
  senderId: string;
  senderName: string;
  isStaff: boolean;
  messageText: string;
  sentAt: string;
}

export interface ProjectOrder {
  id: string;
  orderNumber: string;
  title: string;
  description: string;
  material: string;
  quantity: number;
  tolerances: string;
  targetDeadline?: string;
  quotedPrice?: number;
  status: 'Received' | 'InReview' | 'InProduction' | 'QualityCheck' | 'Shipped' | 'Completed';
  createdAt: string;
  updatedAt: string;
  clientId: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  files: ProjectFile[];
  messages: ProjectMessage[];
}

export interface DashboardMetrics {
  totalProjects: number;
  inReview: number;
  inProduction: number;
  completed: number;
  totalValueQuoted: number;
}
