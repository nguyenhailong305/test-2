import React from "react";
import "./style.css";

const sessionInfo = require("./sessionInfo.json");
const MENU = require("./menu.json");

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    let sessionInfo = null;
    if (localStorage && localStorage.hasOwnProperty("sessionInfo")) {
      let value = localStorage.getItem("sessionInfo");
      if (value) sessionInfo = JSON.parse(value);
    }
    this.state = {
      data: null,
      sessionInfo: sessionInfo,
      error: null,
      showDiv: false,
      showMenu: false,
    };
  }

  handleClick(link) {
    window.location.href = "/#" + link;
    window.location.reload();
  }

  toggleDiv = () => {
    this.setState((prevState) => ({
      showDiv: !prevState.showDiv,
    }));
  };

  showMenu = () => {
    this.setState((prevState) => ({
      showMenu: !prevState.showMenu,
    }));
  };

  renderMenuItems = (menuItems ) => {
    let roles = sessionInfo.permissionLink.split(",");

    const filteredItems = menuItems.map((item, index) => {
      if (Array.isArray(item)) {
        const [label, ...subItems] = item;
        const filteredSubItems = this.renderMenuItems(subItems);
        if (filteredSubItems.length > 0) {
          return (
            <li className="nav-item dropdown" key={index}>
              <a
                className="nav-link dropdown-toggle"
                id={`dropdown${index}`}
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {label}
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby={`dropdown${index}`}
              >
                {filteredSubItems}
              </ul>
            </li>
          );
        }
        return null;
      } else {
        const { title, link, subItems } = item;
        if (subItems) {
          const filteredSubItems = this.renderMenuItems(subItems );
          if (filteredSubItems.length > 0) {
            return (
              <li className="nav-item dropdown" key={link}>
                <a
                  className="nav-link dropdown-toggle"
                  id={`dropdown${link}`}
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {title}
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby={`dropdown${link}`}
                >
                  {filteredSubItems}
                </ul>
              </li>
            );
          }
          return null;
        } else {
          if (roles.includes(link)) {
            return (
              <li className="nav-item" key={link}>
                <a
                  className="nav-link"
                  href="/#"
                  onClick={() => this.handleClick(link)}
                >
                  {title}
                </a>
              </li>
            );
          }
          return null;
        }
      }
    });

    return filteredItems.filter((item) => item !== null);
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">{this.renderMenuItems(MENU)}</ul>
        </div>
      </nav>
    );
  }
}

export default SideBar;
