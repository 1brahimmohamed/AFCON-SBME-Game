import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { forgotPassword } from "../../../services/apiAuth";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ForgetPasswordPage = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
    });

    const navigate = useNavigate();


    const emailChangeHandler = (event: any) => {
        setFormData({
            ...formData,
            email: event.target.value
        })
    };


    const submitHandler = async (event: any) => {
        event.preventDefault();

        if (formData.email === '') {
            withReactContent(Swal).fire({
                text: "Please fill the email!",
                icon: "error",
                confirmButtonColor: "#fa0505",
                timer: 1500
            })
            return;
        }

        setIsSubmitting(true);

        const res = await forgotPassword(formData);

        setIsSubmitting(false);

        if (res.status === "success") {

            // fire swal and redirect
            withReactContent(Swal).fire({
                text: "Check your email",
                icon: "success",
                confirmButtonColor: "#002c1e",
                timer: 1500
            })

            setTimeout(() => {
                navigate('/');
            }, 2000)
        } else {
            withReactContent(Swal).fire({
                text: res.message,
                icon: "error",
                confirmButtonColor: "#fa0505",
                timer: 1500
            })
        }
    }


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <Link to="/">
                        <img
                            className="mx-auto h-14 w-auto"
                            src="https://i.postimg.cc/rmjPmKvg/LOGO.png"
                            alt="SBME CAN 2024"
                        />
                    </Link>
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Forgot Your Password?
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
                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    onClick={submitHandler}
                                    className="flex w-full disabled:bg-gray-400 justify-center rounded-md bg-AAPrimary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-AAPrimaryDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
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

export default ForgetPasswordPage;
