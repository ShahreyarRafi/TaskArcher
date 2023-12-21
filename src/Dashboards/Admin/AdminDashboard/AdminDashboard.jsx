import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../services/Firebase/AuthProvider";
import { Link, NavLink, Outlet } from "react-router-dom";
import { RiMenu4Line } from "react-icons/ri";
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


const Dashboard = () => {
    const { User, LogOutAccount } = useContext(AuthContext);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if(User){
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
            <div className="lg:drawer-open lg:flex lg:flex-row-reverse gap-8  mx-auto">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <main className="max-w-[1920px] w-full mx-auto space-y-16 md:space-y-24 lg:space-y-32 xl:space-y-48 lg:flex-[3]">
                    {/* Page content here */}
                    <Outlet />
                </main>
                <div className="drawer-side rounded-lg">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <nav className="p-4 w-80 min-h-full bg-base-200 roboto space-y-8">
                        <div className="text-center space-y-6 mt-6">
                            <div className="w-24 h-24 mx-auto">
                                <img className="w-full h-full rounded-full" src={User?.photoURL} alt="Profile" />
                            </div>
                            <div>
                                <h1 className="text-xl roboto font-bold">{User?.displayName}</h1>
                            </div>
                        </div>
                        {/* Sidebar content here */}
                        <div className="space-y-4">
                            <NavLink
                                className={({ isActive }) => isActive
                                    ? "bg-gradient-to-l from-[#8D53FD] to-[#9E6EFD] md:py-3.5 md:px-5 text-white font-bold text-xs md:text-sm rounded flex items-center gap-3"
                                    : "bg-transparent md:py-3.5 md:px-5 font-bold text-xs md:text-sm rounded flex items-center gap-3"}
                                to="/dashboard/profile">
                                <VscAccount className="text-xl"></VscAccount> MY PROFILE
                            </NavLink>
                            {userData.role === 'user' && (
                                <>
                                    <NavLink
                                        className={({ isActive }) => isActive
                                            ? "bg-gradient-to-l from-[#8D53FD] to-[#9E6EFD] md:py-3.5 md:px-5 text-white font-bold text-xs md:text-sm rounded flex items-center gap-3"
                                            : "bg-transparent md:py-3.5 md:px-5 font-bold text-xs md:text-sm rounded flex items-center gap-3"}
                                        to="/dashboard/appointments">
                                        <VscChecklist className="text-xl"></VscChecklist>UPCOMING APPOINTMENTS
                                    </NavLink>
                                    <NavLink
                                        className={({ isActive }) => isActive
                                            ? "bg-gradient-to-l from-[#8D53FD] to-[#9E6EFD] md:py-3.5 md:px-5 text-white font-bold text-xs md:text-sm rounded flex items-center gap-3"
                                            : "bg-transparent md:py-3.5 md:px-5 font-bold text-xs md:text-sm rounded flex items-center gap-3"}
                                        to="/dashboard/results">
                                        <BsJournalCheck className="text-xl"></BsJournalCheck>TEST RESULTS
                                    </NavLink>
                                </>
                            )}
                            {userData.role === 'admin' && (
                                <>
                                    <NavLink
                                        className={({ isActive }) => isActive
                                            ? "bg-gradient-to-l from-[#8D53FD] to-[#9E6EFD] md:py-3.5 md:px-5 text-white font-bold text-xs md:text-sm rounded flex items-center gap-3"
                                            : "bg-transparent md:py-3.5 md:px-5 font-bold text-xs md:text-sm rounded flex items-center gap-3"}
                                        to="/dashboard/all-users">
                                        <RiTeamLine className="text-xl"></RiTeamLine>ALL USERS
                                    </NavLink>
                                    <NavLink
                                        className={({ isActive }) => isActive
                                            ? "bg-gradient-to-l from-[#8D53FD] to-[#9E6EFD] md:py-3.5 md:px-5 text-white font-bold text-xs md:text-sm rounded flex items-center gap-3"
                                            : "bg-transparent md:py-3.5 md:px-5 font-bold text-xs md:text-sm rounded flex items-center gap-3"}
                                        to="/dashboard/add-test">
                                        <PiTestTubeThin className="text-xl"></PiTestTubeThin>ADD TEST
                                    </NavLink>
                                    <NavLink
                                        className={({ isActive }) => isActive
                                            ? "bg-gradient-to-l from-[#8D53FD] to-[#9E6EFD] md:py-3.5 md:px-5 text-white font-bold text-xs md:text-sm rounded flex items-center gap-3"
                                            : "bg-transparent md:py-3.5 md:px-5 font-bold text-xs md:text-sm rounded flex items-center gap-3"}
                                        to="/dashboard/all-tests">
                                        <MdAlignHorizontalLeft className="text-xl"></MdAlignHorizontalLeft>ALL TESTS
                                    </NavLink>
                                    <NavLink
                                        className={({ isActive }) => isActive
                                            ? "bg-gradient-to-l from-[#8D53FD] to-[#9E6EFD] md:py-3.5 md:px-5 text-white font-bold text-xs md:text-sm rounded flex items-center gap-3"
                                            : "bg-transparent md:py-3.5 md:px-5 font-bold text-xs md:text-sm rounded flex items-center gap-3"}
                                        to="/dashboard/reservation">
                                        <RiReservedLine className="text-xl"></RiReservedLine>RESERVATION
                                    </NavLink>
                                    <NavLink
                                        className={({ isActive }) => isActive
                                            ? "bg-gradient-to-l from-[#8D53FD] to-[#9E6EFD] md:py-3.5 md:px-5 text-white font-bold text-xs md:text-sm rounded flex items-center gap-3"
                                            : "bg-transparent md:py-3.5 md:px-5 font-bold text-xs md:text-sm rounded flex items-center gap-3"}
                                        to="/dashboard/add-banner">
                                        <PiFlagBanner className="text-xl"></PiFlagBanner> ADD BANNER
                                    </NavLink>
                                    <NavLink
                                        className={({ isActive }) => isActive
                                            ? "bg-gradient-to-l from-[#8D53FD] to-[#9E6EFD] md:py-3.5 md:px-5 text-white font-bold text-xs md:text-sm rounded flex items-center gap-3"
                                            : "bg-transparent md:py-3.5 md:px-5 font-bold text-xs md:text-sm rounded flex items-center gap-3"}
                                        to="/dashboard/all-Banners">
                                        <GiTatteredBanner className="text-xl"></GiTatteredBanner>ALL BANNERS
                                    </NavLink>
                                </>
                            )}
                            <hr />
                            <NavLink
                                className={({ isActive }) => isActive
                                    ? "bg-gradient-to-l from-[#8D53FD] to-[#9E6EFD] md:py-3.5 md:px-5 text-white font-bold text-xs md:text-sm rounded flex items-center gap-3"
                                    : "bg-transparent md:py-3.5 md:px-5 font-bold text-xs md:text-sm rounded flex items-center gap-3"}
                                to="/">
                                <AiOutlineHome className="text-xl"></AiOutlineHome>HOME
                            </NavLink>
                        </div>
                    </nav>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </section>
    );
};

export default Dashboard;
