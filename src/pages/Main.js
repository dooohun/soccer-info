import Navbar from "../components/Header/Navbar"
import Leagues from "../components/Sidebar/Leagues"
import Teams from "../components/Sidebar/Teams";
import TeamStandings from "../components/MainPage/TeamStandings"
import PlayerStandings from "../components/MainPage/PlayerStandings";
import RecentMatches from "../components/MainPage/RecentMatches";
import Prediction from "../components/MainPage/Prediction";

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
  height: calc(100vh - 72px);
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
        <MainContentContainer>
          <RecentMatches /> 
          <Prediction />
          <TeamStandings />
          <PlayerStandings />
        </MainContentContainer>
      </MainPageContainer>
    </>
  )
}