module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'Inventories',
      'drinkStockCode',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    ),
    queryInterface.addColumn(
      'Inventories',
      'drinkDesc',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    ),
    queryInterface.addColumn(
      'Inventories',
      'type',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    ),
    queryInterface.addColumn(
      'Inventories',
      'emptyStockCode',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    ),
    queryInterface.addColumn(
      'Inventories',
      'emptyDesc',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    ),
    queryInterface.addColumn(
      'Inventories',
      'emptyPrices',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    ),
  ]),
  down: (queryInterface) => Promise.all([
    queryInterface.removeColumn('Inventories', 'drinkStockCode'),
    queryInterface.removeColumn('Inventories', 'drinkDesc'),
    queryInterface.removeColumn('Inventories', 'type'),
    queryInterface.removeColumn('Inventories', 'emptyDesc'),
    queryInterface.removeColumn('Inventories', 'emptyPrices'),
    queryInterface.removeColumn('Inventories', 'emptyStockCode'),
  ])
};
