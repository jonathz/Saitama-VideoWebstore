document.querySelector('.boton-pagar').onclick = pushData

function pushData(){
    let datosPersonales = {
    nombre: document.getElementById('nombre').value,
    correo: document.getElementById('correo').value,
    cc: document.getElementById('creditCard').value,
    fven: document.getElementById('fechaVen').value,
    cvv: document.getElementById('codeCVV').value
    } 

    // Los datos del cliente se guardan en el ultimo espacio de la lista de su pedido
    let pedidoFinal = JSON.parse(localStorage.getItem('listaTotal'))
    pedidoFinal.push(datosPersonales)
    localStorage.clear()
    console.log(pedidoFinal)

    //OBJETIVOS COMPLETADOS
    
}
