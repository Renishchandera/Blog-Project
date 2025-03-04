import conf from "../conf/conf.js";
import { Databases, Storage, ID, Client, Query } from "appwrite";

export class Service
{
    client;
    databases;
    bucket;

    constructor()
    {
        this.client = new Client()
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);

    }

    //post operations CRUD

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
           return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                   content,
                   featuredImage,
                   status,
                   userId,
                }
            )
        } catch (error) {
            console.log("appwrite service :: create post :: error", error);
            return false;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("appwrite service :: update post :: error", error);
            return false;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("appwrite service :: deletePost :: error ", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("appwrite service :: getPost :: error ", error);
            return false;
        }
    } 

    async getPosts(queries = [Query.equal("status", ["active"])]){
        try {
           return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("appwrite service :: getPosts :: error", error);
            return false;
        }
    }


    //File Upload methods 

    async uploadFile(file){
        try {
           return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file,
           )
        } catch (error) {
            console.log("appwrite service :: fileUpload :: error", error);
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true;
        } catch (error) {
            console.log("appwrite service :: deletePost :: error", error);
        }
    }

    getFilePreview(fileId)
    {
        try{
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId,
            )
        } catch (error) {
            console.log("appwrite service :: getFilePreview :: error", error);
        }
    }
}


const service = new Service();

export default service;