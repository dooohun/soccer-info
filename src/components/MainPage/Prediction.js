import { useSelector } from "react-redux"
import { useGetPredictionQuery } from "../../services/mainPageApis";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const PredictionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.backgroundColor2};;
  width: 80%;
  border-radius: 10px;
  margin-top: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px 10px;
`
const MainTitle = styled.h2`
  margin: 0;
  text-align: center;
`

const MatchTeams = styled.p`
  margin: 0;
  font-size: 17px;
  margin-bottom: 5px;
`

const PredictionGraphs = styled.div`
  text-align: center;
  width: 100%;
`

const PredictionGraph = styled.div`
  width: 100%;
  height: 17px;
  margin: 10px 0px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`

const HomeProgressBar = styled.div`
  width: 120px;
  height: 17px;
  background-color: #dedede;
  display: flex;
  justify-content: flex-end;
`
const progressBarAnimation = (rate) => keyframes`
  from{
    width: 0;
  }
  to{
    width: ${rate};
  }
`


const HomeProgress = styled.div`
  width: ${(props) => props.$rate};
  height: 17px;
  background-color: #5FF249;
  animation: ${(props) => progressBarAnimation(props.$rate)} 1s linear;
`

const AwayProgressBar = styled.div`
  width: 120px;
  height: 17px;
  background-color: #dedede;
`

const AwayProgress = styled.div`
  width: ${(props) => props.$rate};
  height: 17px;
  background-color: #3D79F2;
  animation: ${(props) => progressBarAnimation(props.$rate)} 1s linear;
`

const RateBox = styled.div`
  width: 45px;
  text-align: center;
`

export default function Prediction() {
  const selectedFixtureId = useSelector((state) => state.soccerInfo.fixtureId);
  const [predictionData, setPredictionData] = useState({});
  const { data, error, isLoading } = useGetPredictionQuery(selectedFixtureId);

  useEffect(() => {
    if (data) {
      const comparisons = data.response[0].comparison;
      setPredictionData(comparisons);
    }
  }, [data, predictionData])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred</div>;
  }

  if (!data || Object.keys(predictionData).length === 0) {
    return <div>No data available</div>;
  }

  function makeGraph(stat, statTitle) {
    const { home, away } = predictionData[stat];
    const homeRate = Math.floor(parseFloat(parseFloat(home)));
    const awayRate = Math.floor(parseFloat(parseFloat(away)));

    return (
      <PredictionGraphs>
        {statTitle}
        <PredictionGraph>
          <RateBox>
            {homeRate}%
          </RateBox>
          <HomeProgressBar>
            <HomeProgress $rate={home} />
          </HomeProgressBar>
          <AwayProgressBar>
            <AwayProgress $rate={away} />
          </AwayProgressBar>
          <RateBox>
            {awayRate}%
          </RateBox>
        </PredictionGraph>
    </PredictionGraphs>
  )
}

  return (
    <PredictionContainer>
      <MainTitle>Prediction</MainTitle>
      <MatchTeams>{data.response[0].teams.home.name} vs {data.response[0].teams.away.name}</MatchTeams>
      {makeGraph("form", "Form")}
      {makeGraph("att", "Attack")}
      {makeGraph("def", "Defense")}
      {makeGraph("poisson_distribution", "Possession")}
      {makeGraph("h2h", "Head to Head")}
      {makeGraph("goals", "Goals")}
      {makeGraph("total", "Total")}
    </PredictionContainer>
  )
}