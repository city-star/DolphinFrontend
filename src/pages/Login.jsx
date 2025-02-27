import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { getAuthToken } from '@/utils/auth'; 



function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter(); 
    
    useEffect(() => {
        if (getAuthToken()) {
            router.push("/Dashboard"); 
        }
    }, []);
// ________________ HANDLE LOGIN __________________>

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { username, password };
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login Failed");
            }

            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            router.push('/Dashboard');

            toast.success('Login Successful', { position: "top-right", autoClose: 3000 });

            setUsername('');
            setPassword('');

        } catch (error) {
            console.error("Error in login", error);
            toast.error(error.message || "Login failed", { position: "top-right", autoClose: 3000 });
        }
    };

    return (
        <>
            <div className="fixed w-full h-full items-center" style={{ backgroundColor: '#040408', backgroundImage: 'url("/Assets/loginimage.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <ToastContainer />
                <div className="flex flex-col items-center justify-center">
                    <div className="shadow rounded lg:w-[35%] md:w-[40%] w-full p-10 mt-14 ">
                        <div className="flex flex-col items-center justify-center mb-16">
                            <img src='/Assets/cryptobotLogo.png' alt='Cryptobot Logo' width={230} height={170} />
                        </div>

                        <p tabIndex={0} role="heading" aria-label="Login to your" className="text-xl font-extrabold leading-6 text-white text-center">Login</p>

                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="text-sm font-sans leading-none text-white">Email</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="bg-gray-800 rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3 pr-16 mb-2"
                                    style={{ backgroundColor: '#040414', border: '1px solid #043bbc' }}
                                    required
                                />
                            </div>

                            <div className="relative">
                                <label className="text-sm font-sans leading-none text-white">Password</label>
                                <div className="relative flex items-center">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="bg-gray-800 rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3 mb-2"
                                        style={{ backgroundColor: '#040414', border: '1px solid #043bbc' }}
                                        required
                                    />
                                    <div
                                        className="absolute right-3 cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <MdVisibilityOff color='white' /> : <MdVisibility color='white' />}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <button
                                    type="submit"
                                    className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 text-sm font-semibold leading-none text-white focus:outline-none bg-blue-700 rounded hover:bg-indigo-600 py-4 w-full"
                                    style={{ backgroundColor: '#0086c9', border: '1px solid #043bbc' }}>
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
