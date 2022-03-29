module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'Customers',
      'creditLimit',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    ),
    queryInterface.addColumn(
      'Customers',
      'area',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    ),
    queryInterface.addColumn(
      'Customers',
      'valCurrentInv',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    ),
    queryInterface.addColumn(
      'Customers',
      'val30daysInv',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    ),
    queryInterface.addColumn(
      'Customers',
      'val60daysInv',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    ),
    queryInterface.addColumn(
      'Customers',
      'val90daysInv',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    ),
    queryInterface.addColumn(
      'Customers',
      'val120daysInv',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    ),
    queryInterface.addColumn(
      'Customers',
      'termsCode',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    ),
    queryInterface.addColumn(
      'Customers',
      'customerClass',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    ),
    queryInterface.addColumn(
      'Customers',
      'contact',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    ),
    queryInterface.addColumn(
      'Customers',
      'phoneNumber',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    ),
    queryInterface.addColumn(
      'Customers',
      'shipToAddr1',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    ),
    queryInterface.addColumn(
      'Customers',
      'shipToAddr2',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    ),
    queryInterface.addColumn(
      'Customers',
      'shipToAddr3',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    ),
    queryInterface.addColumn(
      'Customers',
      'shipToAddr4',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    ),
    queryInterface.addColumn(
      'Customers',
      'shipToAddr5',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    ),
  ]),
  down: (queryInterface) => Promise.all([
    queryInterface.removeColumn('Customers', 'creditLimit'),
    queryInterface.removeColumn('Customers', 'area'),
    queryInterface.removeColumn('Customers', 'valCurrentInv'),
    queryInterface.removeColumn('Customers', 'val30daysInv'),
    queryInterface.removeColumn('Customers', 'val60daysInv'),
    queryInterface.removeColumn('Customers', 'val90daysInv'),
    queryInterface.removeColumn('Customers', 'val120daysInv'),
    queryInterface.removeColumn('Customers', 'termsCode'),
    queryInterface.removeColumn('Customers', 'customerClass'),
    queryInterface.removeColumn('Customers', 'phoneNumber'),
    queryInterface.removeColumn('Customers', 'contact'),
    queryInterface.removeColumn('Customers', 'shipToAddr1'),
    queryInterface.removeColumn('Customers', 'shipToAddr2'),
    queryInterface.removeColumn('Customers', 'shipToAddr3'),
    queryInterface.removeColumn('Customers', 'shipToAddr4'),
    queryInterface.removeColumn('Customers', 'shipToAddr5'),
  ])
};
