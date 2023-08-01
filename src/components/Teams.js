import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; 

import { getTeamInfo } from "../stores/soccerSlice";
import { useGetTeamStandingsQuery } from "../services/mainPageApis";

const TeamsLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  background-color: #FFFFFF;
  max-width: 140px;
  width: 100%;
  height: calc(100vh - 72px);
  overflow-y: scroll;

  &::-webkit-scrollbar{
    display: none;
  };
`
const MainTitle = styled.h2`
  height: 56px;
`
const TeamLogoImage = styled.img`
  width: 90px;
  height: 90px;
  margin: 15px 0px;
  cursor: pointer;
  filter: ${props => props.isselected === "true" ? "brightness(100%)" : "brightness(40%)"};
  transition: filter 0.3s ease-in-out;

  &:hover {
    filter: brightness(100%);
  }
`;

export default function Teams() {
  const selectedLeagueId = useSelector((state) => state.soccerInfo.leagueId);
  const selectedSeason = useSelector((state) => state.soccerInfo.season);
  const selectedTeam = useSelector((state) => state.soccerInfo.selectedTeam)

  const { data, error, isLoading } = useGetTeamStandingsQuery({
    leagueId: `${selectedLeagueId}`,
    year: `${selectedSeason}`,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(selectedTeam);

  const handleImageClick = (teamId, src, teamName) => {
    setSelectedImage(src);
    const formattedTeamName = teamName.replace(/\s+/g, "_");
    navigate(`/teamInfo/${formattedTeamName}`);
    dispatch(getTeamInfo({ teamId: teamId, selectedTeam: src }));
    console.log(teamId);
  };
  

  if (isLoading) {
    return <div></div>;
  }

  if (error) {
    return <div>Error occurred</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }
  
  return (
    <TeamsLogoContainer>
      <MainTitle>Team</MainTitle>
      {data.response[0].league.standings[0].map((arr, idx) => {
        return (
          <div key={idx}>
            <TeamLogoImage
              src={arr.team.logo}
              onClick={() => handleImageClick(arr.team.id, arr.team.logo, arr.team.name)}
              isselected={selectedImage === arr.team.logo ? "true" : "false"}
            />
          </div>
        )
      })}
    </TeamsLogoContainer>
  )
}
