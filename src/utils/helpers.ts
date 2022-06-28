import { format } from 'date-fns'

export const DATE_FORMAT = 'yyyy-MM-dd'

export const formatDate = (date: Date | undefined) =>
  date ? format(date, DATE_FORMAT) : ''
