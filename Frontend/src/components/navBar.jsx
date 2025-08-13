import React from 'react';
import {NavLink} from 'react-router';


const NavBar = () => {
    return(
        <>
            <Nav>
                <Bars />

                <NavMenu>
                    <NavLink to="/" >
                        Pantrypal
                    </NavLink>
                    <NavLink to="/aboutUs" activeStyle>
                        Events
                    </NavLink>
                    <NavLink to="/developers" activeStyle>
                        Annual Report
                    </NavLink>
                    <NavLink to="/dashboard" activeStyle>
                        Teams
                    </NavLink>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/login">
                        Login
                    </NavBtnLink>
                </NavBtn>
                <NavBtn>
                    <NavBtnLink to="/signup">
                        Signup
                    </NavBtnLink>
                </NavBtn>
            </Nav>

        </>
    )
}
export default NavBar;