const { prisma } = require('../prisma/prisma-client');

/**
 * @route GET /api/employees
 * @desс Получение всех сотрудников
 * @access Private
 */
const all = async (req, res) => {
	try {
		const employees = await prisma.employee.findMany();
		res.status(200).json(employees);
	} catch (e) {
		res.status(400).json({ message: 'Не удалось получить сотрудников'});
	}
}

/**
 * @route POST /api/employees/add
 * @desс Добавление сотрудника
 * @access Private
 */
const add = async (req, res) => {
	try {
		const data = req.body;

		if(!data.firstName || !data.lastName || !data.age || !data.address) {
			res.status(500).json({message: 'Все поля обязательны'})
		}

		const employee = await prisma.employee.create({
			data: {
				...data,
				userId: req.user.id
			}
		});

		return res.status(201).json(employee);
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так'});
	}
}

/**
 * @route POST /api/employees/remove/:id
 * @desс Удаление сотрудника
 * @access Private
 */
const remove = async (req, res) => {
	const { id } = req.body;

	try {
		const removed = await prisma.employee.delete({
			where: {
				id
			}
		});

		res.status(200).json(removed);
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так'});
	}
}

/**
 * @route PUT /api/employees/edit/:id
 * @desс Редактирование сотрудника
 * @access Private
 */
const edit = async (req, res) => {
	const data = req.body;
	const id = data.id;

	try {
		const edited = await prisma.employee.update({
			where: {
				id
			},
			data
		});

		res.status(200).json(edited);
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так'});
	}
}

/**
 * @route GET /api/employees/:id
 * @desс Получение сотрудника
 * @access Private
 */
const employee = async (req, res) => {
	const { id } =  req.params;

	try {
		const employee = await prisma.employee.findUnique({
			where: {
				id
			}
		});

		res.status(200).json(employee);
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так'});
	}
}

module.exports = {
	all,
	add,
	remove,
	edit,
	employee
}