'use client'

import { useEffect, useState } from 'react';
import s from './Registration.module.css';
import useDataStore from '../../../../store/dataStore';


export default function Registration() {
	const { registeredStudents, fetchRegisteredList } = useDataStore();
	const [selectedEntity, setSelectedEntity] = useState([]);
	const [selectedAll, setSelectedAll] = useState(false)
	const [pageInfo, setPageInfo] = useState(null);


	const selectUserHandler = (id) => {
		if (id !== 'all') {
			setSelectedEntity((prev) => {
				const isSelected = prev.includes(id);
				return isSelected
					? prev.filter(item => item !== id)
					: [
						...prev,
						id
					];
			});
		} else {
			setSelectedEntity((prev) => {
				if (selectedAll) {
					return [];
				}
				return registeredStudents.results.map(item => item.id);
			});
		}
	};



	useEffect(() => {
		setPageInfo(localStorage.pageInfo ? JSON.parse(localStorage.pageInfo) : null)

	}, [])


	useEffect(() => {
		if (pageInfo) {
			fetchRegisteredList();
		}
	}, [pageInfo])


	return (
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


				<div className={s.btns}>
					<button
						onClick={() => setAddDrawerFlag(!addDrawerFlag)}
						className={s.add__member}>
						Əlavə etmək
					</button>

					<button type="button" className={`${s.button} ${selectedEntity.length ? s.show__remove : ''}`}>
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

			</div>

			{
				registeredStudents ?
					<div className={s.user__table}>
						<table>
							<thead>
								<tr>
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
									<th>Ad, Soyad, Ata adı</th>
									<th>E-mail</th>
									<th>Telefon</th>
									<th>Ünvan</th>
								</tr>
							</thead>
							<tbody>
								{
									registeredStudents ?
										registeredStudents.results?.map(item => {
											return (
												<tr key={item.id}>

													<td className={s.select}>
														<div>
															<label className="checkbox">
																<input
																	checked={selectedEntity.includes(item.id)}
																	onChange={() => {
																		selectUserHandler(item.id)
																	}}
																	type="checkbox" />
																<div className="checkmark"></div>
															</label>
														</div>
													</td>
													

													<td className={s.user__name}>
														<div>
															<span className={s.profile__photo}>
																{item?.first_name?.[0]?.toUpperCase()}{item?.last_name?.[0]?.toUpperCase()}
															</span>
															{item.first_name} {item.last_name} {item.father_name}
														</div>
													</td>
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
										:
										''
								}
							</tbody>
						</table>
					</div>
					:
					''
			}

		</section>
	)
}