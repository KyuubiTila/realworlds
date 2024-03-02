import { User } from '../auth/user.entity';
import { CommentService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentController {
    private commentService;
    constructor(commentService: CommentService);
    createComment(user: User, articleId: number, createCommentDto: CreateCommentDto): Promise<import("./comment.entity").Comment>;
    getComment(id: number): Promise<import("./comment.entity").Comment>;
    getAllComments(): Promise<import("./comment.entity").Comment[]>;
    updateComment(id: number, updateCommentDto: UpdateCommentDto): Promise<import("./comment.entity").Comment>;
    deleteComment(id: number): Promise<void>;
    getArticleCommentsById(articleId: number): Promise<import("./comment.entity").Comment[] | {
        error: any;
    }>;
}
