import { useContext } from "react";
import { AuthContext } from "../../../services/Firebase/AuthProvider";
import userPicPlaceholder from '../../../assets/images/userPicPlaceHolder.png';
import { useQuery } from "react-query";
import useAxiosPublic from "../../../Hook/useAxiosPublic"
import bronze from "../../../assets/images/Bronze.png"
import silver from "../../../assets/images/Silver.png"
import gold from "../../../assets/images/gold.png"
import platinum from "../../../assets/images/Platinum.png"
import { useNavigate } from "react-router-dom";

const UserProfile = () => {



    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    console.log(user);

    // const {data} = useQuery({
    //     queryKey: ['users'],
    //     queryFn: async () => {
    //         const res = await fetch(`http://localhost:5000/users/${user?.email}`)
    //         return res.json();
    //     }
    // })
    // console.log(data);



    const axiosPublic = useAxiosPublic();
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            // const res = await axiosSecure.get(`/users/${user?.email}`);
            const res = await axiosPublic.get(`/users`);
            return res.data;
        }
    })


    const currentUser = users.find(userData => userData.email === user.email);


    let badgeImage;
    switch (currentUser?.badge) {
        case 'Bronze':
            badgeImage = bronze;
            break;
        case 'Silver':
            badgeImage = silver;
            break;
        case 'Gold':
            badgeImage = gold;
            break;
        case 'Platinum':
            badgeImage = platinum;
            break;
        default:
            badgeImage = null; // Handle other cases if needed
            break;
    }


    const handleLogout = () => {
        logout();
        navigate("/"); // Redirect to the home page after successful logout
    };


    return (
        <body className="antialiased font-poppins">
            <div className="container mx-auto my-60">
                <div>
                    <div className="bg-white shadow-lg relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
                        <div className="flex justify-center">
                            <div className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110">
                                {user?.photoURL ? (
                                    <img
                                        src={user?.photoURL}
                                        alt="Profile"
                                        className=" rounded-full"
                                    />
                                ) : (
                                    <img
                                        src={userPicPlaceholder}
                                        alt="Placeholder"
                                        className="rounded-full bg-gray-300"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="mt-16">
                            <h1 className="font-bold text-center text-3xl text-gray-900">{user.displayName}</h1>
                            <div className="w-full">
                                <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                                    <div className="w-full flex items-center justify-between border-t border-gray-100 text-gray-600 py-4 px-7 transition duration-150">
                                        <div>
                                            <span className="text-lg font-medium mr-1">Email:</span>
                                            <span className="text-gray-500 text-lg">{user.email}</span>
                                        </div>
                                        <button
                                            className="text-lg font-medium text-red-600 hover:text-rose-400"
                                            onClick={handleLogout}
                                        >
                                            Log Out
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </body>

    );
};

export default UserProfile;