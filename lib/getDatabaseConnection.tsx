import { createConnection, getConnectionManager } from 'typeorm';

const promise = (async function () {
  const manager = getConnectionManager();
  const hasConnection = manager.has('default');
  if (!hasConnection) return createConnection();
  const current = manager.get('default');
  if (current.isConnected) return current;
  return createConnection();
})();

export const getDatabaseConnection = async () => {
  return promise;
};
