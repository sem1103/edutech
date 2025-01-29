'use client'

import { useEffect, useRef, useState } from 'react';
import useDataStore from '../../../../store/dataStore';
import userStore from '../../../../store/userStore';
import s from './Settings.module.css';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';



export default function Settings() {
	const { user } = userStore();
	const { userDetail, fetchUserDetail, changeUserData, changePass } = useDataStore();
	const { register, handleSubmit, formState: { errors }, reset } = useForm({
		mode: 'onSubmit',
	});

	const { register: changePassRegister, handleSubmit: changePassHandler, reset: changePassFormReset, formState: { errors: changePassFormErrors }, watch } = useForm({
		mode: 'onSubmit'
	})
	const [showOldPass, setShowOldPass] = useState(false);
	const [showNewPass, setShowNewPass] = useState(false);
	const [showConfPass, setShowConfPass] = useState(false);
	const oldPass = watch('oldPass')
	const newPass = watch('newPass')




	useEffect(() => {
		if (user) {
			fetchUserDetail(user.user_id);
		}
	}, [user]);

	useEffect(() => {
		if (Object.keys(userDetail).length) {
			reset({
				first_name: userDetail.first_name,
				last_name: userDetail?.last_name,
				father_name: userDetail?.father_name,
				phone_number_1: userDetail?.phone_number_1,
				phone_number_2: userDetail?.phone_number_2,
				email: userDetail?.email,
				bio: userDetail?.bio || '',
				facebook: userDetail?.facebook || '',
				instagram: userDetail?.instagram || '',
				linkedin: userDetail?.linkedin || ''
			});
		}
	}, [userDetail]);

	const rolesLabels = {
		director: 'Direktor',
		staff: 'Işci',
		teacher: 'Müəllim',
		parent: 'Valideyin',
		student: 'Tələbə'
	}



	const submit = async data => {
		const toastId = toast.loading('Sorğu gonderilir...')
		const sendData = {
			...data,
			user_type: userDetail?.user_type,
			passport_id: userDetail?.passport_id,
			gender: userDetail?.gender
		}

		const res = await changeUserData(sendData, userDetail.id);

		if (res.ok) toast.update(toastId, { render: 'Məlumatlar uğurla yenilendi', type: 'success', isLoading: false, autoClose: 2000 })

	}


	const setNewPassHandler = async data => {
		const toastId = toast.loading('Sorgu göndərildi...')

		try {
			const res = await changePass(Cookies.get('userToken'), data.oldPass, data.newPass);

			if (res.ok) {
				toast.update(toastId, {
					render: 'Şifrə uğurla yeniləndi!',
					type: 'success',
					autoClose: 1000,
					isLoading: false
				});
				changePassFormReset();
			} else {
				toast.update(toastId, {
					render: 'Gözlənilməz xəta baş verdi!',
					type: 'error',
					autoClose: 1000,
					isLoading: false
				});
			}

		} catch (error) {
			console.log(error);

		}
	}




	return (
		<section id='main'>
			<div className={s.info__wrapper}>
				<div className={s.user__card}>
					<div className={s.user__photo}>
						<span className={s.user__icon}>
							{userDetail?.last_name?.[0]?.toUpperCase()}{userDetail?.first_name?.[0]?.toUpperCase()}
						</span>
						<h2 className={s.role}>{
							rolesLabels[userDetail?.user_type]
						}</h2>
					</div>
					<div className={s.user__info}>
						<h1>{userDetail?.last_name} {userDetail?.first_name} {userDetail?.father_name}</h1>

						<h3>{userDetail?.email}</h3>
					</div>
				</div>

				<div className={s.personal__info}>
					<h2>Şəxsi məlumatlar</h2>
					<form onSubmit={handleSubmit(submit)} className={s.personal__form}>
						<label>
							<p>Ad</p>
							<input
								{...register('first_name', {
									required: true,
									minLength: {
										value: 3,
										message: '3 hərifdən az olmamalıdır!'
									}
								})}
								type="text" placeholder={userDetail?.first_name} />
						</label>
						<label>
							<p>Soyad</p>
							<input
								{...register('last_name', {
									required: true,
									minLength: {
										value: 3,
										message: '3 hərifdən az olmamalıdır!'
									}
								})}
								type="text" placeholder={userDetail?.last_name} />
						</label>
						<label>
							<p>Ata adı</p>
							<input
								{...register('father_name', {
									required: true,
									minLength: {
										value: 3,
										message: '3 hərifdən az olmamalıdır!'
									}
								})}
								type="text" placeholder={userDetail?.father_name} />
						</label>
						<label>
							<p>FIN kod</p>
							<span className={s.passport__id}>
								{userDetail?.passport_id}
							</span>

						</label>


						<label>
							<p>Əlaqə nömrə 1</p>
							<input
								{...register('phone_number_1', {
									required: true,
								})}
								type="text" placeholder={userDetail?.phone_number_1} />
						</label>

						<label>
							<p>Əlaqə nömrə 2</p>
							<input
								{...register('phone_number_2', {
									required: true,
								})}
								type="text" placeholder={userDetail?.phone_number_2} />
						</label>

						<label>
							<p>E-mail</p>
							<input
								{...register('email', {
									required: true,
								})}
								type="text" placeholder={userDetail?.email} />
						</label>

						<label>
							<p>Ünvan</p>
							<input
								{...register('address', {
									required: true,
								})}
								type="text" defaultValue={userDetail?.address} placeholder={userDetail?.address} />
						</label>

						<label className={s.bio}>
							<p>Haqqımda</p>
							<textarea
								{...register('bio')}
								type="text" rows={5} placeholder={userDetail?.bio} />
						</label>
						<h3>Sosial şəbəkələr</h3>

						<label>
							<p>Facebook</p>
							<input
								{...register('facebook')}
								type="text" placeholder={'https://facebook.com/...'} />
						</label>
						<label>
							<p>Instagram</p>
							<input
								{...register('instagram')}
								type="text" placeholder={'https://instagram.com/...'} />
						</label>
						<label>
							<p>GitHub</p>
							<input
								{...register('github')}
								type="text" placeholder={'https://github.com/...'} />
						</label>
						<label>
							<p>LinkedIn</p>
							<input
								{...register('linkedin')}
								type="text" placeholder={'https://linkedin.com/...'} />
						</label>
						<button className='submit__btn'>
							Məlumatları yenilə
						</button>

						<hr className={s.divider} />
					</form>

					<form onSubmit={changePassHandler(setNewPassHandler)} className={s.change__pass}>
						<h2>Şifrənin dəyişdirilməsi</h2>
						<label>
							<p>Köhnə şifrə</p>
							<div>
							<input
								{...changePassRegister('oldPass', {
									required: true,
									minLength: {
										value: 6,
										message: 'Şifrə minim 6 simvoldan ibarət olmalıdır!'
									}
								})}
								type={showOldPass ? 'text' : 'password'} />
							<button type='button' onClick={() => setShowOldPass(!showOldPass)}>
								{
									showOldPass ?
									<ShowPassIcon />
									:
									<HidePassIcon />
								}
							</button>
							</div>
						</label>

						<label>
							<p>Yeni şifrə</p>
							<div>
							<input
								{...changePassRegister('newPass', {
									required: true,
									minLength: {
										value: 6,
										message: 'Şifrə minim 6 simvoldan ibarət olmalıdır!'
									},
									validate: (value) => {
										return oldPass === newPass ? 'Yenı və köhnə şifrə eyni ola bilməz!' : true
									}
								})}
								type={showNewPass ? 'text' : 'password'} />
								<button type='button' onClick={() => setShowNewPass(!showNewPass)}>
								{
									showNewPass ?
									<ShowPassIcon />
									:
									<HidePassIcon />
								}
							</button>
							</div>
						</label>

						<label>
							<p>Şifrəni təkrar edin</p>
							<div>
							<input
								{...changePassRegister('confirmPass', {
									required: true,
									validate: (value) => {
										return value !== newPass ? 'Şifrələr uygun gəlmir!' : true
									}
								})}
								type={showConfPass ? 'text' : 'password'}/>
								<button type='button' onClick={() => setShowConfPass(!showConfPass)}>
								{
									showConfPass ?
									<ShowPassIcon />
									:
									<HidePassIcon />
								}
							</button>
							</div>
						</label>
						<button className='submit__btn'>
							Şifrəni yenilə
						</button>

					</form>
				</div>
			</div>
		</section>
	)
};









function ShowPassIcon() {
	return (
		<svg
			width={18}
			xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
			<g
				id="SVGRepo_iconCarrier"
				stroke="#282828"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			>
				<path d="M1 12s4-8 11-8 11 8 11 8M1 12s4 8 11 8 11-8 11-8"></path>
				<circle cx="12" cy="12" r="3"></circle>
			</g>
		</svg>
	)
}



function HidePassIcon(){
	return(
		<svg 
		width={18}
		xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
		<g
		  id="SVGRepo_iconCarrier"
		  stroke="#282828"
		  strokeLinecap="round"
		  strokeLinejoin="round"
		  strokeWidth="2"
		>
		  <path d="m2 2 20 20M6.713 6.723C3.665 8.795 2 12 2 12s3.636 7 10 7c2.05 0 3.817-.727 5.271-1.712M11 5.058A9 9 0 0 1 12 5c6.364 0 10 7 10 7s-.692 1.332-2 2.834"></path>
		  <path d="M14 14.236a3 3 0 0 1-4.13-4.348"></path>
		</g>
	  </svg>
	)
}