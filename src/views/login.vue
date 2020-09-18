<template>
    <div class="login-wrapper">
        <div class="login-box">
            <div class="login-title">{{loginTitle}}</div>
            <Form ref="formList" :model="loginForm" :rules="loginRules">
                <FormItem prop="username">
                    <Input type="text" v-model="loginForm.username" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="loginForm.password" placeholder="Password">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <div class="btn-wrapper">
                        <Button type="primary" @click="handleSubmit('formList')">登录</Button>
                        <Button @click="handleInit('formList')">重置</Button>
                        <Button @click="handleSet">注册</Button>
                    </div>
                </FormItem>
            </Form>
        </div>
        <Modal
            v-model="setModalStatus"
            :mask-closable="false"
            :closable="false"
            title="注册用户">
            <Form ref="setFormList" :model="setForm" :rules="loginSetRules">
                <FormItem prop="username">
                    <Input type="text" v-model="setForm.username" placeholder="用户名">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="username">
                    <Input type="text" v-model="setForm.realname" placeholder="真实姓名">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="setForm.password" placeholder="密码">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="handleSetCancel('setFormList')">取消</Button>
                <Button type="primary" @click="handleSetSubmit('setFormList')">确认</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { Message } from "view-design";
import { setLogin, checkLogin } from "../api/login";

export default {
    name: "Login",
    data() {
        return {
            setModalStatus: false,
            loginTitle: "node博客登录系统",
            loginForm: {
                username: "",
                password: ""
            },
            setForm: {
                username: "",
                realname: "",
                password: ""
            },
            loginRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            },
            loginSetRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                realname: [
                    { required: true, message: '请输入真实姓名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    const params = {
                        username: this.loginForm.username,
                        password: this.loginForm.password
                    };
                    checkLogin(params).then(res => {
                        localStorage.setItem("usernameTest", this.loginForm.username);
                        Message.success('登录成功');
                        this.$router.push({
                            path: "/"
                        });
                    }).catch(err => {
                        console.log(err);
                    });
                }
            })
        },
        handleInit(name) {
            this.loginForm.username = "";
            this.loginForm.password = "";
            this.$refs[name].resetFields();
        },
        handleSetSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    setLogin(this.setForm).then(res => {
                        Message.success('注册成功');
                        this.setModalStatus = false;
                    }).catch(err => {
                        console.log(err);
                    });
                }
            })
        },
        handleSetCancel(name) {
            this.setForm.username = "";
            this.setForm.realname = "";
            this.setForm.password = "";
            this.setModalStatus = false;
            this.$refs[name].resetFields();
        },
        handleSet() {
            this.setModalStatus = true;
        }
    }
};
</script>

<style lang="scss" scoped>
.login-wrapper {
    width: 100%;
    height: 100%;
    background: url("../assets/images/login.webp") no-repeat;
    background-position: 0px 0px;
    background-size: 100% 100%;
    position: fixed;
    .login-box {
        padding: 20px;
        width: 475px;
        border-radius: 20px;
        background: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .login-title {
            margin-bottom: 20px;
            font-size: 22px;
        }
    }
}
.btn-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    button:nth-child(2) {
        margin: 0  20px;
    }
}
</style>
