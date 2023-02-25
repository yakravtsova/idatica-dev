import DeletePopup from "./DeletePopup";

const DeleteGroupPopup = ({isOpen, onClose, okButtonAction}) => {
  
  return(
    <DeletePopup 
      isOpen={isOpen} 
      onClose={onClose} 
      bodyText="Группа удаляется со всеми товарами без возможности восстановления. Вы хотите удалить группу?" 
      okButtonText="Удалить" 
      cancelButtonText="Не удалять" 
      okButtonAction={okButtonAction} 
    />
  )
}

export default DeleteGroupPopup;