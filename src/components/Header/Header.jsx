'use client'

import { useEffect, useState } from 'react';
import userStore from '../../../store/userStore';
import s from './Header.module.css'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Dropdown from 'antd/es/dropdown/dropdown';
import { Menu } from 'antd';


export default function Header() {
	const router = useRouter();
	const { user, logout } = userStore();
	const [userImg, setUserImg] = useState('');
	const rolesLabels = {
		director: 'Direktor',
		staff: 'Işci',
		teacher: 'Müəllim',
		parent: 'Valideyin',
		student: 'Tələbə'
	}

	const menu = (
		<Menu
		  className={`profile__menu ${s.profile__menu}`}
		  items={[
			{
			  key: 'profile',
			  label: (
				<div className={s.profile__info}>
				  <div className={s.profile__icon}>
					<span>{userImg?.toUpperCase()}</span>
				  </div>
				  <h3 className={s.user__name}>
					{user?.first_name} {user?.last_name}
				  </h3>
				  <h4 className={s.role}>{rolesLabels[user?.user_type]}</h4>
				</div>
			  ),
			  disabled: true
			},
			{ type: 'divider' },
			
			{
			  key: '2',
			  label: (
				<Link className={s.link} href={'/dashboard/settings'}>
				  <SettingsIcon />
				  Parametrlər
				</Link>
			  )
			},
			{
			  key: '3',
			  label: (
				<Link className={s.link} href={'/dashboard'}>
				  <HelpIcon />
				  Kömək
				</Link>
			  )
			},
			{ type: 'divider' },
			{
			  key: '4',
			  label: (
				<button
				  className={s.logout}
				  onClick={() => {
					router.push('/login');
					logout();
				  }}
				>
				  <ExitIcon />
				  Çıxış
				</button>
			  )
			}
		  ]}
		/>
	  );


	useEffect(() => {
		document.body.style.overflow = 'hidden'
		document.body.style.minHeight = 'initial'
		document.body.style.height = '100vh'
		setUserImg(() => {
			return user?.last_name[0] + user?.first_name[0]
		});

		console.log(user);

		return () => {
			document.body.style.overflow = 'initial'
			document.body.style.minHeight = '100vh'
			document.body.style.height = 'initial'
		}
	}, [user])



	return (
		<header id={s.header}>
			<div className={` main__container `}>
				<div className={s.left}>
					<img src="/assets/logo-white.svg" alt="Logo" />

				</div>

				<div className={s.right}>
					<div className={s.notifications}>
						<button className={s.notification__icon}>
							<svg
								width="20"
								height="20"
								fill="none"
								stroke="#8a94ad"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								className="feather feather-bell"
								viewBox="0 0 24 24"
							>
								<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"></path>
							</svg>
						</button>
					</div>
					<Dropdown
						className={'profile'}
						overlay={menu}
						trigger={['click']}
					>
						{
							userImg ?
								<button className={s.profile__icon}>
									<span>{userImg?.toUpperCase()}</span>
								</button>
								:
								''
						}
					</Dropdown>
				
				</div>
			</div>
		</header>
	)
}





function ProfileIcon() {
	return (
		<svg width={12} xmlns="http://www.w3.org/2000/svg" fill="#282828" viewBox="0 0 20 20">
			<g id="SVGRepo_iconCarrier">
				<g
					id="Page-1"
					fill="none"
					fillRule="evenodd"
					stroke="none"
					strokeWidth="1"
				>
					<g
						id="Dribbble-Light-Preview"
						fill="#282828"
						transform="translate(-140 -2159)"
					>
						<g id="icons" transform="translate(56 160)">
							<path
								id="profile_round-[#282828]"
								d="M100.563 2017H87.438c-.706 0-1.228-.697-.961-1.338 1.236-2.964 4.14-4.662 7.523-4.662s6.288 1.698 7.524 4.662c.267.641-.255 1.338-.961 1.338m-10.646-12c0-2.206 1.832-4 4.083-4s4.083 1.794 4.083 4-1.831 4-4.083 4c-2.251 0-4.083-1.794-4.083-4m14.039 11.636c-.742-3.359-3.064-5.838-6.119-6.963 1.619-1.277 2.563-3.342 2.216-5.603-.402-2.623-2.63-4.722-5.318-5.028-3.712-.423-6.86 2.407-6.86 5.958 0 1.89.894 3.574 2.289 4.673-3.057 1.125-5.377 3.604-6.12 6.963-.27 1.221.735 2.364 2.01 2.364h15.892c1.276 0 2.28-1.143 2.01-2.364"
							></path>
						</g>
					</g>
				</g>
			</g>
		</svg>
	)
}

function SettingsIcon() {
	return (
		<svg
		className={s.setting__icon}
		width={18} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
			<g id="SVGRepo_iconCarrier" stroke="#282828" strokeWidth="1.5">
				<circle cx="12" cy="12" r="3"></circle>
				<path d="M13.765 2.152C13.398 2 12.932 2 12 2s-1.398 0-1.765.152a2 2 0 0 0-1.083 1.083c-.092.223-.129.484-.143.863a1.62 1.62 0 0 1-.79 1.353 1.62 1.62 0 0 1-1.567.008c-.336-.178-.579-.276-.82-.308a2 2 0 0 0-1.478.396C4.04 5.79 3.806 6.193 3.34 7s-.7 1.21-.751 1.605a2 2 0 0 0 .396 1.479c.148.192.355.353.676.555.473.297.777.803.777 1.361s-.304 1.064-.777 1.36c-.321.203-.529.364-.676.556a2 2 0 0 0-.396 1.479c.052.394.285.798.75 1.605.467.807.7 1.21 1.015 1.453a2 2 0 0 0 1.479.396c.24-.032.483-.13.819-.308a1.62 1.62 0 0 1 1.567.008c.483.28.77.795.79 1.353.014.38.05.64.143.863a2 2 0 0 0 1.083 1.083C10.602 22 11.068 22 12 22s1.398 0 1.765-.152a2 2 0 0 0 1.083-1.083c.092-.223.129-.483.143-.863.02-.558.307-1.074.79-1.353a1.62 1.62 0 0 1 1.567-.008c.336.178.579.276.819.308a2 2 0 0 0 1.479-.396c.315-.242.548-.646 1.014-1.453s.7-1.21.751-1.605a2 2 0 0 0-.396-1.479c-.148-.192-.355-.353-.676-.555A1.62 1.62 0 0 1 19.562 12c0-.558.304-1.064.777-1.36.321-.203.529-.364.676-.556a2 2 0 0 0 .396-1.479c-.052-.394-.285-.798-.75-1.605-.467-.807-.7-1.21-1.015-1.453a2 2 0 0 0-1.479-.396c-.24.032-.483.13-.82.308a1.62 1.62 0 0 1-1.566-.008 1.62 1.62 0 0 1-.79-1.353c-.014-.38-.05-.64-.143-.863a2 2 0 0 0-1.083-1.083Z"></path>
			</g>
		</svg>
	)
}

function HelpIcon() {
	return (
		<svg
			width={18}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			stroke="#000"
			viewBox="0 0 24 24"
		>
			<path
				id="SVGRepo_iconCarrier"
				stroke="#282828"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M12 17h.01M12 14c.89-1.906 3-1.766 3-4 0-1.5-1-3-3-3-1.548 0-2.497.898-2.847 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18"
			></path>
		</svg>
	)
}

function ExitIcon() {
	return (
		<svg
			width="16"
			height="16"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			className="feather feather-log-out me-2"
			viewBox="0 0 24 24"
		>
			<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"></path>
		</svg>
	)
}