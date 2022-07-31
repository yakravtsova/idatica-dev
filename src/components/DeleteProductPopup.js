import DeletePopup from "./DeletePopup";

const DeleteProductPopup = ({ isOpen, onClose, okButtonAction }) => {
  return(
    <DeletePopup isOpen={isOpen} onClose={onClose} title="Удалить товар?" okButtonText="Да" cancelButtonText="Нет" okButtonAction={okButtonAction} />
  )
}

export default DeleteProductPopup;