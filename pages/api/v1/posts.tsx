import { NextApiHandler } from 'next';
import { Post } from 'src/entity/Post';
import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { withSession } from 'lib/withSession';
import { successResponse } from 'utils/response';

const Posts: NextApiHandler = withSession(async (req, res) => {
  if (req.method === 'POST') {
    const { title, content } = req.body;
    const user = req.session.get('currentUser');
    if (!user) {
      res.statusCode = 401;
      res.end();
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    const post = new Post();
    post.title = title;
    post.content = content;
    res.statusCode = 200;
    post.author = user;
    const connection = await getDatabaseConnection();
    await connection.manager.save(post);
    res.json(successResponse());
  }
  res.end();
});

export default Posts;
