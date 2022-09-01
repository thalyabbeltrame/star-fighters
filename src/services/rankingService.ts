import * as fightersRepository from "../repositories/fightersRepository"

const getRanking = async () => {
  const { rows: ranking } = await fightersRepository.getRanking()
  if (ranking.length !== 0) return ranking;
  throw { code: "NotFound", message: "Empty list" }
}

export { getRanking };