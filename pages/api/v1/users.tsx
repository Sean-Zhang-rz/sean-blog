import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import md5 from 'md5';
import { NextApiHandler } from 'next';
import { User } from 'src/entity/User';

const Posts: NextApiHandler = async (req, res) => {
  console.log(req.body);
  const { username, password, passwordConfirmation } = req.body;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const errors = {
    username: [] as string[],
    password: [] as string[],
    passwordConfirmation: [] as string[],
  };

  if (username.trim() === '') errors.username.push('不能为空');
  if (!/[a-zA-Z0-9]/.test(username.trim())) errors.username.push('用户名格式不合法');
  if (username.trim().length > 42) errors.username.push('用户名太长了');
  if (username.trim().length < 4) errors.username.push('用户名太短了');
  if (password === '') errors.password.push('密码不能为空');
  if (password !== passwordConfirmation) errors.passwordConfirmation.push('密码不匹配');
  const hasError = Object.values(errors).find((v) => v.length > 0);
  if (hasError) {
    res.statusCode = 422;
    res.write(JSON.stringify(errors));
  } else {
    const connection = await getDatabaseConnection();
    const user = new User();
    user.username = username.trim();
    user.passwordDigest = md5(password);
    await connection.manager.save(user);
    res.statusCode = 200;
    res.write(JSON.stringify(user));
  }
  res.end();
  // Object.assign(user, req.body);

  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'application/json');
  res.end();
};

export default Posts;
