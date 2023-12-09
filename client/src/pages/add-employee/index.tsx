import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Employee} from '@prisma/client';
import {Row} from 'antd';
import Layout from '../../components/layout';
import EmployeeForm from '../../components/employee-form';
import {selectUser} from '../../features/auth/authSlice';
import {useAddEmployeeMutation} from '../../app/services/employees';
import {Paths} from '../../paths';
import {IsErrorWithMsg} from '../../utils/is-error-with-msg';

const AddEmployee = () => {
	const [error, setError] = useState<string>('');
	const navigate = useNavigate();
	const user = useSelector(selectUser);
	const [addEmployee] = useAddEmployeeMutation();

	useEffect(() => {
		if(!user) {
			navigate(`${Paths.login}`);
		}
	}, [navigate, user])

	const handleAddEmployee = async (data: Employee) => {
		try {
			await addEmployee(data).unwrap();
			navigate(`${Paths.status}/created`);
		} catch (e) {
			const isError = IsErrorWithMsg(e);
			if(isError) {
				setError(e.data.message)
			} else {
				setError('Неизвестная ошибка');
			}
		}
	}

	return (
		<Layout>
			<Row align='middle' justify='center'>
				<EmployeeForm onFinish={handleAddEmployee} btnText='Добавить' title='Добавить сотрудника' error={error} />
			</Row>
		</Layout>
	)
}

export default AddEmployee;