export interface UserInterface {
    id: number | string;
    name: string;
    surname: string;
    roles: Array<number>;
    login: string;
    pass: string;
}