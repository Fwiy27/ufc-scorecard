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
  const { data } = await supabase.auth.getUser();
  const userId = data?.user?.id;

  try {
    const { data: matchData, error: matchError } = await supabase
      .from("matches")
      .insert({
        user_id: userId, // Assuming you have user authentication
        fighter_one: JSON.stringify(fighterOne),
        fighter_two: JSON.stringify(fighterTwo),
        event: event,
        num_rounds: numRounds,
        scores: JSON.stringify(roundScores),
        weight_class: weightClass,
      })
      .select()
      .single();

    if (matchError) throw matchError;
    const matchId = matchData.id;
    console.log("Successfully Inserted Match:", matchId);

    return matchId;
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

export async function getMatch(matchId) {
  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .eq("id", matchId)
    .single();

  return data;
}

// Delete match with matchId
export async function deleteMatch(matchId) {
  try {
    const { error } = await supabase.from("matches").delete().eq("id", matchId);
    if (error) throw error;
    console.log("Successfully deleted match: ", matchId);
    return true;
  } catch (error) {
    console.log("Error deleting match", error);
    return false;
  }
}

// Update match rounds with matchId
