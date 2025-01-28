import { create } from 'zustand';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";


const userStore = create((set, get) => ({
	user : Cookies?.get('userToken') ? {
		user_id: jwtDecode(Cookies?.get('userToken')).user_id,
		...jwtDecode(Cookies?.get('userToken')).user
	} : null,

	roles : {
		director : [
			{
				link : '/dashboard',
				edit : true
			},
			{
				link : '/dashboard/directors',
				edit : true
			},
			{
				link : '/dashboard/staff',
				edit : true
			},
			{
				link : '/dashboard/teachers',
				edit : true
			},
			{
				link : '/dashboard/parents',
				edit : true
			},
			{
				link : '/dashboard/students',
				edit : true
			}
		],
		staff : [
			{
				link : '/dashboard',
				edit : true
			},
			{
				link : '/dashboard/directors',
				edit : false
			},
			{
				link : '/dashboard/staff',
				edit : false
			},
			{
				link : '/dashboard/teachers',
				edit : true
			},
			{
				link : '/dashboard/parents',
				edit : true
			},
			{
				link : '/dashboard/students',
				edit : true
			}
		],
		teacher : [
			{
				link : '/dashboard/staff',
				edit : false
			},
			{
				link : '/dashboard/teachers',
				edit : false
			},
			{
				link : '/dashboard/parents',
				edit : false
			},
			{
				link : '/dashboard/students',
				edit : false
			}
		],
		parent : [
			{
				link : '/dashboard/teachers',
				edit : false
			},
			{
				link : '/dashboard/parents',
				edit : false
			},
			{
				link : '/dashboard/students',
				edit : false
			}
		],
		student : [
			{
				link : '/dashboard/teachers',
				edit : false
			},
			{
				link : '/dashboard/students',
				edit : false
			}
		]
	},

	login : (token, rememmber) => {
		const userInfo = {
			user_id: jwtDecode(token).user_id,
			...jwtDecode(token).user
		}
		Cookies.set('userToken', token, { expires: rememmber ? 7 : '', path: '/', secure: true, sameSite: 'Strict' });
		set(({user : userInfo}))

	},
	logout : () => {
		Cookies.remove('userToken');
	},
	isPermission : (roles, pathname) => {
		return roles[get().user.user_type].find(item => {
			return pathname.includes(item.value) && item
		}).edit
	}
}))


export default userStore;