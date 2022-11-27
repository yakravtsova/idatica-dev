import { useCallback, useState } from 'react';
import validator from 'validator';

//хук управления формой и валидации формы
export function useFormWithValidation(initData) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
    console.log(errors);
  };

  const handleEmailChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const isError = validator.isEmail(value);
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: !isError ? 'Email некорректен' : '' });
    setIsValid(target.closest("form").checkValidity());
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, handleEmailChange, errors, isValid, resetForm, setValues };
}