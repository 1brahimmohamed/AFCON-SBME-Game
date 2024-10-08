import { Link } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import {useNavigate} from "react-router-dom";

const HomePage = () => {

    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();

    const onGetStarted = () => {
        // if user is logged in, redirect to dashboard
        // else redirect to login page
        if (isAuthenticated) {
            navigate('/today-matches');
        } else {
            navigate('/auth/register');
        }
    };

    return (
        <div className="bg-white">

            <div className="relative isolate overflow-hidden h-[100vh] pt-14">
                <img
                    src="/hero.jpg"
                    alt=""
                    className="hidden md:block absolute inset-0 -z-10 h-full w-full object-cover"
                />

                <img
                    src="/grid.jpg"
                    alt=""
                    className="md:hidden absolute inset-0 -z-10 h-full w-full object-cover"
                />
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-AASecondary to-AASecondaryDark opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div
                            className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
                            Announcing our leaderboards.{' '}
                            <Link to="/leaderboards" className="font-semibold text-white">
                                <span className="absolute inset-0" aria-hidden="true"/>
                                Take a look <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            EMBS SBME - <br/> UEFA EURO 2024 Prediction Game
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Join one of the biggest prediction game in the history of SBME
                        </p>
                        <p dir="rtl" className="mt-6  text-lg leading-8 text-gray-300 ">
                            في حالة انك متعرفش .. فا طبية 24 بتتخرج 🎓
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <button
                                onClick={onGetStarted}
                                className="rounded-md bg-AAPrimary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-AAPrimaryLight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                            >
                                Get started
                            </button>
                        </div>

                        <div className="mt-36 md:mt-16 space-y-6 flex-col items-center justify-center">
                            <div>
                                <h6 className=" text-center font-bold leading-9 tracking-tight text-white">
                                    Sponsored by
                                </h6>
                            </div>

                            <div className={"flex justify-center"}>
                                <div className={"bg-white w-1/2 md:w-1/3 p-2 rounded-lg"}>
                                    <Link to={"https://edu.ieee.org/eg-cu-embs/"} target={"_blank"}>
                                        <img
                                            className="mx-auto h-8 w-auto"
                                            src="https://i.postimg.cc/Dycj2J3N/3rd.png"
                                            alt="SBME CAN 2024"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-AAPrimary to-AASecondaryDark opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePage
