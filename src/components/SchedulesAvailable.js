import { ListGroup } from "react-bootstrap";
import UpdaterRow from "./UpdaterRow";

const SchedulesAvailable = ({ updaters, handleDeleteUpdater }) => {
  return(
    <>
      <h5>Доступные расписания</h5>
      <ListGroup variant="flush">
        {updaters.map((updater, i) => (
          <UpdaterRow key={updater.id} updater={updater} handleDeleteUpdater={handleDeleteUpdater} />
        ))}
      </ListGroup>
    </>
  )
}

export default SchedulesAvailable;