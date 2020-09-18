<template>
    <div class="container">
        <div class="head-wrapper">
            <div>
                <Button type="primary" @click="handleNewOrEdit()">新建博客</Button>
            </div>
            <div class="search-wrapper">
                <div>
                    <Select v-model="selectUser" style="width:200px;margin-right: 15px;" placeholder="请选择作者">
                        <Option v-for="item in userList" :value="item.username" :key="item.username">{{ item.username }}</Option>
                    </Select>
                    <Input v-model="selectKeyword" placeholder="请输入关键词" style="width: 200px;margin-right: 15px;" />
                </div>
                <div>
                    <Button type="primary" @click="handleSearch" style="margin-right: 15px;">搜索</Button>
                    <Button @click="handleInit">重置</Button>
                </div>
            </div>
        </div>
        <div class="bottom-wrapper">
            <List item-layout="vertical" v-if="blogsList.length">
                <ListItem v-for="item in blogsList" :key="item.id">
                    <ListItemMeta :avatar="item.avatar" :title="item.title" :description="item.description" />
                    {{ item.content }}
                    <template>
                        <div>{{item.createTime}}</div>
                        <div>
                            <Button type="text" @click="handleNewOrEdit(item.id)">Edit</Button>
                            <Poptip
                                confirm
                                title="您确认删除这条内容吗？"
                                @on-ok="handleSureDelete(item.id)">
                                <Button type="text">Delete</Button>
                            </Poptip>
                        </div>
                    </template>
                    <template slot="extra">
                        <img src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large" style="width: 280px">
                    </template>
                </ListItem>
            </List>
            <div v-else class="other-content">暂无博客内容</div>
        </div>
    </div>
</template>

<script>
import { blogList, delBlog } from "../../api/blog";
import { userList } from "../../api/user";

export default {
    name: "BlogsList",
    data() {
        return {
            selectUser: "",
            selectKeyword: "",
            userList: [],
            blogsList: []
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            userList().then(res => {
                this.userList = res.data;
            });
            blogList().then(res => {
                this.blogsList = res.data;
            });
        },
        handleSureDelete(id) {
            delBlog({ id }).then(res => {
                this.init();
                this.$Message.success("删除博客成功");
            });
        },
        handleNewOrEdit(id = null) {
            const pathObj = {
                path: "blogsDetail"
            };
            if (id) {
                pathObj.query = {
                    id
                };
            }
            this.$router.push(pathObj);
        },
        handleSearch() {
            blogList({
                author: this.selectUser,
                keyword: this.selectKeyword
            }).then(res => {
                this.blogsList = res.data;
            });
        },
        handleInit() {
            this.selectKeyword = "";
            this.selectUser = "";
            this.init();
        }
    }
}
</script>

<style lang="scss" scoped>
    .container {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        padding: 15px;
        .bottom-wrapper {
            padding-top: 20px;
            // background: red;
        }
    }
    .search-wrapper {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .other-content {
        text-align: center;
        padding-top: 50px;
        font-weight: 500;
        font-size: 22px;
    }
</style>
