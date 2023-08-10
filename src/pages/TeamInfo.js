import GlobalStyle from "../styles/GlobalStyle"
import Navbar from "../components/Header/Navbar";
import Teams from "../components/Sidebar/Teams";
import Leagues from "../components/Sidebar/Leagues";
import TeamDescription from "../components/TeamInfo/TeamDescription";
import GameSchedule from "../components/TeamInfo/GameSchedule";
import TeamPlayers from "../components/TeamInfo/TeamPlayers";
import PlayerModal from "../components/Modal/PlayerModal"

import { styled } from "styled-components";

const TeamInfoPageContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 17fr;
  background-color: ${props => props.theme.backgroundColor};
`

const Sidebar = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
`

const TeamInfoContentContainer = styled.div`
  display: grid;
  grid-template-columns: 5fr 3fr;
  justify-items: center;
  margin: 0;
  height: calc(100vh - 72px);
  overflow-y: scroll;

  &::-webkit-scrollbar{
    display: none;
  }
`


export default function TeamInfo() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <TeamInfoPageContainer>
        <Sidebar>
          <Leagues />
          <Teams />
        </Sidebar>
        <TeamInfoContentContainer>
          <TeamDescription />
          <TeamPlayers /> 
          <GameSchedule />
        </TeamInfoContentContainer>
      </TeamInfoPageContainer>
      <PlayerModal />
    </>
  )
}