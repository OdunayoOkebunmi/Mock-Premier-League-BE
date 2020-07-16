import faker from 'faker';
import Team from '../models/Team';


const createSeededTeams = async () => {
  await Team.deleteMany({});
  const team1 = new Team({
    name: faker.name.firstName(),
  });

  const team2 = new Team({
    name: faker.name.firstName(),
  });

  const team3 = new Team({
    name: faker.name.firstName(),
  });

  const team4 = new Team({
    name: faker.name.firstName(),
  });

  const team5 = new Team({
    name: faker.name.firstName(),
  });

  const team6 = new Team({
    name: faker.name.firstName(),
  });

  await team1.save();
  await team2.save();
  await team3.save();
  await team4.save();
  await team5.save();
  await team6.save();
};

export default createSeededTeams;
