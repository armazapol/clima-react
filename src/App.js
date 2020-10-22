import React, {useState, useEffect} from 'react';
import Header from './components/Header'
import Formulario from './components/Formulario'
import Error from './components/Error'
import Clima from './components/Clima'


function App() {

  //State principal
  // ciudad = state, guardarCiudad = this.setState()
  const [ciudad, guardarCiudad] = useState('')
  const [pais, guardarPais] = useState('')
  const [error, guardarError] = useState(false)
  const [resultado, guardarResultado] = useState({})
  
  //use effect funciona al inicio de ejecutar la pagina y al actualizar, por eso 
  //se pone prevenir ejecucion para el inicio de la pagina y al final [ciudad, pais] cada vez
  // que haya cambios en la pagina se volvera a ejecutar
  useEffect(() => {
    //prevenir ejecucion
    if(ciudad === '') return   

      const consultarAPI = async () => {
        const appId = '48ae2d3bb477a7c949dd9519551eae65'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

        //consultar la URL
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()


        // console.log(resultado)
        guardarResultado(resultado)
      }

      consultarAPI()
  }, [ciudad, pais])

  const datosConsulta = datos => {
    // console.log(datos)
    if(datos.ciudad === '' || datos.pais === ''){
      //error
      guardarError(true)
      return
    }

    //Ciudad y pais existen, agregarlos al state
    guardarCiudad(datos.ciudad)
    guardarPais(datos.pais)
    guardarError(false)
  }


  // Cargar un component condicionalmente
  let componente
  if(error){
      //Hay un error, mostrarlo
      componente = <Error mensaje='Ambos campos son obligatorios' />
  }else if(resultado.cod==="404"){
      //si no encuentra la ciudad
      componente = <Error mensaje='No existe la ciudad en nuestro registro' />
  } else {
      
    // Mostrar el Clima
    componente = <Clima 
                    resultado={resultado}
                  />
  }

  return (
    <div className="App">
      <Header
        titulo="Clima react"
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario 
                datosConsulta={datosConsulta}
              />
            </div>
            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
