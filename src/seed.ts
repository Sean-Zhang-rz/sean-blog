import { createConnection } from 'typeorm';
import 'reflect-metadata';
import { User } from './entity/User';

createConnection()
  .then(async (connection) => {
    const { manager } = connection;
    const user = new User();
  })
  .catch((error) => console.log(error));
