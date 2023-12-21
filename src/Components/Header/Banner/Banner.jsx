import React from 'react';
import objectOrange from '../../../assets/images/orange.png';
import objectPurple from '../../../assets/images/purple.png';

const Banner = () => {
    return (
        <div className='bg-[#fefeff] h-[100svh] flex items-center justify-center font-poppins relative overflow-hidden'>
            <div className='mt[50px]'>
                <img
                    src={objectOrange}
                    alt='Orange Object'
                    className='absolute top-[-50px] right-0 blur-sm'
                    style={{ width: '500px', height: '500px' }}
                />
                <img
                    src={objectPurple}
                    alt='Purple Object'
                    className='absolute bottom-[-50px] left-0 blur-sm'
                    style={{ width: '500px', height: '500px' }}
                />
                <div className='max-w-[1600px] mx-auto py-48 relative z-10'>
                    <h1 className='text-slate-800 text-center text-8xl mb-10 leading-[110px]'>
                        Streamline Workflows, Boost Productivity, Achieve Your Goals
                    </h1>
                    <p className='text-center text-xl text-zinc-400 tracking-[0.3em] mb-10'>
                        Efficient Task Management Strategies
                    </p>
                    <div className='flex gap-5 justify-center'>
                        <button className='px-8 py-5 text-slate-800 outline outline-2 outline-gray-700 rounded-full hover:bg-[#F49C4D] hover:outline-0 hover:text-white'
                            style={{ transition: 'background-color 400ms, color 400ms, outline 0s' }}>
                            <div className=''>
                                <div className='text-lg'>Learn More</div>
                            </div>
                        </button>
                        <button className='px-8 py-5 text-slate-800 outline outline-2 outline-gray-700 rounded-full hover:bg-[#F49C4D] hover:outline-0 hover:text-white'
                            style={{ transition: 'background-color 300ms, color 300ms, outline 0s' }}>
                            <div className=''>
                                <div className='text-lg'>Get Started</div>
                            </div>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
