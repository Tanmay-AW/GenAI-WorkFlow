export async function* generateContentStream(prompt: string): AsyncGenerator<string> {
    const body = {
        query: prompt,
        context: "",
        prompt: prompt
    };
    const response = await fetch("http://localhost:8000/llm/query", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    yield data.response;
}