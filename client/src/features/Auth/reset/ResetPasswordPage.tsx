import {useState} from "react";
import {Link, useLoaderData, useNavigate} from "react-router-dom";
import {checkIfResetTokenExists, resetPassword} from "../../../services/apiAuth";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {

    const  data : any = useLoaderData();

    const token = data.token;
    const name = data.name;

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        password: '',
        passwordConfirm: ''
    });

    const navigate = useNavigate();


    const passwordChangeHandler = (event: any) => {
        setFormData({
            ...formData,
            password: event.target.value
        })
    };

    const passwordConfirmChangeHandler = (event: any) => {
        setFormData({
            ...formData,
            passwordConfirm: event.target.value
        })
    };


    const submitHandler = async (event: any) => {
        event.preventDefault();

        if (formData.password === '' || formData.passwordConfirm === '') {
            toast.error("Please fill all fields!", {duration: 1500});
            return;
        }

        setIsSubmitting(true);

        const res = await resetPassword(formData, token);

        setIsSubmitting(false);

        if (res.status === "success") {

            toast.success("Redirecting to login page", {duration: 1500})

            setTimeout(() => {
                navigate('/auth/login');
            }, 2000)
        } else {
            toast.error(res.message, {duration: 1500});
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
                        Hey {name}, Reset your password
                    </h2>
                </div>

                {/* Card */}
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-AAPrimary sm:text-sm sm:leading-6"
                                        onChange={passwordChangeHandler}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password Confirm
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="passwordConfirm"
                                        name="passwordConfirm"
                                        type="password"
                                        autoComplete="passwordConfirm"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-AAPrimary sm:text-sm sm:leading-6"
                                        onChange={passwordConfirmChangeHandler}
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


export const loader = async ({params}: { params: any }) => {
    // get the url param
    const {token} = params;

    const data : any = await checkIfResetTokenExists(token)

    if (data.status === "success") {
        return {
            token: token,
            name: data.data.name
        }
    } else {
        throw new Error(data.message);
    }
};
export default ResetPasswordPage;
