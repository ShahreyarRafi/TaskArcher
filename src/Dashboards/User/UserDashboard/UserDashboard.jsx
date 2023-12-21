


import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../services/Firebase/AuthProvider";
import { Link, NavLink, Outlet } from "react-router-dom";
import { RiMenu4Line } from "react-icons/ri";
import userPicPlaceholder from '../../../assets/images/userPicPlaceHolder.png';
import { VscAccount } from "react-icons/vsc";
import { VscChecklist } from "react-icons/vsc";
import { BsJournalCheck } from "react-icons/bs";
import { RiTeamLine } from "react-icons/ri";
import { PiTestTubeThin } from "react-icons/pi";
import { MdAlignHorizontalLeft } from "react-icons/md";
import { RiReservedLine } from "react-icons/ri";
import { PiFlagBanner } from "react-icons/pi";
import { GiTatteredBanner } from "react-icons/gi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineHome } from "react-icons/ai";
import axios from "axios";


const UserDashboard = () => {
    const { User, LogOutAccount } = useContext(AuthContext);
    const [userData, setUserData] = useState({});



    useEffect(() => {
        if (User) {
            axios.get(`https://diagnostic-center-server-tau.vercel.app/single/user?email=${User?.email}`)
                .then(res => setUserData(res.data))
                .catch(err => toast.error(err?.message ? err.message : err));
        }
    }, [User]);

    return (
        <section>
            <label htmlFor="my-drawer-2" className="btn btn-ghost lg:hidden"><RiMenu4Line /></label>
            {/* <div className="navbar py-3 md:py-4 lg:py-6 relative bg-white max-w-[1920px] mx-auto">
                <div className="navbar-start gap-3">
                    <label htmlFor="my-drawer-2" className="btn btn-ghost lg:hidden"><RiMenu4Line /></label>
                    <h1 className="text-sm md:text-base lg:text-lg xl:text-xl flex items-center justify-center gap-2 font-bold inter">
                        <img className="h-8" src="https://i.ibb.co/FXwN0tk/bright-luminous-pink-medical-digital-medical-neon-sign-pharmacy-hospital-store-beautiful-shiny-with.png" alt="" />
                        DIAGNO FAX
                    </h1>
                </div>
                <div className="navbar-end">
                    {User ? (
                        <>
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={User.photoURL} alt="User avatar" />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded w-52">
                                    <li className="bg-transparent py-2 md:py-2 md:px-2 font-bold text-xs md:text-sm rounded">
                                        {User.displayName}
                                    </li>
                                    <li className="bg-transparent py-2 md:py-2 md:px-2 font-bold text-xs md:text-sm rounded">
                                        <Link to="/dashboard/profile">Profile</Link>
                                    </li>
                                    <li onClick={() => LogOutAccount().then(res => toast.success('Log Out Successful !! 👌'))} className="bg-transparent py-2 md:py-2 md:px-2 font-bold text-xs md:text-sm btn-ghost rounded">
                                        <Link to="/authentication/signin">Logout</Link>
                                    </li>
                                </ul>
                            </div>
                            <button onClick={LogOutAccount} className="bg-gradient-to-l from-[#8D53FD] to-[#9E6EFD] py-2 md:py-3 px-3 md:px-6 lg:px-9 text-white font-bold text-xs md:text-sm rounded">
                                LOGOUT
                            </button>
                        </>
                    ) : (
                        <Link to='/authentication/signin'>
                            <button className="bg-gradient-to-l from-[#8D53FD] to-[#9E6EFD] py-2 md:py-3 px-3 md:px-6 lg:px-9 text-white font-bold text-xs md:text-sm rounded">
                                LOGIN
                            </button>
                        </Link>
                    )}
                </div>
            </div> */}
            <div className="lg:drawer-open lg:flex lg:flex-row-reverse gap-8 mx-auto">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <main className="max-w-[1920px] w-full mx-auto space-y-16 md:space-y-24 lg:space-y-32 xl:space-y-48 lg:flex-[3]">
                    {/* Page content here */}
                    <Outlet />
                </main>
                <div className="drawer-side rounded-lg">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <nav className="p-4 w-80 min-h-full bg-base-200 bg-opacity-90 backdrop-blur-lg roboto space-y-8">
                        <div className="text-center space-y-6 mt-6">
                            <div className="mx-auto">
                                <div className="mb-4">
                                    {User?.photoURL ? (
                                        <img
                                            src={User?.photoURL}
                                            alt="Profile"
                                            className="h-40 rounded-full mx-auto"
                                        />
                                    ) : (
                                        <img
                                            src={userPicPlaceholder}
                                            alt="Placeholder"
                                            className="h-32 rounded-full bg-gray-300 mx-auto"
                                        />
                                    )}
                                </div>
                                <div>
                                    <p className="text-black text-lg text-center">{User?.displayName}</p>
                                </div>
                            </div>
                        </div>
                        {/* Sidebar content here */}
                        <div className=" px-5">
                            <div className="flex flex-col items-center space-y-2">
                                <NavLink
                                    to="/dashboard/user/profile"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "font-bold uppercase text-[#FFFFF6] bg-[#F49C4D] px-8 py-4 rounded-full w-full duration-150 shadow-lg" : "font-bold uppercase text-black bg-white rounded-full w-full hover:bg-[#F49C4D] hover:text-white duration-150 px-8 py-4 "
                                    }
                                >
                                    MY PROFILE
                                </NavLink>
                                <NavLink
                                    to="/"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "font-bold uppercase text-[#FFFFF6] bg-[#F49C4D] px-8 py-4 rounded-full w-full duration-150 shadow-lg" : "font-bold uppercase text-black bg-white rounded-full w-full hover:bg-[#F49C4D] hover:text-white duration-150 px-8 py-4"
                                    }
                                >
                                    HOME
                                </NavLink>
                                <NavLink
                                    to="/dashboard/user/tasks"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "font-bold uppercase text-[#FFFFF6] bg-[#F49C4D] px-8 py-4 rounded-full w-full duration-150 shadow-lg" : "font-bold uppercase text-black bg-white rounded-full w-full hover:bg-[#F49C4D] hover:text-white duration-150 px-8 py-4"
                                    }
                                >
                                    TASKS
                                </NavLink>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </section>
    );
};

export default UserDashboard;
