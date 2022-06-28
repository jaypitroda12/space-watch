import { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useToast } from '@chakra-ui/react'
import { AxiosError } from 'axios'
import { UserSerie } from 'react-charts'

import { dateRangeFeed, todaysFeed } from 'utils/api'
import { Loader, Navbar, TableComponent, ChartModal } from '@components'
import { formatDate } from 'utils/helpers'
import { ErrorResponse } from 'interfaces/FeedResponse'
import { Asteroid, AsteroidData } from 'interfaces'

const Index = () => {
  const toast = useToast()

  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [isChartModalOpen, setIsChartModalOpen] = useState(false)
  const [tableData, setTableData] = useState<Asteroid[]>([])
  const [chartData, setChartData] = useState<UserSerie<AsteroidData>[]>([])
  const { data, isLoading, refetch, isError, error } = useQuery(
    formatDate(new Date()),
    todaysFeed
  )

  const {
    data: rangeData,
    isLoading: rangeDataIsLoading,
    isError: isRangeDataError,
    error: rangeDataError,
  } = useQuery(
    [formatDate(startDate), formatDate(endDate)],
    () => dateRangeFeed(formatDate(startDate), formatDate(endDate)),
    {
      enabled: !!startDate && !!endDate,
    }
  )

  const fetchToday = () => {
    setStartDate(undefined)
    setEndDate(undefined)
    refetch()
  }

  useEffect(() => {
    const parsedTableData: Asteroid[] = []
    const parsedChartData: UserSerie<AsteroidData>[] = []
    const dataToParse = endDate ? rangeData : data

    if (dataToParse) {
      Object.values(dataToParse.near_earth_objects).forEach(
        (nearEarthObjects) =>
          nearEarthObjects.forEach((nearEarthObject) => {
            const {
              id,
              name,
              estimated_diameter: {
                meters: { estimated_diameter_max },
              },
              close_approach_data,
              is_potentially_hazardous_asteroid: potentialHazard,
            } = nearEarthObject

            const {
              close_approach_date_full,
              relative_velocity: { kilometers_per_hour },
              miss_distance: { kilometers },
            } = close_approach_data[0]

            const time = close_approach_date_full
            const velocity = Number(kilometers_per_hour).toFixed(2)

            parsedTableData.push({
              id,
              name,
              estimatedDiameter: estimated_diameter_max.toFixed(2),
              missDistance: Number(kilometers).toFixed(2),
              personalNote: localStorage.getItem(id) || '',
              potentialHazard,
              time,
              velocity,
            })

            parsedChartData.push({
              label: name,
              data: [{ time, velocity }],
            })
          })
      )
    }

    setTableData(parsedTableData)
    setChartData(parsedChartData)
  }, [data, rangeData, endDate])

  return (
    <>
      {(isLoading || rangeDataIsLoading) && <Loader />}

      <ChartModal
        isOpen={isChartModalOpen}
        data={chartData}
        closeModal={() => setIsChartModalOpen(false)}
      />

      <Flex
        height="100vh"
        direction="column"
        marginInline="55px"
        marginTop="10px"
      >
        <Navbar
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setIsChartModalOpen={setIsChartModalOpen}
          todayIsActive={!endDate}
          fetchToday={fetchToday}
        />

        <TableComponent data={tableData} />
      </Flex>

      {isError &&
        toast({
          title: 'Today data error',
          description: (error as AxiosError<ErrorResponse>).response?.data
            .error_message,
          status: 'error',
          duration: 10000,
          isClosable: true,
        })}

      {isRangeDataError &&
        toast({
          title: 'Range data error',
          description: (rangeDataError as AxiosError<ErrorResponse>).response
            ?.data.error_message,
          status: 'error',
          duration: 10000,
          isClosable: true,
        })}
    </>
  )
}

export default Index
