import { useGetTeamStandingsQuery } from "../../services/mainPageApis";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { getTeamInfo } from "../../stores/soccerSlice";

import FormStyle, { FormState } from "../../styles/FormStyle";
import { styled } from "styled-components";

import Season from "./Seasons";

const LeagueStandingsContainer = styled.div`
  background-color: ${props => props.theme.backgroundColor2};
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
  background-color: ${props => props.theme.headerBackground};
  font-weight: bold;
`

const TableHeadCell = styled.th`
  padding: 12px 8px;
  text-align: center;
`

const TableRow = styled.tr`
  cursor: pointer;
  &:nth-child(even) {
    background-color: ${props => props.theme.evenRowBackground};
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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const TeamClickHandler = (teamId, src, teamName) => {
    const formattedTeamName = teamName.replace(/\s+/g, "_");
    navigate(`/teamInfo/${formattedTeamName}`);
    dispatch(getTeamInfo({ teamId: teamId, selectedTeam: src }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred</div>;
  }

  if (!data) {
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
              <TableRow key={idx} onClick={() => TeamClickHandler(arr.team.id, arr.team.logo, arr.team.name)}>
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
                    <FormStyle form={arr.form}/>
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