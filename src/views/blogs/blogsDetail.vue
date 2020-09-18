<template>
    <div class="detail-wrapper">
        <Form ref="formValidate" :model="form" :rules="ruleValidate" :label-width="80">
            <FormItem label="标题" prop="title">
                <Input v-model="form.title" placeholder="请输入标题"></Input>
            </FormItem>
            <FormItem label="描述" prop="description">
                <Input
                    v-model="form.description"
                    type="textarea"
                    :autosize="{minRows: 2,maxRows: 5}"
                    placeholder="请输入博客描述"
                ></Input>
            </FormItem>
            <FormItem label="内容" prop="content">
                <Input
                    v-model="form.content"
                    type="textarea"
                    :autosize="{minRows: 2,maxRows: 10}"
                    placeholder="请输入博客内容"
                ></Input>
            </FormItem>
            <FormItem style="text-align: center;">
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                <Button @click="handleBack" style="margin-left: 8px">返回</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import { newBlog, blogDetail, updateBlog } from "../../api/blog";

export default {
    data() {
        return {
            form: {
                title: "",
                description: "",
                content: ""
            },
            ruleValidate: {
                title: [
                    {
                        required: true,
                        message: "请输入标题",
                        trigger: "blur"
                    }
                ],
                description: [
                    {
                        required: true,
                        message: "请输入描述",
                        trigger: "blur"
                    }
                ],
                content: [
                    {
                        required: true,
                        message: "请输入内容",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            const id = this.$route.query.id || "";
            if (!id) return;
            blogDetail({
                id
            }).then(res => {
                this.form.title = res.data.title;
                this.form.description = res.data.description;
                this.form.content = res.data.content;
            });
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    const id = this.$route.query.id || "";
                    if (id) {
                        const params = Object.assign({}, this.form);
                        params.id = id;
                        updateBlog(params).then(res => {
                            this.$Message.success("编辑成功");
                            this.$router.push("/");
                        });
                    } else {
                        newBlog(this.form).then(res => {
                            this.$Message.success("提交成功");
                            this.$router.push("/");
                        });
                    }
                }
            });
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        handleBack() {
            this.$router.go(-1);
        }
    }
};
</script>

<style lang="scss" scoped>
    .detail-wrapper {
        padding: 20px;
    }
</style>
