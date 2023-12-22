
import Banner from '../../Components/Header/Banner/Banner'
import WhyUs from '../../Components/WhyUs/WhyUs';
import Membership from '../../Components/Membership/Membership';
import Aos from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';

const Home = () => {

    useEffect(()=>{
        Aos.init({duration: 2000});
    },[])


    return (
        <div>
            <div data-Aos = "fade"><Banner></Banner></div>
            {/* <Membership></Membership>
            <WhyUs></WhyUs> */}
        </div>
    );
};

export default Home;
