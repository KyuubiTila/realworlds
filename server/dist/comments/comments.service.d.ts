import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from '../auth/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentService {
    private commentRepository;
    constructor(commentRepository: Repository<Comment>);
    createComment(user: User, articleId: number, createCommentDto: CreateCommentDto): Promise<Comment>;
    getCommentById(id: number): Promise<Comment>;
    getAllComments(): Promise<Comment[]>;
    updateComment(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment>;
    deleteComment(id: number): Promise<void>;
    getArticleCommentsById(articleId: number): Promise<Comment[]>;
}
