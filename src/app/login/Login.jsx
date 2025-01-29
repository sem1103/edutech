'use client'

import { toast } from 'react-toastify';

import { useForm } from "react-hook-form";
import { Modal } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import userStore from '../../../store/userStore';
import useDataStore from '../../../store/dataStore';


export default function Login({ apiUrl }) {
    const { login } = userStore();
    const {changePass} = useDataStore()
    const router = useRouter();
    const [showResetModal, setShowResetModal] = useState(false);
    const [sessionToken, setSessionToken] = useState('');
    const [oldPass, setOldPass] = useState('');
    const [firsLoginModal, SetFirstLoginModal] = useState(false);
    const [rememmber, setRememmber] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onSubmit'
    })
    const { register: registerLogin, handleSubmit: registerSubmitHandler, formState: { errors: loginErrors } } = useForm({
        mode: 'onSubmit'
    })

    const { register: newPassRegister, handleSubmit: newPassHandleSubmit, formState: { errors: passSetErrors } } = useForm({
        mode: 'onSubmit'
    });






    const onSubmit = async (data) => {
        console.log(data);
        const toastId = toast.loading('Giriş məlumatları yoxlanılır...')
        const userObject = {
            email: data.email,
            password: data.pass
        }

        try {
            const data = await fetch(`${apiUrl}token/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userObject)
            })

            const resp = await data.json();


            if (data.ok) {
                if (resp.user.first_time_login) {
                    setSessionToken(resp.access)
                    SetFirstLoginModal(!firsLoginModal);
                    toast.update(toastId, {
                        render: 'Zəhmət olmasa yeni şifrə təyin edin!',
                        type: 'info',
                        autoClose: 1500,
                        isLoading: false
                    });
                } else {
                    toast.update(toastId, {
                        render: 'Giriş uğurla tamamlandı!',
                        type: 'success',
                        autoClose: 1000,
                        isLoading: false
                    });
                    login(resp.access, rememmber)
                    router.push('/dashboard')
                }


            } else {
                toast.update(toastId, {
                    render: 'E-mail və ya şifrə səhvdir!',
                    type: 'error',
                    autoClose: 1000,
                    isLoading: false
                })
            }

        } catch (error) {
            console.log(error);


        }
    }

    const setNewPassHandler = async data => {
        const toastId = toast.loading('Sorgu göndərildi...')

        try {
            const res = await changePass(sessionToken, oldPass, data.newPass);

            if(res.ok){
                toast.update(toastId, {
                    render: 'Şifrə uğurla yeniləndi!',
                    type: 'success',
                    autoClose: 1000,
                    isLoading: false
                });
                login(sessionToken, rememmber)
                router.push('/dashboard')
            }else {
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

    const resetPassSend = async data => {
        const toastId = toast.loading('Sorğu göndərilir');

        try {
            const res = await fetch(`${apiUrl}request-reset-password/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: data.resetEmail })
            })

            if (res.ok) {
                toast.update(toastId, {
                    render: 'Şifrəni deyişmək üçün mesaj göndərildi!',
                    type: 'success',
                    autoClose: 2000,
                    isLoading: false
                });

            } else {
                toast.update(toastId, {
                    render: 'E-mail səhvdir!',
                    type: 'error',
                    autoClose: 2000,
                    isLoading: false
                })
            }

        } catch (error) {

        }

    }



    return (
        <section className="access__container">
            <div className="logo">
                <img src="/assets/logo-icon.svg" alt="Logo" width={120} />
                <h1>Xoş gəlmisiniz!</h1>
                <h2>Hesabınıza daxil olun</h2>
            </div>

            <form onSubmit={registerSubmitHandler(onSubmit)} className="login__form">
                <label>
                    <p>E-mail</p>
                    <input type="email" {
                        ...registerLogin('email', {
                            required: "Email mütləqdir!",

                        })
                    }

                        placeholder='E-mailinizi daxil edin' />
                    <p className={`error__message ${errors.email ? 'show' : ''}`}>{errors?.email?.message}</p>

                </label>

                <label>
                    <p>Şıfrə</p>
                    <input type="password"
                        onInput={e => {
                            setOldPass(e.target.value);
                        }}
                        {
                        ...registerLogin('pass')
                        }

                        placeholder='Şıfrəni daxil edin' />
                </label>

                <div className='options'>
                    <label className="checkbox">
                        <input type="checkbox" onChange={() => setRememmber(!rememmber)} />
                        <div className="checkmark"></div>
                        <p>Yadda saxla</p>
                    </label>
                    <button type='button' onClick={() => setShowResetModal(true)}>Şıfrəni unutmusuz?</button>
                </div>

                <button type='submit' className="submit__btn">
                    Daxil Ol
                </button>
            </form>
            <h5 className='to__login'>Hesabınız yoxdur? <Link href={`/registration`}>Qeydiyyatdan keçin</Link></h5>

            <Modal className={'reset__pass'} title={'Şifrənizi unutmusuz?'} open={showResetModal} footer={false} onCancel={() => setShowResetModal(false)}>
                <p>E-mail adresinizi aşağıya daxil edin və sizə sıfırlama linki göndərəcəyik</p>
                <form className='access__container' onSubmit={handleSubmit(resetPassSend)}>
                    <label>
                        <input type="email" {
                            ...register('resetEmail', {
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
                        Göndər
                    </button>
                </form>
            </Modal>

            <Modal className='firs__login' title={'Diqqət!'} open={firsLoginModal} footer={false} onCancel={() => SetFirstLoginModal(false)}>
                <p>Siz ilk dəfə hesanımıza giriş etdiyiniz üçün şifrəni yeniləməlisiniz!
                    <br />
                    Zəhmət olmasa yeni şifrəni təyin edin.
                </p>
                <form className='set__password' onSubmit={newPassHandleSubmit(setNewPassHandler)}>
                    <label>
                        <input type="password" {
                            ...newPassRegister('newPass', {
                                required: true,
                                minLength: {
                                    value: 6,
                                    message: 'Minimum 6 simvol olmalidir!'
                                }
                            })
                        }

                            placeholder='Yeni şifrə...' />
                        <p className={`error__message ${passSetErrors.newPass ? 'show' : ''}`}>{passSetErrors?.newPass?.message}</p>

                    </label>
                    <button type="submit" className="submit__btn">
                        Yenilə
                    </button>
                </form>
            </Modal>
        </section>
    )
}