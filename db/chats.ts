import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const userMessage = req.body.message;

  try {
    const flowiseResponse = await fetch("http://flowise-lab.enigmaa.in/api/v1/prediction/6a619533-06fd-4df6-a07c-88403bb5c418", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: userMessage
      })
    });

    const data = await flowiseResponse.json();

    return res.status(200).json({
      response: data.text // Adjust based on Flowise API response
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Flowise API error" });
  }
}
