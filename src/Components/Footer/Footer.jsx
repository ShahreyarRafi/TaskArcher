import { Typography } from "@material-tailwind/react";
import { FaApple } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";




const Footer = () => {
    const LINKS = [
        {
            title: "Product",
            items: ["Overview", "Features", "Solutions", "Tutorials"],
        },
        {
            title: "Company",
            items: ["About us", "Careers", "Press", "News"],
        },
        {
            title: "Resource",
            items: ["Blog", "Newsletter", "Events", "Help center"],
        },
    ];

    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative font-poppins bg-zinc-800 pt-16 px-16 m-5 rounded-[3rem]">
            <div className="mx-auto w-full px-8 ">
                <div className="lg:flex justify-between">
                    <h1 className="text-neutral-200 text-4xl lg:text-6xl leading-[45px] lg:leading-[75px] mb-7 lg:mb-0">Ready To Boost <br /> Your Productivity?</h1>
                    <div>
                        <button className='px-8 py-5 mb-4 text-gray-200 flex gap-2 items-center outline outline-2 outline-gray-200 rounded-full hover:bg-[#B99FEF] hover:outline-0 hover:text-white'
                            style={{ transition: 'background-color 400ms, color 400ms, outline 0s' }}>
                            <div>
                                <p><FaApple /></p>
                            </div>
                            <div className="">
                                <div className="text-lg">Download Now</div>
                            </div>
                        </button>
                        <button className='px-8 py-5 text-gray-200 flex gap-2 items-center outline outline-2 outline-gray-200 rounded-full hover:bg-[#B99FEF] hover:outline-0 hover:text-white'
                            style={{ transition: 'background-color 400ms, color 400ms, outline 0s' }}>
                            <div>
                                <p><FaGooglePlay /></p>
                            </div>
                            <div className="">
                                <div className="text-lg">Download Now</div>
                            </div>
                        </button>
                    </div>
                </div>

                <hr className="h-px my-8 bg-neutral-500 border-0"></hr>

                <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
                    <Typography variant="h5" className="mb-6 text-neutral-400">
                        Material Tailwind
                    </Typography>
                    <div className="grid grid-cols-3 justify-between gap-4">
                        {LINKS.map(({ title, items }) => (
                            <ul key={title}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-3 font-medium opacity-80 text-neutral-400"
                                >
                                    {title}
                                </Typography>
                                {items.map((link) => (
                                    <li key={link}>
                                        <Typography
                                            as="a"
                                            href="#"
                                            color="gray"
                                            className="py-1.5 w-0 font-normal transition-colors text-neutral-600 hover:text-slate-600"
                                        >
                                            {link}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
                <div className="mt-12 py-4 md:flex-row md:justify-between">
                    <Typography
                        variant="small"
                        className="mb-4 text-center font-normal text-neutral-400 md:mb-0"
                    >
                        &copy; {currentYear} <a href="https://material-tailwind.com/">Material Tailwind</a>. All
                        Rights Reserved.
                    </Typography>
                </div>
            </div>
        </footer>
    );
}

export default Footer;