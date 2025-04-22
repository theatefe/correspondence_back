'use strict';

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('medias', [
      {
        mediaUrl: 'test.jpg',
        ownerId: '1',
        ownerModel: 'postMedia',
        mimeType: '22200033',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete('media', null, {}),
};
// run this command at service root directory: npx sequelize-cli db:migrate --env test
// run this command at service root directory: npx sequelize-cli db:seed:all --env test
