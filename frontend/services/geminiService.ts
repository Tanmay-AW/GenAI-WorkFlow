export async function* generateContentStream(query: string, prompt: string, context: string = ""): AsyncGenerator<string> {
    const body = {
        query,
        context,
        prompt
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

    // Backend returns a plain string, not { response: ... }
    const data = await response.json();
    yield data;
}