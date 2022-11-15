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
      total: 0,
      alergenos: [],
      imageUrl: [],
      order_id: null,
      order_detail: [],
    },
    actions: {
      setUser: (nombre, apellidos, phone, email) => {
        let newUser = {
          nombre: nombre,
          apellidos: apellidos,
          phone: phone,
          email: email,
        };
        setStore({ user_data: newUser });
        JSON.stringify(getStore().user_data);
        console.log(getStore().user_data);
      },
      getAllAllergens: () => {
        fetch(process.env.BACKEND_URL + "/api/allergens")
          .then((res) => res.json())
          .then((allergens) => {
            setStore({ alergenos: allergens });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      },

      addAllergenToUser: async (allergen_id, user_id) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            allergen_id: allergen_id,
            user_id: user_id,
          }),
        };
        try {
          let resp = await fetch(
            process.env.BACKEND_URL + "/api/newuserallergen",
            opts
          );
          if (resp.status !== 200) {
            new Error("there has been an error");
            return false;
          }
          const data = await resp.json();
          sessionStorage.setItem("user_data", data.user_data);
          sessionStorage.setItem("user_address", data.user_address);
          sessionStorage.setItem("user_allergens", data.user_allergens);
          setStore({
            user_data: data.user_data,
            user_address: data.user_data.address,
            user_allergens: data.user_data.allergens,
          });

          return true;
        } catch (error) {
          console.error(error);
        }
      },

      deleteUserAllergens: async (id) => {
        const opts = {
          method: "DELETE",
        };
        try {
          let resp = await fetch(
            process.env.BACKEND_URL + "/api/allergensuserdelete/" + id,
            opts
          );
          if (resp.status !== 200) {
            new Error("there has been an error");
            return false;
          }
          return true;
        } catch (error) {
          console.error(error);
        }
      },
      setUrlImge: (Url) => {
        setStore({ imageUrl: Url });
      },
      /**Función para registrar o dar de alta en sistema un usuario (cliente) nuevo */
      createOrder: async () => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: getStore().user_data.id,
            order_comments: "",
            pay_method: "debit",
            items: [...getStore().carrito],
          }),
        };
        try {
          let resp = await fetch(
            process.env.BACKEND_URL + "/api/neworder",
            opts
          );
          if (resp.status !== 200) {
            new Error("there has been an error");
            return false;
          }
          const data = await resp.json();
          setStore({
            order_id: data.order_id,
          });
          localStorage.setItem("order_id", data.order_id);
          return true;
        } catch (error) {
          console.error(error);
        }
      },
      createProduct: async (name, description, price, category_id) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            description: description,
            price: price,
            category_id: category_id,
            image_url: getStore().imageUrl,
            active: true,
          }),
        };
        try {
          let resp = await fetch(
            process.env.BACKEND_URL + "/api/newproduct",
            opts
          );
          if (resp.status !== 200) {
            new Error("there has been an error");
            return false;
          }
          const data = await resp.json();
          setStore({ categories: categories });
          return true;
        } catch (error) {
          console.error(error);
        }
      },

      getAlergenos: async () => {
        const opts = {
          method: "GET",
          // headers: {
          //   "conten-Type": "aplication/json",
          // },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/allergens",
            opts
          );
          if (resp.status !== 200) {
            new Error("error");
            alert("no existen alergenos registrados");
            return false;
          }
          const data = await resp.json();
          setStore({ alergenos: data });
          return true;
        } catch (error) {
          console.error(error);
        }
      },

      postAllergen: async (alergeno) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: alergeno,
          }),
        };
        try {
          let resp = await fetch(
            process.env.BACKEND_URL + "/api/newallergens",
            opts
          );
          if (resp.status !== 200) {
            new Error("there has been an error");
            return false;
          }
          const data = await resp.json();
          setStore({ alergenos: data });
          return true;
        } catch (error) {
          console.error(error);
        }
      },

      deleteAllergen: async (id) => {
        const opts = {
          method: "DELETE",
        };
        try {
          let resp = await fetch(
            process.env.BACKEND_URL + "/api/deleteallergen/" + id,
            opts
          );
          if (resp.status !== 200) {
            new Error("there has been an error");
            return false;
          }
          const data = await resp.json();
          setStore({ alergenos: data });
          return true;
        } catch (error) {
          console.error(error);
        }
      },

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
          sessionStorage.setItem(
            "restaurant_data",
            JSON.stringify(data.restaurant_data)
          );
          setStore({
            token: data.access_token,
            user_data: data.user_data,
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
            console.log(getStore().categories)
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      },

      setCarrito: (newProduct) => {
        setStore({ carrito: newProduct });
        JSON.stringify(getStore().carrito);
        let carritoG = JSON.stringify(getStore().carrito);
        localStorage.setItem("carritoStr", carritoG);
      },

      setTotal: (totalActualizado) => {
        // let totalActualizado = getStore().total
        setStore({ total: totalActualizado });
        localStorage.setItem("totalStr", totalActualizado);
      },

      getTotal: () => {
        let LocalTotal = localStorage.getItem("totalStr");

        if (
          LocalTotal &&
          LocalTotal !== "" &&
          LocalTotal != undefined &&
          LocalTotal !== "undefined"
        ) {
          LocalTotal = JSON.parse(LocalTotal);

          setStore({ total: LocalTotal });
        }
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
        // localStorage.removeItem("order_id");
        // setStore({ order_id: null });
        localStorage.removeItem("totalStr");
        setStore({ total: 0 });
      },

      getCarrito: () => {
        const carritoLocal = localStorage.getItem("carritoStr");
        if (carritoLocal && carritoLocal !== "" && carritoLocal !== undefined) {
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
        const user_data = JSON.parse(sessionStorage.getItem("user_data"));
        const user_address = JSON.parse(sessionStorage.getItem("user_address"));
        const user_allergens = JSON.parse(
          sessionStorage.getItem("user_allergens")
        );
        const order_id = localStorage.getItem("order_id");
        if (user_data && user_data !== "" && user_data !== undefined)
          setStore({
            user_data: user_data,
            user_address: user_address,
            user_allergens: user_allergens,
            order_id: order_id,
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
          sessionStorage.setItem("user_data", JSON.stringify(data.user_data));
          sessionStorage.setItem(
            "user_address",
            JSON.stringify(data.user_data["address"])
          );
          sessionStorage.setItem(
            "user_allergens",
            JSON.stringify(data.user_data["allergen"])
          );
          setStore({
            token: data.access_token,
            user_data: data.user_data,
            user_address: data.user_data["address"],
            user_allergens: data.user_data["allergen"],
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
            user_type: "customer",
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
          console.log(data);
          setStore({ order: data });
          return true;
        } catch (error) {
          console.error(error);
        }
      },
      /**Función para optener los datos del pedido en curso para el cliente */
      getClientOrders: async (orderId) => {
        const opts = {
          method: "GET",
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/orderinprocess/" + orderId,
            opts
          );
          if (resp.status !== 200) {
            new Error("error");
            alert("no existen ordenes de preparación en proceso");
            return false;
          }
          const data = await resp.json();
          console.log("data recibida del pedido en curso:");
          console.log(data);
          setStore({
            order_detail: data,
          });
          console.log(getStore().order_detail);
          return true;
        } catch (error) {
          console.error(error);
        }
      },

      /**Función para optener del backend la lista de productos y categorías de la carta */
      getCarta: async () => {
        const opts = {
          method: "GET",
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
          setStore({ order: data });
          return true;
        } catch (error) {
          console.error(error);
        }
      },
      getOrderById: async () => {
        const opts = {
          method: "GET",
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
          setStore({ order: data });
          return true;
        } catch (error) {
          console.error(error);
        }
      },

      postCategoria: async (categoria) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: categoria,
          }),
        };
        try {
          let resp = await fetch(
            process.env.BACKEND_URL + "/api/newcategory",
            opts
          );
          if (resp.status !== 200) {
            new Error("there has been an error");
            return false;
          }
          const data = await resp.json();
          setStore({ categories: data });
          return true;
        } catch (error) {
          console.error(error);
        }
      },

      deleteCategoria: async (id) => {
        const opts = {
          method: "DELETE",
        };
        try {
          let resp = await fetch(
            process.env.BACKEND_URL + "/api/deletecategory/" + id,
            opts
          );
          if (resp.status !== 200) {
            new Error("there has been an error");
            return false;
          }
          const data = await resp.json();
          setStore({ categories: data });
          return true;
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
};

export default getState;
