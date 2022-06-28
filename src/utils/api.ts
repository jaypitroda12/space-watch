import axios from 'axios'
import { FeedResponse } from 'interfaces/FeedResponse'

const api = axios.create({ baseURL: 'https://neowsapp.com/rest/v1/' })

export const todaysFeed = () =>
  api
    .get(`feed/today?detailed=false&api_key=${process.env.NEOWS_API_KEY}`)
    .then((res) => res.data as FeedResponse)

export const dateRangeFeed = (startDate: string, endDate: string) =>
  api
    .get(
      `feed?detailed=false&start_date=${startDate}&end_date=${endDate}&api_key=${process.env.NEOWS_API_KEY}`
    )
    .then((res) => res.data as FeedResponse)
