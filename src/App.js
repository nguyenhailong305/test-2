import React from "react";
import './style.css';
import {
  SendOutlined,
  EditOutlined,
  ShoppingOutlined,
  AreaChartOutlined,
  FolderOpenOutlined,
  PhoneOutlined,
  AppstoreOutlined,
  AuditOutlined,
  UserOutlined,
  WhatsAppOutlined,
  PictureOutlined,
  HomeOutlined,
  BellOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  BookOutlined,
  SearchOutlined,
  ScheduleOutlined,
  RiseOutlined,
  CustomerServiceOutlined
} from '@ant-design/icons';
const sessionInfo = require('./sessionInfo.json')
const MENU = require('./menu.json');

const iconMap = {
  "icon-note": <UnorderedListOutlined />,
  "icon-list": <FolderOpenOutlined />,
  "fa fa-book": <BookOutlined />,
  "fa fa-search": <SearchOutlined />,
  "fa fa-list": <ScheduleOutlined />,
  "fa fa-dropbox": <RiseOutlined />,
  "fa fa-bell": <BellOutlined />,
  "fa fa-tablet": <CustomerServiceOutlined />,
  "fa fa-play-circle-o": <AppstoreOutlined />,
  "fa fa-picture-o": <PictureOutlined />,
  "fa fa-building-o": <AuditOutlined />,
  "icon-home": <HomeOutlined />,
  "icon-user": <UserOutlined />,
  "fa fa-bar-chart-o": <AreaChartOutlined />,
  "fa fa-wrench": <SettingOutlined />,
  "fa fa-phone": <WhatsAppOutlined />,
  "H? tr? khách hàng": <PhoneOutlined />,
  "Chuong trình khuy?n m?i": <ShoppingOutlined />,
  "Qu?n tr? n?i dung": <EditOutlined />,
  "Báo cáo": <SendOutlined />,
  "Qu?n tr? h? th?ng": <SettingOutlined />
};

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
      showMenu: false
    };
  }

  handleClick(link) {
    window.location.href = '/#' + link;
    window.location.reload();
  }

  toggleDiv = () => {
    this.setState((prevState) => ({
      showDiv: !prevState.showDiv
    }));
  };

  showMenu = () => {
    this.setState((prevState) => ({
      showMenu: !prevState.showMenu
    }));
  };

  renderMenuItems = (menuItems) => {
    
    let roles = sessionInfo.permissionLink.split(',');

    const filteredItems = menuItems.map((item, index) => {
      if (Array.isArray(item)) {
        const [label, ...subItems] = item;
        const filteredSubItems = this.renderMenuItems(subItems);
        if (filteredSubItems.length > 0) {
          const icon = iconMap[label];
          return (
            <li className="dropdown" key={index}>
              <a className="dropdown-toggle" href="/#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {icon}
                {label}
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {filteredSubItems}
              </ul>
            </li>
          );
        }
        return null;
      } else {
        const { title, icon, link, subItems } = item;
        const menuIcon = iconMap[icon];
        if (subItems) {
          const filteredSubItems = this.renderMenuItems(subItems);
          if (filteredSubItems.length > 0) {
            return (
              <li className="dropdown" key={link}>
                <a className="dropdown-toggle" href="/#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {menuIcon}
                  {title}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {filteredSubItems}
                </ul>
              </li>
            );
          }
          return null;
        } else {
          if (roles.includes(link)) {
            return (
              <li key={link}>
                <a href="/#" onClick={() => this.handleClick(link)}>
                  {menuIcon}
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
      <div id="topbar-wrapper">
        <div id="sidebar-tonggle">
          <div id="icon-hiden">
            <UnorderedListOutlined onClick={this.showMenu} />
            {this.state.showMenu && (
              <div className="dropdown-menu-wrapper">
                <ul className="dropdown-menu">
                  {this.renderMenuItems(MENU)}
                </ul>
              </div>
            )}
          </div>

          <div id="sidebar-menu-tonggle">
            <ul className="menu">
              {this.renderMenuItems(MENU)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;