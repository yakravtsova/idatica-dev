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

  const resetForm = useCallback(
    (newValues = {}) => {
      setValues(newValues);
    },
    [setValues]
  );

  return {values, handleChange, setValues, resetForm};
}