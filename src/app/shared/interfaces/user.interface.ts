export interface UserInterface {
    id: number | string;
    name: string;
    email: string;
    login: string;
    roles?: Array<number>;
}
