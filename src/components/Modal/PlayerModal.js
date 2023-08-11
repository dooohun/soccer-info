import { useDispatch, useSelector } from "react-redux"
import { useGetPlayerInformationQuery } from "../../services/teamInfoApis"
import { styled } from "styled-components"
import { useEffect, useState } from "react"
import { getPlayerId } from "../../stores/soccerSlice"
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

  background-color: ${props => props.theme.modalBackground};
  z-index: 2;
`

const ModalContent = styled.div`
  width: 800px;
  height: 500px;
  background-color: ${props => props.theme.backgroundColor2};
  border-radius: 10px;
  padding: 10px 20px;
  overflow-y: scroll;

  &::-webkit-scrollbar{
    display: none;
  }
`

const ModalContentTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
`

const TableBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`

const ButtonBox = styled.div`
  display:flex;
  justify-content: flex-end;
  position: sticky;
  top: 0;
  z-index: 2;
`

const Table = styled.table`
  border-collapse: collapse;
  background-color: ${props => props.theme.backgroundColor2};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const TableHead = styled.thead`
  background-color: ${props => props.theme.headerBackground};
  font-weight: bold;
  position: sticky;
  top: 0;
  z-index: 1;
`

const TableHeadCell = styled.th`
  padding: 12px 8px;
  text-align: ${props => props.$leagueCell==="true" ? "start" : "center"};
`

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${props => props.theme.evenRowBackground};
  }
`

const TableData = styled.td`
  padding: 8px;
  text-align: ${props => props.$imageContent === "true" ? "start" : "center"};
`

const LeagueLogo = styled.img`
  width: 70px;
  height: 70px;
  object-fit: scale-down;
  background-color: #FFFFFF;
  border-radius: 20%;
`
const PlayerPhotoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const PlayerPhoto = styled.img`
  width: 150px;
  height: 150px;
  object-fit: scale-down;
  border-radius: 10px;
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
      setModal(() => !modal);
    }
  }, [selectedPlayerId])

  function toggleModal() {
    if (modal) {
      dispatch(getPlayerId({ playerId: null }));
    }
    setModal(!modal);
  }

  if (isLoading) {
    return <div></div>
  }
  if (!playerData || !statisticsData) {
    return <div></div>;
  }

  if (selectedPlayerId && modal) {
    return (
      <ModalContainer>
        <ModalContent>
          <ButtonBox>
            <Button variant="contained" onClick={toggleModal}>X</Button>
          </ButtonBox>
          <ModalContentTitle>2022-2023 Player Statistics</ModalContentTitle>
          <div>
            <PlayerPhotoBox>
              <PlayerPhoto src={playerData.photo} alt={playerData.name} />
            </PlayerPhotoBox>
            <br />
            <b>Name</b>: {playerData.name}
            <br />
            <b>National</b>: {playerData.nationality}
            <br />
            <b>Height</b>: {playerData.height}
            <br />
            <b>Weight</b>: {playerData.weight}
          </div>
          <TableBox>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell $leagueCell="true">League</TableHeadCell>
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