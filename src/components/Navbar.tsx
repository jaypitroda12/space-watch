import { Flex, Button, Text } from '@chakra-ui/react'
import { add } from 'date-fns'
import DatePicker from 'react-date-picker/dist/entry.nostyle'

interface NavbarProps {
  startDate: Date | undefined
  endDate: Date | undefined
  setStartDate: (date: Date | undefined) => void
  setEndDate: (date: Date | undefined) => void
  setIsChartModalOpen: (isOpen: boolean) => void
  todayIsActive: boolean
  fetchToday: () => void
}

export const Navbar = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  setIsChartModalOpen,
  todayIsActive,
  fetchToday,
}: NavbarProps) => (
  <Flex as="header" w="100%" minHeight="60px" alignItems="center" gap="10px">
    <Text fontWeight="bold" fontSize="2xl" opacity="0.8">
      Space Watch
    </Text>
    <Button
      onClick={fetchToday}
      marginLeft="auto"
      colorScheme={todayIsActive ? 'twitter' : 'gray'}
    >
      Today
    </Button>

    <Text>Start date</Text>
    <DatePicker onChange={setStartDate} value={startDate} />

    <Text>End date</Text>
    <DatePicker
      onChange={setEndDate}
      value={endDate}
      activeStartDate={startDate}
      minDate={startDate}
      maxDate={startDate && add(startDate, { days: 7 })}
      disabled={!startDate}
    />

    <Button onClick={() => setIsChartModalOpen(true)} marginLeft="auto">
      Bar chart
    </Button>
  </Flex>
)
