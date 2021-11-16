import SignUpForm from "../auth/SignUpForm";
import loginSignup from "../LoginPage/login-signup";

function Signup(){
    return (
        <>
            <div style={{ marginTop: '2%'}}>
                {loginSignup}
            </div>
            <div className='signupform-container' style={{position: 'absolute'}}>
                <SignUpForm />
            </div>
        </>
    );
};

export default Signup;