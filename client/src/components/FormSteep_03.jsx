import React, { useContext, useState } from 'react';
import { Context } from '../utils/Context';
import { useNavigate } from 'react-router-dom';
import Spinner from '../icons/Spinner';
import AlertMessage from '../icons/AlertMessage';
import { validateCivilStatus, validateSons, validateSonsNumber } from '../validations/validations';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const RegistrerFamilyInfo = () => {
  const navigate = useNavigate();
  const { DataRegistrer } = useContext(Context);
  
  const { setDataRegistrer } = useContext(Context);
  const { resetDataRegistrer } =useContext(Context)

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [selectedSons, setSelectedSons] = useState('')
  const [selectedCivil_status, setSelectedCivil_status] = useState('')
  

  const [RegistrerModified, setRegistrerModified] = useState({
    civil_status: DataRegistrer.civil_status,
    sons: DataRegistrer.sons,
    sons_number: DataRegistrer.sons_number,
  });

  const handleChange = (event) => {
    setRegistrerModified({
      ...RegistrerModified,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeSelectCivil_status = (event) => {
    setSelectedCivil_status(event.target.value);

    setRegistrerModified({
      ...RegistrerModified,
      civil_status: event.target.value,
    });
  };

  const handleChangeSelectSons = (event) => {
    setSelectedSons(event.target.value);

    setRegistrerModified({
      ...RegistrerModified,
      sons: event.target.value,
    });
  };

  const handledSubmit = async (event) => {
    event.preventDefault();

    const civil_statusError = validateCivilStatus(
      RegistrerModified.civil_status
    );
    const sonsError = validateSons(RegistrerModified.sons);
    const sons_numberError = validateSonsNumber(RegistrerModified.sons_number);

    if (civil_statusError || sonsError || sons_numberError) {
      setErrors({
        civil_status: civil_statusError,
        sons: sonsError,
        sons_number: sons_numberError,
      });
      return;
    }

    setIsLoading(true);

    try {
      
      const postData = {
        ...DataRegistrer,
        ...RegistrerModified,
      };

      console.log('Datos a enviar:', postData);

      // Realiza la petición POST
      const response = await fetch(`${BACKEND_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      
      if (response.status === 201) {
        const data = await response.json();
        console.log('Se ha creado el registro', data)

        setIsLoading(false)
      
        // Actualiza el estado o realiza otras acciones necesarias
        resetDataRegistrer();
        setIsLoading(false);
        // Navega a la siguiente ruta
        navigate('/');
      } else {
        // Si la petición no fue exitosa, maneja el error
        console.error('Error al enviar la petición:', response.statusText);
        setIsLoading(false);
      }
    } catch (error) {
      // Maneja errores de red o del servidor
      console.error('Error en la petición:', error);
      setIsLoading(false);
    }
  };

  const handleBack = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setDataRegistrer({
      ...DataRegistrer,
      ...RegistrerModified,
    });
    setIsLoading(false);
    navigate('/steep_02');
  };


  return (
    <section className="overflow-y-scroll flex flex-wrap fixed top-0 left-0 z-50 w-full h-full items-center justify-center bg-black bg-opacity-10">
      <div className="flex flex-col flex-wrap w-full items-center justify-center px-6 py-8 mx-auto ">
        <div className="w-full h-max bg-gray-100 dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-black dark:text-white text-xl font-bold leading-tight tracking-tight  text-center">
              Registrar Usuario
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Ingrese los datos Familiares del usuario
            </p>
            {isLoading ? (
              <div className="flex w-full pb-8 justify-center items-center">
                <Spinner large={true} />
              </div>
            ) : (
              <form className="flex flex-col items-center space-y-4" noValidate>
                <div className="flex flex-col md:flex-row items-center justify-between w-full md:space-x-4 md:space-y-0 space-y-4">
                  <select
                    type="text"
                    name="civil_status"
                    id="civil_status"
                    title="Seleccione un Estado Civil"
                    className="h-10 border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Genero"
                    required=""
                    defaultValue={
                      DataRegistrer.civil_status
                        ? DataRegistrer.civil_status
                        : selectedCivil_status
                    }
                    onChange={handleChangeSelectCivil_status}
                  >
                    <option value="" disabled>
                      Estado Civil
                    </option>
                    <option value="Soltero/a">Soltero/a</option>
                    <option value="Casado/a">Casado/a</option>
                    <option value="Unión Libre">Unión Libre</option>
                    <option value="Divorciado/a">Divorciado/a</option>
                    <option value="Viudo/a">Viudo/a</option>
                  </select>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between w-full md:space-x-4 md:space-y-0 space-y-4">
                  <select
                    type="text"
                    name="sons"
                    id="sons"
                    title="Tienes Hijos?"
                    className="h-10 border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tienes Hijos?"
                    required=""
                    defaultValue={
                      DataRegistrer.sons ? DataRegistrer.sons : selectedSons
                    }
                    onChange={handleChangeSelectSons}
                  >
                    <option value="" disabled></option>
                    Tienes Hijos?
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between w-full md:space-x-4 md:space-y-0 space-y-4">
                  <input
                    type="number"
                    id="sons_number"
                    name="sons_number"
                    title="Ingrese el número de hijos"
                    className="border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Número de Hijos"
                    required=""
                    defaultValue={
                      DataRegistrer.sons_number ? DataRegistrer.sons_number : ''
                    }
                    onChange={handleChange}
                  />
                </div>

                {errors && <AlertMessage errorMsg={errors} />}

                <div className="flex flex-col md:flex-row items-center justify-between w-full md:space-x-4 md:space-y-0 space-y-4">
                  <button
                    type="button"
                    className="md:w-24 w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm py-2.5 text-center"
                    onClick={(event) => handleBack(event)}
                  >
                    Atrás
                  </button>
                  <button
                    type="submit"
                    className="md:w-24 w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm py-2.5 text-center"
                    onClick={(event) => handledSubmit(event)}
                  >
                    Enviar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegistrerFamilyInfo;