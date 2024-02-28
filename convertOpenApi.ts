require("dotenv").config();

const fs = require("fs");
const axios = require("axios");

const openApiV2Url = process.env.OPENAPIV2URL;
const openAIKey = process.env.OPENAIKEY;

async function convertOpenApi() {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-3.5-turbo-instruct",
        prompt: `Please convert the following OpenAPI v2 specification to OpenAPI v3 format and return only the resulting JSON payload without any additional text or explanation:\n\n${openApiV2Url}`,
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
    console.log(response.data.choices[0].text);
    fs.writeFile(
      "openapi-v3.json",
      response.data.choices[0].text,
      (err: any) => {
        if (err) {
          console.error(`Error writing OpenAPI v3 JSON to file: ${err}`);
        } else {
          console.log("OpenAPI v3 JSON written to file.");
        }
      }
    );
  } catch (error) {
    console.error(`Error converting OpenAPI spec: ${error}`);
  }
}

convertOpenApi();
