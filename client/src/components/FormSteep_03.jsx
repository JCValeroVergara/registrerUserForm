import React, { useContext } from 'react';
import { Context } from '../utils/Context';
import { useNavigate } from 'react-router-dom';
import Spinner from '../icons/Spinner';
import AlertMessage from '../icons/AlertMessage';

const RegistrerFamilyInfo = () => {
  const navigate = useNavigate();
  const { DataRegistrer } = useContext(Context);
  console.log(DataRegistrer);
  const { setDataRegistrer } = useContext(Context);

const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [selectedSons, setSelectedSons] = useState('')
  

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

  const handleChangeSelectSons = (event) => {
    setSelectedSons(event.target.value);

    setRegistrerModified({
      ...RegistrerModified,
      sons: event.target.value,
    });
  };

  const handledSubmit = async (event) => {
    event.preventDefault();

    const civil_statusError = validateCivil_status(
      RegistrerModified.civil_status
    );
    const sonsError = validateSons(RegistrerModified.sons);
    const sons_numberError = validateSons_number(RegistrerModified.sons_number);

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

      // Realiza la petición POST
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      
      if (response.ok) {
        const responseData = await response.json();
      
        console.log('Respuesta del servidor:', responseData);
        // Actualiza el estado o realiza otras acciones necesarias
        setDataRegistrer({
          ...DataRegistrer,
          ...RegistrerModified,
        });
        setIsLoading(false);
        // Navega a la siguiente ruta
        navigate('/steep_03');
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
    <div className="flex flex-col items-center justify-center h-full">
      <h1>Datos Familiares</h1>
    </div>
  );
}

export default RegistrerFamilyInfo;