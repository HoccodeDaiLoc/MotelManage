import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Container from "typedi";
import { AccountService } from "../service/AccountService";
import { AppError } from "../errors/AppError";

const userService = Container.get(AccountService);

declare global {
  namespace Express {
    interface Request {
      payload?: any;
    }
  }
}

export const authAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.payload.role == 1 || req.payload.role == 0) {
      const searchConditions = {
        id: req.payload.userId,
      };
      const role = (await userService.findOneAccount(searchConditions))?.isAdmin;
      if (role == req.payload.role) {
        return next();
      }
    }
    return res.status(403).send("No permission!");
  } catch (err) {
    return res.send(err);
  }
};

export const auth = (req: Request, res: Response, next: NextFunction): any => {
  let token: string | undefined;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1] as string;
  }
  // } else if (req.cookies.jwt) {
  //   token = req.cookies.jwt as string;
  // }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }
  let secretKey = process.env.JWT_SECRET_KEY as string;

  try {
    const credential: string | object = jwt.verify(token as string, secretKey);
    if (credential) {
      req.payload = credential;
      return next();
    }
    return next(new AppError("Token invalid", 401));
  } catch (err: any) {
    console.log("lỗi");
    next(err);
  }
};
