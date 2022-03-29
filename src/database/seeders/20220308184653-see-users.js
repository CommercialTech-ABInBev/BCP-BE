'use strict';
import AuthUtils from '../../utils/auth';

const { hashPassword } = AuthUtils;

export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Users', [
    {
      name: 'Uche Mark',
      email: 'Adeola.Bello@ng.ab-inbev.com',
      inviteStatus: 'Active',
      location: 'Lagos',
      password: await hashPassword('Hilarious1'),
      role: 'cic',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Kingsley Anyagu',
      email: 'Samuel.Adebisi@ng.ab-inbev.com',
      inviteStatus: 'Active',
      location: 'Lagos',
      password: await hashPassword('Hilarious2'),
      role: 'admin',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Oyinlola Evelyn',
      email: 'Oluwasike.Ogunrinu@ng.ab-inbev.com',
      inviteStatus: 'J0M0',
      location: 'Lagos',
      password: await hashPassword('Hilarious3'),
      role: 'whm',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'warehouse manager',
      email: 'whm@ng.ab-inbev.com',
      inviteStatus: 'F0M0',
      location: 'Lagos',
      password: await hashPassword('Hilarious4'),
      role: 'whm',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}
export function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete('Users', null, {});
}
