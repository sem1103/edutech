'use client'

import { useEffect, useRef } from 'react';
import useDataStore from '../../../../store/dataStore';
import userStore from '../../../../store/userStore';
import s from './Settings.module.css';



export default function Settings() {
	const {user} = userStore();
	const {userDetail,fetchUserDetail} = useDataStore();
	const passportIdRef = useRef(null)
	const rolesLabels = {
		director: 'Direktor',
		staff: 'Işci',
		teacher: 'Müəllim',
		parent: 'Valideyin',
		student: 'Tələbə'
	}
	useEffect(() => {
		if(user) fetchUserDetail(user.user_id)

	},[user])

	
	
	

	return(
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
					<form className={s.personal__form}>
						<label>
							<p>Ad</p>
							<input type="text" defaultValue={userDetail?.first_name} placeholder={userDetail?.first_name} />
						</label>
						<label>
							<p>Soyad</p>
							<input type="text" defaultValue={userDetail?.last_name} placeholder={userDetail?.last_name} />
						</label>
						<label>
							<p>Ata adı</p>
							<input type="text"  defaultValue={userDetail?.father_name} placeholder={userDetail?.father_name}/>
						</label>
						<label>
							<p>FIN kod</p>
							<span className={s.passport__id}>
								{userDetail?.passport_id}
							</span>
							
						</label>
						

						<label>
							<p>Əlaqə nömrə 1</p>
							<input type="text"  defaultValue={userDetail?.phone_number_1} placeholder={userDetail?.phone_number_1}/>
						</label>

						<label>
							<p>Əlaqə nömrə 2</p>
							<input type="text"  defaultValue={userDetail?.phone_number_2} placeholder={userDetail?.phone_number_2}/>
						</label>

						<label>
							<p>E-mail</p>
							<input type="text"  defaultValue={userDetail?.email} placeholder={userDetail?.email}/>
						</label>

						<label>
							<p>Ünvan</p>
							<input type="text"  defaultValue={userDetail?.address} placeholder={userDetail?.address}/>
						</label>

						<label className={s.bio}>
							<p>Haqqımda</p>
							<textarea type="text" rows={5}  defaultValue={userDetail?.bio} placeholder={userDetail?.bio}/>
						</label>
						<h3>Sosial şəbəkələr</h3>

						<label>
							<p>Facebook</p>
							<input type="text"  defaultValue={userDetail?.facebook} placeholder={'https://facebook.com/...'}/>
						</label>
						<label>
							<p>Instagram</p>
							<input type="text"  defaultValue={userDetail?.instagram} placeholder={'https://instagram.com/...'}/>
						</label>
						<label>
							<p>GitHub</p>
							<input type="text"  defaultValue={userDetail?.github} placeholder={'https://github.com/...'}/>
						</label>
						<label>
							<p>LinkedIn</p>
							<input type="text"  defaultValue={userDetail?.linkedin} placeholder={'https://linkedin.com/...'}/>
						</label>
						<button className='submit__btn'>
							Məlumatları yenilə
						</button>

						<hr className={s.divider} />
						

						<form className={s.change__pass}>
						<h2>Şifrənin dəyişdirilməsi</h2>
						<label>
							<p>Köhnə şifrə</p>
							<input type="password"  />
						</label>

						<label>
							<p>Yeni şifrə</p>
							<input type="password"  />
						</label>

						<label>
							<p>Şifrəni təkrar edin</p>
							<input type="password" />
						</label>
						<button className='submit__btn'>
							Şifrəni yenilə
						</button>

						</form>
					</form>
				</div>
			</div>
		</section>
	)
}