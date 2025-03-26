export interface SportingEventCreateInterface {
    title: string;
    description: string;
    imgUrl: string;
}

export interface SportingEventInterface extends SportingEventCreateInterface {
    id: string;
}
