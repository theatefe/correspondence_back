'use strict';

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'roles',
      [
        {
          title: 'administrator',
          description: 'administrator',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {
        fields: ['title'],
        ignoreDuplicates: true,
      },
    ),
  down: (queryInterface) => queryInterface.bulkDelete('admin', null, {}),
};
