# Auditorías Digitalizadas (Prubas en Render)

Proyecto construido para desplegar en render.
Este proyecto es uno te pruebas para ver su fucionamiento en un entorno de producción.  
  
Este repositorio tiene varias diferencias en comparación con el de producción o desarrollo, eso es porque se tuvo que cambiar la base de datos para desplegar en este sitio, ya que no habia otros que fuean convincentes y ofrecieran los recusros a utilizar originalmente. Debido a esto hay diferencias en lo que el usuario puede apreciar y el como lo aprecia, principlamente una de las greaficas no se renderiza debido a como se manejaba con la lógica para la extracción de su información.  

## Tecnologias

[Angular] (https://v17.angular.io/docs) CLI versión 17.3.6  ---> construido
[Sheetjs] (https://sheetjs.com) versión 4.4.3
[Nodejs] (https://nodejs.org) versión 20.12.2  
[Express] (http://expressjs.com) versión 4.19.2  
[Sequelize] (https://sequelize.org) versión 6.37.3  

## Instalación

Clona el proyecto
```
$ git clone https://github.com/testDeploy-test/auditoriasDigitalizadas-prueba.git
```
Instala las dependencias
```
$ npm install
```
Comando de inicialización
```
$ npm start 
```

### Variables de entorno
Crea un archivo `.env` en el directorio raíz de la carpeta back con las credenciales de la `base de datos` y `jsonwebtoken`

`PORT` `KEY` `DB_URL` o `DB_NAME` `DB_USER` `DB_PASSWORD` `DB_HOST` `DB_DIALECT`
*Puedes proporcionar solamente la url a la base de datos u especificar todos los demás campos
*Puede que especificar el dialecto como variable de entorno provoque un error, en tal caso modifica el dialecto directamente en el archivo `conexion.js`

## Despliegue en Render

1.- Dirigete a la página de render (https://render.com).  

2.- Inicia sesión con las credenciales correspondientes.  

3.- Una vez en el dashboard da clic en `+ New` que aparece en la esquina superior derecha al lado izquierdo de tu usuario.  

4.- Selecciona `Web Service`.  

5.- Ingresa el link del repositorio (tiene que estar en público).  

6.- Haz las configuraciones correspondientes. En build command escribe `npm install pg && npm install` y en start command escribe `npm start`.  

7.- Espera a que se despliegue la página.  

8.- Vuelve a dashboard, y repite el paso 3.  

9.- Selecciona `PostgeSQL`.  

10.- Completa la configuración.  

11.- Una vez creada la base de datos, vielve al dashborad y selecciona tu página.  

12.- Dirígete a la sección `Enviroments`  

13.- Crea las variables de entorno de la página web en base a los datos obtenidos al crear la base de datos.
