import { Button } from "react-bootstrap";
import { CaretDownFill, PencilFill, ExclamationTriangleFill, TrashFill } from "react-bootstrap-icons";

const UrlTableRow = ({ productUrl, handleReportingProblemPopupOpen, handleEditLinkPopupOpen, handleDeletePopupOpen }) => {
  
  const urlLabel = (url) => {
    if (!url.indexOf('https://')) {
      let newUrl = url.substring(8, url.indexOf('/', 8));
      return newUrl;
    }
    else if (!url.indexOf('http://')) {
      let newUrl = url.substring(7, url.indexOf('/', 7));
      return newUrl;
    }
    return url.substring(0, url.indexOf('/'))
  }
  
  return(
    <tr>
      <td><a href={productUrl.url}>{urlLabel(productUrl.url)}</a></td>
      <td>{productUrl.price}</td>
      <td>{productUrl.discount}%</td>
      <td>{productUrl.inStock ? "Да" : "Нет"}</td>
      <td>{productUrl.lastCheck}</td>
      <td><span className="text-danger"><CaretDownFill /> ??%</span></td>
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