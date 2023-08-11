import { createSlice } from "@reduxjs/toolkit";

// 전역 상태 관리
const leagues = {
  PremierLeague: 39,
  Ligue1: 61,
  Bundesliga: 78,
  SerieA: 135,
  LaLiga: 140,
};

const initialState = {
  leagueId: 39,
  teamId: 50,
  season: 2022,
  fixtureId: 1035037,
  playerId: null,
  selectedTeam: null,
};

const soccerSlice = createSlice({
  name: 'soccerInfo',
  initialState,
  reducers: {
    getLeagueId: (state, action) => {
      const selectedLeague = action.payload.league;
      state.leagueId = leagues[selectedLeague];
    },
    getSeason: (state, action) => {
      state.season = action.payload.season;
    },
    getFixtureId: (state, action) => {
      state.fixtureId = action.payload.fixtureId;
    },
    getTeamInfo: (state, action) => {
      state.teamId = action.payload.teamId;
      state.selectedTeam = action.payload.selectedTeam
    },
    getPlayerId: (state, action) => {
      state.playerId = action.payload.playerId
    }
  }
})

export default soccerSlice;
export const { getLeagueId, getSeason, getFixtureId, getTeamInfo, getPlayerId } = soccerSlice.actions;