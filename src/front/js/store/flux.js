import { v4 as uuidv4 } from "uuid";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      token: null,
      restaurant_data: [],
      user_data: [],
      user_address: [],
      user_allergens: [],
      categories: [],
      order: [],
      carrito: [],
    },
    actions: {
      /**Función para iniciar sesión del usuario */
      loginRestaurant: async (email, password) => {
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
            process.env.BACKEND_URL + "/api/tokenrestaurant",
            opts
          );
          if (resp.status !== 200) {
            new Error("error from login in context");
            alert("usuario no registrado");
            return false;
          }
          const data = await resp.json();
          sessionStorage.setItem("token", data.access_token);
          sessionStorage.setItem("restaurant_data", data.restaurant_data);
          setStore({
            token: data.access_token,
            restaurant_data: data.restaurant_data,
          });
          return true;
        } catch (error) {
          console.error(error);
        }
      },
      getAllCategories: () => {
        fetch(process.env.BACKEND_URL + "/api/category")
          .then((res) => res.json())
          .then((categories) => {
            setStore({ categories: categories });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      },

      setCarrito: (newProduct) => {
        console.log("Entrando...");
        setStore({ carrito: newProduct });
        console.log("------");
        JSON.stringify(getStore().carrito);
        let carritoG = JSON.stringify(getStore().carrito);
        localStorage.setItem("carritoStr", carritoG);
        console.log(getStore().carrito);
        console.log("------");
      },

      deleteCarritoItem: (storeId) => {
        let carrito = getStore().carrito;
        let newData = carrito.filter(
          (carrito) => storeId !== carrito["storeId"]
        );
        let carritoD = JSON.stringify(newData);
        setStore({ carrito: newData });
        localStorage.setItem("carritoStr", carritoD);
      },

      deleteCarrito: () => {
        localStorage.removeItem("carritoStr");
        setStore({ carrito: [] });
      },

      getCarrito: () => {
        const carritoLocal = localStorage.getItem("carritoStr");
        if (carritoLocal && carritoLocal !== "" && carritoLocal !== undefined) {
          console.log("getCarrito");
          console.log(carritoLocal);
          setStore({ carrito: JSON.parse(carritoLocal) });
        }
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
          sessionStorage.setItem("token", data.access_token);
          sessionStorage.setItem("user_data", data.user_data);
          sessionStorage.setItem("user_address", data.user_address);
          sessionStorage.setItem("user_allergens", data.user_allergens);
          setStore({
            token: data.access_token,
            user_data: data.user_data,
            user_address: data.user_data.address,
            user_allergens: data.user_data.allergens,
          });
          return true;
        } catch (error) {
          console.error(error);
        }
      },

      /** Función para deslogear al usuario, remueve el token del sessionStorage */
      logout: () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user_data");
        sessionStorage.removeItem("user_address");
        sessionStorage.removeItem("user_allergens");
        setStore({
          token: null,
          user_data: [],
          user_address: [],
          user_allergens: [],
        });
        return true;
      },
      logoutRestaurant: () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("restaurant_data");
        setStore({
          token: null,
          restaurant_data: [],
        });
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
          const data = await resp.json();
          sessionStorage.setItem("token", data.access_token);
          setStore({
            token: data.access_token,
            user_data: data.user_data,
            user_address: data.user_data.address,
            user_allergens: data.user_data.allergens,
          });
          return true;
        } catch (error) {
          console.error(error);
        }
      },
      /**Función para modificar los datos personales del usuario */
      putuser: async (nombre, apellidos, birthday, phone, email) => {
        const opts = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nombre,
            lastname: apellidos,
            birthday: birthday,
            phone: phone,
            email: email,
          }),
        };
        try {
          let resp = await fetch(
            process.env.BACKEND_URL +
              "/api/edituser/" +
              getStore().user_data.id,
            opts
          );
          if (resp.status !== 200) {
            new Error("there has been an error");
            return false;
          }
          const data = await resp.json();
          setStore({
            user_data: data.user_data,
            user_address: data.user_data.address,
          });
          return true;
        } catch (error) {
          console.error(error);
        }
      },
      /**Función para dar por terminada una orden de preparación */
      orderToDelete: async (orderId) => {
        const opts = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_status: true,
          }),
        };
        try {
          let resp = await fetch(
            process.env.BACKEND_URL + "/api/endingorder/" + orderId,
            opts
          );
          if (resp.status !== 200) {
            new Error("there has been an error");
            return false;
          }
          const data = await resp.json();
          setStore({ order: data.orders });
          return true;
        } catch (error) {
          console.error(error);
        }
      },
      /**Función para optener del backend la lista de productos y categorías de la carta */
      getCarta: async () => {
        const opts = {
          method: "GET",
          // headers: {
          //   "Content-Type": "application/json",
          // },
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
          setStore({
            category: data.category,
          });
          getActions().getOrder;
          return true;
        } catch (error) {
          console.error(error);
        }
      },

      /**Función para optener las ordenes en preparación */
      getOrder: async () => {
        const opts = {
          method: "GET",
          // headers: {
          //   "conten-Type": "aplication/json",
          // },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/allorders",
            opts
          );
          if (resp.status !== 200) {
            new Error("error");
            alert("no existen pedidos para preparar");
            return false;
          }
          const data = await resp.json();
          setStore({ order: data.orders });
          return true;
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
};

export default getState;
