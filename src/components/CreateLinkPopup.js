import { useState } from 'react';
import EditLinkPopup from './EditLinkPopup';

const CreateLinkPopup = ({ isOpen, onClose, regions, createUrl, getUpdateProduct }) => {
  const [ urlForm, setUrlForm] = useState({
    url: '',
    vendor_sku: '',
    region_id: '',
    custom_region: ''
  });

  const handleUrlForm = (data) => {
    setUrlForm(data)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createUrl(urlForm);
    setUrlForm({
      url: '',
      vendor_sku: '',
      region_id: '',
      custom_region: ''
    })
    onClose();
  }

  return (
    <EditLinkPopup isOpen={isOpen} onClose={onClose} regions={regions} title="Добавить ссылку" okButtonAction={handleSubmit} urlForm={urlForm} handleUrlForm={handleUrlForm} />
  )
}

export default CreateLinkPopup;