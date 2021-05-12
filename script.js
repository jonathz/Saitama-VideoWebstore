class Carrito {
    constructor() {
        this.elementosAgregados = []
    }
guardarLista(nuevoDato){
    
    this.elementosAgregados.push(nuevoDato)
    localStorage.setItem("listaTotal", JSON.stringify(this.elementosAgregados))

}
adicionarProducto(nuevoDato, i ){
    
    localStorage.setItem("Item"+i, JSON.stringify(nuevoDato))

}
sumatoria(){
    let acum = 0
    for (let product of this.elementosAgregados){
        acum += product.precioProduccion         
    } return acum
}
eliminarDeLista(aRemover){
    let clickeado = this.getAttribute ("index")
    //vaciar
    if (clickeado == 0) {
        this.elementosAgregados = []
        //re imprimir
    }else{
        this.elementosAgregados.splice(clickeado,1)
        //re imprimir
        }
       //toca re imprimir los valores de la lista despues al terminar
}

}
let datos
var productosElejidos = new Carrito
let produccionBusqueda = document.getElementById('barra')
let botonBuscar = document.getElementById ('botonBuscar')
botonBuscar.addEventListener ('click', busqueda)
function numRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
const URLSERIES = "http://api.tvmaze.com/shows"
const URLANIME = "https://api.jikan.moe/v3/user/nekomata1037/animelist/all"

async function obtenerContenido(url){
        return new Promise ((resolve,reject)=> {
            fetch(`${url}`)
            .then(data=> data.json())
            .then(data=>resolve(data))
            .catch (err=>reject(err))
    })
}

let listaSeries
let listaAnime
let rellenoBusqueda = []
async function listas() {
    listaSeries = await obtenerContenido(URLSERIES)
    listaAnime = await obtenerContenido(URLANIME)
    listaAnime = listaAnime.anime
    
    
}

