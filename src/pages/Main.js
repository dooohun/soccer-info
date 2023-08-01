import Leagues from "../components/Leagues"
import TeamStandings from "../components/TeamStandings"
import PlayerStandings from "../components/PlayerStandings";
import RecentMatches from "../components/RecentMatches";
import Prediction from "../components/Prediction";
import Teams from "../components/Teams";
import Navbar from "../components/Navbar"

import { styled, createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    font-family: "Poppins-Regular";
  }
`
const MainPageContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 17fr;
  background-color: #F2F2F2;
`

const Sidebar = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
`
const MainContentContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: repeat(7, 280px);
  align-items: start;
  justify-items: center;
  height: calc(100vh - 103px);
  overflow-y: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
`

export default function Main() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <MainPageContainer>
        <Sidebar>
          <Leagues />
          <Teams />
        </Sidebar>
        <div>
          <MainContentContainer>
            <RecentMatches /> 
            <Prediction />
            <TeamStandings />
            <PlayerStandings />
          </MainContentContainer>
        </div>
      </MainPageContainer>
    </>
  )
}