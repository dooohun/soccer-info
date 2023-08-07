import { useDispatch, useSelector } from "react-redux"
import { useGetPlayerInformationQuery } from "../services/teamInfoApis"
import { styled } from "styled-components"
import { useEffect, useState } from "react"
import { getPlayerId } from "../stores/soccerSlice"
import Button from '@mui/material/Button';

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;

  background-color: rgba(49,49,49,0.8);
`

const ModalContent = styled.div`
  width: 800px;
  height: 500px;
  background-color: #FFFFFF;
  border-radius: 10px;
  overflow-y: scroll;

  &::-webkit-scrollbar{
    display: none;
  }
`

const TableBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
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
  text-align: ${props => props.$imageContent === "true" ? "start" : "center"};
`

const LeagueLogo = styled.img`
  width: 50px;
  height: 50px;
`

export default function PlayerModal() {
  const [modal, setModal] = useState(false);

  const selectedPlayerId = useSelector((state) => state.soccerInfo.playerId);
  const { data, isLoading } = useGetPlayerInformationQuery(selectedPlayerId);
  const dispatch = useDispatch();

  const playerData = data?.response[0]?.player;
  const statisticsData = data?.response[0]?.statistics;


  useEffect(() => {
    if (selectedPlayerId) {
      setModal(!modal);
    }
  }, [selectedPlayerId])

  function toggleModal() {
    if (modal) {
      dispatch(getPlayerId({ playerId: null }));
    }
    setModal(!modal);
  }

  console.log(data);
  if (isLoading) {
    return <div>IsLoading...</div>
  }
  if (!playerData || !statisticsData) {
    return <div>No data available</div>;
  }

  if (selectedPlayerId && modal) {
    return (
      <ModalContainer>
        <ModalContent>
          <Button variant="contained" onClick={toggleModal}>X</Button>
          <p>
            <img src={playerData.photo} alt={playerData.name} />
            <br />
            National: {playerData.nationality}
            <br />
            Height: {playerData.height}
            <br />
            Weight: {playerData.weight}
          </p>
          <TableBox>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>League</TableHeadCell>
                  <TableHeadCell>Participation</TableHeadCell>
                  <TableHeadCell>Goal</TableHeadCell>
                  <TableHeadCell>Assist</TableHeadCell>
                  <TableHeadCell>Playing time</TableHeadCell>
                </TableRow>
              </TableHead>
              <tbody>
                {statisticsData.map((arr, idx) => (
                  <TableRow key={idx}>
                    <TableData $imageContent="true"><LeagueLogo src={arr.league.logo} /> {arr.league.name}</TableData>
                    <TableData>{arr.games.appearences}</TableData>
                    <TableData>{arr.goals.total}</TableData>
                    <TableData>{arr.goals.assists === null ? "0" : arr.goals.assists}</TableData>
                    <TableData>{arr.games.minutes}</TableData>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableBox>
        </ModalContent>
      </ModalContainer>
    )
  }
}