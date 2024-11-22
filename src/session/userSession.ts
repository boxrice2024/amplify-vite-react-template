import { client } from '../db/client';

const getUser = async(userName) => {
  const { data: user, errors } = await client.models.User.get({
    userName: userName,
  });

  return user;
}

export const clearUserSession = () => {
  localStorage.removeItem("username");
};

export const getUserSession = async() => {
  const userName = localStorage.getItem("username");
  if (userName) {
    const user = await getUser(userName);
    if (user && !user.isSurveyComplete) {
        return userName;
    }
  }
  return undefined;
}
