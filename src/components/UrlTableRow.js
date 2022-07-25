import { Button } from "react-bootstrap";
import { CaretDownFill, PencilFill, ExclamationTriangleFill, TrashFill } from "react-bootstrap-icons";

const UrlTableRow = ({ productUrl, handleReportingProblemPopupOpen, handleEditLinkPopupOpen, handleDeletePopupOpen }) => {
  return(
    <tr>
      <td><a href="#">{productUrl.url}</a></td>
      <td>{productUrl.price}</td>
      <td>{productUrl.discount}%</td>
      <td>{productUrl.inStock ? "Да" : "Нет"}</td>
      <td>{productUrl.lastCheck}</td>
      <td><span class="text-danger"><CaretDownFill /> ??%</span></td>
      <td>{productUrl.regionName}</td>
      <td>{productUrl.parsingErrors ? "Да" : "Нет"}</td>
      <td><Button size="sm" variant="light" onClick={handleReportingProblemPopupOpen}><ExclamationTriangleFill /></Button></td>
      <td style={{wordWrap: "normal"}}>{productUrl.vendorCode}</td>
      <td><Button size="sm" variant="light" onClick={handleEditLinkPopupOpen}><PencilFill /></Button></td>
      <td><Button size="sm" variant="light" onClick={handleDeletePopupOpen}><TrashFill /></Button></td>
    </tr>
  )
}

export default UrlTableRow;