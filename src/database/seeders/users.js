import faker from 'faker';
import { hashPassword } from '../../middleware/authentication';
import User from '../models/User';


const password = hashPassword('passwordHash');

const createSeededUsers = async () => {
  await User.deleteMany({});
  const user1 = new User({
    username: 'admin',
    email: 'admin@mockpl.com',
    password,
    role: 'admin',
  });

  const user2 = new User({
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: hashPassword(faker.internet.password()),

  });
  const user3 = new User({
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: hashPassword(faker.internet.password()),

  });
  const user4 = new User({
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: hashPassword(faker.internet.password()),

  });
  const user5 = new User({
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: hashPassword(faker.internet.password()),

  });
  await user1.save();
  await user2.save();
  await user3.save();
  await user4.save();
  await user5.save();
};

export default createSeededUsers;
