//SELECTOR POR ID
const id = document.getElementById.bind(document);
//VARIABLES
const primero=id('primero');
const segundo=id('segundo');
const tercero=id('tercero');
const tablacont=id('tabla-container');
const vtable=id('vertical-table');
const tabla=id('tabla');
const alerta=id('alerta');
//EVENTOS
primero.addEventListener('click',()=>leerJson('data/uno.json',1))
segundo.addEventListener('click',()=>leerJson('data/dos.json',2))
tercero.addEventListener('click',()=>leerJson('data/tres.json',3))

//FUNCIONES
const leerJson=async(url,tipo)=>{
    const respuesta=await fetch(url)
    tablacont.classList.add('d-none')
    vtable.innerHTML='';
    tabla.innerHTML='';
    if (respuesta.ok) {
        if (tipo===1 || tipo===3) {
            const resultado=await respuesta.json();
            recorrer(resultado,tipo);   
        } else if(tipo===2) {
            const resultado=await respuesta.text();
            const json=await JSON.parse(resultado);
            recorrer(json,tipo);
        }

        alertajs('Se ejecuto con exito',respuesta.status,'info')
    }else{
        alertajs('Ocurrio un error inesperado',respuesta.status,'danger');
    }  
}
//alerta para error o mensaje seguro
const alertajs=(mensaje,estado,tipo)=>{
    alerta.innerHTML=`
    <div class="alert alert-${tipo}" role="alert">
        <strong>Estado ${estado}!</strong> ${mensaje}.
    </div>
    `
}
//Funcion para recorrer la data
const recorrer=(resultado,tipo)=>{
    if (tipo===1) {
        resultado.forEach(alumno => pintar1(alumno))
    }else if(tipo===2 || tipo===3){
        resultado.forEach(producto => pintar2(producto))
    }
    
}
//Funciones de inserccion a HTML
const pintar1=({codigo,nombre,edad,dni})=>{
    let html='';
    html= `
        <tr>
        <th>Codigo:</th>
        <td>${codigo}</td>
        </tr>
        <tr>
        <th>Nombre:</th>
        <td>${nombre}</td>
        </tr>
        <tr>
        <th>Edad:</th>
        <td>${edad}</td>
        </tr>
        <tr>
        <th>DNI:</th>
        <td>${dni}</td>
        </tr>
        <tr>
            <th class="table-primary">.</th>
            <td class="table-primary">.</td>
        </tr>
    `;
    vtable.innerHTML+=html;
}
const pintar2=({foto,nombre,precio,stock})=>{
    let html='';
    
    tablacont.classList.remove('d-none')
    html= `
        <tr>
            <td> <img src="${foto}" width="100"></td>
            <td>${nombre} </td>
            <td>S/ ${precio} </td>
            <td>${stock} </td>
        </tr>
    `;
    tabla.innerHTML+=html;
}