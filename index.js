const { Configuration, OpenAIAPI } = require("openai")

// Note: There is no need to use Configuration, directly use OpenAIAPI
const openai = new OpenAIAPI({
  key: "YOUR_API_KEY",
})

const runPrompt = async () => {
  const prompt = "Tell me a joke about a cat eating pasta."

  const response = await openai.createCompletion({
    engine: "text-davinci-003",
    prompt: prompt,
    max_tokens: 2048,
    temperature: 1,
  })
  console.log(response.data)
}

runPrompt()
