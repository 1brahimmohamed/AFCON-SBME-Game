import userController from '../controllers/userController';
import authController from "../controllers/authController";
import { Router } from 'express';



const userRouter = Router();

userRouter.route("/")
            .get(authController.protect, authController.restrictTo('admin'), userController.getAllUsers)
            .post(authController.protect, authController.restrictTo('admin'), userController.createUser)

userRouter.route("/:id")
            .get(userController.getUser)
            .patch(authController.protect, authController.restrictTo('admin'), userController.updateUser)
            .delete(authController.protect, authController.restrictTo('admin'), userController.deleteUser)

export default userRouter;
