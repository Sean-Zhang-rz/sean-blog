import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import md5 from 'md5';
import { NextApiHandler } from 'next';
import { User } from 'src/entity/User';
import { SignIn } from 'src/model/SignIn';

const Seesions: NextApiHandler = async (req, res) => {
  const { username, password } = req.body;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  const connection = await getDatabaseConnection();
  const signIn = new SignIn();
  signIn.username = username;
  signIn.password = password;
  await signIn.validate();
  if (signIn.hasErrors()) {
    res.statusCode = 422;
    res.write(JSON.stringify(signIn.errors));
  } else {
    res.statusCode = 200;
    res.write(JSON.stringify(signIn.user));
  }
  res.end();
};

export default Seesions;
