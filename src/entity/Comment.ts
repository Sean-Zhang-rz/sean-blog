import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  content: string;

  @CreateDateColumn('time')
  createdAt: Date;

  @UpdateDateColumn('time')
  updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.comments)
  user: User;

  @ManyToOne((type) => Post, (post) => post.comments)
  posts: Post;
}
