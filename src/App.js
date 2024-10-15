import React, { useState, useEffect } from "react";
import "./App.css";
import { ReactComponent as DisplayIcon } from "./assets/Display.svg";
import { ReactComponent as InProgress } from './assets/in-progress.svg';
import { ReactComponent as Todo } from './assets/To-do.svg';
import { ReactComponent as Backlog } from './assets/Backlog.svg';
import { ReactComponent as Low } from './assets/Img - Low Priority.svg';
import { ReactComponent as Medium } from './assets/Img - Medium Priority.svg';
import { ReactComponent as High } from './assets/Img - High Priority.svg';
import { ReactComponent as Urgent } from './assets/SVG - Urgent Priority colour.svg';
import TicketCard from "./components/TicketCard";

function App() {
  const [tickets, setTickets] = useState([]);
//   const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState("status"); // Default grouping by 'status'
  const [ordering, setOrdering] = useState("priority"); // Default sorting by 'priority'
  const [displayOptionsVisible, setDisplayOptionsVisible] = useState(false);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data: ", data);
        setTickets(data.tickets);
        // setUsers(data.users);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleDisplayClick = () => {
    setDisplayOptionsVisible(!displayOptionsVisible);
  };

  const groupByField = (tickets, field) => {
    return tickets.reduce((groups, ticket) => {
      const key = ticket[field];
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(ticket);
      return groups;
    }, {});
  };

  const renderGroupedTickets = () => {
    const groupedTickets = groupByField(tickets, grouping);

    return Object.keys(groupedTickets).map((key) => {
      // Sort the tickets in each group based on the selected ordering
      const sortedTickets = [...groupedTickets[key]].sort((a, b) => {
        if (ordering === "priority") {
          // Sort based on numeric priority values
          return b.priority - a.priority; // Descending order
        } else if (ordering === "title") {
          // Sort titles alphabetically
          return a.title.localeCompare(b.title);
        }
        return 0;
      });

      return (
        <div key={key} className="kanban-column">
          <h3>{key === 'Todo' && <Todo/>}{key === 'In progress' && <InProgress/>}{key === 'Backlog' && <Backlog/>}{key === '3' && <High/>}{key === '1' && <Low/>}{key === '2' && <Medium/>}{key === '4' && <Urgent/>}{key}</h3>
          {sortedTickets.map((ticket) => {
            return <TicketCard key={ticket.id} ticket={ticket} />;
            // <div key={ticket.id} className="kanban-card">
            //   <div className="card-title">
            // 	<span>{ticket.id}</span> - {ticket.title}
            //   </div>
            //   <div className="card-description">{ticket.description}</div>
            //   <div className="card-meta">
            // 	<span className="priority-level">{ticket.priority}</span>
            // 	<span className="assigned-user">{ticket.assigned_to}</span>
            //   </div>
            // </div>
          })}
        </div>
      );
    });
  };

  return (
    <div className="App">
      <div className="header">
        <button className="display-button" onClick={handleDisplayClick}>
          <DisplayIcon />
          Display
        </button>
        {displayOptionsVisible && (
          <div className="display-options">
            <label>Grouping</label>
            <select
              value={grouping}
              onChange={(e) => setGrouping(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="assigned_to">User</option>
              <option value="priority">Priority</option>
            </select>

            <label>Ordering</label>
            <select
              value={ordering}
              onChange={(e) => setOrdering(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        )}
      </div>
      <div className="kanban-board">{renderGroupedTickets()}</div>
    </div>
  );
}

export default App;
