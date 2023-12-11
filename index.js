import "dotenv/config.js"
import OpenAI from "openai"

const openai = new OpenAI(process.env.OPENAI_API_KEY)

let userMood = `angry`
let userMoodReason = `I failed a test and finals are very stressful. I feel like there's not enough time in the day to get everything done.`

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `User is feeling ${userMood}. The reason they're feeling this way is ${userMoodReason}. They struggle with their mental health at varying times to varying degrees. Please advise the user with good advice. Pointing them to useful resources if necessary, for example therapists or psychiatrists in more extreme cases, but most cases to their family, friends, and trusted loved ones. Encourage solutions that get them away from being absorbed in technology online. If they are doing well, advise them on how to keep it up.`,
      },
    ],
    model: "gpt-3.5-turbo",
  })

  console.log(completion.choices[0].message.content)
}

main()
