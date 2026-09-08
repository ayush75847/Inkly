import { Client, Account, ID } from "appwrite";
import config from "../config/config";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });

      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession({
        email: email,
        password: password,
      });

      return session;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const account = await this.account.get();
      if (account) return account;
      else return null;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
