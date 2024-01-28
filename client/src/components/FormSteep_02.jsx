import React, { useContext, useState } from 'react';
import { Context } from '../utils/Context';
import { useNavigate } from 'react-router-dom';
import Spinner from '../icons/Spinner';
import AlertMessage from '../icons/AlertMessage';
import { validateAddress, validateCity, validateNationality, validatePhone } from '../validations/validations';


const RegistrerLocationInfo = () => {
  const navigate = useNavigate();
  const { DataRegistrer } = useContext(Context);
  console.log(DataRegistrer);
  const { setDataRegistrer } = useContext(Context);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const [RegistrerModified, setRegistrerModified] = useState({
    nationality: DataRegistrer.nationality,
    country: DataRegistrer.country,
    city: DataRegistrer.city,
    address: DataRegistrer.address,
    phone: DataRegistrer.phone,
  });

  const handleChange = (event) => {
    setRegistrerModified({
      ...RegistrerModified,
      [event.target.name]: event.target.value,
    });
  }

  const handleContinue = (event) => {
    event.preventDefault();

    const nationalityError = validateNationality(RegistrerModified.nationality);
    const countryError = validateCity(RegistrerModified.country);
    const cityError = validateCity(RegistrerModified.city);
    const addressError = validateAddress(RegistrerModified.address);
    const phoneError = validatePhone(RegistrerModified.phone);

    if (nationalityError || countryError || cityError || addressError || phoneError) {
      setErrors({
        nationality: nationalityError,
        country: countryError,
        city: cityError,
        address: addressError,
        phone: phoneError,
      });
      return;
    }

    setIsLoading(true);
    try {
      setDataRegistrer({
        ...DataRegistrer,
        ...RegistrerModified,
      });
      setIsLoading(false);
      navigate('/steep_03');
    } catch (error) {
      setIsLoading(false);
      setErrors(error);
    }
  }

  const handleBack = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setDataRegistrer({
      ...DataRegistrer,
      ...RegistrerModified,
    });
    setIsLoading(false);
    navigate('/steep_01');
  }

  return (
    <section className="overflow-y-scroll flex flex-wrap fixed top-0 left-0 z-50 w-full h-full items-center justify-center bg-black bg-opacity-10">
      <div className="flex flex-col flex-wrap w-full items-center justify-center px-6 py-8 mx-auto ">
        <div className="w-full h-max bg-gray-100 dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-black dark:text-white text-xl font-bold leading-tight tracking-tight  text-center">
              Registrar Usuario
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Ingrese los datos básicos del usuario
            </p>
            {isLoading ? (
              <div className="flex w-full pb-8 justify-center items-center">
                <Spinner large={true} />
              </div>
            ) : (
              <form className="flex flex-col items-center space-y-4" noValidate>
                <div className="flex flex-col md:flex-row items-center justify-between w-full md:space-x-4 md:space-y-0 space-y-4">
                  <input
                    type="text"
                    name="nationality"
                    id="nationality"
                    title="Ingrese su Nacionalidad"
                    className="border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nacionalidad"
                    required=""
                    defaultValue={
                      DataRegistrer.nationality ? DataRegistrer.nationality : ''
                    }
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between w-full md:space-x-4 md:space-y-0 space-y-4">
                  <input
                    type="text"
                    name="country"
                    id="country"
                    title="Ingrese su País"
                    className="border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500"
                    placeholder="País"
                    required=""
                    defaultValue={
                      DataRegistrer.country ? DataRegistrer.country : ''
                    }
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between w-full md:space-x-4 md:space-y-0 space-y-4">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    title="Ingrese su Ciudad"
                    className="border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ciudad"
                    required=""
                    defaultValue={DataRegistrer.city ? DataRegistrer.city : ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between w-full md:space-x-4 md:space-y-0 space-y-4">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    title="Ingrese su Dirección"
                    className="border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Dirección"
                    required=""
                    defaultValue={
                      DataRegistrer.address ? DataRegistrer.address : ''
                    }
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between w-full md:space-x-4 md:space-y-0 space-y-4">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    title="Ingrese su Teléfono"
                    className="border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Teléfono"
                    required=""
                    defaultValue={
                      DataRegistrer.phone ? DataRegistrer.phone : ''
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
                    type="button"
                    className="md:w-24 w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm py-2.5 text-center"
                    onClick={(event) => handleContinue(event)}
                  >
                    Siguiente
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

export default RegistrerLocationInfo;