import React, { useContext, useState } from 'react';
import { Context } from '../utils/Context';
import { useNavigate } from 'react-router-dom';
import Spinner from '../icons/Spinner';
import { validateAge, validateEmail, validateGender, validateLastname, validateName } from '../validations/validations';
import AlertMessage from '../icons/AlertMessage';


const RegistrerBasicInfo = () => {
  const navigate = useNavigate();
  const { DataRegistrer } = useContext(Context);
  console.log(DataRegistrer);
  const { setDataRegistrer } = useContext(Context);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [selectedGender, setSelectedGender] = useState('')
  

  const [RegistrerModified, setRegistrerModified] = useState({
    name: DataRegistrer.name,
    lastname: DataRegistrer.lastname,
    email: DataRegistrer.email,
    age: DataRegistrer.age,
    gender: DataRegistrer.gender,
  });

  const handleChange = (event) => {
    setRegistrerModified({
      ...RegistrerModified,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeSelectGender = (event) => {
    setSelectedGender(event.target.value);

    setRegistrerModified({
      ...RegistrerModified,
      gender: event.target.value,
    });
  };

  const handleContinue = (event) => {
    event.preventDefault();

    const nameError = validateName(RegistrerModified.name);
    const lastnameError = validateLastname(RegistrerModified.lastname);
    const emailError = validateEmail(RegistrerModified.email);
    const ageError = validateAge(RegistrerModified.age);
    const genderError = validateGender(RegistrerModified.gender);

    if (nameError || lastnameError || emailError || ageError || genderError) {
      setErrors({
        name: nameError,
        lastname: lastnameError,
        email: emailError,
        age: ageError,
        gender: genderError,
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
      navigate('/steep_02');
    } catch (error) {
      setIsLoading(false);
      setErrors(error);
    }
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
                    name="name"
                    id="name"
                    title="Ingrese el Nombre"
                    className="border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nombre"
                    required=""
                    defaultValue={DataRegistrer.name ? DataRegistrer.name : ''}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    title="Ingrese el Apellido"
                    className="border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Apellido"
                    required=""
                    defaultValue={DataRegistrer.lastname ? DataRegistrer.lastname : ''}
                    onChange={handleChange}
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  title="Ingrese el correo electrónico"
                  className="border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Email"
                  required=""
                  defaultValue={DataRegistrer.email ? DataRegistrer.email : ''}
                  onChange={handleChange}
                  />
                <input
                  id="age"
                  name="age"
                  type="number"
                  title="Ingrese la edad"
                  className="border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Edad"
                  required=""
                  defaultValue={DataRegistrer.age ? DataRegistrer.age : ''}
                  onChange={handleChange}
                  />
                  <select
                    type="text"
                    name="gender"
                    id="gender"
                    title="Seleccione un genero"
                    className="h-10 border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Genero"
                    required=""
                    defaultValue={DataRegistrer.gender ? DataRegistrer.gender : selectedGender}
                    onChange={handleChangeSelectGender}
                  >
                    <option value="" disabled>
                      Genero
                    </option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                  
                {errors && <AlertMessage errorMsg={errors} />}
                <div className="flex flex-wrap w-full justify-center md:space-x-4 md:space-y-0 space-y-4">
                  <button
                    type="button"
                    className="md:w-24 w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm py-2.5 text-center"
                    onClick={(event) => handleContinue(event)}
                  >
                    Continuar
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

export default RegistrerBasicInfo;