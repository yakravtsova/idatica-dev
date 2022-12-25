import { useCallback, useState, useEffect } from 'react';

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