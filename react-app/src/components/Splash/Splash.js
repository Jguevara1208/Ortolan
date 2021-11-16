import { useEffect } from "react";
import { Link } from "react-router-dom";
import formSplash from "./form-splash";
import keepTrackSplash from "./keep-track-splash";
import organizeSplash from "./organize-splash";
import splashMain from "./splash-main";
import { BsLinkedin, BsGithub } from 'react-icons/bs'
import Aos from 'aos'
import 'aos/dist/aos.css'
import './Splash.css'

function Splash(){
    useEffect(() => {
        Aos.init({ duration: 1500 })
    }, [])

    return (
        <div className='splash-outer'> 
           <div className='splash-button-container'>
                 <Link to='/login' className='splash-login-button'>Login</Link>
                 <Link to='/signup' className='splash-signup-button'>Sign Up</Link>
            </div>
            <div className='splash-container'>
                <div className='top-content-container'>
                    <div className='top-content'>
                        <p className='main-header'>The Recipe tool for professional chefs</p>
                        <p className='splash-description'>Transform your culinary content into an interactive database</p>
                        <Link className='splash-cta' to='/signup'>Get Started</Link>
                    </div>
                </div>
                <div className='splash-main-container'>
                    {splashMain}
                </div>
            </div>
            <div className='form-section-green'>
                <div data-aos-once='true' data-aos='fade-right' className='splash-text-container'>
                    <p data-aos-once='true' data-aos='fade-down' className='splash-bullet-green'>Create recipes</p>
                    <br />
                    <p data-aos-once='true' data-aos='fade-up' className='splash-text-green'>Fill out the form with your recipe information, Let Ortolan format everything for you</p>
                    <br />
                    <p data-aos-once='true' data-aos='fade-up' className='splash-text-green'>The more recipes you create, the more ortolan will be able to help complete your recipes</p>
                </div>
                {formSplash}
            </div>
            <div className='form-section-white'>
                {organizeSplash}
                <div data-aos-once='true' data-aos='fade-left' className='splash-text-container'>
                    <p data-aos-once='true' data-aos='fade-down' className='splash-bullet-white'>Organize your staff</p>
                    <br />
                    <p data-aos-once='true' data-aos='fade-up' className='splash-text-white'>Create projects and assign cooks to it</p>
                    <br />
                    <p data-aos-once='true' data-aos='fade-up' className='splash-text-white'>Create and finish tasks as you please, watch your teams progress</p>
                </div>
            </div>
            <div className='form-section-green'>
                <div data-aos-once='true' data-aos='fade-right' className='splash-text-container'>
                    <p data-aos-once='true' data-aos='fade-down' className='splash-bullet-green'>Find recipes fast</p>
                    <br />
                    <p data-aos-once='true' data-aos='fade-up' className='splash-text-green'>With multiple ways of finding your recipes, they are always within reach</p>
                    <br />
                    <p data-aos-once='true' data-aos='fade-up' className='splash-text-green'>Search by name or tag, and see everything in between</p>
                </div>
                {keepTrackSplash}
            </div>
            <div className='social-links'>
                <a target='_blank' rel="noreferrer" className='links' href="https://github.com/Jguevara1208/Ortolan"><BsGithub/></a>
                <a target='_blank' rel="noreferrer" className='links' href="https://www.linkedin.com/in/jordan-guevara-a9370521a"><BsLinkedin/></a>
            </div>
        </div>
    )
};

export default Splash