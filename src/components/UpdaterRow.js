import { ListGroup, Button } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";

const UpdaterRow = ({ updater, handleDeleteUpdaterInfoPopupOpen, handleUnused, getUpdateUpdater }) => {
  const isUnused = updater.num_groups ? false : true;
  const onDelete = () => {
    handleUnused(isUnused);
    getUpdateUpdater(updater);
    handleDeleteUpdaterInfoPopupOpen();

  }
  return(
    <ListGroup.Item key={updater.id} className="d-flex align-items-center"><div style={{width: "50px"}}>{!updater.is_default && <Button variant="link" className="text-danger" onClick={onDelete}><TrashFill /></Button>}</div> {updater.name}</ListGroup.Item>
  )
}

export default UpdaterRow;