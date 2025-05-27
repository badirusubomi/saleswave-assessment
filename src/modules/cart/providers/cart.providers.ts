import { CartSchema } from 'libs/database/schemas/cart.schema';

export const cartProviders = [
  {
    provide: 'CART_MODEL',
    useFactory: (connection) => connection.model('cart', CartSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
