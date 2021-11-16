import LoginForm from "../auth/LoginForm";
import loginSignup from "./login-signup";
import './Login.css'
function Login(){
    return (
        <>
            <div style={{ marginTop: '1%' }}>
                {loginSignup}
            </div>
            <div className='loginform-container' style={{position: 'absolute'}}>
                <LoginForm/>
            </div>
        </>
    );
};

export default Login;