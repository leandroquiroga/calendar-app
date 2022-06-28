# Calendar App - Frontend

Este proyecto se basa en un tipo calendario que nos permite que cada usuario pueda crear su nota, editarla, borrarla. Nos permite autenticarnos mediante un mail y contraseña y sino tenemos una cuenta podemos registrarnos. Esta aplicacion (Frontend) esta realizada con: 

* React
* Redux
* React Router Dom
* Bootstrap
* Moment
* LocalStorage
* Jest 
* Enzyme


# Funcionabilidades ⚙️

## Autenticacion

### Login
El comoponente Login no es mas que un formulario que sus datos son procesados mediante el uso de custom hooks. Los datos (email y password) son enviados al backend precisamente a nuestra bases de datos para comprobar si nuestro usuario existe

### Registro
El comoponente Register no es mas que un formulario que sus datos son procesados mediante el uso de custom hooks. Los datos (nombre, email, password, password comfirm) son enviados a la bases de datos pero antes si todos los datos son los correctos en caso de un error el backend nos retornara un mensaje con un error.
<hr>


## UI 

### Boton de agregar un nuevo evento
Este boton al realizar un click dispara un evento que nos permite agregar una nueva
nota 
### Boton de eliminar un evento
Este boton al realizar un click disparara un evento que nos permite eliminar una nota, el boton se habilitara si y solo se selecciona una nota
### Navbar 
Este es un componente que cuando estemos autenticados nos mostrara nuestro nombre con el que nos hemos registrado.
### Spinner
El spinner solo se muestra cuando nuestra aplicacion se usa con 
la utilizamos con baja señal de internet
<hr>


## Pagina 404 
Este componente retorna una la famosa pagina 404 cuando intentanmos acceder a un url invalido. 
<hr>

## Calendar

### Calendar modal 
Es el encargado de procesar los datos de una nota nueva, contiene un formulairio en la cual se debe complentar con ciertos campos obligatorios por ejemplo el titulo de la nota. En el podemos elegir la fecha de inicio y fin de nuestra nota, no se puede colocar una fecha inferior a la fecha actual, tambien hay que colocarle un titulo y una descripcion que es opcional. Dispara ciertas acciones como por ejemplo abrir y cerrar el modal, actulizar un evento etc. 

### Calendar event 
Muestra la nota creada mediante el calendarModal con sus respectivos datos recuperados desde la prop que recibe. 

<hr>

## Traduccion del ingles al español
En una funcion que se encarga de traducir todas las propiedades de la aplicacion del ingles al español 
<hr>

## Peticiones con token o sin token 
Esta funcionabilidad se divide en dos partes ya que por un lado necesitariamos realizar peticiones a nuestro backend con los token para recuperar por ejemplo el usuario de que inicia sesion, y por otro lado para recuperar todas las notas de todos los usuario, en este caso no requerimos de token. 
<hr>

## Navegacion 
Esta funcionabilidad esta requerida solamente cuando querramos iniciar sesion o registrarnos 
<hr>

## Rutas privadas y publicas 
Se han creados estas rutas para que cada usuario tenga que auntenticarse para porder realizar cualquier accion en el calendario, en caso de no estar autenticado no nos permitira entrar a la rutra principal de nuestra aplicacion. 
<hr>

## CRUD 

Desde el lado del frontend podemos realizar un CRUD (Create, Read, Update, Delete) mediantes acciones que se disparan para que el backend las procese y realiza dicha peticion. 
# Testing 🧪
Se ha creado la seccion de testing con la intencion de testar el comportamiento de la aplicacion, con mas de 50 test unitarios como por ejemplo:

* Login
* Register
* Peticiones 
* Acciones 
* Rutas
* Y muchas mas. 

Para realizar los test he utilizado [React Testing Library](https://testing-library.com/) y [Enzyme.js](https://enzymejs.github.io/enzyme/) con algunas configuraciones para los snapshot [enzyne-to-json](https://github.com/adriantoine/enzyme-to-json);

# ACLARACION IMPORTANTE ⛔️
Esta aplicacion no es responsive, solo se una para fines didacto. Puede ser que el dia que se quiera probar los test puedan fallar por las fechas en el dia que se pruebe, como puede ser que la base de datos que se use ya no este disponible para ese momento en la que se use. 

# Deploy 👨‍💻

Proximamente ⌛

# Contacto 📫
- [Linkedin](https://www.linkedin.com/in/leanquiroga95/)
- [Email](mailto:leandroquiroga9514@gmail.com)

# Autor 👤
Realizado con ❤️ por [Leandro Quiroga](https://github.com/leandroquiroga);

