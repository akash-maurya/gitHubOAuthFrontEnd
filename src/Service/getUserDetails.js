
export const getUserDetails = async(token) =>{
	try {
		const domain = 'http://localhost:8000';
		const url = `${domain}/api/getUserDetails`;
		let data =  await fetch(url,{
			method: "GET",
			headers: {
			  "Content-Type": "application/json",
			  "authToken":token,
			},
		  })
		data = await data.json();
		return data;
	} catch (err) {
		return {message: err , status: 400};
	}
}