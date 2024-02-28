import db from "../models/index";
import { Op } from "sequelize";

let postInfoBlog = (data , image) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
          !data.title ||
          !data.descriptionHTML ||
          !data.descriptionMarkdown ||
          !image ||
          !data.userId ||
          !data.topic
      ) {
          resolve({
              errCode: 1,
              errMessage: "missing data",
          });
      } else {
          let blog = await db.Blog.create({
              userId: data.userId,
              title: data.title,
              descriptionHTML: data.descriptionHTML,
              descriptionMarkdown: data.descriptionMarkdown,
              thumb: image.path,
              topic: data.topic,
              accept: 0,
          });
          resolve({
              errCode: 0,
              errMessage: "Create a blog success",
          });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getListBlog = (page, size , userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pageAsNumber = Number.parseInt(page);
      const sizeAsNumber = Number.parseInt(size);

      // let page = 0 ;
      if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber;
      }
      //let size = 10 ;
      if (
        !Number.isNaN(sizeAsNumber) &&
        sizeAsNumber > 0 &&
        sizeAsNumber < 10
      ) {
        size = sizeAsNumber;
      }

      const blog = await db.Blog.findAndCountAll({
          where: {
              userId: userId,
          },
          include: [
              {
                  model: db.User,
                  attributes: ["image", "firstName", "lastName"],
              },
          ],
          raw: true,
          nest: true,

          limit: size,
          offset: page * size,
          order: [["createdAt", "DESC"]],
      });
      resolve({
          data: blog.rows,
          totalPages: Math.ceil(blog.count / size),
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getAllBlogs = () => {
    return new Promise(async (resolve, reject) => {
        try {
          let Blogs = await db.Blog.findAll({
              include: [
                  {
                      model: db.User,
                      attributes: ["image", "firstName", "lastName"],
                  },
              ],
              raw: true,
              nest: true,
          });
            resolve({
                errCode: 0,
                data: Blogs,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let handleDeleteBlog = (blogId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let blog = await db.Blog.findOne({
        where: { id: blogId },
      });
      if (!blog) {
        resolve({
          errCode: 2,
          errMessage: "the isnt exits",
        });
      }
      await db.Blog.destroy({
        where: { id: blogId },
      });
      resolve({
        errCode: 0,
        errMessage: "the blog id delete",
      });
    } catch (error) {
      reject(error);
    }
  });
};
let handleBlogDetails = (blogId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const blog = await db.Blog.findOne({
        where: { id: blogId },
        include: [
          {
            model: db.User,
            attributes: ["image", "firstName", "lastName"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve(blog);
    } catch (error) {
      reject(error);
    }
  });
};
let handleConfirmBlog = (blogId , value) => {
    return new Promise(async (resolve, reject) => {
        try {
            const blog = await db.Blog.findOne({
                where: { id: blogId },
                raw: false,
            });
          if (blog) {
            blog.accept = value;

           await blog.save();
            
           resolve({
               errCode: 0,
               errMessage: "Confirm is success",
           });
          }
        } catch (error) {
            reject(error);
        }
    });
};
let handleEditBlog = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "missing required param",
        });
      }
      let blog = await db.Blog.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (blog) {
        blog.title = data.title,
        blog.content = data.content,
        blog.thumb = data.thumb
 

        await blog.save();
        resolve({
          errCode: 0,
          errMessage: "update is success",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "do not is found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
    postInfoBlog,
    getListBlog,
    handleDeleteBlog,
    handleBlogDetails,
    handleEditBlog,
    getAllBlogs,
    handleConfirmBlog,
};
