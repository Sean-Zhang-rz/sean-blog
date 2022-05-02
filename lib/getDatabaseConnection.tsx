import { createConnection, getConnectionManager } from 'typeorm';
import 'reflect-metadata';
import { Post } from 'src/entity/Post';
import { User } from 'src/entity/User';
import { Comment } from 'src/entity/Comment';
import config from 'ormconfig.json';

const create = async () => {
  // @ts-ignore
  return createConnection({
    ...config,
    entities: [Post, User, Comment],
  });
};

const promise = (async function () {
  const manager = getConnectionManager();
  const hasConnection = manager.has('default');
  if (!hasConnection) return create();
  const current = manager.get('default');
  if (current.isConnected) return current;
  return create();
})();

export const getDatabaseConnection = async () => {
  return promise;
};
