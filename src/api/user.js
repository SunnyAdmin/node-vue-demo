import { get } from "./axios";

// 获取列表
const userList = get("/api/user/list");

export {
    userList
};
