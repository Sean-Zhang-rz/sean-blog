import { NextApiHandler } from 'next';
import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { withSession } from 'lib/withSession';
import { errorResponse, successResponse } from 'utils/response';
import commonCheck from './common';
import { Post } from 'src/entity/Post';

const Posts: NextApiHandler = withSession(async (req, res) => {
  if (req.method === 'POST') {
    const flag = await commonCheck({ req, res });
    if (flag) {
      console.log(req.body);
      const { id } = req.body;
      const connection = await getDatabaseConnection();
      const deleteRes = await connection.manager.delete(Post, id);
      res.statusCode = 200;
      res.json(deleteRes.affected >= 0 ? successResponse() : errorResponse());
    }
  }
  res.end();
});

export default Posts;
