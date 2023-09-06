import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { Express } from "express";
import { PostRepository } from "./post.repository";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { validateSchema } from "../utils/validator/validate";
import { createPostSchema } from "./schema/create-post.schema";
import passport from "passport";
import { editPostSchema } from "./schema/edit-post.schema";
import { getPostListSchema } from "./schema/get-post.schema";

export default (prisma: PrismaClient) => {
  const router = Router();

  const postRepo = new PostRepository(prisma);
  const postService = new PostService(postRepo);
  const postController = new PostController(postService);

  router.use(passport.authenticate("jwt", { session: false }));

  router.post("/", validateSchema(createPostSchema), async (req, res, next) => {
    try {
      await postController.create(req, res);
    } catch (err) {
      next(err);
    }
  });

  router.get(
    "/",
    validateSchema(getPostListSchema, "query"),
    async (req, res, next) => {
      try {
        await postController.getAll(req, res);
      } catch (err) {
        next(err);
      }
    }
  );

  router.get("/:slugOrId", async (req, res, next) => {
    try {
      await postController.getOne(req, res);
    } catch (err) {
      next(err);
    }
  });

  router.patch(
    "/:slugOrId",
    validateSchema(editPostSchema),
    async (req, res, next) => {
      try {
        await postController.edit(req, res);
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete("/:slugOrId", async (req, res, next) => {
    try {
      await postController.delete(req, res);
    } catch (err) {
      next(err);
    }
  });

  return router;
};
