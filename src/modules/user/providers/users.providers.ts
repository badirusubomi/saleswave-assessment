import { UserSchema } from 'libs';

export const userProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection) => connection.model('user', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
