import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GoCalendar } from 'react-icons/go'

import { useFetchMonthlyRankings } from 'api/hooks'
import { Section, Spinner } from 'components/core'
import {
  getNextMonth,
  getPreviousMonth,
  MonthlyRankingsNavigator,
  MonthlyRankingsProjects
} from 'components/monthly-rankings/rankings'
import { MainColumn, Row } from './layout'

export const HomeMonthlyRankings = () => {
  const [date, setDate] = useState<MonthlyDate | null>(null)

  return (
    <Section>
      <Row>
        <MainColumn>
          <Section.Header icon={<GoCalendar fontSize={32} />}>
            <Section.Title>Monthly Rankings</Section.Title>
          </Section.Header>
          <FetchMonthlyRankings date={date} setDate={setDate} />
        </MainColumn>
      </Row>
    </Section>
  )
}

const FetchMonthlyRankings = ({ date, setDate }) => {
  const { data, error } = useFetchMonthlyRankings(date)

  if (error) {
    return <div>Unable to load the rankings</div>
  }
  if (!data) {
    return <Spinner />
  }
  const { year, month, isFirst, isLatest } = data as any

  const goToPrevious = () => setDate(getPreviousMonth({ year, month }))

  const goToNext = () => setDate(getNextMonth({ year, month }))

  return (
    <>
      <MonthlyRankingsNavigator
        date={{ year, month }}
        isFirst={isFirst}
        isLatest={isLatest}
        goToPrevious={goToPrevious}
        goToNext={goToNext}
      />
      <MonthlyRankingsProjects
        projects={data.trending}
        limit={5}
        year={year}
        month={month}
        footer={
          <Link to={`/rankings/monthly/${year}/${month}`}>
            View full rankings »
          </Link>
        }
      />
    </>
  )
}
