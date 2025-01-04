import { useState } from "react"

export function usePost() {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [response, setResponse] = useState(null)

    async function postData(url, data) {
        setIsLoading(true)
        setError(null)

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status}`)
            }

            const result = await res.json();
            setResponse(result)
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return { isLoading, error, response, postData }

}