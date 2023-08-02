import { styled } from "styled-components"
import { Link } from "react-router-dom"

const MainHeader = styled.header`
  height: 72px;
  background-color: #F2F2F2;
  padding: 0 24px 0 0;
  text-align: center;
  position: sticky;
  display: flex;
  align-items: center;
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
  width: 15.25%;
  height: calc(100% - 1px);
  background-color: #FFFFFF;
  border-bottom: 1px solid #ebedf3;
`

const MainLogo = styled(Link)`
  font-size: 35px;
  font-family: "Poppins-Bold";
  text-decoration: none;
  color:  #1976D2;
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
        <MainLogo to="/">ProFive</MainLogo>
      </LogoBox>
      <NavHeader>
        <MainTitle>Welcome To ProFive</MainTitle>
      </NavHeader>
    </MainHeader>
  )
}