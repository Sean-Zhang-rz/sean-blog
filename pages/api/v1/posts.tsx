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
      console.log(req.body);

      const {
        id,
        post: { title, content },
      } = req.body;
      const user = req.session.get('currentUser');
      const connection = await getDatabaseConnection();
      let post;
      if (id) {
        post = await connection.manager.findOne<Post>('Post', id);
      } else {
        post = new Post();
        post.author = user;
      }
      post.title = title;
      post.content = content;
      res.statusCode = 200;
      await connection.manager.save(post);
      res.json(successResponse());
    }
  }
  res.end();
});

export default Posts;
