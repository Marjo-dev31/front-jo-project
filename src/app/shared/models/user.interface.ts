export interface UserCreateInterface {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
}

export interface UserInterface extends UserCreateInterface {
    id: string;
    isAdmin: boolean;
    privateKey: string;
}
