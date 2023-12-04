import { Profile } from 'src/profile/profile.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Tag } from './tag.entity';

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

  @ManyToOne(() => Profile, (profile) => profile.articles)
  user: Profile;

  @Column()
  userId: number;
}
