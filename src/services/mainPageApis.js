import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL, PREPARE_HEADERS} from "./apiConfig"

export const mainPageApis = createApi({
  reducerPath: 'mainPageApis',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: PREPARE_HEADERS,
  }),
  endpoints: (builder) => ({
    getPlayerStandings: builder.query({
      query: (arg) => {
        const { leagueId, year } = arg;
        return `players/topscorers?season=${year}&league=${leagueId}`
      }
    }),
    getRecentMatches: builder.query({
      query: (leagueId) => {
        return `fixtures?league=${leagueId}&season=2023&next=10`
      }
    }),
    getPrediction: builder.query({
      query: (fixtureId) => {
        return `predictions?fixture=${fixtureId}`
      }
    }),
    getTeamStandings: builder.query({
      query: (arg) => {
        const { leagueId, year } = arg;
        return `standings?league=${leagueId}&season=${year}`
      }
    }),
  }),

})

export const {
  useGetPlayerStandingsQuery,
  useGetRecentMatchesQuery,
  useGetPredictionQuery,
  useGetTeamStandingsQuery
} = mainPageApis;