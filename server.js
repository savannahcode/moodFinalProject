import "dotenv/config.js"
import OpenAI from "openai"

const openai = new OpenAI(process.env.OPENAI_API_KEY)

let userMood = `confused`
let userMoodReason = `I'm just a bad person. I feel like no one loves me and I'm so lonely. I got broken up with amd I'm so sad. I'm so depressed. I'm so anxious. I'm so stressed. I'm so angry. I'm so mad. I'm so happy. I'm so excited. I'm so tired. I'm so exhausted.`

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `User is feeling ${userMood}. The reason they're feeling this way is ${userMoodReason}. They struggle with their mental health at varying times to varying degrees. Please advise the user with good advice. Pointing them to useful resources if necessary, for example therapists or psychiatrists in more extreme cases, but most cases to their family, friends, and trusted loved ones. Encourage solutions that get them away from being absorbed in technology online. If they are doing well, advise them on how to keep it up. Make sure you give a good amount of advice that is relevant to the situation. Threatening themseleves or others is an extreme case. Give them a list of things they can do to feel better. Specifically mention what they said in their userReasonMood so they feel listened to. Make sure the response is at least 500 words.`,
      },
    ],
    model: "gpt-3.5-turbo",
  })

  console.log(completion.choices[0].message.content)
}

main()
