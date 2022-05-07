import { NextApiHandler } from 'next';
import { Post } from 'src/entity/Post';
import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { withSession } from 'lib/withSession';
import { successResponse, unauthorisedResponse } from 'utils/response';
import commonCheck from './common';

const Posts: NextApiHandler = withSession(async (req, res) => {
  if (req.method === 'POST') {
    const flag = await commonCheck({ req, res });
    if (flag) {
      const { title, content } = req.body;
      const user = req.session.get('currentUser');
      const post = new Post();
      post.title = title;
      post.content = content;
      res.statusCode = 200;
      post.author = user;
      const connection = await getDatabaseConnection();
      await connection.manager.save(post);
      res.json(successResponse());
    }
  }
  res.end();
});

export default Posts;
