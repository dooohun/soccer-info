import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { useGetPlayerStandingsQuery } from "../../services/mainPageApis"

const PlayerStandingsContainer = styled.div`
  grid-row-start: 3;
  grid-column-start: 2;
  background-color: ${props => props.theme.backgroundColor2};
  width: 80%;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px 10px;
`

const MainTitle = styled.h2`
  margin-bottom: 10px;
  margin-top: 0;
  text-align: center;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${props => props.theme.backgroundColor2};
`

const TableHead = styled.thead`
  background-color: ${props => props.theme.headerBackground};
  font-weight: bold;
`

const TableHeadCell = styled.th`
  padding: 12px 8px;
  text-align: center;
`

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${props => props.theme.evenRowBackground};
  }
`

const TableData = styled.td`
  padding: 8px;
  text-align: center;
`

const TablePlayerData = styled.td`
  padding: 8px;
  text-align: start;
`

const PlayerImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`


export default function PlayerStandings() {
  const selectedLeagueId = useSelector((state) => state.soccerInfo.leagueId);
  const selectedSeason = useSelector((state) => state.soccerInfo.season);

  const { data, error, isLoading } = useGetPlayerStandingsQuery({
    leagueId: `${selectedLeagueId}`,
    year: `${selectedSeason}`,
  });

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
    <PlayerStandingsContainer>
      <MainTitle>Player Ranking</MainTitle>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Rank</TableHeadCell>
            <TableHeadCell>Player</TableHeadCell>
            <TableHeadCell>Goals</TableHeadCell>
          </TableRow>
        </TableHead>
        <tbody>
          {data.response.slice(0, 10).map((arr, idx) => {
            return (
              <TableRow key={idx}>
                <TableData>{idx + 1}</TableData>
                <TablePlayerData>
                  <PlayerImage alt={arr.player.name} src={arr.player.photo} />
                  {arr.player.name}
                </TablePlayerData>
                <TableData>{arr.statistics[0].goals.total}</TableData>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </PlayerStandingsContainer>
  );
}