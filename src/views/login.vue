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
                    </div>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            loginTitle: "node博客登录系统",
            loginForm: {
                username: "",
                password: ""
            },
            loginRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
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
                    this.$Message.success('登录成功');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleInit(name) {
            this.loginForm.username = "";
            this.loginForm.password = "";
            this.$refs[name].resetFields();
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
    button:first-child {
        margin-right: 20px;
    }
}
</style>
