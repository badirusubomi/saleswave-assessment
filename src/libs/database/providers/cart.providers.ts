import { CartSchema } from 'libs';

export const cartProviders = [
  {
    provide: 'CART_MODEL',
    useFactory: (connection) => connection.model('cart', CartSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
