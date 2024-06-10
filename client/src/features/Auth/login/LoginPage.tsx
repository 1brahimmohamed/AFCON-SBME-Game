import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import {login} from "../../../services/apiAuth";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'


export default function LoginPage() {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const signIn = useSignIn();

    const emailChangeHandler = (event: any) => {
        setFormData({
            ...formData,
            email: event.target.value
        })
    };

    const passwordChangeHandler = (event: any) => {
        setFormData({
            ...formData,
            password: event.target.value
        });
    };

    const submitHandler = async (event: any) => {
        event.preventDefault();

        if (formData.email === '' || formData.password === '') {
            withReactContent(Swal).fire({
                text: "Please fill all the fields!",
                icon: "error",
                confirmButtonColor: "#fa0505",
                timer: 1500
            })
            return;
        }

        setIsSubmitting(true);

        const res = await login(formData);

        setIsSubmitting(false);

        if (res.status === "success") {
            if (
                signIn({
                    auth: {
                        token: res.data.token,
                        type: "Bearer",
                    },
                    userState: res.data.data.user
                })
            ) {

                // fire swal and redirect
                withReactContent(Swal).fire({
                    text: "Login Successful!",
                    icon: "success",
                    confirmButtonColor: "#002c1e",
                    timer: 1500
                })

                setTimeout(() => {
                    navigate('/today-matches');
                }, 2000)
            }
        } else {
            withReactContent(Swal).fire({
                text: res.message,
                icon: "error",
                confirmButtonColor: "#fa0505",
                timer: 1500
            })
        }
    };

    const isAuthenticated = useIsAuthenticated();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/');
        }
    }, []);

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <Link to="/">
                        <img
                            className="mx-auto h-14 w-auto"
                            src="/color.png"
                            alt="SBME CAN 2024"
                        />
                    </Link>
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                {/* Card */}
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-AAPrimary sm:text-sm sm:leading-6"
                                        onChange={emailChangeHandler}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-AAPrimary sm:text-sm sm:leading-6"
                                        onChange={passwordChangeHandler}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">

                                </div>

                                <div className="text-sm leading-6">
                                    <Link to="/auth/forget-password" className="font-semibold text-AAPrimary hover:text-AAPrimaryLight">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>


                            <div>
                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    onClick={submitHandler}
                                    className="flex w-full disabled:bg-gray-400 justify-center rounded-md bg-AAPrimary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-AAPrimaryDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link to="/auth/register"
                              className="font-semibold leading-6 text-AAPrimary hover:text-AAPrimaryLight">
                            Bethazr .. Sign up now w not ya m3lem
                        </Link>
                    </p>
                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-md mt-6 space-y-6">

                    <h6 className="mt-6 text-center font-bold leading-9 tracking-tight text-gray-900">
                        Sponsored by
                    </h6>
                    <Link to={"https://edu.ieee.org/eg-cu-embs/"} target={"_blank"}>
                    <img
                            className="mx-auto h-8 w-auto"
                            src="https://i.postimg.cc/Dycj2J3N/3rd.png"
                            alt="SBME CAN 2024"
                        />
                    </Link>

                </div>
            </div>
        </>
    )
}
