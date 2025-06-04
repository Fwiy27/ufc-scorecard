import { supabase } from "./supabaseClient.js";

async function insertMatch(fighterOne, fighterTwo, numRounds, roundScores) {
  try {
    // Insert Fighters
    const { data: fighterOneData, error: fighterOneError } = await supabase
      .from("fighters")
      .upsert({ first_name: fighterOne[0], last_name: fighterOne[1] })
      .select("id")
      .single();

    if (fighterOneError) throw fighterOneError;

    const { data: fighterTwoData, error: fighterTwoError } = await supabase
      .from("fighters")
      .upsert({ first_name: fighterTwo[0], last_name: fighterTwo[1] })
      .select("id")
      .single();

    if (fighterTwoError) throw fighterTwoError;

    const fighterOneId = fighterOneData.id;
    const fighterTwoId = fighterTwoData.id;

    // Insert Match
    const { data: matchData, error: matchError } = await supabase
      .from("matches")
      .insert({
        fighter_one_id: fighterOneId,
        fighter_two_id: fighterTwoId,
        num_rounds: numRounds,
      })
      .select("id")
      .single();

    if (matchError) throw matchError;

    const matchId = matchData.id;

    // Insert round scores
    const roundScoresData = roundScores.map((round, index) => ({
      match_id: matchId,
      round_number: index + 1,
      fighter_one_id: fighterOneId,
      fighter_two_id: fighterTwoId,
      fighter_one_score: round[0],
      fighter_two_score: round[1],
      fighter_one_deductions: round[2],
      fighter_two_deductions: round[3],
    }));

    const { error: roundScoresError } = await supabase
      .from("round_scores")
      .insert(roundScoresData);

    if (roundScoresError) throw roundScoresError;

    console.log("Data inserted successfully");
    return matchId; // Return the match ID for further operations
  } catch (error) {
    console.log("Error inserting data:", error);
  }
}

async function removeMatch(matchId) {
  try {
    // Remove Rounds
    const { error: roundError } = await supabase
      .from("round_scores")
      .delete()
      .eq("match_id", matchId);

    if (roundError) throw roundError;

    // Remove Match
    const { error: matchError } = await supabase
      .from("matches")
      .delete()
      .eq("id", matchId);

    if (matchError) throw matchError;
    console.log("Succesfully removed match");
  } catch (error) {
    console.log("Error deleting data:", error);
  }
}

async function updateMatch(matchId, roundScores) {
  try {
    for (let i = 0; i < roundScores.length; i++) {
      const round = roundScores[i];
      const { error } = await supabase
        .from("round_scores")
        .update({
          fighter_one_score: round[0],
          fighter_two_score: round[1],
          fighter_one_deductions: round[2],
          fighter_two_deductions: round[3],
          updated_at: new Date().toISOString(),
        })
        .eq("match_id", matchId)
        .eq("round_number", i + 1);

      if (error) throw error;
    }
    console.log("Match updated successfully");
  } catch (error) {
    console.log("Error updating match:", error);
  }
}

export { insertMatch, removeMatch, updateMatch };

// const fighterOne = ["Landon", "Migawa"];
// const fighterTwo = ["Jon", "Jones"];
// const numRounds = 3;
// const roundScores = [
//   [10, 9, 0, 0],
//   [9, 10, 0, 0],
//   [10, 9, 0, 1],
// ];

// insertMatch(fighterOne, fighterTwo, numRounds, roundScores);

// const newScores = [
//   [10, 9, 0, 0],
//   [10, 9, 0, 0],
//   [10, 9, 0, 0],
// ];

// updateMatch(3, newScores);

// removeMatch(2);
