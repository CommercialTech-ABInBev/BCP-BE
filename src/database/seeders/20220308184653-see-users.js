'use strict';
import AuthUtils from '../../utils/auth';

const { hashPassword } = AuthUtils;

export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Users', [
    {
      name: 'Adeola Bello',
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
      name: 'Samuel Adebisi',
      email: 'Samuel.Adebisi@ng.ab-inbev.com',
      inviteStatus: 'F0M0',
      location: 'Lagos',
      password: await hashPassword('Hilarious2'),
      role: 'dist',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Lulu Briggs',
      email: 'Lulu.Briggs@ng.ab-inbev.com',
      inviteStatus: 'J0M0',
      location: 'Lagos',
      password: await hashPassword('Hilarious3'),
      role: 'dist',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Oluwasike Ogunrinu',
      email: 'Oluwasike.Ogunrinu@ng.ab-inbev.com',
      inviteStatus: 'J0M0',
      location: 'Lagos',
      password: await hashPassword('Hilarious4'),
      role: 'whm',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'warehouse Manager',
      email: 'whm@ng.ab-inbev.com',
      inviteStatus: 'F0M0',
      location: 'Lagos',
      password: await hashPassword('Hilarious5'),
      role: 'whm',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: "super.admin@ng.ab-inbev.com",
      name: "Super Admin",
      inviteStatus: "Active",
      location: "Lagos",
      password: await hashPassword("Hilarious9"),
      role: "superadmin",
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
  }
  ]);
}
export function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete('Users', null, {});
}
