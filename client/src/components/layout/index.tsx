import {ReactNode} from 'react';
import { Layout as AntLayout } from 'antd';
import Header from '../header';
import styles from './index.module.css';

type Props = {
	children: ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<div className={styles.main}>
			<Header />
			<AntLayout.Content style={{height: '100%'}}>
				{children}
			</AntLayout.Content>
		</div>
	)
}

export default Layout;