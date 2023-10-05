Este es un proyecto realizado con [Next.js](https://nextjs.org/) inicializado con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# RETRO FUTBOL CLUB (FRONT-END)

## Antes de empezar..

##### Te sugerimos ir a seguir los pasos del archivo "README.md" del repositorio que pertenece al back-end de este proyecto: <a href="https://github.com/darioberatti/co-work-backend">Co-Work-P5-FRONTEND</a>

## Descripcion

<p>
P5 Co-work es una aplicación la cual surge como un proyecto propuesto por <a href="https://www.plataforma5.la/" target="blank">Plataforma 5 - Coding Bootcamp.</a> 
La aplicación ofrece un servicio al staff de P5 y a los alumnos de BC, la cual les permite la reserva de turnos para ir a trabajar/estudiar a las oficinas de P5
</p>

## Inicializacion

- Primero forkeamos (en el caso de ser necesario) y/o clonamos este repositorio.
- Abrimos una nueva terminal, nos paramos sobre la carpeta del repositorio y ejecutamos el comando `code .` para abrirlo en **Visual Studio Code** o tu editor de texto de preferencia.
- Una vez hecho esto, volvemos a la terminal (siempre parados sobre la carpeta del repositorio) y ejecutamos los siguientes comandos:

```bash
`npm i`
```
Para instalar las dependencias.

```bash
`npm run dev`
```
Para levantar el front-end de nuestra aplicacion.

## Metodologia de Trabajo

- Antes de arrancar a trabajar, tener en cuenta las siguientes pautas cada vez que se vaya a crear una nueva funcion en el proyecto:
  - En la terminal, parados sobre la carpeta del repositorio, movernos a la rama de produccion "develop" ejecutando `git checkout develop`.
  - Desde ahi, ejecutar `git pull` para obtener los cambios mas recientes.
  - Luego, ejecutar `git checkout -b "feature/(nombreDeLaFuncion)"` para crear una nueva rama de trabajo o `git checkout -b "bugfix/(nombreDeLaFuncion)` para crear una rama en la que arreglaras algun bug.
- Para guardar los cambios:
  - `git add .`
  - `git commit -m "(especificarCambios)"`
  - `git push`
  - Realizar el merge de la rama teniendo como base la develop.

## Deploy


## Autores

```javascript
const autores = [
  "Mateo Navarro",
  "Agustin Torroja",
  " Dario Beratti",
  " Gastón Rabinovich",
];
autores.join(","); // "Mateo Navarro, Agustin Torroja, Dario Beratti, Gastón Rabinovich"
```


