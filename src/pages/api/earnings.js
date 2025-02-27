export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    try {
        const API_URL = `${process.env.API_BASE_URL}/api/investment/list-earnings`;
        const accessToken = req.headers.authorization?.split(" ")[1];
        if (!accessToken) {
            return res.status(401).json({ message: "Unauthorized: Access token is missing" });
        }

        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
        });

        const data = await response.json();
        console.log("Earnings List Response:", data);

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch Earnings");
        }

        return res.status(response.status).json(data);
    } catch (error) {
        console.error("Error fetching Earnings:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}