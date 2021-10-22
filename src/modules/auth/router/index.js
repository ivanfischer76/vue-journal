
export default {
	name: 'auth',
	component: () => import(/* webpackChunkName: "auth" */ '@/modules/auth/layouts/AuthLayout.vue'),
	children: [
		{
			path: '',
			name: 'login',
			component: () => import(/* webpackChunkName: "auth-login */ '@/modules/auth/views/Login.vue'),
		},
		{
			path: 'register',
			name: 'register',
			component: () => import(/* webpackChunkName: "auth-register*/ '@/modules/auth/views/Register.vue'),
		},
	]
}