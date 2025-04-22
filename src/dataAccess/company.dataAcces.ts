import * as Models from '../models/index';

export class CompanyDataAcceess {
  async findById(id: number): Promise<Models.Company> {
    const company = await Models.Company.findByPk(id);
    return company;
  }
  async create(
    name: string,
    description: string,
    email: string,
    phoneNumber: string,
    address: string,
  ) {
    const company = await Models.Company.create({
      name,
      description,
      email,
      phoneNumber,
      address,
    });
    return company;
  }
  async update(
    id: number,
    name: string,
    description: string,
    email: string,
    phoneNumber: string,
    address: string,
  ) {
    await Models.Company.update(
      {
        name,
        description,
        email,
        phoneNumber,
        address,
      },
      {
        where: {
          id,
        },
      },
    );
  }
  async findAll() {
    const companies = await Models.Company.findAll({
      order: [['id', 'DESC']],
    });
    return companies;
  }
  async delete(id: number) {
    await Models.Company.destroy({
      where: {
        id,
      },
    });
  }
}