if(window.location.search=="?contenido=series"){
    
    listas() //SERIES
        .then (()=>{
            let numInicio = numRandom(0,191)
            let numFinal = numInicio + 49
            
            for (numInicio ; numInicio < numFinal; numInicio++) {
                
                rellenoBusqueda[numInicio] =({sinopsis:listaSeries[numInicio].summary, episodios: listaSeries[numInicio]._links.self.href})  
                //Impresion
                document.querySelector(".listado-general").innerHTML +=
                `<div class="cajita" index="${numInicio}" categ="series"> 
                <div class="cajita-nombre">${listaSeries[numInicio].name} </div>
                <br> <img class="miniatura" src="${listaSeries[numInicio].image.medium}" > </div>`
                }
            
            let cajas = (document.querySelectorAll('.cajita').length)
            for (let i = 0; i < cajas; i++) {
                
                document.querySelectorAll(".cajita")[i].onclick = alDetalle
                }
        })
}else{
        listas() //ANIME
                .then (()=> {
                    
                rellenoBusqueda = [] 
                
                let numInicio = numRandom(0,250)
                let numFinal = numInicio + 49
                for (numInicio; numInicio < numFinal; numInicio++) {
                   
                    //Impresion
                    document.querySelector(".listado-general").innerHTML +=
                    `<div class="cajita" index="${numInicio}" categ="anime">
                    <div class="cajita-nombre"> ${listaAnime[numInicio].title}</div>
                    <br> <img class="miniatura" src="${listaAnime[numInicio].image_url}" > </div>`
                    if(listaAnime[numInicio].studios.length == 0){
                        continue
                    }
                    
                    rellenoBusqueda[numInicio] = ({sinopsis:`Estudio creador: ${listaAnime[numInicio].studios[0].name}`})
                }
                let cajas = (document.querySelectorAll('.cajita').length)
                for (let i = 0; i < cajas; i++) {
                document.querySelectorAll(".cajita")[i].onclick = alDetalle
                }
                
                
            })
    }
    
    function busqueda() {
        //procesa el valor de la barra
        document.querySelector(".listado-general").innerHTML = ''
        obtenerContenido(`http://api.tvmaze.com/search/shows?q=${produccionBusqueda.value}`)
        .then (data=>{
            rellenoBusqueda = []
            

            for (let i = 0; i < data.length; i++) {
                
                if(data[i].show.image == null){
                continue}
                rellenoBusqueda.push({sinopsis:data[i].show.summary})
                document.querySelector(".listado-general").innerHTML +=
                `<div class="cajita" index="${i}" categ="seriesB"> <div>${data[i].show.name} 
                </div><br> <img class="miniatura" src="${data[i].show.image.medium}" > </div>`
                
                
            }
           
            
        })
        obtenerContenido(`https://api.jikan.moe/v3/search/anime?q=${produccionBusqueda.value}`)
        .then (data=>{
            
            for (let i = 0; i < data.results.length - 1; i++) {
                   
                
                document.querySelector(".listado-general").innerHTML +=
                `<div class="cajita" index="${rellenoBusqueda.length}"> <div>${data.results[i].title} 
                </div><br> <img class="miniatura" src="${data.results[i].image_url}" > </div>`
                rellenoBusqueda.push({sinopsis:data.results[i].synopsis})
            }

            let cajas = (document.querySelectorAll('.cajita').length)
            
            for (let i = 0; i < cajas; i++) {
                
                document.querySelectorAll(".cajita")[i].onclick = alDetalle
                
                
                }
        })

        
    }

    async function alDetalle(){

        document.querySelector('.formulario-al-detalle').style.display = 'block'
        document.querySelector('.equis').addEventListener('click', cerrarVentana)
        let cajaSeleccionada = this.getAttribute ("index")
        let episodios
        let nombreEnLaCaja = this.children[0].innerHTML
        if (this.getAttribute("categ") == "series"){
            episodiosURL = rellenoBusqueda[cajaSeleccionada].episodios + "/episodes"
            episodios = await obtenerContenido(episodiosURL)
            episodios = episodios.length
            
            } else{
            
            episodios = listaAnime[cajaSeleccionada].total_episodes
            
            }
        
            if (episodios==0){
                episodios = 1
            }
        
        //Tabla de precios
        let precioCapitulo = 0

            if(episodios >= 0 && episodios <= 1){ 
                precioCapitulo = (numRandom(10, 20)) * 1000
            }
            if(episodios > 5 && episodios <= 8){
                precioCapitulo =  (numRandom (1000, 2000))
            }
            if(episodios > 8 && episodios <= 15){
                precioCapitulo =  numRandom(500, 1000)
            }
            if(episodios > 15 && episodios <= 40){
                precioCapitulo =  numRandom(500, 1000)
            }
            if (episodios > 41 && episodios <= 200) {
                
                precioCapitulo =  numRandom(200 , 350)
            }
            if (episodios >200 && episodios <= 750){
                
                precioCapitulo =  numRandom(150, 200)
            }
            if (episodios >750){
                
                precioCapitulo =  numRandom(150, 300)
            }
            if (rellenoBusqueda[cajaSeleccionada].precioSerie == 0){
                rellenoBusqueda[cajaSeleccionada].precioSerie = 15000
            }//casos excepcionales
        rellenoBusqueda[cajaSeleccionada].precioCapitulo = precioCapitulo
        rellenoBusqueda[cajaSeleccionada].precioSerie = rellenoBusqueda[cajaSeleccionada].precioCapitulo * episodios
        
            document.querySelector('.foto-detalle').innerHTML = `<img class="foto-detalle-mod" src="${this.children[2].src}" > </img>`
            document.querySelector('.nombre-detalle').innerHTML = `${nombreEnLaCaja}`
            document.querySelector('.precio-detalle').innerHTML = `Precio: $${rellenoBusqueda[cajaSeleccionada].precioSerie}`
            document.querySelector('.descripcion-detalle').innerHTML = `${rellenoBusqueda[cajaSeleccionada].sinopsis}`
            document.querySelector('.episodios').innerHTML = `Episodios:${episodios}`
            datos = {nombre: nombreEnLaCaja , image_url:this.children[2].src, precioCapitulo , episodios, precioProduccion : precioCapitulo * episodios }
            
    document.querySelector('.boton-detalle').addEventListener
    ('click', compiladorDatos)
    
}
function cerrarVentana(){
    document.querySelector('.formulario-al-detalle').style.display = 'none';
}
let item = 0

function compiladorDatos (){
    productosElejidos.guardarLista(datos)
    productosElejidos.adicionarProducto(datos,item)
    item++
    
}