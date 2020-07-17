import faker from 'faker';
import Fixture from '../models/Fixture';
import { handleTime } from '../../helper/utils';

const createSeededFixtures = async () => {
  await Fixture.deleteMany({});
  const fixture1 = new Fixture({
    time: handleTime(faker.date.future()),
    home: 'Gayle Nitzsche',
    away: 'Timmothy Balistreri',
    location: faker.address.city(),
    status: 'pending',
    slug: 'gayle-nitzsche-timmothy-balistreri-7ccfb',
  });

  const fixture2 = new Fixture({
    time: handleTime(faker.date.future()),
    home: 'Jedidiah Gerlach',
    away: 'Fletcher',
    location: faker.address.city(),
    status: 'pending',
    slug: 'jedidiah-gerlach-fletcher-63d78',
  });

  const fixture3 = new Fixture({
    time: handleTime(faker.date.future()),
    home: 'Maida',
    away: 'Wunsch',
    location: faker.address.city(),
    status: 'completed',
    slug: 'maida-wunsch-6cc87',
  });

  const fixture4 = new Fixture({
    time: handleTime(faker.date.future()),
    home: 'Trenl',
    away: 'Rempe',
    location: faker.address.city(),
    status: 'pending',
    slug: 'trenl-rempe-c8735',
  });

  const fixture5 = new Fixture({
    time: handleTime(faker.date.future()),
    home: 'Hugh',
    away: 'Howell',
    location: faker.address.city(),
    status: 'completed',
    slug: 'hugh-howell-d20f0',
  });

  const fixture6 = new Fixture({
    time: handleTime(faker.date.future()),
    home: 'Santiago',
    away: 'MacGyver MD',
    location: faker.address.city(),
    status: 'pending',
    slug: 'santiago-macgyver-md-c236a',
  });

  await fixture1.save();
  await fixture2.save();
  await fixture3.save();
  await fixture4.save();
  await fixture5.save();
  await fixture6.save();
};

export default createSeededFixtures;
