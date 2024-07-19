import { createRouter, createWebHistory } from 'vue-router';
import UserList from '../components/UserList.vue';
import UserCreate from '../components/UserCreate.vue';
import UserEdit from '../components/UserEdit.vue';
import UserDetail from '../components/UserDetail.vue';

const routes = [
    { path: '/', component: UserList },
    { path: '/create', component: UserCreate },
    { path: '/edit/:id', component: UserEdit },
    { path: '/detail/:id', component: UserDetail },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
