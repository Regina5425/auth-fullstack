import {Alert} from 'antd';

type Props = {
	message?: string;
}

export const ErrorMsg = ({message}: Props) => {
	if(!message) {
		return  null;
	}

	return <Alert message={message} type='error' />
}