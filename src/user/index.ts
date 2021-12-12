import { DB, SearchBuilder } from 'query-core';
import { User, UserFilter, userModel, UserService } from './user';
import { UserController } from './user-controller';
export * from './user';
export { UserController };

import { SqlUserService } from './sql-user-service';

export function useUser(db: DB): UserService {
  const builder = new SearchBuilder<User, UserFilter>(db.query, 'users', userModel.attributes, db.driver);
  return new SqlUserService(builder.search, db);
}
export function useUserController(log: (msg: string) => void, db: DB): UserController {
  return new UserController(log, useUser(db));
}
