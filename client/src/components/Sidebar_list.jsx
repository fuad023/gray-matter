import ListGroup from 'react-bootstrap/ListGroup';
import "bootstrap-icons/font/bootstrap-icons.css";

function LinkedExample() {
  
  return (
    <ListGroup defaultActiveKey="">
      <ListGroup.Item action href="#link1">
        <div className='d-flex align-items-center'>
            <i class="bi bi-lightbulb-fill m-2"></i>
            <span>Contribution</span>
        </div>
      </ListGroup.Item>
      <ListGroup.Item action href="#link2">
        <div className='d-flex align-items-center'>
            <i class="bi bi-binoculars-fill m-2"></i>
            <span>Explore</span>
        </div>
      </ListGroup.Item>
      <ListGroup.Item action href="#link3">
        <div className='d-flex align-items-center'>
            <i class="bi bi-people-fill m-2"></i>
            <span>Community</span>
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default LinkedExample;