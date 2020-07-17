/* eslint-disable import/prefer-default-export */
import uuid from 'uuid';

export const CreateUniqueSlug = (homeTeam, awayTeam) => {
  const idSubstring = uuid.v4().substring(0, 5);
  const home = homeTeam.split(' ').join('-');
  const away = awayTeam.split(' ').join('-');
  return `${home.toLowerCase()}-${away.toLowerCase()}-${idSubstring}`;
};

export const handleTime = time => new Date(time).toDateString();

export const searchByStatus = (status, searchArray) => {
  const data = searchArray.filter((object) => {
    if (object.status === status) {
      return true;
    }
    return false;
  });
  return data;
};
