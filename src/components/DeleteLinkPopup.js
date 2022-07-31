import DeletePopup from "./DeletePopup";

const DeleteLinkPopup = ({isOpen, onClose, okButtonAction}) => {
  return(
    <DeletePopup isOpen={isOpen} onClose={onClose} title="Удалить ссылку?" okButtonText="Да" cancelButtonText="Нет" />
  )
}

export default DeleteLinkPopup;