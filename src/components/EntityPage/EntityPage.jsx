'use client'

import { useEffect, useState } from 'react';
import s from './EntityPage.module.css';
import userStore from '../../../store/userStore';
import { usePathname } from 'next/navigation';
import roles from '@/roles';
import useDataStore from '../../../store/dataStore';




export default function EntityPage() {
	const { isPermission } = userStore();
	const { entity, fetchEntity } = useDataStore();

	const [pageInfo, setPageInfo] = useState(null);
	const [permission, setPermission] = useState(false);


	const pathname = usePathname();
	const [selectedEntity, setSelectedEntity] = useState([]);
	const [selectedAll, setSelectedAll] = useState(false)

	

	const selectHandler = (id) => {
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
				return entity.map(item => item.id);
			});
		}
	};


	useEffect(() => {
		setPageInfo(localStorage.pageInfo ? JSON.parse(localStorage.pageInfo) : null)

	}, [])


	useEffect(() => {
		if (pageInfo) {
			setPermission(isPermission(roles, pathname));
			fetchEntity(pageInfo.value)
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

				{
					permission ?
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
						:
						''
				}

			</div>

			{
				entity.length > 0 ?
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
																selectHandler('all')
															}}
															type="checkbox" />
														<div className="checkmark"></div>

													</label>
												</div>
											</th>
											:
											''
									}

									<th>{pageInfo?.tableName}</th>
								</tr>
							</thead>
							<tbody>
								{
									entity.length > 0 ?
										entity.map(item => {
											return (
												<tr key={item.id}>
													{
														permission ?
															<td className={s.select}>
																<div>
																	<label className="checkbox">
																		<input
																			checked={selectedEntity.includes(item.id)}
																			onChange={() => {
																				selectHandler(item.id)
																			}}
																			type="checkbox" />
																		<div className="checkmark"></div>
																	</label>
																</div>
															</td>
															:
															''
													}

													<td className={s.entity__name}>
														<div>
															<span className={s.entity__icon}>
																<svg xmlns="http://www.w3.org/2000/svg" width={26} viewBox="0 0 24 24">
																	<g id="SVGRepo_iconCarrier">
																		<g
																			id="页面-1"
																			fill="none"
																			fillRule="evenodd"
																			stroke="none"
																			strokeWidth="1"
																		>
																			<g id="Building" fillRule="nonzero" transform="translate(-240)">
																				<g id="building_1_line" transform="translate(240)">
																					<path
																						id="MingCute"
																						fillRule="nonzero"
																						d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035q-.016-.005-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093q.019.005.029-.008l.004-.014-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z"
																					></path>
																					<path
																						id="形状"
																						fill="#9fa6bc"
																						d="M13 3a2 2 0 0 1 1.995 1.85L15 5v4h3a2 2 0 0 1 1.995 1.85L20 11v8h1a1 1 0 0 1 .117 1.993L21 21H3a1 1 0 0 1-.117-1.993L3 19h1V5a2 2 0 0 1 1.85-1.995L6 3zm5 8h-3v8h3zm-5-6H6v14h7zm-2 10v2H8v-2zm0-4v2H8v-2zm0-4v2H8V7z"
																					></path>
																				</g>
																			</g>
																		</g>
																	</g>
																</svg>
															</span>
															{item.name}
														</div>
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