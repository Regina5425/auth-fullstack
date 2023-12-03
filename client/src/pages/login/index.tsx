import Layout from '../../components/layout';
import {Card, Form, Row, Space, Typography} from 'antd';
import CustomInput from '../../components/input';
import PasswordInput from '../../components/password';
import CustomButton from '../../components/button';
import {Link, useNavigate} from 'react-router-dom';
import {Paths} from '../../paths';
import {useLoginMutation, UserData} from '../../app/services/auth';
import {IsErrorWithMsg} from '../../utils/is-error-with-msg';
import {useState} from 'react';
import {ErrorMsg} from '../../components/errorMsg';

export const Login = () => {
	const navigate = useNavigate();
	const [loginUser, loginUserResult] = useLoginMutation();
	const [error, setError] = useState('');

	const onLogin = async (data: UserData) => {
		try {
			await loginUser(data).unwrap();
			navigate(Paths.home);
		} catch (e) {
			const isError = IsErrorWithMsg(e);
			if(isError) {
				setError(e.data.message);
			} else {
				setError('Неизвестная ошибка')
			}
		}
	}

	return (
		<Layout>
			<Row align="middle" justify="center">
				<Card title="Авторизация" style={{width: '30rem'}}>
					<Form onFinish={onLogin}>
						<CustomInput type="email" name="email" placeholder="Email"/>
						<PasswordInput name="password" placeholder="Пароль"/>
						<CustomButton type="primary" htmlType="submit" onClick={() => {
						}}>Войти</CustomButton>
					</Form>
					<Space direction="vertical" size="large">
						<Typography.Text>
							Нет аккаунта?{' '}
							<Link to={Paths.register}>Зарегистрируйтесь</Link>
						</Typography.Text>
						<ErrorMsg message={error} />
					</Space>
				</Card>
			</Row>
		</Layout>
	);
};