const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			/* Función para optener token almacenado en sessionStorage */
			getTokenFromSession: () => {
				const token = sessionStorage.getItem("token");
				if (token && token !== "" && token !== undefined)
				  setStore({ token: token });
			  },

			login: async(email,password)=>{
				const opts = {
					method: "POST", 
					headers: {"Content-Type":"aplication/json",},
					body: JSON.stringify({email:email,password:password}),
				};
				try {
					const resp = await fetch(process.env.BACKEND_URL + "api/token", opts);
					if (resp.status !== 200) {
					  new Error("error from login in context");
					  alert("usuario no registrado");
					  return false;
					}
					const data = await resp.json();
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token });
					return true;
				  } catch (error) {
					console.error(error);
				  }

			},


			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
