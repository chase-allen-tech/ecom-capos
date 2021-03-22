export interface IOrder{
    billNo:number;
    supplier: string;
    phone: string;
    dateTime: string;
    totalProducts: number;
    totalAmount: number;
    paidStatus: string;
}