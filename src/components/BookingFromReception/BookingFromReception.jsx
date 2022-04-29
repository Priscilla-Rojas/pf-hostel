import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './Booking.module.css';
import countries from '../../data/countries.json';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
console.log(countries);

export function validate(input) {  /////// VALIDACiONES /////////////////////////////////
  let errores = {};

  //   Name
  if (!input.name) {
    errores.name = 'Please enter a name';
  } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.name)) {
    errores.name = 'The name can only contain letters and spaces';
  }

  // Validacion lastname
  if (!input.lastName) {
    errores.lastName = 'Please enter a lastname';
  } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.lastName)) {
    errores.lastName =
      'The lastname can only contain letters and spaces';
  }

  // Validacion DNI
  if (!input.docNumber) {
    errores.docNumber = 'Please enter a dni';
  } else if (!/^[0-9]{8,20}$/.test(input.docNumber)) {
    errores.docNumber = 'The dni can only contain numbers';
  }

  // Validacion correo
  if (!input.email) {
    errores.email = 'Please enter a email';
  } else if (
    !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
      input.email
    )
  ) {
    errores.email =
      'Email can only contain letters, numbers, points, script and underscores';
  }

  // Validacion documento tipo
  if (!input.docType) {
    errores.docType = 'Please select a document type';
  }

  // Validacion nationality
  if (!input.nationality) {
    errores.nationality = 'Please enter your nationality';
  }

  const today = new Date();
  if (!input.checkIn) {
    errores.checkIn = 'Please enter checkIn date';
  } else if (input.checkIn < today.toLocaleDateString('en-CA')) {
    console.log(input.checkIn);
    console.log(today.toLocaleDateString('en-CA'));
    errores.checkIn = 'CheckIn cant be in the past';
  } 

  if (!input.checkOut) {
    errores.checkOut = 'Please enter checkOut date';
  } else if (input.checkOut <= input.checkIn) {
    errores.checkOut = 'Checkout has to be after checkIn';
  }

  if (!input.roomIds) {
    errores.roomIds = 'Please select room';
  }

  if (!input.bedId && input.private === false) {
    if (!input.roomIds) {
      errores.bedId = 'Please enter a room first';
    } else {
      errores.bedId = 'Please select a bed';
    }
  }

  // Validacion birthdate
  var actual = new Date();

  const [actualMenos18, month, day] = [
    actual.getFullYear() - 18,
    actual.getMonth() + 1,
    actual.getDate(),
  ];
  const array = [actualMenos18, month, day];
  let arrayLindo = new Date(array.join('-'));

  const formatYmd = (date) => date.toISOString().slice(0, 10);

  let fechaActualFormateada = null;
  if (arrayLindo) {
    fechaActualFormateada = formatYmd(arrayLindo);
  }
  if (birthDate.value) {
    input.birthDate = formatYmd(new Date(birthDate.value));
  }

  if (!input.birthDate) {
    errores.birthDate = 'Please enter a birthdate';
  } else if (!(input.birthDate <= fechaActualFormateada)) {
    errores.birthDate = 'Need to be 18 or more years old';
  }


  return errores;
}

const Booking = () => {
  const {     
    filteredAvailableBeds,                     ////// Global Context Imports ////////////////////////////////
    allRooms,
    dataForCardsCopy,
    dataForCards,
    getAllRooms,
    getFilteredBeds,
    genDataForCards,
  } = useContext(GlobalContext);
  let initialState = {             /////// Inputs initial state ///////////////////////
    name: '',
    lastName: '',
    docType: '',
    docNumber: '',
    birthDate: '',
    nationality: '',
    email: '',
    roomIds: '',
    bedId: '',
    checkIn: '',
    checkOut: '',
  }
  const [ input, setInput ] = useState(initialState)
  let [error, setError] = useState({});  ////////  Mensajes de error //////////////////////
  const [room, setRoom] = useState({
    private: null,
    camas: 0, //cantidad
    id: [], //esto seria si es privada el id de la habitacion y si es compartida un array de ids de camas
  });
  // const [bedOrRoom, setBedOrRoom] = useState({idsCamas: 0, idsHabitaciones: 0});
  // let [cart, setCart] = useState({idsCamas: [], idsHabitaciones: []});

  useEffect(() => {
    allRooms.length === 0 && getAllRooms();
  }, [allRooms]);

  useEffect(() => {
    filteredAvailableBeds?.length > 0 && genDataForCards();
  }, [filteredAvailableBeds]);

  let localAvailable = []
  if(dataForCardsCopy?.length) localAvailable = [...dataForCardsCopy]
  console.log('localAvailable --> ', localAvailable)

  const handleRoomSelect = (e) => {
    //esta funcion debe recibir el id de la habitacion seleccionada y setear un estado con la cantidad y el id de las camas de esa habitacion, asi como si es privada o no, esto es para usar en el input de beds
    // console.log('e --> ', e.target.value)
    // console.log('dataForCardsCopy --> ', dataForCardsCopy)
    // console.log('dataForCardsCopy o id --> ', dataForCardsCopy[0].id)
    console.log('e.target.value --> ')
    console.log(e.target.value)
    console.log('localAvailable --> ', localAvailable)
    let aux = localAvailable.filter((r) => r.id === Number(e.target.value));
    console.log('habitacion filtrada -->', aux)
    if (aux[0].privada === true) {
      setRoom({
        private: true,
        id: aux[0].id,
      });
    } else {
      let aux2 = [];
      let i = 1;
      aux[0]?.bedIds.forEach(c => {
        aux2.push({cama: i, id: c.camaId});
        i++;
      });
      setRoom({
        private: false,
        camas: [...aux2], //cantidad
      });
    }
  };

  let handleChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
    let objError = validate({ ...input, [e.target.name]: e.target.value });
    setError(objError);
    console.log(input);
  };

  const handleClick = (e) => {
    e.preventDefault()
    getFilteredBeds(input.checkIn, input.checkOut); //esto nos carga filteredAvailableBeds
  };

  const handleAddBed = (e) => {
    e.preventDefault()
    console.log('bedOrRoom desde addBed --> ', bedOrRoom)
    if(bedOrRoom.idsCamas !== 0){
      setCart({...cart, idsCamas: [...cart.idsCamas, bedOrRoom.idsCamas]})
    }else if(bedOrRoom.idsHabitaciones !== 0){
      setCart({...cart, idsHabitaciones: [...cart.idsHabitaciones, bedOrRoom.idsHabitaciones]})
    }
    setBedOrRoom({idsCamas: 0, idsHabitaciones: 0})
    console.log('cart --> ', cart)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submit --> ', input)
  }

 

  return (
    <div className={styles.allcss}>
      <div className={styles.formulario}>
        <h1>Booking</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div> {/* First Name */}
            <label>First Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => handleChange(e)}
              placeholder="first name..."
            />
            {error.name && <p className={styles.error}>{error.name}</p>}
          </div>

          <div> {/* Last Name */}
            <label>Last Name: </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={(e) => handleChange(e)}
              placeholder="last name..."
            />
            {error.lastName && <p className={styles.error}>{error.lastName}</p>}
          </div>

          <div> {/* Document type */}
            <label>Document type: </label>
            <select name="docType" onChange={(e) => handleChange(e)}>
              <option value="docType">
                Elegir opción
              </option>
              <option value="DNI">
                DNI
              </option>
              <option value="Passport">
                Passport
              </option>
              <option value="Libreta civica">
                Libreta Civica
              </option>
              <option value="CLI">
                CLI
              </option>
            </select>
            {error.docType && <p className={styles.error}>{error.docType}</p>}
          </div>

          <div> {/* document number */}
            <label>Document Number: </label>
            <input
              type="text"
              id="docNumber"
              name="docNumber"
              onChange={(e) => handleChange(e)}
              placeholder="document number..."
            />
            {error.docNumber && <p className={styles.error}>{error.docNumber}</p>}
          </div>

          <div> {/* Birth date */}
            <label htmlFor="birthDate">Birth date</label>
            <input type="date" id="birthDate" name="birthDate" onChange={(e) => handleChange(e)}/>
            {error.birthDate && <p className={styles.error}>{error.birthDate}</p>}
          </div>

          <div> {/* Email */}
            <label htmlFor="email">Email </label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={(e) => handleChange(e)}
              placeholder="email@mail.com..."
            />
            {error.email && <p className={styles.error}>{error.email}</p>}
          </div>

          <div> {/* Nationality */}
            <label htmlFor="nationality">Nationality</label>
            <select name="nationality" as="select" onChange={(e) => handleChange(e)}>
              {countries?.countries &&
                countries?.countries.map((c) => (
                  <option key={c} value={c} id={c}>
                    {c}
                  </option>
                ))}
            </select>
            {error.nationality && <p className={styles.error}>{error.nationality}</p>}
          </div>

          <div> {/* Check-In / Out ---> al ingresar las 2 fechas deberia buscar disponibilidad entre esas fechas y luego al seleccionar habitacion y cama solo dar las opciones que estan disponibles*/}
            <label htmlFor="checkIn">Check-In</label>
            <input type="date" id="checkIn" name="checkIn" onChange={(e) => handleChange(e)}/>
            {error.checkIn && <p className={styles.error}>{error.checkIn}</p>}
            <label htmlFor="checkOut">Check-Out</label>
            <input type="date" id="checkOut" name="checkOut" onChange={(e) => handleChange(e)}/>
            {error.checkOut && <p className={styles.error}>{error.checkOut}</p>}
            <button onClick={(e)=> handleClick(e)}>get available</button> 
          </div>

          <div> Select Room:
            <label htmlFor="roomIds">Room Name</label>
            <select name="roomIds" onChange={(e) => handleRoomSelect(e)}>
              <option value="roomIds">
                Elegir opción
              </option>
              {localAvailable?.length &&
                localAvailable?.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nombre}
                  </option>
                ))}
            </select>
            {error.roomIds && <p className={styles.error}>{error.roomIds}</p>}
          </div>
          {room?.private === false ? ( // si la habitacion elegida es compartida mostrar este input y con la cantidad de camas correcta
            <div> {/* Select bed */}
              <label htmlFor="bedId">Bed </label>
              <select name="bedId" onChange={(e) => handleBedSelect(e)}>
                <option value="bedId">
                  Select bed
                </option>
                {room?.camas?.length &&
                room?.camas.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.cama}
                  </option>))}
              </select>
              {error.bedId && <p className={styles.error}>{error.bedId}</p>}
            </div>
          ): null}

          <button onClick={(e) => handleAddBed(e)}>add to booking</button>
          <button type="submit" >Send</button>
        </form>
      </div>
    </div>
  );
};

export default Booking;