import { post } from "./axios";

// 注册
const setLogin = post("/api/user/set");

// 登录
const checkLogin = post("/api/user/login");

export {
    setLogin,
    checkLogin
};
