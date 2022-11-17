import { ListGroup, Button } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";

const UpdaterRow = ({ updater, handleDeleteUpdater }) => {
  const onDelete = () => {
    handleDeleteUpdater(updater.id)
  }
  return(
    <ListGroup.Item key={updater.id}><Button variant="link" className="text-danger" onClick={onDelete}><TrashFill /></Button> {updater.name}</ListGroup.Item>
  )
}

export default UpdaterRow;