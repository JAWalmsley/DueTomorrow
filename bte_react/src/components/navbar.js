import React from 'react';
import '../css/materialize.css';
import M from 'materialize-css';
import $ from 'jquery';

export class Navbar extends React.Component {
    componentDidMount() {
        M.Sidenav.init($('.sidenav'));
    }

    render() {
        const username = this.props.username;
        return (
            <nav>
                <div className="nav-wrapper">
                    <div className="container"><a className="sidenav-trigger" href="#" data-target="mobile-nav"><i
                        className="material-icons">menu</i></a><a className="brand-logo">BetterThanExcel</a>
                        <ul className="right hide-on-med-and-down">
                            <li><a >Home</a></li>
                            <li><a>GPA</a></li>
                            <li><a>Courses</a></li>
                            <li><a className="dropdown-trigger" data-target="dropdown">{username}</a>
                                <ul className="dropdown-content" id="dropdown" tabIndex="0">
                                    <li tabIndex="0"><a>Log Out</a></li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="sidenav" id="mobile-nav">
                            <li><a>Home</a></li>
                            <li><a>GPA</a></li>
                            <li><a>Courses</a></li>
                            <li><a>Log Out</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}