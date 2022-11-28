Tratando de crear una BD de varios juegos de rol, esquematice la idea de tal forma que relacionamos 4 tipo de modelos. 

El modelo Games que esta realcionado con otros dos modelos los cuales son: El Master o el que seria el admin, y el player o el resto de usuarios.

Estos dos modelos a su vez, estan relacionados a otro llamado Ficha, el cual contiene la info de los personajes , histroia, etc que tienen.

Todos los modelos constan de un esquema que posee una serie de campos. por ejemplo:  El modelo de Master consta de un name, un password y un array player

Despues tenemos los controladore que son los que poseen la funcionalidad de registrar, logear, eliminar.....
abajo tenemo un ejemplo de lo queseria una de las funciones, en este caso tenemos la funcion de registrar usuario
/*
const postPlayer = async (req, res, next) => {
    try{
        const newPlayer = new Player(req.body)
        const players =  newPlayer.save()
        return res.json({
            status:200,
            message: 'Player',
            data: {players}
        })
    }catch(error){
        return next(setError(500, 'fallo'))
    }
}
*/

Luego tenemos las rutas que se encargan de asociar a http (post, delete, patch, get) y manejar un patron


Luego tenemos el Middleware se invoca ente la petición de un usuario y la respuesta final. Es todo lo que ocurre desde que sale una solicitud en lado del cliente hasta que llega a nuestra lógica de la ruta en el servidor. 

posteriormente tenomos dos archivos, en este caso nuestro connect que se encarga de la conexion a la bd y el error que se encargar de informarno de si ocurrio un error cuando ejecutamos el codigo

posteriormente tenemos en la raiz nuestro index.js que gestiona las rutas y las funciones.

luego tenemos nuestro .env que contiene nuestro mongo-uri que pose una url para que nos conectemos a la bd en nuestra clae conect, el puerto al que nos queremos conectar y una o varias secret-key.


por ultimo tenemos un slint para poder ver que errores tenemos en nuestro codigo y un prettier que nos permite diseñar el formato del código que estamos escribiendo.


Para este proyecto se han usado una serie de librerias como:

-express:es una escritura que sirve para manejar peticiones con diferentes verbos HTTP en diferentes caminos URL y añadir peticiones "middleware"

-nodemon: herramienta que ayuda a desarrollar aplicaciones basadas en Node.js al reiniciar automáticamente la aplicación del nodo cuando se detectan cambios en los archivos del directorio.

-cors:es una política a nivel de navegador web que se aplica para prevenir que un dominio  evite acceder a recursos de otor dominio

-mongoose:es una librería para Node.js que nos permite escribir consultas para una base de datos de MongooDB

-dotenv:es un módulo de dependencia  que carga variables de entorno desde un archivo .env en process.env

-bcrypt:se usa para la encriptacion de contraseñas

-jsonwebtoken: sirve para generar un token
