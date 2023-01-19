import { NavBar } from '../styles/NavStyles';
import Logo from './NavBar/Logo';
import StateControl from './NavBar/StateControl';

const Nav = () => {

  return (
    <div className="d-flex justify-content-between" style={NavBar}>
      <Logo/>
      <StateControl/>
    </div>)
}

export default Nav;