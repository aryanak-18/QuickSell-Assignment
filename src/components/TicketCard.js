import React from 'react';
import './TicketCard.css';  // if there's ticket-specific CSS
import { ReactComponent as InProgress } from '../assets/in-progress.svg';
import { ReactComponent as Todo } from '../assets/To-do.svg';
import { ReactComponent as Backlog } from '../assets/Backlog.svg';
import { ReactComponent as Low } from '../assets/Img - Low Priority.svg';
import { ReactComponent as Medium } from '../assets/Img - Medium Priority.svg';
import { ReactComponent as High } from '../assets/Img - High Priority.svg';
import { ReactComponent as Urgent } from '../assets/SVG - Urgent Priority colour.svg';





const TicketCard = ({ ticket, data }) => {
  const { title, priority, userId, status } = ticket;

  return (
    <div className="ticket-card">
      <h6>{ticket.id}</h6>
      <h5>{status === 'Todo' && <Todo/>}{status === 'In progress' && <InProgress/>}{status === 'Backlog' && <Backlog/>}{title}</h5>
      <p>Priority: {priority === 3 && <High/>}{priority === 1 && <Low/>}{priority === 2 && <Medium/>}{priority === 4 && <Urgent/>}</p>
      <p>Assigned User: {userId}</p>
    </div>
  );
};

export default TicketCard;
