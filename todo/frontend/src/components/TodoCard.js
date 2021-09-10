import React, {useState} from 'react';
import EditTask from '../modals/EditTask.js'
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const TodoCard = ({item, completeTask, deleteTask, updateTask}) => {

  const [modal, setModal] = useState(false);

  const handleComplete = () => {
    completeTask(item);
  }

  const handleDelete = () => {
    deleteTask(item.TaskId);
  }

  const toggle = () => {
    setModal(!modal);
  }

  return (
    <div className = "card-wrapper">
      <Card className = "card-container">
        <CardBody>
          <CardTitle tag="h5">{item.TaskName}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{!item.TaskCompleted ? "Not Finished" : "Finished"}</CardSubtitle>
          <CardText>{item.TaskDescription}</CardText>
          <div style={{"paddingTop" : "50px"}}>
            <Button color="secondary" onClick={() => setModal(true)}>Edit</Button>{' '}
            <Button color="danger" onClick={() => handleDelete()}>Delete</Button>{' '}
            <Button color="success" onClick={() => handleComplete()}>Complete</Button>{' '}
          </div>
        </CardBody>
      </Card>
      <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={item} />
    </div>
  );
};

export default TodoCard;