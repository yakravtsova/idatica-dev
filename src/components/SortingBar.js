import { useState } from 'react';
import { ArrowDownUp, ArrowDown, ArrowUp } from 'react-bootstrap-icons';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useEffect } from 'react';


const SortingBar = ({ setSearchParams, removeSearchParams, view }) => {
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
    //надо ещё сделать, чтобы при обновлении страницы состояния кнопок отображали сортировку, если она применена.
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

  //переключать состояния кнопок
  const toggleLinkState = (link) => {
    const newState = {...linkListBlank, [link]: (sortLinksList[link] + 1) % 3};
    setSortLinksList(newState);
  }

  //менять иконки в зависимости от состояния кнопок
  const iconState = (state) => {
    if (state === UNSORTED) {
      return <ArrowDownUp />;
    }
    else if (state === ASC) {
      return <ArrowDown />
    }
    else return <ArrowUp />
  }

  const buttonVariant = (linkState) => {
    return linkState === UNSORTED ? 'secondary_outline' : 'secondary';
  }

  return(
    <ButtonGroup>
      <Button variant={buttonVariant(sortLinksList.name)} onClick={() => toggleLinkState('name')}>{iconState(sortLinksList.name)} Название</Button>
      <Button variant={buttonVariant(sortLinksList.price_diff)} onClick={() => toggleLinkState('price_diff')}>{iconState(sortLinksList.price_diff)} Разница</Button>
      <Button variant={buttonVariant(sortLinksList.price)} onClick={() => toggleLinkState('price')}>{iconState(sortLinksList.price)} Цена</Button>
      {view &&
      <>
        <Button variant={buttonVariant(sortLinksList.last_collected)} onClick={() => toggleLinkState('last_collected')}>{iconState(sortLinksList.last_collected)} Последняя проверка</Button>
        <Button variant={buttonVariant(sortLinksList.is_active)} onClick={() => toggleLinkState('is_active')}>{iconState(sortLinksList.is_active)} Активно</Button>
      </>}
    </ButtonGroup>

  )
}

export default SortingBar;