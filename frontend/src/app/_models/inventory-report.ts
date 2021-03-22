export interface IInventoryReport{
    product: string;
    outlet: string;
    currentStock: number;
    stockValue: number;
    itemValue: number;
    reorderPoint: number;
    reorderAmount: number;
}