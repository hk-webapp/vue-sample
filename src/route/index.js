import App from '../components/Home'
import ProductMangement from '../components/product/ProductManagement'
import ProductEntry from '../components/product/ProductEntry'
import Login from '../components/user/Login'
import UserInfo from '../components/user/UserInfo'
import ProductCategory from '../components/Category/ProductCategory';
import Articles from '../components/Article/Articles'
import ArticleList from '../components/Article/ArticleList'
import Empty from './../components/empty.vue'
const applySec = false;

const routes = [
    {
        path: "/",
        name: "rootPage",
        component: App,
    },
    {
        path: "/courseManagement",
        name: "courseMngPage",
        component: ProductMangement,
        meta: { requiresAuth: applySec }
    },
    {
        path: "/login",
        name: "loginPage",
        component: Login,
    },
    {
        path: "/userInfo",
        name: "userInfoPage",
        component: UserInfo,
        meta: { requiresAuth: applySec }
    }
    ,
    {
        path: "/Product",
        name: "productInfo",
        component: ProductEntry,
        meta: { requiresAuth: applySec }
    }
    ,
    {
        path: "/ProductCategory/:name/:id",
        name: "categorymng",
        component: ProductCategory,
        meta: { requiresAuth: applySec }
    },
    {
        path: "/Articles/:name/:id",
        name: "Articles",
        component: Articles,
        meta: { requiresAuth: applySec }
    }
    , {
        path: "/ArticleList/:name/:id",
        name: "ArticleList",
        component: ArticleList,
        meta: { requiresAuth: applySec }
    }
    , {
        path: "/empty",
        name: "empty",
        component: Empty,
    }
];

export default routes;