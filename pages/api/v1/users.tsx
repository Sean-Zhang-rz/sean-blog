import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { NextApiHandler } from 'next';
import { User } from 'src/entity/User';
import { errorResponse, successResponse } from 'utils/response';

const Users: NextApiHandler = async (req, res) => {
  const { username, password, passwordConfirmation } = req.body;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  const connection = await getDatabaseConnection();
  const user = new User();
  user.username = username.trim();
  user.password = password;
  user.passwordConfirmation = passwordConfirmation;
  await user.validate();

  if (user.hasErrors()) {
    res.statusCode = 422;
    console.log(JSON.stringify(user.errors));
    // res.json(errorResponse({ msg: JSON.stringify(user.errors) }));
    res.write(JSON.stringify(user.errors));
  } else {
    await connection.manager.save(user);
    res.statusCode = 200;
    // res.write(JSON.stringify(user));
    res.json(successResponse());
  }
  res.end();
};

export default Users;
