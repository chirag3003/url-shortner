import axios from "axios";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const instance = axios.create({
			baseURL: "https://b68dev.xyz",
		});
		return instance
			.get("/rest/v2/short-urls/shorten", {
				params: { apiKey: process.env.KEY, format: "json", longUrl: req.body.longURL },
			})
			.then(({ data }) => res.status(200).json(data))
			.catch((err) => res.status(400).json("error"));
	}
}
