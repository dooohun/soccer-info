import Teams from "../components/Teams";
import TeamDescription from "../components/TeamDescription";
import Leagues from "../components/Leagues";
import GameSchedule from "../components/GameSchedule";
import TeamPlayers from "../components/TeamPlayers";
import Navbar from "../components/Navbar";


import { useSelector } from "react-redux";
import { styled, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    font-family: "Poppins-Regular";
  }
`

const TeamInfoPageContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 17fr;
  background-color: #F0F1F4;
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
  height: calc(100vh - 103px);
  overflow-y: scroll;

  &::-webkit-scrollbar{
    display: none;
  }
`


export default function TeamInfo() {
  const selectedLeagueId = useSelector((state) => state.soccerInfo.leagueId);
  const selectedTeamId = useSelector((state) => state.soccerInfo.teamId);

  return (
    <>
      <GlobalStyle />
      <Navbar />
      <TeamInfoPageContainer>
        <Sidebar>
          <Leagues />
          {selectedLeagueId !== 0 ? <Teams /> : <div></div> }
        </Sidebar>
        <div>
          <TeamInfoContentContainer>
            {selectedLeagueId !== 0 ? <TeamDescription /> : <div></div>}
            {selectedLeagueId !== 0 ? <TeamPlayers /> : <div></div>}
            {selectedLeagueId !== 0  && selectedTeamId !== 0 ? <GameSchedule /> : <div></div> }
          </TeamInfoContentContainer>
        </div>
      </TeamInfoPageContainer>
    </>
  )
}