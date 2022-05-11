import Request, { api } from 'utils/request';
import PostProps from './types/post';

class PostApi extends Request {
  async postsNew(data: { post: PostProps; id?: number }): Promise<{}> {
    return this.post<{}>(api, {
      action: 'posts',
      ...data,
    }).then((r) => r.data);
  }

  async deletePost(data: { id: number }): Promise<{}> {
    return this.post<{}>(api, {
      action: `deletePosts`,
      ...data,
    }).then((r) => r.data);
  }
}

const postApi = new PostApi();
export default postApi;
