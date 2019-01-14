import Index from '../src/components/index/index';
import Publish from '../src/components/publish/publish';
import News from '../src/components/news/news';
import User from '../src/components/user/user';
import Register from '../src/components/register/register'
import Login from '../src/components/login/login'
import MyProfile from '../src/components/my_profile/my_profile';
import MyDynamic from '../src/components/my_dynamic/my_dynamic';
import DynamicDetail from '../src/components/dynamic_detail/dynamic_detail';

export default [
    {
        path: '/',
        title: '首页',
        exact: true,
        component: Index,
        isPrivate: false,
    },
    {
        path: '/publish',
        title: '发表',
        exact: true,
        component: Publish,
        isPrivate: true,
    },
    {
        path: '/news',
        title: '消息',
        exact: true,
        component: News,
        isPrivate: true,
    },
    {
        path: '/user',
        title: '我的',
        exact: true,
        component: User,
        isPrivate: true,
    },
    {
        path: '/register',
        title: '注册',
        exact: true,
        component: Register,
        isPrivate: false,
    },
    {
        path: '/login',
        title: '登录',
        exact: true,
        component: Login,
        isPrivate: false,
    },
    {
        path: '/user/profile',
        title: '编辑资料',
        exact: true,
        component: MyProfile,
        isPrivate: true,
    },
    {
        path: '/user/dynamic',
        title: '我的动态',
        exact: true,
        component: MyDynamic,
        isPrivate: true,
    },
    {
        path: '/dynamic/id/:id',
        title: '动态详情',
        component: DynamicDetail,
    }

]
