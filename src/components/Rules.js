import { Container } from "react-bootstrap";
import Link from 'react-router-dom';

const Rules = () => {
  return(
    <Container fluid className="d-flex flex-column align-items-center">
      <h1>Правила использования сервиса</h1>
      <p className="w-75">
        1. Общие положения<br/>
        1.1. Сохранность и неприкосновенность персональных данных посетителей сайта idatica.com, в том числе посетителей поддоменов (доменов третьего уровня), 
        является  приоритетной для iDatica (далее – Компания). Компания считает своим  долгом обеспечивать безопасность и конфиденциальность всех личных  сведений, 
        получаемых от Пользователей Сайта.<br/>
        1.2. Политика обработки персональных данных (далее – Политика)  объясняет, как Компания собирает, использует и защищает персональную  информацию.<br/>
        1.3. Настоящая Политика обработки персональных данных применяется к сайту idatica.com, в том числе поддоменам (доменом третьего уровня).<br/>
        1.4. Настоящая Политика характеризуется следующими признаками:<br/>
        — разработана в целях реализации требований законодательства Российской Федерации в области обработки персональных данных субъектов персональных  данных;<br/>
        — раскрывает способы и принципы обработки Компанией персональных данных,  права и обязанности Компании при обработке персональных данных, 
        а также  права субъектов персональных данных;<br/>
        — является общедоступным документом, размещена на Сайте Компании в сети Интернет.<br/>
        2. Сведения, получаемые от Пользователя Сайта<br/>
        2.1. Для проведения консультаций касательно условий разработки чат  ботов Компании необходимо получить персональные данные о Пользователе.  
        Эти данные также обеспечат лучшее понимание потребностей Пользователя  Сайта и позволяют Компании предоставить пользователю 
        Сайта информацию о  максимально подходящих условиях. Эти данные также будут использованы для  повышения качества консультирования пользователей 
        Сайта по всем  возникающим вопросам.<br/>
        2.2 Персональные данные, получаемые от Пользователя, могут включать  личную информацию, которую Пользователь указывает при регистрации на  Сайте, 
        в том числе: Ваши Ф.И.О., e-mail, телефон, город проживания.<br/>
        2.3. Компания может использовать персональные данные с целью:<br/>
        — подтвердить личность Пользователя;<br/>
        — оперативно консультировать об условиях сотрудничества;<br/>
        — информировать Пользователя о новостях Компании.
      </p>
    </Container>
  )
}

export default Rules;