import ToggleButton from 'react-bootstrap/Button';

const WeekdayButton = ({ day }) => {
  const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  return(
    <ToggleButton id={`tbg-btn-${day}`} value={day + 1}>{weekdays[day]}</ToggleButton>
  );
}

export default WeekdayButton;