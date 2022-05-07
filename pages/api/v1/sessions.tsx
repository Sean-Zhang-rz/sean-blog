import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { withSession } from 'lib/withSession';
import { NextApiHandler } from 'next';
import { SignIn } from 'src/model/SignIn';
import { successResponse } from 'utils/response';

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
    req.session.set('currentUser', signIn.user);
    await req.session.save();
    res.statusCode = 200;
    res.json(successResponse());
  }
  res.end();
};

// withSession 类似于一个中间件
export default withSession(Seesions);
