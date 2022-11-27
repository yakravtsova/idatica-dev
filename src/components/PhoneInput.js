import InputMask from 'react-input-mask';
import { Form } from 'react-bootstrap';
import { forwardRef } from 'react';

const PhoneInput = forwardRef(({ onChange, value }, ref) => {
  return (
    <InputMask
      mask='+7 999 999 99 99'
      maskChar={null}
      onChange={onChange}
      value={value}
      name="phone"
      placeholder="Телефон"
      >
        {(inputProps) => <Form.Control {...inputProps} ref={ref}/>}
    </InputMask>
  )
})

export default PhoneInput;