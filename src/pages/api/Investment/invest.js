export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({ message: "Amount is missing" });
        }

        const API_URL = `${process.env.API_BASE_URL}/api/investment/invest`;
        console.log("API URL ---->", API_URL);

        const accessToken = req.headers.authorization?.split(" ")[1];
        if (!accessToken) {
            return res.status(401).json({ message: "Unauthorized: Access token is missing" });
        }

        
        const requestBody = {
            txn_hash: "some_dummy_txn_hash",
            amount: Number(amount), 
            staking_duration: 60,
        };

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        console.log("Investment API Response:", data);

        if (!response.ok) {
            throw new Error(data.message || "Investment request failed");
        }

        return res.status(response.status).json(data);
    } catch (error) {
        console.error("Error in investment API:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
