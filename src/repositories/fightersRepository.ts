import connection from "../databases/postgres";
import { User } from "../interfaces/userInterface";

const getFighterByName = async (username: string) : Promise<User> => {
  const {rows: fighter} = await connection.query(
    `
      SELECT * 
      FROM fighters
      WHERE username = ($1)
    `, 
    [username]
  );
  return fighter[0];
}

const postFighter = async (username: string) : Promise<User> => {
  const {rows: fighter} = await connection.query(
    `
      INSERT INTO fighters (username, wins, losses, draws)
      VALUES ($1, $2, $3, $4) RETURNING id, username, wins, losses, draws
    `, 
    [username, 0, 0, 0]
  );
  return fighter[0];
}

const updateFighterWins = async (username: string) => {
  await connection.query(
    `
      UPDATE fighters SET wins = wins + 1 
      WHERE username = ($1)
    `,
    [username]
  );
}

const updateFighterLosses = async (username: string) => {
  await connection.query(
    `
      UPDATE fighters SET losses = losses + 1 
      WHERE username = ($1)
    `,
    [username]
  );
}

const updateFighterDraws = async (username: string) => {
  await connection.query(
    `
      UPDATE fighters SET draws = draws + 1 
      WHERE username = ($1)
    `,
    [username]
  );
}

const getRanking = async () =>  {
  return connection.query(
    `
      SELECT * 
      FROM fighters 
      ORDER BY wins DESC, draws DESC
    `
  )
}

export { getFighterByName, postFighter, updateFighterWins, updateFighterLosses, updateFighterDraws, getRanking }