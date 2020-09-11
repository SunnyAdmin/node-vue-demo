<template>
    <div class="container">
        <div class="head-wrapper">
            <Button type="primary" @click="handleNewOrEdit(null)">新建博客</Button>
        </div>
        <div class="bottom-wrapper">
            <List item-layout="vertical">
                <ListItem v-for="item in blogsListData" :key="item.id">
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
        </div>
    </div>
</template>

<script>
export default {
    name: "BlogsList",
    data() {
        return {
            blogsListData: [
                {
                    id: 1,
                    title: 'This is title 1',
                    description: 'This is description, this is description, this is description.',
                    avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                    content: 'This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.',
                    createTime: "2020-09-10 20:03:54"
                },
                {
                    id: 2,
                    title: 'This is title 2',
                    description: 'This is description, this is description, this is description.',
                    avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                    content: 'This is the content, this is the content, this is the content, this is the content.',
                    createTime: "2020-09-10 20:03:54"
                },
                {
                    id: 3,
                    title: 'This is title 3',
                    description: 'This is description, this is description, this is description.',
                    avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                    content: 'This is the content, this is the content, this is the content, this is the content.',
                    createTime: "2020-09-10 20:03:54"
                },
                {
                    id: 4,
                    title: 'This is title 4',
                    description: 'This is description, this is description, this is description.',
                    avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                    content: 'This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.',
                    createTime: "2020-09-10 20:03:54"
                },
                {
                    id: 5,
                    title: 'This is title 5',
                    description: 'This is description, this is description, this is description.',
                    avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                    content: 'This is the content, this is the content, this is the content, this is the content.',
                    createTime: "2020-09-10 20:03:54"
                },
                {
                    id: 6,
                    title: 'This is title 6',
                    description: 'This is description, this is description, this is description.',
                    avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                    content: 'This is the content, this is the content, this is the content, this is the content.',
                    createTime: "2020-09-10 20:03:54"
                }
            ]
        };
    },
    methods: {
        handleSureDelete(id) {
            this.$Message.info(`You click ok + ${id}`);
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
</style>
