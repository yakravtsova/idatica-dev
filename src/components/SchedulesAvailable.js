import { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import UpdaterRow from "./UpdaterRow";
import DeleteUpdaterInfoTooltip from "./DeleteUpdaterInfoTooltip";

const SchedulesAvailable = ({ updaters, handleDeleteUpdater, handleCreateUpdaterPopupOpen, groups }) => {
  const [isDeleteUpdaterInfoPopupOpen, setIsDeleteUpdaterInfoPopupOpen] = useState(false);
  const [ isUnused, setIsUsed ] = useState(false);
  const [ updateUpdater, setUpdateUpdater ] = useState({});

  const handleUnused = (bool) => {
    setIsUsed(bool)
  }

  const handleDeleteUpdaterInfoPopupOpen = () => {
    setIsDeleteUpdaterInfoPopupOpen(!isDeleteUpdaterInfoPopupOpen);
  }

  const getUpdateUpdater = (updater) => {
    setUpdateUpdater(updater);
  }

  return(
    <>
      <h5>Доступные расписания</h5>
      <ListGroup variant="flush">
        {updaters.map((updater, i) => (
          <UpdaterRow
            key={updater.id}
            updater={updater}
            handleDeleteUpdaterInfoPopupOpen={handleDeleteUpdaterInfoPopupOpen}
            handleUnused={handleUnused}
            getUpdateUpdater={getUpdateUpdater} />
        ))}
      </ListGroup>
      <Button className="m-2" onClick={handleCreateUpdaterPopupOpen}>Создать новое</Button>
      <DeleteUpdaterInfoTooltip
        isOpen={isDeleteUpdaterInfoPopupOpen}
        onClose={handleDeleteUpdaterInfoPopupOpen}
        isOk={isUnused}
        updater={updateUpdater}
        groups={groups}
        handleDeleteUpdater={handleDeleteUpdater} />
    </>
  )
}

export default SchedulesAvailable;