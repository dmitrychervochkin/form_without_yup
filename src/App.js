import styles from './App.module.css';
import { useState, useRef} from 'react';

const sendFormData = (formData) => {
	console.log(formData);
};

export function App() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [emailError, setEmailError] = useState(null);
	const [passError, setPassError] = useState(null);
	const [passError2, setPassError2] = useState(null);

	const submitButtonRef = useRef(null);

	const onEmailChange = ({target}) => {
		setEmail(target.value);
		let newError = null;

		if (!/^[\w_@.]*$/.test(target.value)) {
            newError = 'Неверный E-mail. Допустимые символы: буквы, цифры, "@", точка и нижнее подчёркивание.';
        } else if (target.value.length > 30) {
            newError = 'Неверный E-mail. Должно быть не больше 30 символов';
        }
        setEmailError(newError);
	};

	const onPassChange = ({target}) => {
		setPassword(target.value);
		let newError = null;

		if (!/^[\w_]*$/.test(target.value)) {
            newError = 'Неверный пароль. Допустимые символы: буквы, цифры, нижнее подчёркивание';
        } else if (target.value.length > 20) {
            newError = 'Неверный E-mail. Должно быть не больше 20 символов';
        }
        setPassError(newError);
	};

	const onPassChange2 = ({target}) => {
		setPassword2(target.value);
		let newError = null;

		if (!/^[\w_]*$/.test(target.value)) {
            newError = 'Неверный пароль. Допустимые символы: буквы, цифры, нижнее подчёркивание';
        } else if (target.value.length > 20) {
            newError = 'Неверный E-mail. Должно быть не больше 20 символов';
        }
        setPassError2(newError);
	};

	const onPassBlur = ({ target }) => {
        if (password !== password2){
			setPassError2('Пароли не совпадают. Повторите ввод.')
		}
    };

	const onSubmit = (event) => {
		event.preventDefault();
		if(email === ''){
			setEmailError('Введите E-mail')
		}
		if(password === ''){
			setPassError('Введите пароль')
		}
		if(password2 === ''){
			setPassError2('Повторите пароль')
		};
		sendFormData({ email, password, password2 });
};

	return (
		<div className={styles.App}>
			<form onSubmit={onSubmit} className={styles.form}>
				<div>E-mail адрес*</div>
				<input
					name="email"
					type="email"
					value={email}
					placeholder="Введите E-mail адрес"
					onChange={onEmailChange}
				/>
				{emailError && <div className={styles.validation}>{emailError}</div>}
				<div>Придумайте пароль*</div>
				<input
					name="password"
					type="password"
					value={password}
					placeholder="Введите пароль"
					onChange={onPassChange}
				/>
				{passError && <div className={styles.validation}>{passError}</div>}
				<div>Повторите пароль*</div>
				<input
					name="password"
					type="password"
					value={password2}
					placeholder="Введите пароль"
					onChange={onPassChange2}
					onBlur={onPassBlur}
				/>
				{passError2 && <div className={styles.validation}>{passError2}</div>}
				<button
					ref={submitButtonRef}
					className={styles.btn}
					type="submit"
					disabled={emailError !== null || passError !== null || passError2 !== null || email === '' || password === '' || password2 === ''}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
}
