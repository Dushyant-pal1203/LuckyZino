export interface User {
  id: string;
  email: string;
  nickName?: string;
  avatar?: string;
  status: 'CREATED' | 'CONFIRMED' | 'SUSPENDED' | 'DELETED';
}
