export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Email or password is missing" });
        }

        const API_URL = `${process.env.API_BASE_URL}/api/auth/login`;
        console.log("API URL ---->", API_URL);

        
        const formBody = new URLSearchParams({
            grant_type: "password", 
            username,
            password,
        }).toString();

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded", 
            },
            body: formBody,
        });

        const data = await response.json();
        console.log("__________>>>>>>", data);

        return res.status(response.status).json(data);
    } catch (error) {
        console.error("Error in login", error);
        return res.status(500).json({ message: "Error in login" });
    }
}
