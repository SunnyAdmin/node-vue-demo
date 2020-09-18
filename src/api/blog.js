import { get, post } from "./axios";

// 获取列表
const blogList = get("/api/blog/list");

// 获取详情
const blogDetail = get("/api/blog/detail");

// 新建博客
const newBlog = post("/api/blog/new");

// 编辑博客
const updateBlog = post("/api/blog/update");

// 删除博客
const delBlog = post("/api/blog/del");

export {
    blogList,
    blogDetail,
    newBlog,
    delBlog,
    updateBlog
};
