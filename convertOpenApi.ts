require("dotenv").config();

const axios = require("axios");

const openApiV2Url = process.env.OPENAPIV2URL;
const openAIKey = process.env.OPENAIKEY;

async function convertOpenApi() {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-3.5-turbo-instruct",
        prompt: `Convert the following OpenAPI v2 specification to OpenAPI v3:\n\n${openApiV2Url}`,
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAIKey}`,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error(`Error converting OpenAPI spec: ${error}`);
  }
}

convertOpenApi();
