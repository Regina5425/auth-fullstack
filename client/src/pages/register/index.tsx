import {useState} from 'react';
import {useSelector} from 'react-redux';
import {User} from '@prisma/client';
import {Card, Form, Row, Space, Typography} from 'antd';
import Layout from '../../components/layout';
import CustomInput from '../../components/input';
import PasswordInput from '../../components/password';
import CustomButton from '../../components/button';
import {Link, useNavigate} from 'react-router-dom';
import {Paths} from '../../paths';
import {selectUser} from '../../features/auth/authSlice';
import {useRegisterMutation} from '../../app/services/auth';
import {IsErrorWithMsg} from '../../utils/is-error-with-msg';
import {ErrorMsg} from '../../components/errorMsg';

type RegisterData = Omit<User, 'id'> & {confirmPassword: string};

export const Register = () => {
	const navigate = useNavigate();
	const user = useSelector(selectUser);
	const [error, setError] = useState('');
	const [registerUser] = useRegisterMutation();

	const register = async (data: RegisterData) => {
		try {
			await registerUser(data).unwrap();
			navigate(Paths.home);
		} catch (e) {
			const isError = IsErrorWithMsg(e);
			if(isError) {
				setError(e.data.message);
			} else {
				setError('Неизвестная ошибка');
			}
		}
	}

	return (
		<Layout>
			<Row align="middle" justify="center">
				<Card title="Регистрация" style={{width: '30rem'}}>
					<Form onFinish={register}>
						<CustomInput name="name" placeholder="Имя"/>
						<CustomInput type="email" name="email" placeholder="Email"/>
						<PasswordInput name="password" placeholder="Пароль"/>
						<PasswordInput name="confirmPassword" placeholder="Повторите пароль"/>
						<CustomButton type="primary" htmlType="submit" onClick={() => {
						}}>Зарегистрироваться</CustomButton>
					</Form>
					<Space direction="vertical" size="large">
						<Typography.Text>
							Уже зарегистрированы?{' '}
							<Link to={Paths.login}>Войти</Link>
						</Typography.Text>
						<ErrorMsg message={error} />
					</Space>
				</Card>
			</Row>
		</Layout>
	);
};