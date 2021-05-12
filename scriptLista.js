class Carrito {
    constructor() {
        this.elementosAgregados = []
        this.elementosAgregados = JSON.parse(localStorage.getItem('listaTotal'))
        console.log(this.elementosAgregados)
    }
guardarLista(nuevoDato){
    // localStorage.removeItem('listaTotal')
    this.elementosAgregados.push(nuevoDato)
    localStorage.setItem("listaTotal", JSON.stringify(this.elementosAgregados))

}
adicionarProducto(nuevoDato, i ){
    
    localStorage.setItem("Item" + i, JSON.stringify(nuevoDato))

}
sumatoria(){
    //total/ = total de todas las series
    //que este calcule el precio todas
    let acum = 0
    for (let product of this.elementosAgregados){
        acum += product.precioProduccion         
    } return acum
}

listarProductos(){
    let listar = JSON.parse(localStorage.getItem('listaTotal')); 
    
    
    document.querySelector('.impresion-principal').innerHTML ='' // limpiar para re imprimir en caso de X
    for (let i = 0; i < listar.length; i++) {
        
        document.querySelector('.impresion-principal').innerHTML += `<div class="contenedor-impresion"><div class="nombre-foto" > 
        <div class="nombre"><p>${listar[i].nombre}<p> </div>
        <br> <img class="miniatura" src="${listar[i].image_url}"></div>  <div class="episodios-num"> ${listar[i].episodios} </div>
        <div class="precio-cap" >$${listar[i].precioCapitulo}</div><div class="precio-prod">$${listar[i].precioProduccion}</div>
        <div class="eliminar"><img class="eliminar-img" src="./images/remove.svg" index="${i+1}"></div></div>`
        if (i==listar.length-1){//imprimir apartado del total
            document.querySelector('.impresion-principal').innerHTML += 
        ` <div"contenedor-total"><div class="total-caja"><p>Total: $${productosElejidos.sumatoria ()}
            </p><div class="total-lista"></div></div></div>
            <div class="botones-finales"><div class="boton-vaciar" index="${0}">Vaciar</div> 
            <a href="./pago.html?pago=${productosElejidos.sumatoria ()}" ><div class="boton-pagar"> Siguiente </div></a>
            </div>`                                                                             
        }                                      
                                      
    }   
        for (let i = 0; i < listar.length; i++) {
            document.querySelectorAll(".eliminar-img")[i].onclick = productosElejidos.eliminarDeLista
        }
        document.querySelector(".boton-vaciar").onclick = productosElejidos.eliminarDeLista 
}
eliminarDeLista(){
    let clickeado = this.getAttribute ("index")
    
    
     
    if (clickeado == 0) {
        localStorage.clear();
        //re imprimir
        productosElejidos.listarProductos()
    }else{
        productosElejidos.elementosAgregados.splice(clickeado -1 ,1)
        console.log(productosElejidos.elementosAgregados)
        //re guardar
        localStorage.setItem("listaTotal", JSON.stringify(productosElejidos.elementosAgregados))
        localStorage.removeItem(`Item${clickeado-1}`);
        
        console.log(clickeado - 1)
        
        
    }
    // re imprimir
    productosElejidos.listarProductos()
}

}
let productosElejidos = new Carrito 
productosElejidos.listarProductos()
