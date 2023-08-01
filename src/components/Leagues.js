import { useDispatch } from "react-redux";
import { getLeagueId } from "../stores/soccerSlice";
import styled from "styled-components";

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: sticky;
  height: calc(100vh - 72px);
  background-color: #FFFFFF;
  border-right: 1px solid #ebedf3;
  overflow-y: hidden;
  max-width: 91px;
  width: 100%;
`

const LogoImageSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const LeagueLogoImage = styled.img`
  width: 70px;
  height: 70px;
  margin: 15px 0px;
  cursor: pointer;
`


// 선택한 리그(전역관리) 값 => TeamStandings, PlayerStandings로 가야 함
export default function Leagues() {
  const dispatch = useDispatch();

  function onClick(selectedLeague) {
    dispatch(getLeagueId({ league: selectedLeague }));
  }

  return (
    <LogoContainer>
      <LogoImageSection>
        <LeagueLogoImage src="/images/premierleague-logo.png" alt="PremierLeague" onClick={() => onClick("PremierLeague")} />
        <LeagueLogoImage src="/images/bundesliga-logo.png" alt="Bundesliga" onClick={() => onClick("Bundesliga")} />
        <LeagueLogoImage src="/images/laliga-logo.png" alt="LaLiga" onClick={() => onClick("LaLiga")} />
        <LeagueLogoImage src="/images/ligue1-logo.png" alt="Ligue1" onClick={() => onClick("Ligue1")} />
        <LeagueLogoImage src="/images/seriea-logo.png" alt="SerieA" onClick={() => onClick("SerieA")} />
      </LogoImageSection>
    </LogoContainer>
  )
}