import { styled } from "styled-components"
import { Link } from "react-router-dom"

const MainHeader = styled.header`
  display: grid;
  grid-template-columns: 3fr 17fr;
  position: sticky;
  text-align: center;
  background-color: #F2F2F2;
  height: 72px;
`

const NavHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: calc(100% - 230px);
`

const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 2px);
  background-color: #FFFFFF;
  border-bottom: 2px solid #ebedf3;
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

export default function Navbar() {
  return (
    <MainHeader>
      <LogoBox>
        <MainLogo to={process.env.PUBLIC_URL + "/"}>ProFive</MainLogo>
      </LogoBox>
      <NavHeader>
        <MainTitle>Welcome To ProFive</MainTitle>
      </NavHeader>
    </MainHeader>
  )
}