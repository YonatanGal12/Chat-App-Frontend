import './SignUpForm.css';
import { type AuthPhase } from '../../../../types';
import Field from '../../AuthComponents/Field/Field';

type SignUpFormProps = {
    setUsername: (username: string) => void,
    setPassword: (password: string) => void,
    setEmail: (email: string) => void,
    setPhoneNumber: (phoneNumber: string) => void,
    logIn: () => void,
    setAuthPhase: (phase: AuthPhase) => void,
}

function SignUpForm(props: SignUpFormProps)
{
    return (
        <>
            <h1>Sign Up</h1>
            <Field fieldName='Username' setField={props.setUsername}></Field>
            <Field fieldName='Password' setField={props.setPassword}></Field>
            <Field fieldName='Email' setField={props.setEmail}></Field>
            <Field fieldName='Phone Number' setField={props.setPhoneNumber}></Field>
            <button className='sign-up-btn' onClick={props.logIn}>Sign Up</button>
            <button className='go-to-login-btn' onClick={() => props.setAuthPhase('login')}>Forgot you have an account and feel stupid? Log in!</button>
        </>
    );
}

export default SignUpForm;