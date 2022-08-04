import { useState } from 'react';
import EditLinkPopup from './EditLinkPopup';

const CreateLinkPopup = ({ isOpen, onClose, createUrl, getUpdateProduct }) => {
  const [ urlForm, setUrlForm] = useState({
    url: '',
    vendorCode: '',
    regionName: ''
  });

  const handleUrlForm = (data) => {
    setUrlForm(data)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createUrl(urlForm);
  setUrlForm({
    ...urlForm,
    url: '',
    vendorCode: '',
    regionName: ''
  })
    onClose();
  }

  return (
    <EditLinkPopup isOpen={isOpen} onClose={onClose} title="Добавить ссылку" okButtonAction={handleSubmit} urlForm={urlForm} handleUrlForm={handleUrlForm} />
  )
}

export default CreateLinkPopup;