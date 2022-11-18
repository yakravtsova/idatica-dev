import { ListGroup, Button } from "react-bootstrap";
import UpdaterRow from "./UpdaterRow";

const SchedulesAvailable = ({ updaters, handleDeleteUpdater, handleCreateUpdaterPopupOpen }) => {
  return(
    <>
      <h5>Доступные расписания</h5>
      <ListGroup variant="flush">
        {updaters.map((updater, i) => (
          <UpdaterRow key={updater.id} updater={updater} handleDeleteUpdater={handleDeleteUpdater} />
        ))}
      </ListGroup>
      <Button onClick={handleCreateUpdaterPopupOpen}>Создать новое</Button>
    </>
  )
}

export default SchedulesAvailable;