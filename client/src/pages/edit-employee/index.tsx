import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useEditEmployeeMutation, useGetEmployeeQuery} from '../../app/services/employees';
import Layout from '../../components/layout';
import {Row} from 'antd';
import EmployeeForm from '../../components/employee-form';
import {Employee} from '@prisma/client';
import {Paths} from '../../paths';
import {IsErrorWithMsg} from '../../utils/is-error-with-msg';

const EditEmployee = () => {
	const navigate = useNavigate();
	const params = useParams<{id: string}>();
	const [error, setError] = useState('');
	const {data, isLoading} = useGetEmployeeQuery(params.id || '');
	const [editEmployee] = useEditEmployeeMutation();

	const handleEditEmployee = async (employee: Employee) => {
		try {
			const editedEmployee = {
				...data,
				...employee
			}
			await editEmployee(editedEmployee).unwrap();
			navigate(`${Paths.status}/updated`);
		} catch (e) {
			const isError = IsErrorWithMsg(e);
			if(isError) {
				setError(e.data.message);
			} else {
				setError('Неизвестная ошибка');
			}
		}
	}

	if(isLoading) {
		return <span>Загрузка...</span>
	}

	return (
		<Layout>
			<Row align='middle' justify='center'>
				<EmployeeForm
					onFinish={handleEditEmployee}
					btnText='Редактировать'
					title='Редактировать сотрудника'
					error={error}
					employee={data}
				/>
			</Row>
		</Layout>
	)
}

export default EditEmployee;