import styles from './App.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const fieldsScheme = yup.object()
	.shape({
		email: yup.string()
			.matches(/^[\w_@.]*$/, 'Неверный E-mail. Допустимые символы: буквы, цифры, "@", точка и нижнее подчёркивание.')
			.max(30, 'Неверный E-mail. Должно быть не больше 30 символов'),
		password: yup.string()
			.matches(/^[\w_]*$/, 'Неверный пароль. Допустимые символы: буквы, цифры, "@", точка и нижнее подчёркивание.')
			.max(20, 'Неверный пароль. Должно быть не больше 30 символов'),
		password2: yup.string()
			.matches(/^[\w_]*$/, 'Неверный пароль. Допустимые символы: буквы, цифры, "@", точка и нижнее подчёркивание.')
			.max(20, 'Неверный пароль. Должно быть не больше 30 символов'),
	})

export function App() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			password2: '',
		},
		resolver: yupResolver(fieldsScheme),
	});

	const emailError = errors.email?.message;
	const passError = errors.password?.message;
	const passError2 = errors.password2?.message;

	function onSubmit(formData){
		if(formData.password === formData.password2){
			console.log(formData)
		}
	};

	return (
		<div className={styles.App}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<div>E-mail адрес*</div>
				<input
					name="email"
					type="text"
					placeholder="Введите E-mail адрес"
					{...register('email')}
				/>
				{emailError && <div className={styles.validation}>{emailError}</div>}
				<div>Придумайте пароль*</div>
				<input
					name="password"
					type="password"
					placeholder="Введите пароль"
					{...register('password')}
				/>
				{passError && <div className={styles.validation}>{passError}</div>}
				<div>Повторите пароль*</div>
				<input
					name="password"
					type="password"
					placeholder="Введите пароль"
					{...register('password2')}
				/>
				{passError2 && <div className={styles.validation}>{passError2}</div>}
				<button
					className={styles.btn}
					type="submit"
					disabled={!!emailError || !!passError || !!passError2}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
}
