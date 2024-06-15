import {Popover, Transition} from "@headlessui/react";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {Fragment} from "react";
import {Link} from "react-router-dom";

function classNames(...classes :any) {
    return classes.filter(Boolean).join(' ')
}

const navigation = [
    { name: 'Users', href: '/eur-admin/users', current: true },
    { name: 'Matches', href: '/eur-admin/matches', current: false },
]


const Header = () => {
    return (
        <Popover as="header" className="bg-AAPrimary">
            {({open}) => (
                <>
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="relative flex items-center justify-start py-5 lg:justify-between">
                            {/* Logo */}
                            <div className="left-0 flex-shrink-0 lg:static">
                                <Link to={"/eur-admin"}>
                                    <span className="sr-only">EMBS</span>
                                    <img
                                        className="h-14 w-auto"
                                        src="/logo.png"
                                        alt="SBME AFCON"
                                    />
                                </Link>
                            </div>


                            {/* Menu button */}
                            <div className="absolute right-0 flex-shrink-0 lg:hidden">
                                {/* Mobile menu button */}
                                <Popover.Button
                                    className="relative inline-flex items-center justify-center rounded-md bg-transparent p-2 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                                    <span className="absolute -inset-0.5"/>
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Popover.Button>
                            </div>
                        </div>
                        <div className="hidden border-t border-white border-opacity-20 py-5 lg:block">
                            <div className="grid grid-cols-3 items-center gap-8">
                                <div className="col-span-2">
                                    <nav className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    item.current ? 'text-white' : 'text-indigo-100',
                                                    'rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Transition.Root as={Fragment}>
                        <div className="lg:hidden">
                            <Transition.Child
                                as={Fragment}
                                enter="duration-150 ease-out"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="duration-150 ease-in"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Popover.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-25"/>
                            </Transition.Child>

                            <Transition.Child
                                as={Fragment}
                                enter="duration-150 ease-out"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="duration-150 ease-in"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Popover.Panel
                                    focus
                                    className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition"
                                >
                                    <div
                                        className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                        <div className="pb-2 pt-3">
                                            <div className="flex items-center justify-between px-4">
                                                <div>
                                                    <img
                                                        className="h-8 w-auto"
                                                        src="/logo.png"
                                                        alt="Your Company"
                                                    />
                                                </div>
                                                <div className="-mr-2">
                                                    <Popover.Button
                                                        className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                                        <span className="absolute -inset-0.5"/>
                                                        <span className="sr-only">Close menu</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                                    </Popover.Button>
                                                </div>
                                            </div>
                                            <div className="mt-3 space-y-1 px-2">
                                                {navigation.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        to={item.href}
                                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition.Child>
                        </div>
                    </Transition.Root>
                </>
            )}
        </Popover>
    )
};

export default Header
