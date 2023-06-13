# 🍕 WebApp de Portal 10 - ¡Ordene su Pizza en Línea! 📱💳

¡Bienvenidos al proyecto final del Bootcamp de 4Geeks Academy! Aquí les presentamos nuestra increíble aplicación desarrollada especialmente para la pizzería Portal 10, ubicada en el acogedor barrio de Chueca en Madrid. 🍕🌃

¿Quieres disfrutar de una deliciosa pizza sin tener que esperar en la fila? ¡Estás en el lugar correcto! Nuestra misión era optimizar el tiempo de atención al cliente en esta pequeña pizzería de barrio, donde los propios dueños se encargan de todo, desde preparar los pedidos hasta atender a los clientes en la caja. 😊💨

Nuestra solución revolucionaria permite a los clientes explorar el menú, seleccionar sus productos favoritos y realizar pedidos sin tener que pasar por la caja. ¡Y eso no es todo! Pueden pagar de forma segura con su tarjeta de débito o crédito directamente desde sus dispositivos móviles. ¿No es genial? El pedido se envía en tiempo real a la cocina, donde el personal se dedica por completo a preparar y entregar las pizzas, sin perder tiempo en recibir pedidos o procesar pagos. ¡Así reducimos el tiempo de atención y entrega al máximo! ⏱️🚀

## Características del Proyecto 🚀

- Frontend desarrollado con React y Bootstrap: Interfaz de usuario atractiva y fácil de usar.
- Backend desarrollado con Flask: Potencia y flexibilidad en el manejo de datos.
- Base de datos SQL: Almacenamiento seguro y eficiente de la información.
- Integración con Stripe: Pasarela de pago segura y confiable.
- Integración con Cloudinary: Almacenamiento y optimización de imágenes para una experiencia visual perfecta. 🖼️✨

¿Estás listo para unirte a la revolución de las pizzas en línea? Sigue las instrucciones a continuación para empezar. 🍕💻

# Plantilla base de WebApp con React JS y Flask API

[![Abrir en Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io#https://github.com/4GeeksAcademy/react-flask-hello.git)

> Documentación: https://start.4geeksacademy.com/

<p align="center">
<a href="https://www.loom.com/share/f37c6838b3f1496c95111e515e83dd9b"><img src="https://github.com/4GeeksAcademy/flask-rest-hello/blob/main/docs/assets/how-to.png?raw=true?raw=true" /></a>
</p>

- Frontend con React.js y backend con Python/Flask para tu aplicación web.
- Documentación extensa [aquí](https://start.4geeksacademy.com/).
- Integrado con Pipenv para la gestión de paquetes.
- Despliegue rápido en Heroku [en solo unos pasos aquí](https://start.4geeksacademy.com/backend/deploy-heroku-posgres).
- Uso del archivo .env.
- Integración de SQLAlchemy para la abstracción de la base de datos.

### Estilos

Puedes actualizar el archivo `styles/index.scss` o crear nuevos archivos `.scss` dentro de la carpeta `styles/` e importarlos en tus archivos scss o js según tus necesidades.

### Componentes

Añade más archivos a tu carpeta `./src/js/components` o carpeta de estilos según los vayas necesitando e impórtalos en tus archivos actuales según sea necesario.

💡Nota: Hay un ejemplo que utiliza la API de Context en `views/demo.js`.

### Vistas (Componentes)

Añade más archivos a tu carpeta `./src/js/views` e impórtalos en `./src/js/layout.jsx`.

### Contexto

Esta plantilla cuenta con una API de Contexto general centralizada. El archivo `./src/js/store/flux.js` tiene una estructura base para el store, te animamos a cambiarlo y adaptarlo a tus necesidades.

Documentación de React Context [aquí](https://reactjs.org/docs/context.html)
Lección de BreathCode [ver](https://content.breatheco.de/lesson/react-hooks-explained)

El `Provider` ya está configurado. Puedes consumirlo desde cualquier componente utilizando el hook useContext para obtener el `store` y las `actions` del Contexto. Mira `/views/demo.js` para ver un ejemplo.

```jsx
import { Context } from "../store/appContext";
const MyComponentSuper = () => {
    //aquí utilizas useContext para obtener el store y las actions
    const { store, actions } = useContext(Context);
    return <div>{/* puedes utilizar tus actions o store dentro del HTML */}</div>;
};
```

### Instalación Manual del Backend:

Se recomienda instalar primero el backend, asegúrate de tener Python 3.8, Pipenv y un motor de base de datos (se recomienda Posgress).

1. Instala los paquetes de Python: `$ pipenv install`
2. Crea un archivo .env basado en el archivo .env.example: `$ cp .env.example .env`
3. Instala el motor de base de datos y crea tu base de datos, dependiendo de tu base de datos debes crear una variable DATABASE_URL con uno de los valores posibles, asegúrate de reemplazar los valores con la información de tu base de datos:

| Motor    | DATABASE_URL                                        |
| --------- | --------------------------------------------------- |
| SQLite    | sqlite:////test.db                                  |
| MySQL     | mysql://username:password@localhost:port/example    |
| Postgress | postgres://username:password@localhost:5432/example |

4. Migrar las migraciones: `$ pipenv run migrate` (omitir si no has realizado cambios en los modelos en `./src/api/models.py`)
5. Ejecutar las migraciones: `$ pipenv run upgrade`
6. Ejecutar la aplicación: `$ pipenv run start`

### Backend: Poblar la tabla de usuarios

Para insertar usuarios de prueba en la base de datos, ejecuta el siguiente comando:

```sh
$ flask insert-test-users 5
```

Y verás el siguiente mensaje:

```
  Creando usuarios de prueba
  test_user1@test.com creado.
  test_user2@test.com creado.
  test_user3@test.com creado.
  test_user4@test.com creado.
  test_user5@test.com creado.
  ¡Usuarios creados exitosamente!
```

Para actualizar con todas tus tablas, puedes editar el archivo app.py y dirigirte a la línea 80 para insertar el código que poblará las otras tablas.

### Instalación Manual del Frontend:

-   Asegúrate de estar utilizando la versión 14+ de Node y de haber instalado y ejecutado correctamente el backend.

1. Instala los paquetes: `$ npm install`
2. ¡Comienza a codificar! Inicia el servidor de desarrollo de Webpack `$ npm run start`

## ¡Publica tu sitio web!

Esta plantilla está integrada al 100% con Heroku, [sigue este tutorial](https://start.4geeksacademy.com/backend/deploy-heroku-posgres) y simplemente al enviar tus cambios al repositorio de Heroku, se desplegará el sitio web posteriormente.
