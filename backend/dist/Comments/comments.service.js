"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Comment_entity_1 = require("./Comment.entity");
let CommentsService = class CommentsService {
    constructor(commentsRepository) {
        this.commentsRepository = commentsRepository;
    }
    async createOrUpdate(userId, createCommentDto) {
        let comment = await this.commentsRepository.findOne({ where: { user: { id: userId } } });
        if (comment) {
            comment.content = createCommentDto.content;
        }
        else {
            comment = this.commentsRepository.create({
                user: { id: userId },
                content: createCommentDto.content,
            });
        }
        return this.commentsRepository.save(comment);
    }
    async getCommentByUserId(userId) {
        return this.commentsRepository.findOne({ where: { user: { id: userId } }, relations: ['user'] });
    }
    async getAllComments() {
        return this.commentsRepository.find({ relations: ['user'], order: { createdAt: 'DESC' } });
    }
    async reactToComment(commentId, userId, reactionDto) {
        const comment = await this.commentsRepository.findOne({ where: { id: commentId } });
        if (!comment)
            throw new common_1.NotFoundException('Comentário não encontrado');
        if (reactionDto.type === 'like') {
            comment.likes += 1;
        }
        else {
            comment.dislikes += 1;
        }
        return this.commentsRepository.save(comment);
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CommentsService);
//# sourceMappingURL=comments.service.js.map