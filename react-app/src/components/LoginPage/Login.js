import LoginForm from "../auth/LoginForm";
import test from "./new-logo";
import './Login.css'
function Login(){
    return (
        <>
            <div style={{ marginTop: '2%' }}>
                {test}
            </div>
            <div className='loginform-container' style={{position: 'absolute'}}>
                <LoginForm/>
            </div>
        </>
    );
};

export default Login;