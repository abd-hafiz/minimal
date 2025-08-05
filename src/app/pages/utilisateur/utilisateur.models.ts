export interface Utilisateur {
    id?: number;
    username: string;
    password: string;
    enabled: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    role: string;
}