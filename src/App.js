import React, { useState} from "react";
import axios from "axios";

function App() {
    const [dataF, setDataF] = useState({})
    const [dataC, setDataC] = useState({})
    const [location,setLocation] = useState('')

    //Arrray de las imagenes que contendra el backgroud del body de la paginas
    // const images = [];
    // images[0]='./assets/imagen1.jpg';
    // images[1]='./assets/imagen2.jpg';
    // images[2]='./assets/imagen3.jpeg';
    // images[3]='./assets/imagen4.jpeg';
    // images[4]='./assets/imagen5.jpeg';



    //Para temperatura en Fahrenheit use unidades = imperial
    const urlF = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8c3756c2929656a682b9ddc85cb11930&units=imperial`

    //Para la temperatura en Celsius use unidades = métrico
    const urlC = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8c3756c2929656a682b9ddc85cb11930&units=metric`

    const searchLocation = (event) => {

        if (event.key === 'Enter'){
            axios.get(urlF).then((response)=>{
                setDataF(response.data)
                console.log(response.data)
            })
            axios.get(urlC).then((response)=>{
                setDataC(response.data)
                console.log(response.data)
            })
            setLocation('')
        }
    }


//    useEffect(() => {
//         // //Se toma dinamicamente las images del arreglo que definimos, esto para ocupar dinamicamente la imagen de fondo
//         let setBackground = Math.floor(Math.random()*images.length);
//         document.body.style.backgroundImage = `url(${images[setBackground]})`;

//     });

    return(
        <div className="app">
            <div className="search">
                <input
                value={location}
                onChange={event => setLocation(event.target.value)}
                onKeyPress={searchLocation}
                placeholder='Enter location'
                type="text"/>
            </div>
            <di className="container">
                <div className="top">
                    <div className="location">
                        <p>{dataF.name}</p>
                    </div>
                    <div className="temp">
                        {/* la funcion .toFixed es para darnos los datos enteros */}
                        {dataF.main ? <h1>{dataF.main.temp.toFixed()}°F</h1>:null}
                        {dataC.main ? <h1>{dataC.main.temp.toFixed()}°C</h1>:null}

                    </div>
                    <div className="description">
                        {dataF.weather ? <p>{dataF.weather[0].main}</p>:null}

                    </div>
                </div>

                {/* Si todavia no hay datos por mostrar, no me muestres lo siguiente*/}

                {dataF.name !== undefined &&
                <div className="bottom">
                    <div className="feels">
                        {dataF.main ? <p className="bold">{dataF.main.feels_like}°F</p>: null}
                        {dataC.main ? <p className="bold">{dataC.main.feels_like}°C</p>: null}
                        <p>Sensacion termica</p>
                     </div>
                    <div className="humidity">
                        {dataF.main ? <p className="bold">{dataF.main.humidity}%</p>: null}
                        <p>Humedad</p>
                    </div>
                    <div className="wind">
                        {dataF.wind ? <p className="bold">{dataF.wind.speed}MPH</p>: null}
                        {dataC.wind ? <p className="bold">{dataC.wind.speed}KM/h</p>: null}
                        <p>Velocidad del viento</p>
                    </div>
                </div>
                }
            </di>
        </div>
    );
}

export default App;