const panelIzquierdo=document.getElementById("js-panelizquierdo")
const panelDerecho=document.getElementById("js-panelderecho")
const valorConvertir=document.getElementById("cantidad-moneda");
const selectMoneda=document.getElementById("moneda")
const casillasCriptos=document.querySelectorAll(".cripto-convertida");
const urlApi="https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Ccardano%2Cripple%2Ctether&vs_currencies=eur%2Cusd";
let monedaCambio="euros";

//Si la pantalla es más de 600px ya no es móvil y sale la animación del logo
if (window.innerWidth>600) { 
    let tl=gsap.timeline();

tl.fromTo(panelIzquierdo,{x:-1000},{x:0,duration:1.5}).fromTo(panelDerecho,{x:1000},{x:0,duration:1.5},"<")
    .fromTo("h1",{y:330},{y:0,duration:1})    
  }


//Consultar valores criptos
const consultaValores = async ()=>{
    
    const response=await fetch(urlApi);
    const data=await response.json();
    let valorConvertido=0;
    
    if (monedaCambio=="euros")
        {

        //BTC
        valorConvertido=valorConvertir.value/data.bitcoin.eur;
        casillasCriptos[0].innerHTML=valorConvertido.toFixed(3);
        //ETH
        valorConvertido=valorConvertir.value/data.ethereum.eur;
        casillasCriptos[1].innerHTML=valorConvertido.toFixed(3);
        //ADA
        valorConvertido=valorConvertir.value/data.cardano.eur;
        casillasCriptos[2].innerHTML=valorConvertido.toFixed(3);
        //XRP
        valorConvertido=valorConvertir.value/data.ripple.eur;
        casillasCriptos[3].innerHTML=valorConvertido.toFixed(3);
        //USDT
        valorConvertido=valorConvertir.value/data.tether.eur;
        casillasCriptos[4].innerHTML=valorConvertido.toFixed(3);
        }
    else if (monedaCambio=="dolares")
        {
        //BTC
        valorConvertido=valorConvertir.value/data.bitcoin.usd;
        casillasCriptos[0].innerHTML=valorConvertido.toFixed(3);
        //ETH
        valorConvertido=valorConvertir.value/data.ethereum.usd;
        casillasCriptos[1].innerHTML=valorConvertido.toFixed(3);
        //ADA
        valorConvertido=valorConvertir.value/data.cardano.usd;
        casillasCriptos[2].innerHTML=valorConvertido.toFixed(3);
        //XRP
        valorConvertido=valorConvertir.value/data.ripple.usd;
        casillasCriptos[3].innerHTML=valorConvertido.toFixed(3);
        //USDT
        valorConvertido=valorConvertir.value/data.tether.usd;
        casillasCriptos[4].innerHTML=valorConvertido.toFixed(3);            
        }



    if ((valorConvertir.value=="")||(valorConvertir=="0"))
        limpiezaValoresCriptos()

}

selectMoneda.addEventListener("change",(e)=>{
    
    monedaCambio=e.target.value;
    console.log (selectMoneda.value)
    consultaValores ();
})



valorConvertir.addEventListener("keyup",(e)=>{
    if (valorConvertir.value.length > valorConvertir.maxLength) 
        valorConvertir.value = valorConvertir.value.slice(0, valorConvertir.maxLength);
    consultaValores(urlApi);
})


// Recorrriendo todas las casillas donde se muestran valores de criptos



//Limpiar todas las casillas de cripts
function limpiezaValoresCriptos(){
    for (let i=0;i<casillasCriptos.length;i++)
        {
            casillasCriptos[i].innerHTML=" ";
        }
    }