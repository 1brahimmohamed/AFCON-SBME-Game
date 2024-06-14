import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Dialog} from "@headlessui/react";
import {useState} from "react";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useSignOut from 'react-auth-kit/hooks/useSignOut';


const navigation = [
    {name: "Today's Matches", href: '/today-matches'},
    {name: 'All Matches', href: '/all-matches'},
    {name: 'Leaderboards', href: '/leaderboards'},
    {name: 'Rules', href: '/rules'},
    {name: 'Hall of Fame', href: '/hall-of-fame'},
]

const Navbar = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const isAuthenticated = useIsAuthenticated();
    const authUser: any = useAuthUser();

    const location = useLocation().pathname;
    const signOut = useSignOut();
    const navigate = useNavigate();

    const logoutHandler = () => {
        signOut();
        navigate('/');
    }

    return (
        <header className={`${location === '/' ? "absolute" : "bg-AAPrimaryDark mb-10"} inset-x-0 top-0 z-50`}>
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1">
                        <span className="sr-only">SBME CAN 2024</span>
                        <img
                            className="h-14 w-auto"
                            src="/logo.png"
                            alt="logo"
                        />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} to={item.href}
                              className="text-sm font-semibold leading-6 text-white hover:text-AASecondary">
                            <button>
                                {item.name}
                            </button>
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end text-sm font-semibold leading-6 text-white">
                    {
                        isAuthenticated ? (
                            <button onClick={logoutHandler} className={"hover:text-AASecondary"}>
                                Logout
                            </button>
                        ) : (
                            <div className="flex gap-4">
                                <div className="hover:text-AASecondary">
                                    <Link to="/auth/login">
                                        <button> Log in <span aria-hidden="true">&rarr;</span></button>
                                    </Link>
                                </div>
                                <div className="hover:text-AASecondary">
                                    <Link to="/auth/register">
                                        <button>Register <span aria-hidden="true">&rarr;</span></button>
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-50"/>
                <Dialog.Panel
                    className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-AAPrimaryDark px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">EMBS</span>
                            <img
                                className="h-14 w-auto"
                                src="/logo.png"
                                alt="logo"
                            />
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-400"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                        </button>
                    </div>

                    <div className="mt-6 flow-root">
                        {
                            isAuthenticated &&
                            (
                                <div
                                    className="-mx-3 block space-y-5 rounded-lg px-3 py-3 font-bold leading-7 text-white"
                                >
                                    ALOHA, {authUser.name.toUpperCase()}
                                </div>
                            )
                        }
                        <div className="-my-6 divide-y divide-AASecondaryLight">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <div
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-AASecondary">
                                        <Link
                                            onClick={() => setMobileMenuOpen(false)}
                                            key={item.name}
                                            to={item.href}
                                        >
                                            <div className={"w-full"}>
                                                {item.name}
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            <div className="py-6">
                                {
                                    isAuthenticated ? (
                                        <button
                                            onClick={logoutHandler}
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                                        >
                                            Logout
                                        </button>
                                    ) : (
                                        <div
                                            className="-mx-3 block space-y-5 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white"
                                        >
                                            <div className="hover:text-AASecondary">
                                                <Link to="/auth/login">
                                                    Log in <span aria-hidden="true">&rarr;</span>
                                                </Link>
                                            </div>
                                            <div className="hover:text-AASecondary">
                                                <Link to="/auth/register">
                                                    Register <span aria-hidden="true">&rarr;</span>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
};

export default Navbar;
