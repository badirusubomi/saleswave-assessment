import { GrocerySchema } from '..';

export const groceryProviders = [
  {
    provide: 'GROCERY_MODEL',
    useFactory: (connection) => connection.model('grocery', GrocerySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
