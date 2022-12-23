import { useCallback, useState } from 'react';
import validator from 'validator';

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const hasErrors = (object) => {
    let has = false;
    for (let key in object) {
      has = has || object[key]
    }
    return Boolean(has);
  }


  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const errState = {...errors, [name]: target.validationMessage };
    setValues({...values, [name]: value});
    setErrors(errState);
    setIsValid(target.closest("form").checkValidity() && !hasErrors(errState));
  };

  const handleEmailChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const isError = validator.isEmail(value);
    const errState = {...errors, [name]: !isError ? 'Email некорректен' : '' };
    setValues({...values, [name]: value});
    setErrors(errState);
    setIsValid(target.closest("form").checkValidity() && !hasErrors(errState));
  }

  const handlePasswordChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const errState = values?.confirm_password !== value ? {...errors, confirm_password: 'Пароли не совпадают' } : {...errors, confirm_password: '' };
    const formErrState = {...errState, [name]: target.validationMessage};
    setValues({...values, [name]: value});
    setErrors(formErrState);
    setIsValid(target.closest("form").checkValidity() && !hasErrors(formErrState));
  }

  const handleConfirmPasswordChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const errState = values?.password !== value ? {...errors, confirm_password: 'Пароли не совпадают' } : {...errors, confirm_password: '' };
    setValues({...values, [name]: value});
    setErrors(errState);
    setIsValid(target.closest("form").checkValidity() && !hasErrors(errState));
  }

  const handleUrlChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const isError = validator.isURL(value);
    const errState = {...errors, [name]: !isError ? 'Вы указали некорректную ссылку' : ''/*, custom_region: !values.region_id && !values.current_region ? 'Введите регион' : ''*/ };
    setValues({...values, [name]: value});
    setErrors(errState);
    setIsValid(target.closest("form").checkValidity() && !hasErrors(errState));
  }

  const handleRegionNameChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const errState = !value ? {...errors, custom_region: 'Введите регион'} : {...errors, custom_region: ''};
    setValues({...values, [name]: value, custom_region: ''});
    setErrors(errState);
    setIsValid(target.closest("form").checkValidity() && !hasErrors(errState));
  }

  const handleCustomRegionChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const errState = !value && !values.region_id ? {...errors, custom_region: 'Введите регион'} : {...errors, custom_region: ''}
    setValues({...values, [name]: value});
    setErrors(errState);
    setIsValid(target.closest("form").checkValidity() && !hasErrors(errState));
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleUrlChange,
    handleRegionNameChange,
    handleCustomRegionChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid
  };
}