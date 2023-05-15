import type { NextApiRequest, NextApiResponse } from "next";


export async function login(req:NextApiRequest, res:NextApiResponse) {
	console.log("payload in service",req.body);
	try {
		const domain = process.env.LOCAL_ENV;
		const url = `${domain}/api/login`;
		const body = JSON.parse(req.body);
		const data =  await fetch(url,{
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: body
		  })
		console.log(data);
		return res.status(200).send({ data });
	} catch (err) {
		console.log("err in service",req.body);
		return res.status(500).send({ err });
	}
  }