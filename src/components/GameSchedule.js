import { useSelector } from "react-redux"
import { useGetGameScheduleQuery } from "../services/teamInfoApis";
import { styled } from "styled-components";

// 팀 경기 일정(리그 전 경기(2023-2024), 날짜, home vs away)
// 이후 추가하면 좋은 내용 => 팀 경기 클릭하면 상세보기 페이지 만들기


const GameScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  grid-column-start: 1;
  grid-column-end: 3;
  width: 80%;
  margin: 20px 0px; 
  border-radius: 10px;
  padding: 5px;
`
const GameSchedules = styled.div`
  position: relative;

  &::after{
    content: "";
    position: absolute;
    width: 4px;
    background-color: black;
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -2px;
  }
`

const Timeline = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;

  &::after{
    content: '';
    position: absolute;
    width: 25px;
  }
`

const GameScheduleItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 330px;
  margin: 5px 20px;
  padding: 10px;
  border: solid 1px #F1F1F4;
  border-radius: 10px;
  background-color: #F1F1F4;
  position: relative;

  &::after{
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    right: ${ props => (props.isleft === "true" ? "-10%" : "unset")};
    left: ${props => (props.isleft === "true" ? "unset" : "-9.8%")};
    background-color: ${props => (props.isleft === "true" ? "#F44335" : "#414141")};
    border: 4px solid white;
    top: 35%;
    border-radius: 50%;
    z-index: 1;
  }
`

const DateText = styled.div`
  display: flex;
  justify-content: ${props => (props.isleft === "true" ? "flex-end" : "flex-start")};
  align-items: center;
  margin: 0 30px;
`

const HomeTeam = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px 7px;
  max-width: 180px;
  width: 100%;
`

const AwayTeam = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px 7px;
  max-width: 180px;
  width: 100%;
`

const TeamName = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`

const TeamLogoImage = styled.img`
  width: 50px;
  height: 50px;
`

export default function GameSchedule() {
  const selectedLeagueId = useSelector((state) => state.soccerInfo.leagueId);
  const selectedTeamId = useSelector((state) => state.soccerInfo.teamId);

  const { data, isLoading } = useGetGameScheduleQuery({
    leagueId: `${selectedLeagueId}`,
    teamId: `${selectedTeamId}`,
  });
  
  if (isLoading) {
    // 데이터 로딩 중일 때 처리 (로딩 스피너 등)
    return <div>Loading...</div>;
  }

  if (data && data.response && data.response.length > 0) {
    return (
      <GameScheduleContainer>
        <h2>2023-2024 Game Schedule</h2>
        <GameSchedules> 
          {data.response.map((game, idx) => {
            if (idx % 2 === 0) {
              return (
                <Timeline key={idx}>
                  <DateText isleft="true">
                    {(game.fixture.date).slice(0, 10)}
                  </DateText>
                  <div>
                    <GameScheduleItem
                      key={idx}
                      isleft="false"
                    >
                      <HomeTeam>
                        <TeamLogoImage alt={game.teams.home.name} src={game.teams.home.logo} />
                        <TeamName>{game.teams.home.name}</TeamName>
                      </HomeTeam>
                      <AwayTeam>
                        <TeamLogoImage alt={game.teams.away.name} src={game.teams.away.logo} />
                        <TeamName>{game.teams.away.name}</TeamName>
                      </AwayTeam>
                    </GameScheduleItem>
                  </div>
                </Timeline>
              );
            } else {
              return (
                <Timeline key={idx}>
                  <div>
                    <GameScheduleItem
                      key={idx}
                      isleft="true"
                    >
                      <HomeTeam>
                        <TeamLogoImage alt={game.teams.home.name} src={game.teams.home.logo} />
                        <TeamName>{game.teams.home.name}</TeamName>
                      </HomeTeam>
                      <AwayTeam>
                        <TeamLogoImage alt={game.teams.away.name} src={game.teams.away.logo} />
                        <TeamName>{game.teams.away.name}</TeamName>
                      </AwayTeam>
                    </GameScheduleItem>
                  </div>
                  <DateText isleft="false">
                    {(game.fixture.date).slice(0, 10)}
                  </DateText>
                </Timeline>
              )
            }
          })}
        </GameSchedules>
      </GameScheduleContainer>
    )
  }
}