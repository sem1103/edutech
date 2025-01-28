'use client'



import roles from '@/roles'
import s from './PeopleList.module.css'
import { useEffect, useState } from 'react'
import userStore from '../../../store/userStore';
import { usePathname } from 'next/navigation';
import useDataStore from '../../../store/dataStore';
import { DatePicker, Drawer, Radio } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';



export default function PeopleList() {

	const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
		mode: "onSubmit"
	})

	const [permission, setPermission] = useState(false);
	const {isPermission} = userStore();
	const { users, fetchUsers, addUser } = useDataStore();
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [selectedAll, setSelectedAll] = useState(false)
	const pathname = usePathname();
	const [pageInfo, setPageInfo] = useState(null);
	const [addDrawerFlag, setAddDrawerFlag] = useState(false);
	const [birthDate, setBirthDate] = useState('')



	const addDriwerTitles = {
		staff: {
			pageTitle : 'Yeni Işci',
			addResponse : 'Yeni işci uğurla əlavə olundu!'
		},
		teacher: {
			pageTitle : 'Yeni Müəllim',
			addResponse : 'Yeni müəllim uğurla əlavə olundu!'
		},
		parent: {
			pageTitle : 'Yeni Valideyin',
			addResponse : 'Yeni valideyin uğurla əlavə olundu!'
		},
		student: {
			pageTitle : 'Yeni Tələbə',
			addResponse : 'Yeni tələbə uğurla əlavə olundu!'
		}
	}

	


	const selectUserHandler = (id) => {
		if (id !== 'all') {
			setSelectedUsers((prev) => {
				const isSelected = prev.includes(id);
				return isSelected
					? prev.filter(item => item !== id)
					: [
						...prev,
						id
					];
			});
		} else {

			setSelectedUsers((prev) => {
				if (selectedAll) {
					return [];
				}
				return users.map(item => item.id);
			});
		}
	};

	const handleAddUser = async data => {
		const toastİd = toast.loading('Zəhmət olmasa gözləyin...')
		data = {
			...data,
			birthDate,
			user_type : pageInfo.value
		}

		const res = await addUser(data);	

		if(res.ok){
			toast.update(toastİd, {render : addDriwerTitles[pageInfo?.value].addResponse, type : 'success', autoClose : 2000,      isLoading: false,
			});
			setAddDrawerFlag(!addDrawerFlag)
			reset();
			fetchUsers(pageInfo.value);
		}else{
			toast.update(toastİd, {render : 'Gözlənilməz xəta baş verdi..', type : 'error', autoClose : 2000,      isLoading: false,
			})
		}
	
		
	}



	useEffect(() => {
		setPageInfo(localStorage.pageInfo ? JSON.parse(localStorage.pageInfo) : null)

	}, [])



	useEffect(() => {
		if (pageInfo) {
			setPermission(isPermission(roles, pathname))
			fetchUsers(pageInfo.value);
		}
	}, [pageInfo])



	return (
		<>
			<section id='main'>
				<h1>
					{pageInfo ?
						pageInfo?.label
						:
						''
					}
				</h1>

				<div className={s.tools}>
					<div className={s.search__bar}>
						<input type="text" placeholder='Axtarış...' />
					</div>

					{
						permission ?
							<div className={s.btns}>
								<button
									onClick={() => setAddDrawerFlag(!addDrawerFlag)}
									className={s.add__member}>
									Əlavə etmək
								</button>

								<button type="button" className={`${s.button} ${selectedUsers.length ? s.show__remove : ''}`}>
									<span className={s.button__text}>Silmək</span>
									<span className={s.button__icon}>
										<svg
											xmlns="http://www.w3.org/2000/svg"

											className={s.svg}
											viewBox="0 0 512 512"
										>
											<path
												fill="none"
												stroke="#fff"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="32"
												d="m112 112 20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"
											></path>
											<path
												stroke="#fff"
												strokeLinecap="round"
												strokeMiterlimit="10"
												strokeWidth="32"
												d="M80 112h352"
											></path>
											<path
												fill="none"
												stroke="#fff"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="32"
												d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40M256 176v224M184 176l8 224M328 176l-8 224"
											></path>
										</svg>
									</span>
								</button>
							</div>
							:
							''
					}

				</div>

				{
					users.length > 0 ? 
					<div className={s.user__table}>
					<table>
						<thead>
							<tr>
								{
									permission ?
										<th className={s.select}>
											<div>
												<label className="checkbox">
													<input
														onChange={() => {
															setSelectedAll(!selectedAll)
															selectUserHandler('all')
														}}
														type="checkbox" />
													<div className="checkmark"></div>

												</label>
											</div>
										</th>
										:
										''
								}

								<th>Ad, Soyad, Ata adı</th>
								<th>E-mail</th>
								<th>Telefon</th>
								<th>Ünvan</th>
							</tr>
						</thead>
						<tbody>
							{
								users.map(item => {
									return (
										<tr key={item.id}>
											{
												permission ?
													<td className={s.select}>
														<div>
															<label className="checkbox">
																<input
																	checked={selectedUsers.includes(item.id)}
																	onChange={() => {
																		selectUserHandler(item.id)
																	}}
																	type="checkbox" />
																<div className="checkmark"></div>
															</label>
														</div>
													</td>
													:
													''
											}


												{
													item.first_name ? 
													<td className={s.user__name}>
												<div>
													<span className={s.profile__photo}>
														{item?.first_name?.[0]?.toUpperCase()}{item.last_name?.[0]?.toUpperCase()}
													</span>
													{item?.first_name} {item.last_name} {item.father_name}
												</div>
											</td>
											:
											''
												}
											
											<td>
												<a href={`mailto:${item.email}`}>{item.email}</a>
											</td>
											<td>
												{item.phone_number_1}
											</td>
											<td>
												{item.address ?
													item.address
													:
													'Baku'
												}
											</td>
										</tr>
									)
								})
							}									
						</tbody>
					</table>
					</div>
				:
				''
				}

			</section>

			{
				pageInfo ?
					<Drawer title={addDriwerTitles[pageInfo?.value]?.pageTitle} open={addDrawerFlag} onClose={() => setAddDrawerFlag(!addDrawerFlag)} styles={{ mask: { backdropFilter: 'blur(5px)', } }} >

						<form onSubmit={handleSubmit(handleAddUser)} className={s.new__member__form}>
							<label>
								<p>Ad</p>
								<div className={s.input__wrapper}>
									<input type="text"
										{
										...register('first_name', {
											required: true,
											minLength: {
												value: 3,
												message: 'Ad 3 hərifdən az olmamalidir!'
											}
										})
										}
									/>
									<p className={s.error}>{
									errors?.first_name?.message
									}</p>
								</div>
							</label>
							<label>
								<p>Soyad</p>
								<div className={s.input__wrapper}>
									<input type="text"
										{
										...register('last_name', {
											required: true,
											minLength: {
												value: 3,
												message: 'Soyad 3 hərifdən az olmamalidir!'
											}
										})
										}
									/>
									<p className={s.error}>{
									errors?.last_name?.message
									}</p>
								</div>
							</label>
							<label>
								<p>Ata adı</p>
								<div className={s.input__wrapper}>
									<input type="text"
										{
										...register('father_name', {
											required: true,
											minLength: {
												value: 3,
												message: 'Ata adı 3 hərifdən az olmamalidir!'
											}
										})
										}
									/>
									<p className={s.error}>{
									errors?.father_name?.message
									}</p>
								</div>
							</label>
							<label>
								<p>FİN kod</p>
								<div className={s.input__wrapper}>
									<input type="text"
										{
										...register('passport_id', {
											required: true,
											minLength: {
												value: 6,
												message: 'FİN kod 6 simvoldan az olmamalıdır!'
											},
											maxLength: {
												value: 7,
												message: 'FİN kod 7 simvoldan çox olmamalıdır!'
											}
										})
										}
									/>
									<p className={s.error}>{
									errors?.passport_id?.message
									}</p>
								</div>
							</label>
							<label>
								<p>Doğum tarixi</p>
								<Controller
									name='birth_date'
									control={control}
									rules={
										{ required: 'Dogun tarixini qeyd edin!' }
									}

									render={({field, fieldState : {error}}) => (
										<div className={s.input__wrapper}>
											<DatePicker
												{...field}
												onChange={(date, dateString) => {
													if (date) {
													  field.onChange(date);
													  setBirthDate(dateString)
													} else {
													  field.onChange(null);
													}
												  }}
												  value={field.value || null}
												  inputRef={field.ref}
												className={s.date__picker} placeholder='Dogum tarixi qeyd edin' 
												format={'DD/MM/YYYY'}

											/>
											<p className={s.error}>{
									errors?.birth_date?.message
									}</p>

										</div>
									)}
								/>


							</label>
							<label>
								<p>E-mail</p>
								<div className={s.input__wrapper}>
									<input type="text"
										{
										...register('email', {
											required: "Email mütləqdir!",
											pattern: {
												value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
												message: 'E-mail düzgün deyil',
											}
										})
										}
									/>
									<p className={s.error}>{
									errors?.email?.message
									}</p>
								</div>
							</label>
							<label className={s.gender__field}>
								<p>Cins</p>
								<Controller
									name='gender'
									control={control}
									rules={{ required: 'Boş qala bilməz!' }}
									render={({field}) => (
										<div className={s.input__wrapper}>
											<Radio.Group
											{...field}
											onChange={(e) => {
												field.onChange(e.target.value)
											}}
												className={s.gender}
												options={[
													{
														value: 'M',
														label: 'Kişi'
													},
													{
														value: 'F',
														label: 'Qadın'
													}
												]}

											/>
											<p className={s.error}>{
									errors?.gender?.message
									}</p>

										</div>
									)}
								/>
							</label>
							<label>
								<p>Ünvan</p>
								<div className={s.input__wrapper}>
									<input type="text"
										{
										...register('address', {
											required: "Ünvan qeyd olunmalıdır!"

										})
										}
									/>
									<p className={s.error}>{
									errors?.address?.message
									}</p>
								</div>
							</label>
							<label>
								<p>Əlaqə nömrəsi 1</p>
								<div className={s.input__wrapper}>
									<input
										type="text"
										{...register('phone_number_1', {
											required: 'Əlaqə nömrəsi daxil edilməlidir!',
											pattern: {
												value: /^\+994\d{9}$/,
												message: 'Əlaqə nömrəsi düzgün deyil!'
											},
										})}
									/>
									<p className={s.error}>{
									errors?.phone_number_1?.message
									}</p>
								</div>
							</label>
							<label>
								<p>Əlaqə nömrəsi 2</p>
								<div className={s.input__wrapper}>
									<input
										type="text"
										{...register('phone_number_2', {
											required: 'Əlaqə nömrəsi daxil edilməlidir!',
											pattern: {
												value: /^\+994\d{9}$/,
												message: 'Əlaqə nömrəsi düzgün deyil!'
											},
										})}
									/>
									<p className={s.error}>{
									errors?.phone_number_2?.message
									}</p>
								</div>
							</label>

							<button className={s.add__member}>Əlavə etmək</button>
						</form>

					</Drawer>
					:
					''
			}


		</>
	)
}