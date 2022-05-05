import { NextApiHandler } from 'next';
import getPosts from 'lib/posts';
import { Post } from 'src/entity/Post';
import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { withSession } from 'lib/withSession';

const Posts: NextApiHandler = withSession(async (req, res) => {
  if (req.method === 'POST') {
    const { title, content } = req.body;
    const post = new Post();
    post.title = title;
    post.content = content;

    const user = req.session.get('currentUser');
    console.log('user');
    console.log(user);
    post.author = user;
    const connection = await getDatabaseConnection();
    await connection.manager.save(post);
    res.json(post);
  }
  // const posts = await getPosts();
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'application/json');
  // res.write(JSON.stringify(posts));
  res.end();
});

export default Posts;
