import './LoginForm.css'
import Field from '../Field/Field';
import type { AuthPhase } from '../../../../types';

type LoginFormProps = {
    setUsername: (username: string) => void,
    setPassword: (password: string) => void,
    logIn: () => void,
    setAuthPhase: (phase: AuthPhase) => void,
}

function LoginForm(props: LoginFormProps)
{
    return (
        <>
            <h1>Login</h1>
            <Field fieldName='Username' setField={props.setUsername}></Field>
            <Field fieldName='Password' setField={props.setPassword}></Field>
            <button className='login-btn' onClick={props.logIn}>Login</button>
            <button className='go-to-sign-up-btn' onClick={() => props.setAuthPhase('signUp')}>Don't have an account? Sign Up!</button>
        </>
    );
}

export default LoginForm;