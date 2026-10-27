import {Router} from "express";
import * as US from "./user.service.js";
import { authentication } from "../../common/middleware/authentication.js";
import { authorization } from "../../common/middleware/authorization.js";
import { RoleEnum } from "../../common/enum/user.enum.js";
import { validation } from "../../common/middleware/validation.js";
import { signupScehema } from "./user.validation.js";
import { signinScehema } from "./user.validation.js";
import { multerLocal } from "../../common/middleware/multer.js";
import { refreshTokenSchema } from "./user.validation.js";
import { shareProfileSchema } from "./user.validation.js";
import { updateProfileSchema } from "./user.validation.js";
import { updatePasswordSchema } from "./user.validation.js";
import { confirmEmailSchema } from "./user.validation.js";
import { resetPasswordSchema } from "./user.validation.js";
import messageRouter from "../messages/message.controller.js";





const userRouter = Router({strict: true,caseSensitive: true});
userRouter.use("/:userId/messages",messageRouter);



userRouter.post(
  "/signup",
  multerLocal({
    customPath: "admins",
    customTypes: ["image/jpeg", "image/png", "image/jpg"],
  }).fields([
    { name: "attachments", maxCount: 2 },
    { name: "attachment", maxCount: 1 },
  ]),
  validation(signupScehema),
  US.signup,
);
userRouter.post("/signup/gmail", US.signupGmail);
userRouter.post("/signin",validation(signinScehema), US.signin);
userRouter.get("/profile",authentication,authorization(Object.values(RoleEnum)), US.getprofile);
userRouter.post("/refresh-token",validation(refreshTokenSchema), US.refreshToken)
userRouter.get("/share-profile/:id",validation(shareProfileSchema), US.shareProfile)
userRouter.patch("/update-profile",validation(updateProfileSchema),authentication,  US.updateProfile)
userRouter.patch("/update-password",validation(updatePasswordSchema),authentication, US.updatePassword)
userRouter.patch("/logout",authentication, US.logout)
userRouter.patch("/confirm-email",validation(confirmEmailSchema),US.confirmEmail)
userRouter.patch("/resend-otp",US.reSendOtp)
userRouter.patch("/forgot-password",US.forgotPassword)
userRouter.patch("/reset-password",validation(resetPasswordSchema),US.resetPassword)
;


export default userRouter;
