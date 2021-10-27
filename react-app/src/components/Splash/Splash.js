import { Link } from "react-router-dom";
import banner from "./Group 139";
import { BsLinkedin, BsGithub } from 'react-icons/bs'
import './Splash.css'

function Splash(){
    return (
        <div className='splash-container'>
            <div className='splash-banner' >
                <div className='banner-container'>
                    {banner}
                </div>
                <div className='splash-button-container'>
                    <Link to='/login' className='splash-login-button'>Login</Link>
                    <Link to='/signup' className='splash-signup-button'>Sign Up</Link>
                </div>
            </div>
            <div className='splash-content'>
                <div></div>
                <p className='main-header'>The Recipe tool for professional chefs</p>
                <p className='splash-description'>Transform your culinary content into an interactive database</p>
                <Link className='splash-cta' to='/signup'>Get started for free</Link>
                <div className='splash-content-container'>
                    <div className='splash-section-container'>
                        <div className='img-container1'>
                            <img className='splash-img' src="https://raw.githubusercontent.com/Jguevara1208/Ortloan-photos/main/Screen%20Shot%202021-10-27%20at%202.58.21%20PM.png?token=AR27E656OIKX3AN5QQ2NNIDBQMDFY" alt="" />
                        </div>
                        <div className='splash-text-container'>
                            <p className='splash-bullet'>Create recipes</p>
                            <br />
                            <p className='splash-text'>Fill out the form with your recipe information, Let Ortolan format everything for you</p>
                            <br />
                            <p className='splash-text'>The more recipes you create, the more ortolan will be able to help complete your recipes</p>
                        </div>
                    </div>
                    <div className='splash-section-container'>
                        <div className='splash-text-container stc-two'>
                            <p className='splash-bullet'>Organize your staff</p>
                            <br />
                            <p className='splash-text'>Create projects and assign cooks to it</p>
                            <br />
                            <p className='splash-text'>Create and finish tasks as you please, watch your teams progress</p>
                        </div>
                        <div className='img-container2'>
                            <img className='splash-img' src="https://raw.githubusercontent.com/Jguevara1208/Ortloan-photos/main/Screen%20Shot%202021-10-27%20at%203.05.21%20PM.png?token=AR27E6ZW53WLVJ2QEDNMPL3BQMEAO" alt="" />
                        </div>
                    </div>
                    <div className='splash-section-container'>
                        <div className='img-container3'>
                            <img className='splash-img' src="https://raw.githubusercontent.com/Jguevara1208/Ortloan-photos/main/Screen%20Shot%202021-10-27%20at%203.05.37%20PM.png?token=AR27E645S4WI65POGDXULXDBQMEAY" alt="" />
                        </div>
                        <div className='splash-text-container'>
                            <p className='splash-bullet'>Keep track of your recipes</p>
                            <br />
                            <p className='splash-text'>With multiple ways of finding your recipes, they are always within reach</p>
                            <br />
                            <p className='splash-text'>Search by name or tag, and see everything in between</p>
                        </div>
                    </div>
                    <div className='social-links'>
                        <a target='_blank' rel="noreferrer" className='links' href="https://github.com/Jguevara1208/Ortolan"><BsGithub/></a>
                        <a target='_blank' rel="noreferrer" className='links' href="https://www.linkedin.com/in/jordan-guevara-a9370521a"><BsLinkedin/></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Splash