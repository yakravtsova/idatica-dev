import { useState, useEffect } from 'react';
import EditLinkPopup from './EditLinkPopup';

const UpdateLinkPopup = ({ initData, regions, index, isOpen, onClose, getUpdateProduct, handleIndexOfProduct, updateUrl }) => {
  const [ urlForm, setUrlForm] = useState({
    url: '',
    vendor_sku: '',
    region_id: '',
    custom_region: '',
    id: ''
  });

  const handleUrlForm = (data) => {
    setUrlForm(data)
  }

  useEffect(() => {
    console.log(initData);
    if (initData.name) {
      const url = initData.product_urls.find(item => item.id === index);
      setUrlForm({
        ...urlForm,
        url: url?.url,
        vendor_sku: url?.vendor_sku,
        region_id: url?.region?.id,
        custom_region: url?.custom_region,
        product_id: initData?.id
      });
    }
  }, [index, initData]);

const handleSubmit = (e) => {
  e.preventDefault();
  updateUrl(urlForm);
  getUpdateProduct({});
  setUrlForm({
    ...urlForm,
    url: '',
    vendor_sku: '',
    region_id: '',
    custom_region: '',
    id: ''
  });
  onClose();
}

const handleClose = () => {
  getUpdateProduct({});
  handleIndexOfProduct(null);
  onClose()
}

  return (
    <EditLinkPopup isOpen={isOpen} onClose={handleClose} regions={regions} title="Редактировать ссылку" okButtonAction={handleSubmit} urlForm={urlForm} handleUrlForm={handleUrlForm} />
  )
}

export default UpdateLinkPopup;