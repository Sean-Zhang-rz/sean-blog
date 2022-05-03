import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { withSession } from 'lib/withSession';
import { NextApiHandler } from 'next';
import { SignIn } from 'src/model/SignIn';

const Seesions: NextApiHandler = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.session);

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
    res.write(JSON.stringify(signIn.user));
  }
  res.end();
};

// withSession 类似于一个中间件
export default withSession(Seesions);
