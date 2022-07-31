import DeletePopup from "./DeletePopup";

const DeleteCheckedProductsPopup = ({ isOpen, onClose, okButtonAction }) => {
  return(
    <DeletePopup isOpen={isOpen} onClose={onClose} title="Удалить все выбранные товары?" okButtonText="Да" cancelButtonText="Нет" okButtonAction ={okButtonAction}/>
  )
}

export default DeleteCheckedProductsPopup;