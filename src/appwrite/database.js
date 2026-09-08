import { Client, ID, Query, TablesDB } from "appwrite";
import config from "../config/config";

class DatabaseService {
  client = new Client();
  tablesDB;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.tablesDB = new TablesDB(this.client);
  }

  async createPost({ title, content, featuredImage, status, userId }) {
    try {
      const post = await this.tablesDB.createRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCollectionId,
        rowId: ID.unique(),
        data: {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      });

      if (post) return post;
      else return null;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(postId, { title, content, featuredImage, status }) {
    try {
      const post = await this.tablesDB.updateRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCollectionId,
        rowId: postId,
        data: {
          title,
          content,
          featuredImage,
          status,
        },
      });

      if (post) return post;
      else return null;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(postId) {
    try {
      const res = await this.tablesDB.deleteRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCollectionId,
        rowId: postId,
      });
      if (res) return true;
      else return false;
    } catch (error) {
      throw error;
    }
  }

  async getPost(postId) {
    try {
      const post = await this.tablesDB.getRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCollectionId,
        rowId: postId,
      });
      if (post) return post;
      else return null;
    } catch (error) {
      throw error;
    }
  }

  async getPosts() {
    try {
      const posts = await this.tablesDB.listRows({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCollectionId,
        queries: [Query.equal("status", ["active"])],
      });
      if (posts) return posts.rows;
      else return null;
    } catch (error) {
      throw error;
    }
  }
}

const dbService = new DatabaseService();

export default dbService;
