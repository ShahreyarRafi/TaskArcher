import { useEffect, useState, useContext } from 'react';
import logo from '/TaskArcher.png'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import userPicPlaceholder from '../../../assets/images/userPicPlaceHolder.png';
import profile from '../../../assets/images/userIconWhite.png';
import profileDark from '../../../assets/images/userIconBlack.png';
import { AuthContext } from "../../../services/Firebase/AuthProvider";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import useAdmin from '../../../Hook/useAdmin';
import { useQuery } from 'react-query';




const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isAdmin] = useAdmin()

    const handleLogout = () => {
        logout();
        navigate("/"); // Redirect to the home page after successful logout
    };

    const userTheme = localStorage.getItem('theme');

    // default light
    // const [theme, setTheme] = useState(userTheme === 'dark' ? true : false);

    // default dark
    // const [theme, setTheme] = useState(userTheme === 'light' ? false : true);

    // Set the initial theme state based on the user's preference or default to dark
    const [theme, setTheme] = useState(userTheme === 'dark' ? true : false);

    const toggleTheme = () => {
        const newTheme = !theme;
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme);
    }, [theme]);

    const { isPending, data: upcoming } = useQuery({
        queryKey: ['upcoming'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/Upcoming')
            return res.json();
        }
    })


    return (
        <nav className="relative flex flex-wrap items-center justify-between shadow-sm px-2 py-4 font-poppins whitespace-nowrap bg-white bg-opacity-40 backdrop-blur-lg dark:bg-[#062230] duration-300">
            <div className="w-full px-1 md:px-7 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex items-center justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    <div className='flex items-center gap-4 mr-5'>
                        <img className='h-16' src={logo} alt="" />
                        <a
                            className="text-xl xl:text-2xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-black dark:text-white duration-300"
                            href="/"
                        >
                            Task Archer
                        </a>
                    </div>
                    <button
                        className="text-black dark:text-white duration-300 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                        type="button"
                        onClick={() => setNavbarOpen(!navbarOpen)}
                    >
                        <details>
                            <summary>

                            </summary>
                        </details>
                    </button>
                </div>
                <div
                    className={
                        "lg:flex flex-grow items-center" +
                        (navbarOpen ? " flex" : " hidden")
                    }
                    id="example-navbar-danger"
                >
                    <div className='w-full flex justify-between items-center mt-5 lg:mt-0 mb-2 lg:mb-0'>
                        <div className='flex text-center w-full lg:-ml-36'>
                            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto gap-3 xl:gap-5 lg:mx-auto">
                                <li className="nav-item px-1 xl:px-3 py-2 flex items-center text-sm xl:text-base uppercase font-semibold  text-black dark:text-white duration-300 hover:opacity-75">
                                    <NavLink
                                        to="/"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-[#F49C4D]" : ""
                                        }
                                    >
                                        HOME
                                    </NavLink>
                                </li>
                                <li className="nav-item px-1 xl:px-3 py-2 flex items-center text-sm xl:text-base uppercase font-semibold text-black dark:text-white duration-300 hover:opacity-75">
                                    <NavLink
                                        to="/contact-us"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-[#F49C4D]" : ""
                                        }
                                    >
                                        CONTACT US
                                    </NavLink>
                                </li>
                                <li className="nav-item px-1 xl:px-3 py-2 flex items-center text-sm xl:text-base uppercase font-semibold  text-black dark:text-white duration-300 hover:opacity-75">
                                    <NavLink
                                        to="/about-us"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-[#F49C4D]" : ""
                                        }
                                    >
                                        ABOUT US
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div >
                            <ul className=" flex lg:items-center justify-center items-end flex-col lg:flex-row list-none lg:ml-auto gap-3 xl:gap-5">
                                {!user && (
                                    <li>
                                        <ul className="flex items-center gap-2 md:gap-5">
                                            <li className="nav-item px-1 xl:px-3 py-2 flex items-center text-sm xl:text-base uppercase font-semibold text-black dark:text-white duration-300 hover:opacity-75">
                                                <NavLink
                                                    to="/login"
                                                    className={({ isActive, isPending }) =>
                                                        isPending ? "pending" : isActive ? "text-[#F49C4D]" : ""
                                                    }
                                                >
                                                    JOIN US
                                                </NavLink>
                                            </li>
                                            {/* <li className="nav-item px-1 xl:px-3 py-2 flex items-center text-sm xl:text-base uppercase font-semibold  text-black dark:text-white duration-300 hover:opacity-75">
                                                <NavLink
                                                    to="/register"
                                                    className={({ isActive, isPending }) =>
                                                        isPending ? "pending" : isActive ? "text-[#F49C4D]" : ""
                                                    }
                                                >
                                                    REGISTER
                                                </NavLink>
                                            </li> */}
                                        </ul>
                                    </li>
                                )}
                                <li className='flex items-center gap-3 lg:gap-6'>
                                    {/* <div className=" flex rounded-full text-black dark:text-white duration-300">
                                        <DarkModeSwitch
                                            checked={theme}
                                            onChange={toggleTheme}
                                            size={35}
                                        />
                                    </div> */}
                                    <div className=''>
                                        {user && (
                                            <div className='relative'>
                                                <button
                                                    className="text-black dark:text-white duration-300 cursor-pointer text-xl border border-solid border-transparent rounded bg-transparent block outline-none focus:outline-none"
                                                    type="button"
                                                    onClick={() => setDropDownOpen(!dropDownOpen)}
                                                >
                                                    <summary>
                                                        {user.photoURL ? (
                                                            <img
                                                                src={user.photoURL}
                                                                alt="Profile"
                                                                className="h-9 w-9 rounded-full"
                                                            />
                                                        ) : (
                                                            <>
                                                                <img
                                                                    src={profile}
                                                                    alt="Placeholder"
                                                                    className="h-9 w-9 dark:block hidden"
                                                                />
                                                                <img
                                                                    src={profileDark}
                                                                    alt="Placeholder"
                                                                    className="h-9 w-9 dark:hidden block"
                                                                />
                                                            </>
                                                        )}

                                                    </summary>
                                                </button>

                                                {dropDownOpen && (
                                                    <div className="whitespace-normal bg-white bg-opacity-50 backdrop-blur-lg origin-top-right absolute right-0 mt-2 w-auto pr-10 rounded-md shadow-lg dark:bg-[#062230] border border-neutral-300 dark:border-gray-800 ring-1 ring-white dark:ring-black ring-opacity-5">
                                                        <ul className="py-2">
                                                            {user && (
                                                                <li>
                                                                    <div className="flex items-center space-x-2 p-4">
                                                                        {user.photoURL ? (
                                                                            <img
                                                                                src={user.photoURL}
                                                                                alt="Profile"
                                                                                className="h-8 w-8 rounded-full"
                                                                            />
                                                                        ) : (
                                                                            <img
                                                                                src={userPicPlaceholder}
                                                                                alt="Placeholder"
                                                                                className="h-8 w-8 rounded-full bg-gray-300"
                                                                            />
                                                                        )}

                                                                        <div>
                                                                            {user.displayName ? (
                                                                                <p className="text-sm xl:text-base font-semibold text-black dark:text-white duration-300">
                                                                                    {user.displayName}
                                                                                </p>
                                                                            ) : (
                                                                                <p className="text-sm xl:text-base font-semibold text-black dark:text-white duration-300">
                                                                                    {user.email}
                                                                                </p>
                                                                            )}
                                                                            {!isAdmin && (
                                                                                <Link to='dashboard/user/tasks'>
                                                                                    <button
                                                                                        type="button"
                                                                                        className="text-sm xl:text-base font-semibold text-red-600 hover:text-red-900"
                                                                                    >
                                                                                        DASHBOARD
                                                                                    </button>
                                                                                </Link>
                                                                            )}

                                                                            {isAdmin && (
                                                                                <Link to='admin/dashboard/admin-profile'>
                                                                                    <button
                                                                                        type="button"
                                                                                        className="text-sm xl:text-base font-semibold text-red-600 hover:text-red-900"
                                                                                    >
                                                                                        ADMIN DASHBOARD
                                                                                    </button>
                                                                                </Link>
                                                                            )}
                                                                            <button
                                                                                type="button"
                                                                                onClick={handleLogout}

                                                                                className="text-sm xl:text-base font-semibold text-red-600 hover:text-red-900"
                                                                            >
                                                                                Logout
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;