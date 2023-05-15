
export const getRepos = async(username) =>{
	try {
		const domain = 'http://localhost:8000';
		const url = `${domain}/api/getRepos`;
		let data =  await fetch(url,{
			method: "GET",
			headers: {
			  "Content-Type": "application/json",
			  "user":username
			},
		  })
		data = await data.json();
		return data;
	} catch (err) {
		return {message: err , status: 400};
	}
}