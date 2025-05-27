import { GrocerySchema } from 'libs/database';

export const groceryProviders = [
  {
    provide: 'GROCERY_MODEL',
    useFactory: (connection) => connection.model('grocery', GrocerySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
