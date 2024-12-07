export interface Tag {
  id: string;
  name: string;
  category: 'position' | 'hobby' | 'other';
  color?: string;
}

export interface Member {
  id: string;
  name: string;
  imageUrl: string;
  introduction: string;
  tags: Tag[];
  isEditable: boolean;
  createdAt: string;
}

export interface MemberFormData {
  name: string;
  imageUrl: string;
  introduction: string;
  tags: Tag[];
  imageData?: string; // Base64形式の画像データ（オプショナル）
}
