import { useSelector } from "react-redux"
import { useGetPlayerInformationQuery} from "../services/teamInfoApis"
import { styled } from "styled-components"


const TeamPlayersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFFFFF;
  width: 90%;
  height: 90vh;
  border-radius: 10px;
  margin: 20px 0px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px 10px;
  overflow-y: scroll;

  &::-webkit-scrollbar{
    display: none;
  }
`

const MainTitle = styled.h2`
  margin: 0 0 15px 0;
`

const Table = styled.table`
  border-collapse: collapse;
  background-color: #FFFFFF;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
`

const TableHead = styled.thead`
  background-color: #f0f0f0;
  font-weight: bold;
  position: sticky;
  top: 0;
  z-index: 1;
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

const TableData = styled.td`
  padding: 8px;
  text-align: ${props => props.$isplayercell === "true" ? "start" : "center"};
`

const PlayerImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`

export default function TeamPlayers() {
  const selectedTeamId = useSelector((state) => state.soccerInfo.teamId);

  const {data, isLoading} = useGetPlayerInformationQuery(selectedTeamId);

  if (isLoading) {
    return <div></div>;
  }
  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <TeamPlayersContainer>
      <MainTitle>Players</MainTitle>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Player</TableHeadCell>
            <TableHeadCell>Age</TableHeadCell>
            <TableHeadCell>Position</TableHeadCell>
            <TableHeadCell>Number</TableHeadCell>
          </TableRow>
        </TableHead>
        <tbody>
          {data.response[0].players.map((player) => (
            <TableRow key={player.id}>
              <TableData $isplayercell="true"><PlayerImage src={player.photo} />{player.name}</TableData>
              <TableData>{player.age}</TableData>
              <TableData>{player.position}</TableData>
              <TableData>{player.number}</TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TeamPlayersContainer>
  );
}