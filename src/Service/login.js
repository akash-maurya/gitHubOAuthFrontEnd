
export const loginService = async(payload) =>{
	try {
		const domain = 'http://localhost:8000';
		const url = `${domain}/api/login`;
		const body = payload;
		let data =  await fetch(url,{
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify(body)
		  })
		data = await data.json();
		console.log(
			data);
		return data;
	} catch (err) {
		return {message: err , status: 400};
	}
}