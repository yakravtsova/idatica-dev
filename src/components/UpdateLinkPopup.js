import { useState, useEffect } from 'react';
import EditLinkPopup from './EditLinkPopup';

const UpdateLinkPopup = ({ initData, index, isOpen, onClose, getUpdateProduct, handleIndexOfProduct, updateUrl }) => {
  const [ urlForm, setUrlForm] = useState({
    url: '',
    vendorCode: '',
    regionName: ''
  });

  const handleUrlForm = (data) => {
    setUrlForm(data)
  }

  useEffect(() => {
    if (initData.name) {
      setUrlForm({
        ...urlForm,
        url: initData.productUrls[index].url,
        vendorCode: initData.productUrls[index].vendorCode,
        regionName: initData.productUrls[index].regionName,
      })  
    }
  }, [index]);

const handleSubmit = (e) => {
  e.preventDefault();
  updateUrl(urlForm);
  getUpdateProduct({});
  setUrlForm({
    ...urlForm,
    url: '',
    vendorCode: '',
    regionName: ''
  });
  onClose();
}

const handleClose = () => {
  getUpdateProduct({});
  handleIndexOfProduct(null);
  onClose()
}

  return (
    <EditLinkPopup isOpen={isOpen} onClose={handleClose} title="Редактировать ссылку" okButtonAction={handleSubmit} urlForm={urlForm} handleUrlForm={handleUrlForm} />
  )
}

export default UpdateLinkPopup;