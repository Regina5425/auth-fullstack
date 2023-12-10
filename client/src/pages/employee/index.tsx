import {useState} from 'react';
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom';
import {useGetEmployeeQuery, useRemoveEmployeeMutation} from '../../app/services/employees';
import {useSelector} from 'react-redux';
import {selectUser} from '../../features/auth/authSlice';
import Layout from '../../components/layout';
import {Descriptions, Divider, Modal, Space} from 'antd';
import CustomButton from '../../components/button';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {ErrorMsg} from '../../components/errorMsg';
import {Paths} from '../../paths';
import {IsErrorWithMsg} from '../../utils/is-error-with-msg';

const Employee = () => {
	const [error, setError] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();
	const params = useParams<{id: string}>();
	const {data, isLoading} = useGetEmployeeQuery(params.id || '');
	const [removeEmployee] = useRemoveEmployeeMutation();
	const user = useSelector(selectUser);

	if(isLoading) {
		return <span>Загрузка...</span>
	}

	if(!data) {
		return <Navigate to='/' />
	}

	const showModal = () => {
		setIsModalOpen(true);
	}

	const hideModal = () => {
		setIsModalOpen(false);
	}

	const handleDeleteUser = async  () => {
		hideModal();

		try {
			await removeEmployee(data.id).unwrap();
			navigate(`${Paths.status}/deleted`);
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
			<Descriptions title='Информация о сотруднике' bordered>
				<Descriptions.Item label='Имя' span={3}>
					{`${data.firstName} ${data.lastName}`}
				</Descriptions.Item>
				<Descriptions.Item label='Возраст' span={3}>
					{data.age}
				</Descriptions.Item>
				<Descriptions.Item label='Адрес' span={3}>
					{data.address}
				</Descriptions.Item>
			</Descriptions>
			{user?.id === data.userId && (
				<>
					<Divider orientation='left'>Действия</Divider>
					<Space>
						<Link to={`/employee/edit/${data.id}`}>
							<CustomButton htmlType='button' shape='round' type='default' icon={<EditOutlined />}>
								Редактировать
							</CustomButton>
						</Link>
						<CustomButton htmlType='button' shape='round' danger icon={<DeleteOutlined />} onClick={showModal}>
							Удалить
						</CustomButton>
					</Space>
				</>
			)}
			<ErrorMsg message={error}/>
			<Modal
				title='Подтвердите удаление'
				open={isModalOpen}
				onOk={handleDeleteUser}
				onCancel={hideModal}
				okText='Подтвердить'
				cancelText='Отмена'
			>
				Вы действительно хотите удалить сотрудника?
			</Modal>
		</Layout>
	)
}

export default Employee;