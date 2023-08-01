import { useSelector } from "react-redux"
import { useGetTeamInformationQuery } from "../services/teamInfoApis"
import { styled } from "styled-components"

const DescriptionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
  border-radius: 10px;
  margin: 20px 0px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px 10px;
`

const TeamName = styled.div`
  font-family: "Poppins-Bold";
  font-size: 20px;
  text-align: center;
`

export default function TeamDescription() {
  const selectedTeamId = useSelector((state) => state.soccerInfo.teamId);

  const { data, isLoading } = useGetTeamInformationQuery(selectedTeamId);

  const teamData = data?.response[0]?.team;
  const venueData = data?.response[0]?.venue;

  if (isLoading) {
    return <div></div>;
  }
  if (!teamData || !venueData) {
    return <div>No data available</div>;
  }


  return (
    <DescriptionContainer>
      <div>
        <div>
          <TeamName>
            <img alt={teamData.name} src={teamData.logo} />
            {teamData.name}
          </TeamName>
          <br />

        </div>
        <div>
          <b>City</b>: {venueData.city}
          <br />
          <b>Address</b>: {venueData.address}
          <br />
          <b>Stadium Name</b>: {venueData.name}
          <br />
          <img alt={venueData.name} src={venueData.image} />
        </div>
      </div>
    </DescriptionContainer>
  );
}