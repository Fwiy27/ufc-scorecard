import { supabase } from "./supabaseClient.js";

// Insert new match to matches and rounds
export async function insertMatch(
  fighterOne,
  fighterTwo,
  event,
  numRounds,
  roundScores,
  weightClass
) {
  const fighterOneScore = roundScores
    .map((round) => round[0])
    .reduce((sum, score) => sum + score, 0);
  const fighterTwoScore = roundScores
    .map((round) => round[1])
    .reduce((sum, score) => sum + score, 0);

  const { data } = await supabase.auth.getUser();
  const userId = data?.user?.id;

  try {
    const { data: matchData, error: matchError } = await supabase
      .from("matches")
      .insert({
        user_id: userId, // Assuming you have user authentication
        fighter_one: fighterOne,
        fighter_two: fighterTwo,
        event: event,
        num_rounds: numRounds,
        fighter_one_score: fighterOneScore,
        fighter_two_score: fighterTwoScore,
        weight_class: weightClass,
      })
      .select()
      .single();

    if (matchError) throw matchError;
    const matchId = matchData.id;
    console.log("Successfully Inserted Match:", matchId);

    for (let index = 0; index < numRounds; index++) {
      const roundScore = roundScores[index];

      const { roundError } = await supabase.from("rounds").insert({
        user_id: userId, // Assuming you have user authentication
        match_id: matchId,
        round: index + 1,
        fighter_one_score: roundScore[0],
        fighter_two_score: roundScore[1],
        fighter_one_deductions: roundScore[2],
        fighter_two_deductions: roundScore[3],
      });

      if (roundError) throw roundError;
      console.log("Successfully Inserted Rounds");
      return matchId;
    }
  } catch (error) {
    console.log("Error while inserting match:", error);
  }
}

export async function getMatches() {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;

  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .eq("user_id", userId); // user_id should be a string

  if (error) {
    console.error("Error fetching matches", error);
    return [];
  }

  return data;
}

// Delete match from match and rounds

// Update match rounds with matchId
