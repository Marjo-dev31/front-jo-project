export interface OfferCreateInterface {
    title: string;
    description: string;
    price: number;
    numberOfSales: number;
    imgUrl: string;
}

export interface OfferInterface extends OfferCreateInterface {
    id: string;
}
