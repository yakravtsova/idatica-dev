import {Modal, Button} from 'react-bootstrap';

const DeleteUpdaterInfoTooltip = ({ isOpen, onClose, isOk, updater, handleDeleteUpdater }) => {
  const onDelete = () => {
    handleDeleteUpdater(updater.id);
    onClose();
  }

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Body>
        <p>
          {isOk ? `Вы удаляете расписание ${updater.name}` : `Расписание используется. Пожалуйста, измените расписание проверок и попробуйте ещё раз.`}
        </p>
        {isOk ?
          <>
            <Button className="m-2" onClick={onClose}>Не удалять</Button>
            <Button onClick={onDelete}>Удалить</Button>
          </>
          : <Button onClick={onClose}>Хорошо</Button>}
      </Modal.Body>
    </Modal>
  )
}

export default DeleteUpdaterInfoTooltip;