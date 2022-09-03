const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      token: null,
      user_data: [],
      user_address: [],
      category: [],
      products: [],
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
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

      getUserDataFromSession: () => {
        const user_data = sessionStorage.getItem("user_data");
        if (user_data && user_data !== "" && user_data !== undefined)
          setStore({
            user_data: user_data,
            /*user_address: user_data.user_address,*/
          });
      },

      /**Función para iniciar sesión del usuario */
      login: async (email, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/token",
            opts
          );
          if (resp.status !== 200) {
            new Error("error from login in context");
            alert("usuario no registrado");
            return false;
          }
          const data = await resp.json();
          console.log(data);
          sessionStorage.setItem("token", data.access_token);
          setStore({
            token: data.access_token,
            user_data: data.user_data,
            user_address: data.user_data.address,
          });
          return true;
        } catch (error) {
          console.error(error);
        }
      },
      /** Función para deslogear al usuario, remueve el token del sessionStorage */
      logout: () => {
        sessionStorage.removeItem("token");
        setStore({ token: null });
        return true;
      },

      /**Función para registrar o dar de alta en sistema un usuario (cliente) nuevo */
      signup: async (nombre, apellidos, birthday, phone, email, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nombre,
            lastname: apellidos,
            birthday: birthday,
            phone: phone,
            email: email,
            password: password,
            is_active: true,
          }),
        };
        try {
          let resp = await fetch(
            process.env.BACKEND_URL + "/api/register",
            opts
          );
          if (resp.status !== 200) {
            new Error("there has been an error");
            return false;
          }
          let data = await resp.json();
          sessionStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
          return true;
        } catch (error) {
          console.error(error);
        }
      },
      /**Función para optener del backend la lista de productos y categorías de la carta */
      getCarta: async () => {
        const opts = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/category",
            opts
          );
          if (resp.status !== 200) {
            new Error("error");
            alert("no existgen categorias");
            return false;
          }
          const data = await resp.json();
          console.log(data.category);
          console.log(data.products);
          setStore({
            category: data.category,
            products: data.products,
          });
          return true;
        } catch (error) {
          console.error(error);
        }
      },
      /** Función para deslogear al usuario, remueve el token del sessionStorage */
      logout: () => {
        sessionStorage.removeItem("token");
        setStore({ token: null });
        return true;
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
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
      },
    },
  };
};

export default getState;
