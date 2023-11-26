import {ReactNode} from 'react';
import {Button, Form} from 'antd';

type Props = {
	children: ReactNode;
	htmlType: 'button' | 'submit' | 'reset';
	onClick: () => void;
	type?: 'link' | 'text' | 'default' | 'primary' | 'dashed' | 'ghost';
	danger?: boolean;
	loading?: boolean;
	shape?: 'default' | 'circle' | 'round';
	icon?: ReactNode;
}

const CustomButton = ({children, htmlType = 'button', type, danger, loading, shape, icon, onClick}: Props) => {
	return (
		<Form.Item>
			<Button
				htmlType={htmlType}
				type={type}
				danger={danger}
				loading={loading}
				shape={shape}
				icon={icon}
				onClick={onClick}
			>{children}</Button>
		</Form.Item>
	);
};

export default CustomButton;