import { useEffect, useState } from "react"
import { useGetRecentMatchesQuery } from "../../services/mainPageApis";
import { useDispatch, useSelector } from "react-redux";
import { getFixtureId } from "../../stores/soccerSlice"
import { styled } from "styled-components";

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const RecentMatchesContainer = styled.div`
  width: 90%;
  background-color: ${props => props.theme.backgroundColor2};
  margin-top: 10px;
  border-radius: 10px;
  padding: 10px;
`
const MainTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
`

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 98%;
`

const MainMatches = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  text-align: start;
  width: 100%;
  margin: 5px 15px;
  padding: 10px;
  border: solid 3px #EEEAF0;
  border-radius: 10px;
  max-height: 135px;
  height: 135px;
  cursor: pointer;
`
const MainMatch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const HomeTeam = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px 7px;
  width: 100%;
`

const AwayTeam = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px 7px;
  width: 100%;
`

const TeamName = styled.div`
  text-align: center;
`

const TeamLogoImage = styled.img`
  width: 50px;
  height: 50px;
`

export default function RecentMatches() {
  const selectedLeagueId = useSelector((state) => state.soccerInfo.leagueId);

  const [matches, setMatches] = useState([]);
  const { data, isLoading, error } = useGetRecentMatchesQuery(selectedLeagueId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setMatches(data.response);
    }
  }, [data, matches])

  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(0);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(matches.length / itemsPerPage) - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  function getSelectedFixtureId(e) {
    const selectedFixtureId = e.currentTarget.id;
    dispatch(getFixtureId({ fixtureId: selectedFixtureId }));
  }

  if (isLoading) {
    return <div></div>;
  }

  if (error) {
    // 에러 발생 시 처리
    return <div>Error occurred</div>;
  }

  if (!data) {
    // 데이터가 없는 경우 처리
    return <div>No data available</div>;
  }
  return (
    <RecentMatchesContainer>
      <MainTitle>Next Matches</MainTitle>
        <ButtonBox>
          <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disable evlevation buttons"
        >
          <Button onClick={handlePrevPage}>Prev</Button>
          <Button onClick={handleNextPage}>Next</Button>
        </ButtonGroup>
      </ButtonBox>
      <MainMatches>
        {matches.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage).map((arr, idx) => {
          return (
            <MainSection onClick={getSelectedFixtureId} key={idx} id={arr.fixture.id}>
              {(arr.fixture.date).slice(0, 10)}
              <MainMatch>
                <HomeTeam>
                  <TeamLogoImage alt={arr.teams.home.name} src={arr.teams.home.logo} />
                  <TeamName>{arr.teams.home.name}</TeamName>
                </HomeTeam>
                <AwayTeam>              
                  <TeamLogoImage alt={arr.teams.away.name} src={arr.teams.away.logo} />
                  <TeamName>{arr.teams.away.name}</TeamName>
                </AwayTeam>
              </MainMatch>
            </MainSection>
          )
        })}
      </MainMatches>
    </RecentMatchesContainer>
  )
}