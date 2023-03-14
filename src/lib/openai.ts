import { Configuration, OpenAIApi } from "openai";
import { get } from "svelte/store";
import { APIKey } from './store';

const apikey = get(APIKey);

const config = new Configuration({
  apiKey: apikey
});

const openai = new OpenAIApi(config);

export const generateTweet = async (prompt: string) => {
  try {
    const ask = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages:
        [
          { role: "system", content: "Ton rôle va être de générer des tweets un peu aigri sur une situation donné. Le résultat dois uniquement être un tweet avec jusqu'à 3 hashtag à la fin et jusqu'à 5 emoji avant les hashtag." },
          { role: "user", content: `Situation: ${prompt}` }
        ]
    })
    return ask;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}
