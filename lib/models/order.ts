export interface Items {
    [item: string]: number;
}

export interface Order {
    orderNumber: number;
    customerName: string;
    items: Items,
    totalCost: number;
}