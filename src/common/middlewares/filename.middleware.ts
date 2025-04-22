import { Tools } from '../helpers/tools.helper';
const tools = new Tools();
export const editFileName = (req, file, callback) => {
  const name = tools.normalize(file.originalname.split('.')[0]);

  const fileExtName = file.originalname.substring(
    file.originalname.lastIndexOf('.'),
    file.originalname.length,
  );
  const randomName = Math.floor(1000000 + Math.random() * 8999999);
  callback(null, `${name}-${randomName}${Date.now()}-${fileExtName}`);
};
