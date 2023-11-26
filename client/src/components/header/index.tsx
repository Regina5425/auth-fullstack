import {Layout, Space, Typography} from 'antd';
import {TeamOutlined, UserOutlined, LoginOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import {Paths} from '../../paths';
import CustomButton from '../button';
import styles from './index.module.css';

const Header = () => {
	return (
		<Layout.Header className={styles.header}>
			<Space>
				<TeamOutlined className={styles.teamIcon}/>
				<Link to={Paths.home}>
					<CustomButton htmlType="button" type="ghost" onClick={() => {
					}}>
						<Typography.Title level={1}>Сотрудники</Typography.Title>
					</CustomButton>
				</Link>
			</Space>
			<Space>
				<Link to={Paths.register}>
					<CustomButton htmlType="button" type="ghost" icon={<UserOutlined/>} onClick={() => {
					}}>
						Зарегистрироваться
					</CustomButton>
				</Link>
				<Link to={Paths.login}>
					<CustomButton htmlType="button" type="ghost" icon={<LoginOutlined/>} onClick={() => {
					}}>
						Войти
					</CustomButton>
				</Link>
			</Space>
		</Layout.Header>
	);
};

export default Header;