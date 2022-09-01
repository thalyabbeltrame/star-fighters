import axios from "axios";

import * as fightersRepository from "../repositories/fightersRepository"
import { User } from "../interfaces/userInterface";

const postBattle = async (firstUser: string, secondUser: string) => {
  if (firstUser === secondUser) {
    throw { code: "BadRequest", message: "First username and second username have to be different" }
  }

  const firstFighterRepositories = await getUserGitHub(firstUser);
  const secondFighterRepositories = await getUserGitHub(secondUser);
  if (!firstFighterRepositories.data[0] || !secondFighterRepositories.data[0] ) {
    throw { code: "NotFound", message: "User account does not exist" }
  }

  const firstFighter: User = await fightersRepository.getFighterByName(firstUser);
  if (!firstFighter) await fightersRepository.postFighter(firstUser);
  
  const secondFighter: User = await fightersRepository.getFighterByName(secondUser);
  if (!secondFighter) await fightersRepository.postFighter(secondUser);

  const firstFighterStars = getTotalStars(firstFighterRepositories.data);
  const secondFighterStars = getTotalStars(secondFighterRepositories.data);

  if (firstFighterStars > secondFighterStars) {
    await fightersRepository.updateFighterWins(firstUser);
    await fightersRepository.updateFighterLosses(secondUser);
    return { winner: firstUser, loser: secondUser, draw: false }
  } 
  
  if (secondFighterStars > firstFighterStars) {
    await fightersRepository.updateFighterWins(secondUser);
    await fightersRepository.updateFighterLosses(firstUser);
    return { winner: secondUser, loser: firstUser, draw: false }
  } 

  await fightersRepository.updateFighterDraws(firstUser);
  await fightersRepository.updateFighterDraws(secondUser);
  return { winner: null, loser: null, draw: true }
}

const getUserGitHub = (username: string) => {
  return axios.get(
    `https://api.github.com/users/${username}/repos`
  );
}

const getTotalStars = (repos: any) => {
  let stars: number = 0;
  repos.forEach((repo: { stargazers_count: number }) => {
      stars += repo.stargazers_count
  });

  return stars;
}

export { postBattle };