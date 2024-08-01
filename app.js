/** Indica el numero de la pagina que se debe llamar en la API.  */
let pagina = 0

const cargarPeliculas = async() => {
	try {
		pagina +=1
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`)
	
		console.log(respuesta)

		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json()
			
			let peliculas = ''
			datos.results.forEach(pelicula => {
				peliculas += `
					<div class="pelicula" title="${pelicula.title}">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
					</div>
				`
			})

			document.getElementById('contenedor').innerHTML += peliculas

		} else if(respuesta.status === 401){
			console.log('Pusiste la llave mal')
		} else if(respuesta.status === 404){
			console.log('La pelicula que buscas no existe')
		} else {
			console.log('Hubo un error y no sabemos que paso')
		}

	} catch(error){
		console.error(error)
	}

}

cargarPeliculas()

const observer = new IntersectionObserver(cargarPeliculas, { 
	rootMargin: '50px',
})

const cargarMasPeliculas = document.getElementById('cargarMasPeliculas')
observer.observe(cargarMasPeliculas)
