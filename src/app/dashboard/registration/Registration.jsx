'use client'

import { useEffect, useState } from 'react';
import s from './Registration.module.css';
import useDataStore from '../../../../store/dataStore';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { usePathname, useRouter } from 'next/navigation';




export default function Registration() {
	const { registeredStudents, fetchRegisteredList } = useDataStore();
	const [selectedEntity, setSelectedEntity] = useState([]);
	const [selectedAll, setSelectedAll] = useState(false)
	const [pageInfo, setPageInfo] = useState(null);
	const [isCopy, setIsCopy] = useState(false)





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
			<div className={s.title}>
				<h1>
					{pageInfo ?
						pageInfo?.label
						:
						''
					}
				</h1>

				<button
					disabled={isCopy}
					onClick={() => {
						navigator.clipboard.writeText(`${window.location.origin}/registration`);
						setIsCopy(true);
						setTimeout(() => {
							setIsCopy(false);

						}, 2000);
					}}
					className={s.copy__button}
					data-tooltip-id='copy__tooltip'
					data-tooltip-content={isCopy ? 'Kopyalandı!' : 'Qeydiyyat linkini kopyalayın!'}
					data-tooltip-place='right'
				>
					{
						isCopy ?
							<svg
								xmlns="http://www.w3.org/2000/svg"
								xmlSpace="preserve"
								width="16"
								viewBox="0 0 24 24"
							>
								<path
									fill="#ccc"
									d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
									data-original="#000000"
								></path>
							</svg>
							:
							<svg
								xmlns="http://www.w3.org/2000/svg"
								xmlSpace="preserve"
								width="16"
								viewBox="0 0 6.35 6.35"
							>
								<path
									fill="#ccc"
									d="M2.43.265a.58.58 0 0 0-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529A.74.74 0 0 0 4.82.794h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49q.049 0 .049.049v.431q0 .048-.049.049H2.43q-.049 0-.05-.049V.843q.001-.049.05-.05zm-.901.53h.328a.58.58 0 0 0 .573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"
								></path>
							</svg>
					}



				</button>
				<Tooltip id='copy__tooltip' />
			</div>

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