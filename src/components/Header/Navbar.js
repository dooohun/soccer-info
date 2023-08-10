import { styled } from "styled-components"
import { Link } from "react-router-dom"
import { toggleDarkMode } from "../../stores/darkModeSlice";
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from "react-redux";
import { getTeamInfo } from "../../stores/soccerSlice";

const MainHeader = styled.header`
  display: grid;
  grid-template-columns: 3fr 17fr;
  position: sticky;
  text-align: center;
  background-color: ${props => props.theme.backgroundColor};
  height: 72px;
`

const NavHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`

const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 2px);
  background-color: ${props => props.theme.backgroundColor2};
  border-bottom: 2px solid ${props => props.theme.borderColor};
`

const MainLogo = styled(Link)`
  font-size: 35px;
  font-family: "Poppins-Bold";
  text-decoration: none;
  color:  #1976D2;
  margin-left: 5px;
`

const MainTitle = styled.h2`
  display: flex;
  align-items: center;
  margin: 0 0 0 30px;
  height: 100%;
  font-family: "Poppins-Bold";
  font-size: 30px;
`

const ToggleSwitch = styled(Switch)`
  margin-right: 25px;
`

export default function Navbar() {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.darkMode);

  const mainLogoHandler = () => {
    dispatch(getTeamInfo({ teamId: 50, selectedTeam: null }));
  }

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  }

  return (
      <MainHeader>
        <LogoBox>
          <MainLogo to={process.env.PUBLIC_URL + "/"} onClick={mainLogoHandler}>ProFive</MainLogo>
        </LogoBox>
        <NavHeader>
          <MainTitle>Welcome To ProFive</MainTitle>
          <ToggleSwitch
            aria-label="Switch demo"
            checked={darkMode}
            onClick={handleDarkModeToggle}
          />
        </NavHeader>
      </MainHeader>
  )
}