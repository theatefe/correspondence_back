'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const md5 = require('md5');

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'admins',
      [
        {
          username: 'admin',
          password: md5('1234'),
          name: 'admin',
          lastName: 'admin',
          mobile: '01',
          email: 'sfsdfsffs@ss.co',
          activeStatus: 1,
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {
        fields: ['username'],
        ignoreDuplicates: true,
      },
    ),
  down: (queryInterface) => queryInterface.bulkDelete('admin', null, {}),
};
