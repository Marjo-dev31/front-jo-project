export interface loginUserInterface {
    email: string;
    password: string;
}

export interface UserCreateInterface extends loginUserInterface {
    firstname: string;
    lastname: string;
    username: string;
}

export interface UserInterface extends UserCreateInterface {
    id: string;
    isAdmin: boolean;
    privateKey: string;
}
export interface LoginResponse {
    access_token: string;
    user: UserInterface;
}
