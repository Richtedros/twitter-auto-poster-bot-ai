// By VishwaGauravIn (https://itsvg.in)

const GenAI = require("@google/generative-ai");
const { TwitterApi } = require("twitter-api-v2");
const SECRETS = require("./SECRETS");

const twitterClient = new TwitterApi({
  appKey: SECRETS.APP_KEY,
  appSecret: SECRETS.APP_SECRET,
  accessToken: SECRETS.ACCESS_TOKEN,
  accessSecret: SECRETS.ACCESS_SECRET,
});

const generationConfig = {
  maxOutputTokens: 400,
};
const genAI = new GenAI.GoogleGenerativeAI(SECRETS.GEMINI_API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig,
  });

  // Write your prompt here
  const prompt =
    "Generate content about the world of Griplore, including lore revelations, mysterious signs, tips for followers on navigating the trials, or cryptic challenges to solve. The content should be specific, engaging, and unique—focused on building intrigue and engagement with followers. Keep it under 280 characters, and make sure it's plain text. You can include emojis to enhance readability.The World of Griplore is a mysterious, AI-generated realm where followers, guided by the Legend of Griplore, navigate trials and uncover cryptic lore. The community helps the Legend recover lost memories and powers by sharing symbols, images, and information. The Terminal of Griplore assists in processing these fragments, allowing followers to unlock the deeper truths of Griplore and ascend to greater power, with generative AI soon empowering them to create within the world themselves.";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  sendTweet(text);
}

run();

async function sendTweet(tweetText) {
  try {
    await twitterClient.v2.tweet(tweetText);
    console.log("Tweet sent successfully!");
  } catch (error) {
    console.error("Error sending tweet:", error);
  }
}
