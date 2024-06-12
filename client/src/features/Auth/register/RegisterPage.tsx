import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import CountrySelectBox from "./CountrySelectBox.tsx";
import {register} from "../../../services/apiAuth";
import ClassSelectBox from "./ClassSelectBox.tsx";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import toast from "react-hot-toast";



const RegisterPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        passwordConfirm: '',
        country: 'France',
        class: 'SBME 2024'
    });


    const navigate = useNavigate();


    const formChangeHandler = (event: any) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    };

    const countrySelectHandler = (event: any) => {
        setFormData({
            ...formData,
            country: event.name
        })
    }

    const classSelectHandler = (event: any) => {
        setFormData({
            ...formData,
            class: event.name
        })
    }

    const isAuthenticated = useIsAuthenticated();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, []);


    const submitHandler = async (event: any) => {
        event.preventDefault();


        if (formData.name === '' || formData.email === '' || formData.password === '' || formData.passwordConfirm === '') {
            toast.error("Please fill all fields", {duration: 2500, position: 'bottom-center'})
            return;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters", {duration: 2500, position: 'bottom-center'})
            return;
        }

        // check if passwords match
        if (formData.password !== formData.passwordConfirm) {
            toast.error("Passwords do not match", {duration: 2500, position: 'bottom-center'})
            return;
        }

        // check if email is @eng-st
        if (!formData.email.includes('@eng-st')) {
            toast.error("Only @eng-st.cu.edu.eg emails are allowed", {duration: 2500, position: 'bottom-center'})
            return;
        }

        setIsSubmitting(true);

        const res = await register(formData);

        setIsSubmitting(false);

        if (res.status === "success") {

            toast.success("Register Successful .. Login Now !", {duration: 2000, icon: '🚀'})

            setTimeout(() => {
                navigate('/auth/login');
            }, 2000)

        } else {
            toast.success(res.message || "Something went wrong", {duration: 2000})
        }

    };

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
                        Create your account
                    </h2>

                    <h2 className="mt-3 text-center text-md font-bold leading-9 tracking-tight text-gray-900">
                        Only @eng-st.cu.edu.eg emails are allowed
                    </h2>
                </div>

                {/* Card */}
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <form className="space-y-6">

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="name"
                                        autoComplete="name"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-AAPrimary sm:text-sm sm:leading-6"
                                        onChange={formChangeHandler}
                                    />
                                </div>
                            </div>

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
                                        onChange={formChangeHandler}
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
                                        onChange={formChangeHandler}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="passwordConfirm"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Password Confirmation
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="passwordConfirm"
                                        name="passwordConfirm"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-AAPrimary sm:text-sm sm:leading-6"
                                        onChange={formChangeHandler}
                                    />
                                </div>
                            </div>

                            <ClassSelectBox onChange={classSelectHandler}/>
                            <CountrySelectBox onChange={countrySelectHandler}/>

                            <div>
                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    onClick={submitHandler}
                                    className="flex w-full disabled:bg-gray-400 justify-center rounded-md bg-AAPrimary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-AAPrimaryDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Register
                                </button>
                            </div>


                        </form>
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?{' '}
                        <Link to="/auth/login"
                              className="font-semibold leading-6 text-AAPrimary hover:text-AAPrimaryLight">
                            Sign in, Yalla
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

export default RegisterPage;
