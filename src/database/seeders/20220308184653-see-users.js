'use strict';
import AuthUtils from '../../utils/auth';

const { hashPassword } = AuthUtils;

export async function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
            name: 'Uche Mark',
            email: 'ucheuzochukwumark@gmail.com',
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
            email: 'Kingsley@gmail.com',
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
            email: 'Oyinlola@gmail.com',
            inviteStatus: 'Active',
            location: 'Lagos',
            password: await hashPassword('Hilarious3'),
            role: 'whm',
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'warehouse manager',
            email: 'whm@gmail.com',
            inviteStatus: 'F0M0',
            location: 'Lagos',
            password: await hashPassword('Hilarious3'),
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