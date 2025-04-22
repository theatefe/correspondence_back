'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'letters_numbering',
        'lastNumber',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('letters_numbering', 'lastNumber');
  },
};

// run this command at service root directory: npx sequelize-cli db:migrate --env test
// run this command at service root directory: npx sequelize-cli db:seed:all --env test
