export interface UserInterface {
    uid: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    email: string;
    emailVerified: boolean;
    nickname?: string;
    picture?: string;
}
