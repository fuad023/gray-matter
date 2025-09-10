import ListGroup from 'react-bootstrap/ListGroup';
import "bootstrap-icons/font/bootstrap-icons.css";

function LinkedExample() {
  
  return (
    <ListGroup defaultActiveKey="">
      <ListGroup.Item action href="#link1">
        <div>
            <i class="bi bi-lightbulb-fill m-2"></i>
            Contribution
        </div>
      </ListGroup.Item>
      <ListGroup.Item action href="#link2">
        <div>
            <i class="bi bi-binoculars-fill m-2"></i>
            Explore
        </div>
      </ListGroup.Item>
      
    </ListGroup>
  );
}

export default LinkedExample;