import {Schema, model, Types, Document} from 'mongoose';
import {Item, ItemSchema} from './item.model';
import {OrderStatus} from '../constants/order_status';

export interface OrderItem {
    item: Item;
    price: number;
    quantity: number;
}

export const OrderItemSchema = new Schema<OrderItem>({
    item: {type: ItemSchema, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
});

export interface Order extends Document {
    id: number;
    name: string;
    address: string;
    paymentId: string;
    totalPrice: number;
    items: OrderItem[];
    // addressLatLng?: LatLng;
    status: OrderStatus;
    user: Types.ObjectId; // foreign key user id
    createdAt: Date;
    updatedAt: Date;
}

export const OrderSchema = new Schema<Order>({
    name: {type: String, required: true},
    address: {type: String, required: true},
    paymentId: {type: String, required: false},
    totalPrice: {type: Number, required: true},
    items: {type: [OrderItemSchema], required: true},
    status: {type: String, default: OrderStatus.NEW},
    user: {type: Schema.Types.ObjectId, required: true},
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true,
});

export const OrderModel = model<Order>('order', OrderSchema);
