class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: "",
      users: []
    };
  }

  onChangeHandle(event) {
    this.setState({ searchText: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { searchText } = this.state;
    const url = `https://api.github.com/search/users?q=${searchText}`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => this.setState({ users: responseJson.items }));
  }

  render() {
    return (
      <div>
        <form id="form" onSubmit={event => this.onSubmit(event)}>
          <label id="label" htmlFor="searchText">
            GitHub User Finder
          </label>
          <input
            type="text"
            id="searchText"
            placeholder="Search by user name"
            onChange={event => this.onChangeHandle(event)}
            value={this.state.searchText}
          />
        </form>
        <UsersList users={this.state.users} />
      </div>
    );
  }
}

class UsersList extends React.Component {
  get users() {
    return this.props.users.map(user => <User key={user.id} user={user} />);
  }

  render() {
    return <div className="user-list">{this.users}</div>;
  }
}

class User extends React.Component {
  render() {
    return (
      <div className="user">
        <img
          className="user-image"
          src={this.props.user.avatar_url}
          alt={this.props.user.login}
          style={{ width: "130px" }}
        />
        <a
          className="user-name"
          href={this.props.user.html_url}
          target="_blank"
        >
          {this.props.user.login}
        </a>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
