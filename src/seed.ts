import { createConnection } from 'typeorm';
import 'reflect-metadata';
import { User } from './entity/User';
import { Post } from './entity/Post';
import { Comment } from './entity/Comment';

createConnection()
  .then(async (connection) => {
    const { manager } = connection;
    const user = new User();
    user.username = 'sean';
    user.passwordDigest = '123xxx456';
    await manager.save(user);
    const post = new Post();
    post.title = 'Post1';
    post.content = '我的第一篇博客';
    post.author = user;
    await manager.save(post);
    const comment = new Comment();
    comment.user = user;
    comment.post = post;
    comment.content = '点赞';
    await manager.save(comment);
    connection.close();
  })
  .catch((error) => console.log(error));
