'use client'

import {  toast } from 'react-toastify';

import { useForm, Controller } from "react-hook-form";
import { Select } from 'antd';
import Link from 'next/link';


export default function Reg({apiUrl}) {
    const { register, control, handleSubmit, formState: { errors } } = useForm({
        mode: 'onSubmit'
    })
    

    const onSubmit = async (data) => {
        const userObject = {
            first_name : data.firstName,
            last_name : data.lastName,
            father_name : data.fatherName,
            gender : data.gender,
            phone_number_1 : data.phone1,
            phone_number_2 : data.phone2,
            passport_id : data.passportId,
            user_type : data.role,
            email : data.email
        }
        

        try {
            const resp = await toast.promise(
                fetch(`${apiUrl}users/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify(userObject)
                }) ,
                {
                    pending: 'Məlumatlar göndərilir',
                    success: 'Hesab ugurla yaradıldı 👌',
                    error: 'Xəta baş verdi..'
                  }
            )
                      

        } catch (error) {
            
        }
    }

    return (
        <section className="access__container">
            <div className="logo">
                <img src="/assets/logo.png" alt="Logo" width={80} />
                <h1>Xoş gəlmisiniz!</h1>
                <h2>Hesab yaradın</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="reg__form">
                <label>
                    <p>Ad</p>
                    <input type="text" {
                        ...register('firstName',
                            {
                                required: 'Adınızı daxil edin!',
                                minLength: {
                                    value: 3,
                                    message: 'Adınızı düzgün daxil edin!',
                                },
                                pattern: {
                                    value: /^[a-zA-Zа-яА-Я]+$/,
                                    message: 'Adınızı düzgün daxil edin!',
                                },
                            }
                        )
                    }
                        placeholder='Adınızı daxil edin' />
                    <p className={`error__message ${errors.firstName ? 'show' : ''}`}>{errors?.firstName?.message}</p>
                </label>

                <label>
                    <p>Soyad</p>
                    <input type="text" {
                        ...register('lastName', {
                            required: 'Soyadınızı daxil edin!',
                            minLength: {
                                value: 3,
                                message: 'Soyadınızı düzgün daxil edin!',
                            },
                            pattern: {
                                value: /^[a-zA-Zа-яА-Я]+$/,
                                message: 'Soyadınızı düzgün daxil edin!',
                            },
                        })
                    }
                        placeholder='Soyadınızı daxil edin' />
                    <p className={`error__message ${errors.lastName ? 'show' : ''}`}>{errors?.lastName?.message}</p>
                </label>

                <label>
                    <p>Ata adı</p>
                    <input type="text" {
                        ...register('fatherName', {
                            required: 'Ata adını daxil edin!',
                            minLength: {
                                value: 3,
                                message: 'Ata adı düzgün daxil edin!',
                            },
                            pattern: {
                                value: /^[a-zA-Zа-яА-Я]+$/,
                                message: 'Ata adı düzgün daxil edin!',
                            },
                        })
                    }
                        placeholder='Ata adı daxil edin' />
                    <p className={`error__message ${errors.fatherName ? 'show' : ''}`}>{errors?.fatherName?.message}</p>
                </label>

                <label>
                    <p>FİN kod</p>
                    <input type="text" {
                        ...register('passportİd', {
                            required: 'FIN kodu daxil edin!',
                            pattern: {
                                value: /^[a-zA-Z0-9]+$/,
                                message: 'FİN kodu düzgün daxil edin!',
                            },
                            minLength: {
                                value: 6,
                                message: 'FIN kod ən azı 6 simvoldan ibaret olur',
                            },
                            maxLength: {
                                value: 7,
                                message: 'FIN kod 7 simvoldan çox olmamalıdır!'
                            }
                        })
                    }
                        placeholder='FIN kodu daxil edin' />
                    <p className={`error__message ${errors.passportİd ? 'show' : ''}`}>{errors?.passportİd?.message}</p>
                </label>

                <label>
                    <p>Cinsiyyətiniz</p>
                    <Controller
                        name="gender"
                        control={control}
                        rules={{ required: 'Cinsiyyət seçməlməlidir!' }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                placeholder="Cinsiyyətinizi seçin"
                                style={{ width: '100%', height: '39px' }}
                                onChange={(value) => field.onChange(value)}
                                onBlur={field.onBlur}
                                value={field.value}

                                options={[
                                    {
                                        value: 'M',
                                        label: 'Kişi',
                                    },
                                    {
                                        value: 'F',
                                        label: 'Qadın',
                                    },
                                    {
                                        value: 'O',
                                        label: 'Digər',
                                    }
                                ]}
                            /> 
                        )}
                    />
                    <p className={`error__message ${errors.gender ? 'show' : ''}`}>
                        {errors.gender?.message}
                    </p>
                </label>

                <label>
                    <p>Istifadeci növü</p>
                    <Controller
                        name="role"
                        control={control}
                        rules={{ required: 'Istifadeci növünü seçin!' }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                placeholder="Istifadeci seçin"
                                style={{ width: '100%', height: '39px' }}
                                onChange={(value) => field.onChange(value)}
                                onBlur={field.onBlur}
                                value={field.value}

                                options={[
                                    {
                                        value: 'director',
                                        label: 'Director',
                                    },
                                    {
                                        value: 'staff',
                                        label: 'Işci',
                                    },
                                    {
                                        value: 'teacher',
                                        label: 'Müəllim',
                                    },
                                    {
                                        value: 'parent',
                                        label: 'Valideyin',
                                    },
                                    {
                                        value: 'student',
                                        label: 'Tələbə',
                                    },
                                ]}
                            >
                            </Select>
                        )}
                    />
                    <p className={`error__message ${errors.role ? 'show' : ''}`}>
                        {errors.role?.message}
                    </p>
                </label>



                <label>
                    <p>Əlaqə nömrə 1</p>
                    <input
                        type="text"
                        {...register('phone1', {
                            required: 'Əlaqə nömrəsi daxil edilməlidir!',
                            pattern: {
                                value: /^\+994\d{9}$/,
                                message: 'Əlaqə nömrəsi düzgün deyil!',
                            },
                        })}
                        placeholder='Əlaqə nömrəsi daxil edin'
                    />
                    <p className={`error__message ${errors.phone1 ? 'show' : ''}`}>{errors?.phone1?.message}</p>
                </label>

                <label>
                    <p>Əlaqə nömrə 2</p>
                    <input
                        type="text"
                        {...register('phone2', {
                            required: 'Əlaqə nömrəsi daxil edilməlidir!',
                            pattern: {
                                value: /^\+994\d{9}$/,
                                message: 'Əlaqə nömrəsi düzgün deyil!'
                            },
                        })}
                        placeholder='Əlaqə nömrəsi daxil edin'
                    />
                    <p className={`error__message ${errors.phone2 ? 'show' : ''}`}>{errors?.phone2?.message}</p>
                </label>


                <label>
                    <p>E-mail</p>
                    <input type="text" {
                        ...register('email', {
                            required: "Email mütləqdir!",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'E-mail düzgün deyil',
                            }
                        })
                    }

                        placeholder='E-mailinizi daxil edin' />
                    <p className={`error__message ${errors.email ? 'show' : ''}`}>{errors?.email?.message}</p>

                </label>

              

                <button type="submit" className="submit__btn">
                    Hesab yarat
                </button>
            </form>
            <h5 className='to__login'>Hesabınız var? <Link href={`/login`}>Daxil Olun</Link></h5>
        </section>
    )
}