export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { data } = await req.json();
    console.log("Request data:", data); // Debugging: Log the received data

    // Make a POST request to your custom API endpoint
    const apiEndpoint =
      "https://ai-agent-chat-fsxdhm.5sc6y6-4.usa-e2.cloudhub.io/composed";
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ data }), // Ensure data is sent correctly
    });

    const text = await response.text();
    console.log("Response text:", text);

    let responseData;
    try {
      responseData = JSON.parse(text);
    } catch (jsonError) {
      console.error("JSON parse error:", jsonError);
      return new Response(
        JSON.stringify({ error: "Invalid JSON response from AI endpoint" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    return new Response(JSON.stringify({ reply: responseData.reply }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Error communicating with AI endpoint" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
