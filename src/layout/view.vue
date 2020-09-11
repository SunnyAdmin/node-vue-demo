<template>
    <div class="layout">
        <Layout class="layout-wrapper">
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-1" :open-names="[1]" theme="dark" width="auto" :class="menuitemClasses">
                    <Submenu :name="index + 1" v-for="(item, index) in routerList" :key="index">
                        <template slot="title">
                            <Icon :type="item.meta.icon"></Icon>
                            {{item.meta.title}}
                        </template>
                        <MenuItem
                            :name="`${index + 1}-${smallIndex + 1}`"
                            v-for="(smallItem, smallIndex) in item.children"
                            :key="smallIndex"
                            @click.native="handleGoPath(smallItem.path)"
                        >{{smallItem.meta.title}}</MenuItem>
                    </Submenu>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <div class="header-title">node测试博客系统</div>
                </Header>
                <Breadcrumb :style="{margin: '20px'}">
                    <BreadcrumbItem>{{breadcrumbName}}</BreadcrumbItem>
                </Breadcrumb>
                <Content :style="{margin: '0 20px 20px', background: '#fff', minHeight: '260px'}">
                    <router-view />
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
export default {
    name: "BaseView",
    data() {
        return {
            isCollapsed: false,
            routerList: [],
            breadcrumbName: []
        };
    },
    watch: {
        "$route.path": {
            handler(newValue, oldValue) {
                console.log("this.$router.options.routes", this.$router);
                const newPath = newValue;
                const arr = JSON.parse(JSON.stringify(this.$router.options.routes));
                // 获取面包屑title
                arr.forEach(item => {
                    if (item.children) {
                        item.children.forEach(smallItem => {
                            if (smallItem.path === newPath.substr(1)) {
                                this.breadcrumbName = smallItem.meta.title;
                            }
                        })
                    }
                });
                this.routerList = arr.filter(item => {
                    return item.children;
                });
                this.routerList.forEach(item => {
                    item.children = item.children.filter(smallItem => {
                        return !smallItem.hidden;
                    })
                });
            },
            immediate: true
        }
    },
    computed: {
        rotateIcon() {
            return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
        },
        menuitemClasses() {
            return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
        }
    },
    methods: {
        handleGoPath(path) {
            this.$router.push({
                path
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.layout {
    height: 100%;
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
}
.layout-wrapper {
    height: 100%;
}
.layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
}
.menu-icon {
    transition: all 0.3s;
}
.rotate-icon {
    transform: rotate(-90deg);
}
.menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width 0.2s ease 0.2s;
}
.menu-item i {
    transform: translateX(0px);
    transition: font-size 0.2s ease, transform 0.2s ease;
    vertical-align: middle;
    font-size: 16px;
}
.collapsed-menu span {
    width: 0px;
    transition: width 0.2s ease;
}
.collapsed-menu i {
    transform: translateX(5px);
    transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
    vertical-align: middle;
    font-size: 22px;
}
.header-title {
    padding-left: 20px;
    font-size: 22px;
    font-weight: 500;
}
</style>
