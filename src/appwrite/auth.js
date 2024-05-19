import conf from "../config/config";
import { Client, Account, ID } from "appwrite";

class AuthService {
  client;
  account;
  constructor() {
    this.client = new Client.setEndpoint(conf.appWriteUrl).setProject(
      conf.appWriteProjectId
    );
    this.account = new Account(this.client);
  }

  /* The `createAccount` method in the `authService` class is an asynchronous function that takes an
object with `name`, `email`, and `password` properties as parameters. */

  createAccount = async ({ name, email, password }) => {
    try {
      let userData = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userData) {
        this.loginAccount(email, password);
      } else {
        return userData;
      }
    } catch (error) {
      throw ("AppWrite :: CreateAccount :: Error :: ", error);
    }
  };

  /**
   * The function `loginAccount` attempts to log in a user with the provided email and password, handling
   * any errors that may occur.
   * @param email - The `email` parameter is a string that represents the email address of the user
   * trying to log in.
   * @param password - The `password` parameter in the `loginAccount` function is a string that
   * represents the password input provided by the user for logging into their account.
   * @returns The `loginStatus` variable is being returned from the `loginAccount` method.
   */

  async loginAccount(email, password) {
    try {
      let loginStatus = await this.account.loginAccount(email, password);
      return loginStatus;
    } catch (error) {
      throw ("AppWrite :: Error :: LoginAccount :: ", error);
    }
  }

  /**
   * The `logoutAccount` function asynchronously deletes the session of the current account and handles
   * any errors that may occur.
   * @returns The `deleteSession()` method of the `account` object is being returned in the
   * `logoutAccount()` function.
   */
  async logoutAccount() {
    try {
      return await this.account.deleteSession();
    } catch (error) {
      throw ("AppWrite :: Error :: LogoutAccount :: ,", error);
    }
  }

  /**
   * The `getCurrentUser` function asynchronously retrieves the current user account information and
   * handles any errors that may occur.
   * @returns The `getCurrentUser` function is returning the result of calling `this.account.get()`,
   * which is likely the current user's account information.
   */

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw ("AppWrite :: Error :: LogoutAccount :: , ", error);
    }
  }

  //   async phoneVerification() {
  //     try {
  //       return this.account.createPhoneVerification();
  //     } catch (error) {
  //       throw ("AppWrite :: Error :: Phone Verification :: , ", error);
  //     }
  //   }
}

const authService = new AuthService();

export default authService;
