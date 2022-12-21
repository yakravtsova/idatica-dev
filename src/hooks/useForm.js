import { useCallback, useState, useEffect } from 'react';

//хук управления формой
export function useForm(initData) {
  const [values, setValues] = useState({});

  useEffect(() => {
    setValues(initData);
  }, [])

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({...values, [name]: value});
  };

  const toBool = (val) => {
    if (val === '') return '';
    else return val === '2' ? 'false' : 'true';
  }

  const handleActivityChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log({...values, [name]: value});
    setValues({...values, [name]: value});
  };

  const resetForm = useCallback(
    (newValues = {}) => {
      setValues(newValues);
    },
    [setValues]
  );

  return {values, handleChange, handleActivityChange, setValues, resetForm};
}