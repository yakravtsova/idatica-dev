import { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { ArrowDownUp, ArrowDown, ArrowUp } from 'react-bootstrap-icons';


const SortingBar = ({ sortByName, sortByBasePrice }) => {
  const [ nameLinkState, setNameLinkState ] = useState(2);
  const [ diffLinkState, setDiffLinkState ] = useState(2);
  const [ priceLinkState, setPriceLinkState ] = useState(2);
  const [ lastCheckLinkState, setLastCheckLinkState ] = useState(0);
  const [ activityLinkState, setActivityLinkState ] = useState(0);

  const handleNameLinkState = () => {
    sortByName(nameLinkState);
    setNameLinkState((nameLinkState < 2) ? nameLinkState + 1 : nameLinkState - 2);
  }

  const handleDiffLinkState = () => {
    setDiffLinkState((diffLinkState < 2) ? diffLinkState + 1 : diffLinkState - 2);
  }

  const handlePriceLinkState = () => {
    sortByBasePrice(priceLinkState);
    setPriceLinkState((priceLinkState < 2) ? priceLinkState + 1 : priceLinkState - 2);
  }

  const handleLastCheckLinkState = () => {
    setLastCheckLinkState((lastCheckLinkState < 2) ? lastCheckLinkState + 1 : lastCheckLinkState - 2);
  }

  const handleActivityLinkState = () => {
    setActivityLinkState((activityLinkState < 2) ? activityLinkState + 1 : activityLinkState - 2);
  }





  return(
      <Navbar>
        <Nav>
          <Nav.Link onClick={handleNameLinkState}>{nameLinkState === 2 && <ArrowDownUp />}{nameLinkState === 0 && <ArrowDown />}{nameLinkState === 1 && <ArrowUp />} Название</Nav.Link>
          <Nav.Link onClick={handleDiffLinkState}>{diffLinkState === 2 && <ArrowDownUp />}{diffLinkState === 0 && <ArrowDown />}{diffLinkState === 1 && <ArrowUp />} Разница %</Nav.Link>
          <Nav.Link onClick={handlePriceLinkState}>{priceLinkState === 2 && <ArrowDownUp />}{priceLinkState === 0 && <ArrowDown />}{priceLinkState === 1 && <ArrowUp />} Цена</Nav.Link>
          <Nav.Link onClick={handleLastCheckLinkState}>{lastCheckLinkState === 0 && <ArrowDownUp />}{lastCheckLinkState === 1 && <ArrowDown />}{lastCheckLinkState === 2 && <ArrowUp />} Последняя проверка</Nav.Link>
          <Nav.Link onClick={handleActivityLinkState}>{activityLinkState === 0 && <ArrowDownUp />}{activityLinkState === 1 && <ArrowDown />}{activityLinkState === 2 && <ArrowUp />} Активно</Nav.Link>
        </Nav>
      </Navbar>
  )
}

export default SortingBar;