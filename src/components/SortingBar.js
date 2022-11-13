import { useState } from 'react';
import { ArrowDownUp, ArrowDown, ArrowUp } from 'react-bootstrap-icons';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useEffect } from 'react';


const SortingBar = ({ setSearchParams, removeSearchParams }) => {
  const UNSORTED = 2;
  const ASC = 0;
  const DESC = 1;
  const [ sortLinksList, setSortLinksList ] = useState({});

  const linkListBlank = {
    name: UNSORTED,
    is_active: UNSORTED,
    last_collected: UNSORTED,
    price: UNSORTED,
    price_diff: UNSORTED
  }

  useEffect(() => {
    setSortLinksList(linkListBlank)
  }, [])

  useEffect(() => {
    for (let key in sortLinksList) {
      if (sortLinksList[key] === ASC) {
        setSearchParams({ sort_by: key, sort_order: 'asc' });
        return;
      }
      if (sortLinksList[key] === DESC) {
        setSearchParams({ sort_by: key, sort_order: 'desc' });
        return;
      }
    }
    removeSearchParams(['sort_by', 'sort_order']);
  }, [sortLinksList])

  const toggleLinkState = (link) => {
    const newState = {...linkListBlank, [link]: (sortLinksList[link] + 1) % 3};
    setSortLinksList(newState);
  }


  const iconState = (state) => {
    if (state === UNSORTED) {
      return <ArrowDownUp />;
    }
    else if (state === ASC) {
      return <ArrowDown />
    }
    else return <ArrowUp />
  }

  return(
    <ButtonGroup>
      <Button onClick={() => toggleLinkState('name')}>{iconState(sortLinksList.name)} Название</Button>
      <Button onClick={() => toggleLinkState('price_diff')}>{iconState(sortLinksList.price_diff)} Разница</Button>
      <Button onClick={() => toggleLinkState('price')}>{iconState(sortLinksList.price)} Цена</Button>
      <Button onClick={() => toggleLinkState('last_collected')}>{iconState(sortLinksList.last_collected)} Последняя проверка</Button>
      <Button onClick={() => toggleLinkState('is_active')}>{iconState(sortLinksList.is_active)} Активно</Button>
    </ButtonGroup>

  )
}

export default SortingBar;