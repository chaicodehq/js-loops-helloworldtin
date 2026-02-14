/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  if (!Array.isArray(matches) || matches.length === 0) return [];

  const accumulator = {};

  for (const match of matches) {

    if (!accumulator[match.team1]) accumulator[match.team1] = {
      team: match.team1, played: 0, won: 0, lost: 0, tied: 0, noResult: 0, points: 0
    }

    if (!accumulator[match.team2]) accumulator[match.team2] = {
      team: match.team2, played: 0, won: 0, lost: 0, tied: 0, noResult: 0, points: 0
    }

    const team1Data = accumulator[match.team1];
    const team2Data = accumulator[match.team2];

    team1Data.played += 1;
    team2Data.played += 1;

    if (match.winner !== undefined) {
      if (match.winner === match.team1) {
        team1Data.won += 1;
        team1Data.points += 2;
        team2Data.lost += 1;

      } else {
        team2Data.won += 1;
        team2Data.points += 2;
        team1Data.lost += 1;
      }
    }

    if (match.result === "tie") {
      team1Data.tied += 1;
      team2Data.tied += 1;
      team1Data.points += 1;
      team2Data.points += 1;
    } else if (match.result === "no_result") {
      team1Data.noResult += 1;
      team2Data.noResult += 1;
      team1Data.points += 1;
      team2Data.points += 1;
    }
  }
  const results = Object.values(accumulator);

  results.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return a.team.localeCompare(b.team);
  });

  return results;
}
