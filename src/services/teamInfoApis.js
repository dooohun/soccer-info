import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL, PREPARE_HEADERS} from "./apiConfig"

export const teamInfoApis = createApi({
  reducerPath: 'teamInfoApis',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: PREPARE_HEADERS,
  }),
  endpoints: (builder) => ({
    getTeamInformation: builder.query({
      query: (teamId) => {
        return `teams?id=${teamId}`;
      }
    }),
    getSquadInformation: builder.query({
      query: (teamId) => {
        return `players/squads?team=${teamId}`;
      }
    }),
    getGameSchedule: builder.query({
      query: (arg) => {
        const { leagueId, teamId } = arg;
        return `fixtures?league=${leagueId}&team=${teamId}&season=2023`;
      }
    }),
    getPlayerInformation: builder.query({
      query: (playerId) => {
        return `players?id=${playerId}&season=2022`;
      }
    })
  }),

})

export const {
  useGetTeamInformationQuery,
  useGetSquadInformationQuery,
  useGetGameScheduleQuery,
  useGetPlayerInformationQuery
} = teamInfoApis;