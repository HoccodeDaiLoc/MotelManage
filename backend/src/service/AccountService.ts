import { Inject, Service } from "typedi";
import { IAccountService } from "./Interfaces/IAccountService";
import { AccountRepository } from "../repository/AccountRepository";
import { IAccountRepository } from "../repository/Interfaces/IAccountRepository";
import { Account } from "../models/Account";

import { RenterRepository } from "../repository/RenterRepository";
import { IRenterRepository } from "../repository/Interfaces/IRenterRepository";
import { Renter } from "../models/Renter";
import { AppError } from "../errors/AppError";
import Authentication from "../utils/Authentication";
import EmailService from "../utils/Email";

@Service()
export class AccountService implements IAccountService {
  @Inject(() => AccountRepository)
  accountRepository!: IAccountRepository;

  @Inject(() => RenterRepository)
  renterRepository!: IRenterRepository;

  async addAccount(
    username: string,
    password: string,
    email: string
  ): Promise<Account> {
    try {
      const hash_password = await Authentication.passwordHash(password);
      const renterExist = await this.renterRepository.getRenterByEmail(email);
      let newRenter: Renter;
      let renterId;
      if (!renterExist) {
        newRenter = await this.renterRepository.createRenter(
          undefined,
          undefined,
          undefined,
          undefined,
          email,
          undefined
        );
        renterId = newRenter.renterId;
      } else {
        renterId = renterExist.renterId;
      }
      const newAccount = await this.accountRepository.createAccount(
        username,
        hash_password,
        renterId
      );
      return newAccount;
    } catch (err) {
      throw err;
    }
  }

  async findOneAccount(searchConditions: any): Promise<Account | null> {
    try {
      return await this.accountRepository.getOneAccount(searchConditions);
    } catch (err) {
      throw err;
    }
  }

  async login(username: string, password: string): Promise<any> {
    try {
      const user = await this.accountRepository.getOneAccount({ username });
      if (!user) {
        throw new AppError("username or password invalid", 404);
      }
      const accessToken = Authentication.generateAccessToken(
        user.id,
        +user.isAdmin,
        user.username
      );
      const refeshToken = Authentication.generateRefreshToken(user.username);
      return { user, accessToken, refeshToken };
    } catch (err) {
      throw err;
    }
  }

  async updatePassword(
    userId: number,
    passwordCurrent: string,
    password: string
  ): Promise<any> {
    try {
      const searchConditions = {
        id: userId,
      };
      const user = await this.accountRepository.getOneAccount(searchConditions);
      if (!user) {
        throw new AppError("Bad request!", 401);
      }
      if (
        await !Authentication.passwordCompare(passwordCurrent, user.password)
      ) {
        throw new AppError("wrong old password", 401);
      }
      const hash_password = await Authentication.passwordHash(password);
      await this.accountRepository.updateAccountById(userId, {
        hash_password,
        password_change_at: Date.now,
      });
      const refeshToken = await Authentication.generateRefreshToken(
        user.username
      );
      const accessToken = await Authentication.generateAccessToken(
        user.id,
        +user.isAdmin,
        user.username
      );
      return { refeshToken, accessToken };
    } catch (err) {
      throw err;
    }
  }

  getAccessTokenByRefreshToken = async (refreshToken: string) => {
    try {
      const payload = Authentication.validateToken(refreshToken);
      if (!payload) {
        return "";
      }
      const searchConditions = {
        username: payload.username,
      };
      const user = await this.accountRepository.getOneAccount(searchConditions);
      if (user) {
        return {
          accessToken: Authentication.generateAccessToken(
            user.id,
            +user.isAdmin,
            user.username
          ),
        };
      } else {
        return "";
      }
    } catch (error: any) {
      throw error;
    }
  };

  async forgotPassword(email: string): Promise<void> {
    try {
      const renter = await this.renterRepository.getRenterByEmail(email);
      if (!renter) {
        throw new AppError("Không tìm thấy người dùng", 404);
      }
      const account = await this.accountRepository.getOneAccount({
        renterId: renter.renterId,
      });
      if (!account) {
        throw new AppError("Không tìm thấy người dùng", 404);
      }
      const resetToken = Authentication.generateResetToken();
      const currentTime = new Date();
      const passwordResetExpires = new Date(currentTime.getTime() + 10 * 60000);
      await this.accountRepository.updateAccountById(account.id, {
        passwordResetToken: resetToken,
        passwordResetExpires: passwordResetExpires,
      });
      const subject = "Mã khôi phục tài khoản của bạn";
      const text = `Đây là mã khôi phục mật khẩu tài khoản của bạn: ${resetToken}. Có hiệu lực trong vòng 10 phút`;
      await EmailService.getInstance().sendMail(email, subject, text);
    } catch (err) {
      throw err;
    }
  }

  async resetPassword(
    email: string,
    token: string,
    newPassword: string
  ): Promise<void> {
    try {
      const renter = await this.renterRepository.getRenterByEmail(email);
      if (!renter) {
        throw new AppError("Không tìm thấy người dùng", 404);
      }
      const account = await this.accountRepository.getOneAccount({
        renterId: renter.renterId,
      });
      if (!account) {
        throw new AppError("Không tìm thấy người dùng", 404);
      }
      const passwordResetExpires = new Date(account.passwordResetExpires);
      if (
        account.passwordResetToken !== token ||
        new Date() > passwordResetExpires
      ) {
        throw new AppError(
          "Mã khôi phục mật khẩu không hợp lệ hoặc đã hết hạn",
          400
        );
      }
      const hashedPassword = await Authentication.passwordHash(newPassword);
      await this.accountRepository.updateAccountById(account.id, {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      });
    } catch (err) {
      throw err;
    }
  }
}
