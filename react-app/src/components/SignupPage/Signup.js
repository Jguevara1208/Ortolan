import SignUpForm from "../auth/SignUpForm";
import test from "../LoginPage/new-logo";

function Signup(){
    return (
        <>
            <div style={{ marginTop: '2%'}}>
                {test}
            </div>
            <div className='signupform-container' style={{position: 'absolute'}}>
                <SignUpForm />
            </div>
        </>
    );
};

export default Signup;