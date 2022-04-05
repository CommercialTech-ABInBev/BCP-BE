module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'Inventories',
      'isEmpty',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      }
    ),
  ]),
  down: (queryInterface) => Promise.all([
    queryInterface.removeColumn('Inventories', 'isEmpty'),
  ])
};
