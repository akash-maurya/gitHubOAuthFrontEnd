import type { NextApiRequest, NextApiResponse } from "next";

export async function signup(req:NextApiRequest, res:NextApiResponse) {
	try {
		const domain = process.env.LOCAL_ENV;
		const url = `${domain}/api/signup`;
		const payload = JSON.parse(req.body);
		const data =  await fetch(url,{
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: payload
		  })
		console.log(data);
		return res.status(200).send({ data });
	} catch (err) {
		return res.status(500).send({ err });
	}
  }