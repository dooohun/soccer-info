import { useDispatch } from "react-redux";
import { getLeagueId } from "../stores/soccerSlice";
import styled from "styled-components";
import league1 from "../static/image/premierleague.png"
import league2 from "../static/image/bundesliga.png"
import league3 from "../static/image/laliga.png"
import league4 from "../static/image/ligue1.png"
import league5 from "../static/image/seriea.png"

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: sticky;
  height: calc(100vh - 72px);
  background-color: #FFFFFF;
  border-right: 2px solid #ebedf3;
  overflow-y: hidden;
  width: calc(100% - 2px);
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
        <LeagueLogoImage src={league1} alt="PremierLeague" onClick={() => onClick("PremierLeague")} />
        <LeagueLogoImage src={league2} alt="Bundesliga" onClick={() => onClick("Bundesliga")} />
        <LeagueLogoImage src={league3} alt="LaLiga" onClick={() => onClick("LaLiga")} />
        <LeagueLogoImage src={league4} alt="Ligue1" onClick={() => onClick("Ligue1")} />
        <LeagueLogoImage src={league5} alt="SerieA" onClick={() => onClick("SerieA")} />
      </LogoImageSection>
    </LogoContainer>
  )
}