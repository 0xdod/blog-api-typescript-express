"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createUser) {
        return this.prisma.user.create({
            data: createUser,
        });
    }
}
exports.UserRepository = UserRepository;
