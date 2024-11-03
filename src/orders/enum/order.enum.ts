export enum OrderStatus {
    PENDING = "PENDING",
    DELIVERY = "DELIVERY",
    CANCEL = "CANCEL",
}

export const OrderStatusList = [
    OrderStatus.CANCEL,
    OrderStatus.DELIVERY,
    OrderStatus.PENDING,
]