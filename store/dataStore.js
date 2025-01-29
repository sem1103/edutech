import Cookies from 'js-cookie';
import { create } from 'zustand';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;



const useDataStore = create((set, get) => ({
	users: [],
	entity: [],
	registeredStudents: false,
	userDetail: {},
	fetchUsers: async (role) => {
		const res = await fetch(`${apiUrl}users/?user_type=${role}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${Cookies?.get('userToken')}`
			}
		}).then(res => res.json())

		set(({ users: res.results }));

	},
	addUser: async (data) => {
		try {
			const res = await fetch(`${apiUrl}users/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${Cookies.get('userToken')}`
				},
				body: JSON.stringify(data)
			})

			return res;
		} catch (error) {
			console.log(error);

		}
	},
	fetchEntity: async (entity) => {
		const res = await fetch(`${apiUrl}${entity}/`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${Cookies?.get('userToken')}`
			}

		}).then(res => res.json())

		console.log(res);

		set(({ entity: res.results }));
	},
	fetchRegisteredList: async () => {
		const res = await fetch(`${apiUrl}registers/`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${Cookies?.get('userToken')}`
			}
		}).then(res => res.json())

		set(({ registeredStudents: res }));


	},
	fetchUserDetail: async (id) => {
		const res = await fetch(`${apiUrl}users/${id}/`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${Cookies?.get('userToken')}`
			}
		}).then(res => res.json())

		set(({ userDetail: res }));
	},
	changeUserData: async (data, id) => {
		try {
			const res = await fetch(`${apiUrl}users/${id}/`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${Cookies?.get('userToken')}`
				},
				body: JSON.stringify(data)
			})

			if (res.ok) get().fetchUserDetail(id)
			return res
		} catch (error) {
			console.log(error);

		}
	},
	changePass: async (token, oldPass, newPass) => {
		const res = await fetch(`${apiUrl}change-password/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({
				old_password: oldPass,
				new_password: newPass
			})
		})

		return res
	}
}))



export default useDataStore;