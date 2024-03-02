import { ArticleFavorited } from 'src/article_favorited/article-favourited.entity';
import { User } from 'src/auth/user.entity';
import { Comment } from 'src/comments/comment.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Tag } from '../tag/tag.entity';

@Unique(['slug'])
@Entity('article')
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ default: '' }) // Initialize taglist as an empty string
  taglist: string;

  @Column()
  favouritesCount: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Tag, (tag) => tag.article)
  tags: Tag[];

  @ManyToOne(() => User, (user) => user.articles)
  user: User;

  @OneToMany(() => ArticleFavorited, (favorited) => favorited.article)
  favoritedBy: ArticleFavorited[];

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  @Column()
  userId: number;

  @Column()
  articleId: number;
}
