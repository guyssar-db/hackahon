export interface UserWithRole {
    id: string;
    email: string;
    name?: string;
    role: 'user' | 'admin' | 'organize';
}
