import {Employee} from '@prisma/client';
import {Card, Form, Space} from 'antd';
import CustomInput from '../input';
import {ErrorMsg} from '../errorMsg';
import CustomButton from '../button';

type Props<T> = {
	onFinish: (values: T) => void;
	btnText: string;
	title: string;
	error?: string;
	employee?: T;
}

const EmployeeForm = ({
	btnText,
	error,
	onFinish,
	employee,
	title}: Props<Employee>) => {
	return (
		<Card title={title} style={{width: '30rem'}}>
			<Form name='employee-form' onFinish={onFinish} initialValues={employee}>
				<CustomInput type='text' name='firstName' placeholder='Имя' />
				<CustomInput type='text' name='lastName' placeholder='Фамилия' />
				<CustomInput type='number' name='age' placeholder='Возраст' />
				<CustomInput type='text' name='address' placeholder='Адрес' />
				<Space>
					<ErrorMsg message={error} />
					<CustomButton htmlType='submit'>
						{btnText}
					</CustomButton>
				</Space>
			</Form>
		</Card>
	)
}

export default EmployeeForm;