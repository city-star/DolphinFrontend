import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router"; 
import { getAuthToken } from '@/utils/auth'; 


function Register() {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const router = useRouter(); 
    
    useEffect(() => {
        if (getAuthToken()) {
            router.push("/Dashboard"); 
        }
    }, []);

// _________________ HANDLE REGISTER_____________________>

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
            return;
        }

        const userData = { name, email, password };

        try {
            const response = await fetch('http://13.203.104.224/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            toast.success("Registration successful!", { position: "top-right", autoClose: 3000, });

            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setConfirmPasswordError('');

        } catch (error) {
            console.error('Error registering user:', error.message);
            toast.error(error.message || "Registration failed", { position: "top-right", autoClose: 3000, });
        }
    };

    return (
        <div className="fixed w-full h-full flex items-center justify-center" style={{ backgroundColor: '#040408', backgroundImage: 'url("/Assets/loginimage.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <ToastContainer />

            <div className="shadow rounded lg:w-[35%] md:w-[40%] w-full p-10 bg-opacity-70 mt-8 mb-12">
                <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div>
                        <label className="text-sm font-sans leading-none text-white mt-2">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-gray-800 rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3 mb-2"
                            style={{ backgroundColor: '#040414', border: '1px solid #043bbc' }}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm font-sans leading-none text-white">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-800 rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3 mb-2"
                            style={{ backgroundColor: '#040414', border: '1px solid #043bbc' }}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="text-sm font-sans leading-none text-white">Password</label>
                        <div className="relative flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
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

                    {/* Confirm Password */}
                    <div className="relative">
                        <label className="text-sm font-sans leading-none text-white">Confirm Password</label>
                        <div className="relative flex items-center">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    if (e.target.value !== password) {
                                        setConfirmPasswordError("Passwords do not match");
                                    } else {
                                        setConfirmPasswordError("");
                                    }
                                }}
                                className="bg-gray-800 rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3"
                                style={{ backgroundColor: '#040414', border: '1px solid #043bbc' }}
                                required
                            />
                            <div
                                className="absolute right-3 cursor-pointer"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <MdVisibilityOff color='white' /> : <MdVisibility color='white' />}
                            </div>
                        </div>
                        {confirmPasswordError && <p className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>}
                    </div>

                    {/* Terms and Conditions checkbox */}
                    <div className="mt-4 flex items-center">
                        <input
                            id="terms"
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                            required
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm leading-5 text-white">
                            Agree to the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-2">
                        <button
                            type="submit"
                            className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 text-sm font-semibold leading-none text-white focus:outline-none bg-blue-700 rounded hover:bg-indigo-600 py-4 w-full"
                            style={{ backgroundColor: '#0086c9', border: '1px solid #043bbc' }}
                        >
                            Create my account
                        </button>
                    </div>
                </form>

                {/* Login Link */}
                <p className="text-sm mt-4 font-medium leading-none text-gray-500 text-center">
                    Already have an account?{' '}
                    <Link href="/Login">
                        <span className="text-blue-500 cursor-pointer">Login</span>
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
