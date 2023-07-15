const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET /api/employees/
 * @desс Получение всех сотрудников
 * @access Private
 */
const all = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Не удалось получить сотрудников" });
  }
};
/**
 * @route POST /api/employees/add
 * @desс Добавление сотрудника
 * @access Private
 */
const add = async (req, res) => {
  try {
    const { firstName, lastName, address, age } = req.body;
    if (!firstName || !lastName || !address || !age) {
      return res
        .status(400)
        .json({ message: "Пожалуйста заполните обязательные поля" });
    }

    const employee = await prisma.employee.create({
      data: { firstName, lastName, address, age, userId: req.user.id },
    });

    return res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};
/**
 * @route POST /api/employees/remove/:id
 * @desс Удаление сотрудника
 * @access Private
 */
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.employee.delete({ where: { id } });
    res.status(204).json({ message: "Пользователь удален" });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};
/**
 * @route PUT /api/employees/edit/:id
 * @desс Редактирование сотрудника
 * @access Private
 */
const edit = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    await prisma.employee.update({ where: { id }, data });
    res.status(204).json({ message: "Пользователь изменен" });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};
/**
 * @route GET /api/employees/:id
 * @desс Получение сотрудника
 * @access Private
 */
const employee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await prisma.employee.findUnique({ where: { id } });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};
module.exports = { all, add, remove, edit, employee };
