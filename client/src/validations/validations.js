const validateName = (name) => {
  // Aquí puedes implementar tu lógica de validación para el campo 'name'
  if (!name) {
    return 'El nombre es obligatorio';
  } else if (name.length < 3) {
    return 'El nombre debe tener al menos 3 caracteres';
  } else if (name.length > 30) {
    return 'El nombre debe tener menos de 50 caracteres';
  }
  return null;
};

const validateLastname = (lastname) => {
  // Lógica de validación para el campo 'lastname'
  if (!lastname) {
    return 'El apellido es obligatorio';
  } else if (lastname.length < 3) {
    return 'El nombre debe tener al menos 3 caracteres';
  } else if (lastname.length > 30) {
    return 'El nombre debe tener menos de 50 caracteres';
  }
  
  return null;
};

const validateEmail = (email) => {
  // Lógica de validación para el campo 'email'
  if (!email) {
    return 'El correo electrónico es obligatorio';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return 'El correo electrónico no es válido';
  }
  return null;
};

const validateAge = (age) => {
  // Lógica de validación para el campo 'age'
  if (!age) {
    return 'La edad es obligatoria';
  }
  if (age < 18) {
    return 'Debes ser mayor de edad para registrarte';
  } else if (age > 100) {
    return 'Debes ser menor de 100 años para registrarte';
  }  
  return null;
};

const validateGender = (gender) => {
  // Lógica de validación para el campo 'gender'
  if (!gender) {
    return 'El género es obligatorio';
  }
  
  return null;
};

const validateNationality = (nationality) => {
  if (!nationality) {
    return 'La nacionalidad es obligatoria';
  }
};

const validateCountry = (country) => {
  if (!country) {
    return 'El país es obligatorio';
  }
};

const validateCity = (city) => {
  if (!city) {
    return 'La ciudad es obligatoria';
  }
};

const validateAddress = (address) => {
  if (!address) {
    return 'La dirección es obligatoria';
  }
};

const validatePhone = (phone) => {
  if (!phone) {
    return 'El teléfono es obligatorio';
  }
};

const validateCivilStatus = (civil_status) => {
  if (!civil_status) {
    return 'El estado civil es obligatorio';
  }
};

const validateSons = (sons) => {
  if (!sons) {
    return 'El campo hijos es obligatorio';
  }
};

const validateSonsNumber = (sons_number) => {
  if (sons === 'Si' && !sons_number) {
    return 'El número de hijos es obligatorio';
  }
}

export {
  validateName,
  validateLastname,
  validateEmail,
  validateAge,
  validateGender,
  validateNationality,
  validateCountry,
  validateCity,
  validateAddress,
  validatePhone,
  validateCivilStatus,
  validateSons,
  validateSonsNumber,
};
