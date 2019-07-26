import React, { Component } from "react";
import logs from "../assets/files/logs";
import users from "../assets/files/users.json";
import { mapLogsToUserId } from "../utils/logUtils";
import { UserCard } from "./UserCard";

//Define constants for our sort methods
const NAME_ASC = "name-asc",
  NAME_DESC = "name-desc",
  IMPRESSIONS_ASC = "impressions-asc",
  IMPRESSIONS_DESC = "impressions-desc",
  CONVERSIONS_ASC = "conversions-asc",
  CONVERSIONS_DESC = "conversions-desc",
  REVENUE_ASC = "revenue-asc",
  REVENUE_DESC = "revenue-desc";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = { users, mappedLogs: null, loaded: false };
    this.handleSortUsers = this.handleSortUsers.bind(this);
  }

  componentDidMount() {
    //Map our log events to their user ID's
    let mappedLogs = mapLogsToUserId(logs);
    
    //Sort our users initially by their name ascending
    users.sort((a, b) => (a.name > b.name ? 1 : -1));

    this.setState((state, props) => ({
      mappedLogs,
      users,
      loaded: true,
    }));
  }

  //Sort users by select menu value
  handleSortUsers(event) {
    let { users, mappedLogs } = this.state;
    const sortBy = event.target.value;
    switch (sortBy) {
      case NAME_ASC:
        users.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      case NAME_DESC:
        users.sort((a, b) => (a.name < b.name ? 1 : -1));
        break;
      case IMPRESSIONS_ASC:
        users.sort(
          (a, b) => mappedLogs[a.id].impressions - mappedLogs[b.id].impressions
        );
        break;
      case IMPRESSIONS_DESC:
        users.sort(
          (a, b) => mappedLogs[b.id].impressions - mappedLogs[a.id].impressions
        );
        break;
      case CONVERSIONS_ASC:
        users.sort(
          (a, b) => mappedLogs[a.id].conversions - mappedLogs[b.id].conversions
        );
        break;
      case CONVERSIONS_DESC:
        users.sort(
          (a, b) => mappedLogs[b.id].conversions - mappedLogs[a.id].conversions
        );
        break;
      case REVENUE_ASC:
        users.sort(
          (a, b) => mappedLogs[a.id].revenue - mappedLogs[b.id].revenue
        );
        break;
      case REVENUE_DESC:
        users.sort(
          (a, b) => mappedLogs[b.id].revenue - mappedLogs[a.id].revenue
        );
        break;
      default:
        users.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
    }
    this.setState((state, props) => ({
      users
    }));
  }
  render() {
    const { users, loaded, mappedLogs } = this.state;

    return (
      <div className="users">
        <div className="users__sort-strip">
          <p className="users__sort-text">Sort by:</p>
          <select className="users__sort" onChange={this.handleSortUsers}>
            <option value={NAME_ASC}>Name (asc)</option>
            <option value={NAME_DESC}>Name (desc)</option>
            <option value={IMPRESSIONS_ASC}>Impressions (asc)</option>
            <option value={IMPRESSIONS_DESC}>Impressions (desc)</option>
            <option value={CONVERSIONS_ASC}>Conversions (asc)</option>
            <option value={CONVERSIONS_DESC}>Conversions (desc)</option>
            <option value={REVENUE_ASC}>Revenue (asc)</option>
            <option value={REVENUE_DESC}>Revenue (desc)</option>
          </select>
        </div>
        <div className="users__lists">
          {loaded &&
            users.map(user => {
              const userLogs = mappedLogs[user.id];
              return <UserCard key={user.id} user={user} logs={userLogs} />;
            })}
        </div>
      </div>
    );
  }
}

export default UserList;
