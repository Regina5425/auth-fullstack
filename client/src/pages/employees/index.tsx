import {useEffect} from 'react';
import {Employee} from '@prisma/client';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Table} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import type {ColumnsType} from 'antd/es/table';
import {useGetAllEmployeesQuery} from '../../app/services/employees';
import Layout from '../../components/layout';
import CustomButton from '../../components/button';
import {Paths} from '../../paths';
import {selectUser} from '../../features/auth/authSlice';

const columns: ColumnsType<Employee> = [
	{
		title: 'Имя',
		dataIndex: 'firstName',
		key: 'firstName'
	},
	{
		title: 'Возраст',
		dataIndex: 'age',
		key: 'age'
	},
	{
		title: 'Адрес',
		dataIndex: 'address',
		key: 'address'
	},
]

export const Employees = () => {
	const navigate = useNavigate();
	const user = useSelector(selectUser);
	const {data, isLoading} = useGetAllEmployeesQuery();

	const addEmployee = () => navigate(`${Paths.employeeAdd}`)

	useEffect(() => {
		if(!user) {
			navigate(`${Paths.login}`);
		}
	}, [navigate, user])

	return (
		<Layout>
			<CustomButton type='primary' htmlType='submit' onClick={addEmployee} icon={<PlusCircleOutlined />}>
				Добавить
			</CustomButton>
			<Table
				loading={isLoading}
				dataSource={data}
				pagination={false}
				columns={columns}
				rowKey={(record) => record.id}
				onRow={(record) => {
					return {
						onClick: () => {
							navigate(`${Paths.employee}/${record.id}`)
						}
					}
				}}
			/>
		</Layout>
	)
}