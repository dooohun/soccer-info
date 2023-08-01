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
    getPlayerInformation: builder.query({
      query: (teamId) => {
        return `players/squads?team=${teamId}`
      }
    }),
    getGameSchedule: builder.query({
      query: (arg) => {
        const { leagueId, teamId } = arg;
        return `fixtures?league=${leagueId}&team=${teamId}&season=2023`
      }
    })
  }),

})

export const {
  useGetTeamInformationQuery,
  useGetPlayerInformationQuery,
  useGetGameScheduleQuery,
} = teamInfoApis;