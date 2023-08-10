import { useDispatch, useSelector } from "react-redux";
import { getLeagueId } from "../../stores/soccerSlice";
import styled from "styled-components";

import league1 from "../../static/image/premierleague.png"
import league2 from "../../static/image/bundesliga.png"
import league3 from "../../static/image/laliga.png"
import league4 from "../../static/image/ligue1.png"
import league5 from "../../static/image/seriea.png"

import darkLeague1 from "../../static/image/premierleague-darklogo.png"
import darkLeague2 from "../../static/image/bundesliga-darklogo.png"
import darkLeague3 from "../../static/image/laliga-darklogo.png"
import darkLeague4 from "../../static/image/ligue1-darklogo.png"
import darkLeague5 from "../../static/image/seriea-darklogo.jpg"


const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: sticky;
  height: calc(100vh - 72px);
  background-color: ${props => props.theme.backgroundColor2};
  border-right: 2px solid ${props => props.theme.borderColor};
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
  object-fit: scale-down;
  margin: 15px 0px;
  cursor: pointer;
`


// 선택한 리그(전역관리) 값 => TeamStandings, PlayerStandings로 가야 함
export default function Leagues() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);

  function onClick(selectedLeague) {
    dispatch(getLeagueId({ league: selectedLeague }));
  }

  return (
    <LogoContainer>
      <LogoImageSection>
        <LeagueLogoImage src={darkMode ? darkLeague1 : league1} alt="PremierLeague" onClick={() => onClick("PremierLeague")} />
        <LeagueLogoImage src={darkMode ? darkLeague2 : league2} alt="Bundesliga" onClick={() => onClick("Bundesliga")} />
        <LeagueLogoImage src={darkMode ? darkLeague3 : league3} alt="LaLiga" onClick={() => onClick("LaLiga")} />
        <LeagueLogoImage src={darkMode ? darkLeague4 : league4} alt="Ligue1" onClick={() => onClick("Ligue1")} />
        <LeagueLogoImage src={darkMode ? darkLeague5 : league5} alt="SerieA" onClick={() => onClick("SerieA")} />
      </LogoImageSection>
    </LogoContainer>
  )
}