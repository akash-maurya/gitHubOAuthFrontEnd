
export const getGitAuthToken = async(code) =>{
	try {
		const domain = 'http://localhost:8000';
		const url = `${domain}/api/auth/github/authToken?code=${code}`;
		let data =  await fetch(url,{
			method: "GET",
			headers: {
			  "Content-Type": "application/json",
			},
		  })
		data = await data.json();
		console.log(
			data);
		return data;
	} catch (err) {
		return {message: err , status: 400};
	}
}