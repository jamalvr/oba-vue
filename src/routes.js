import Home from './views/Home';
import Detail from './views/Detail';

export const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/:id',
        name: 'detail',
        component: Detail,
        props: true,
    },
];