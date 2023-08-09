import { styled } from "styled-components";
import { useGetTeamStandingsQuery } from "../../services/mainPageApis";
import { useSelector } from "react-redux";
import FormShape, { FormState } from "../../styles/FromShape";
import Season from "./Seasons";

const LeagueStandingsContainer = styled.div`
  background-color: #FFFFFF;
  width: 90%;
  border-radius: 10px;
  margin: 20px 0px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px 10px;
`
const MainTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0 0 0;
`

const SeasonBox = styled.div`
  width: 200px;
  margin: 0 0 10px 0;
  float: right;
`

const TeamLogoImage = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 8px;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const TableHead = styled.thead`
  background-color: #f0f0f0;
  font-weight: bold;
`

const TableHeadCell = styled.th`
  padding: 12px 8px;
  text-align: center;
`

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`

const TableCell = styled.td`
  padding: 12px 8px;
  text-align: center;
`;

const TableTeamCell = styled.td`
  padding: 12px 8px;
  text-align: start;
`;

export default function TeamStandings() {
  const selectedLeagueId = useSelector((state) => state.soccerInfo.leagueId);
  const selectedSeason = useSelector((state) => state.soccerInfo.season);
  const { data, error, isLoading } = useGetTeamStandingsQuery({
    leagueId: `${selectedLeagueId}`,
    year: `${selectedSeason}`
  });
  if (isLoading) {
    // 데이터 로딩 중일 때 처리 (로딩 스피너 등)
    return <div>Loading...</div>;
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
     <LeagueStandingsContainer>
       <MainTitle>Team Ranking</MainTitle>
       <SeasonBox>
        <Season />
       </SeasonBox>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Rank</TableHeadCell>
            <TableHeadCell>CLUB</TableHeadCell>
            <TableHeadCell>PLAYED</TableHeadCell>
            <TableHeadCell>PTS</TableHeadCell>
            <TableHeadCell>GL</TableHeadCell>
            <TableHeadCell>FORM</TableHeadCell>
          </TableRow>
        </TableHead>
        <tbody>
          {data.response[0].league.standings[0].map((arr, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell>{arr.rank}</TableCell>
                <TableTeamCell>
                  <TeamLogoImage alt={arr.team.name} src={arr.team.logo} />
                  {arr.team.name}
                </TableTeamCell>
                <TableCell>{arr.all.played}</TableCell>
                <TableCell>{arr.points}</TableCell>
                <TableCell>{arr.goalsDiff}</TableCell>
                <TableCell>
                  <FormState>
                    <FormShape form={arr.form}/>
                  </FormState>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </LeagueStandingsContainer>
  );
}