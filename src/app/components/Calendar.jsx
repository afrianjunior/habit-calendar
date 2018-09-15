import React, { Component } from 'react'
import { CalendarUI } from 'ui'

class Calendar extends Component {
  state = {
    days: [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat'
    ],
    dates: [],
    collections: [
      '20181109'
    ]
  }

  componentDidMount () {
    this.calcDate(2018, 11)
  }

  printDate (day, year, month) {
    let newDay = null
    let isActive = false
    if (day.toString().length < 2) {
      newDay = `0${day}`
    } else {
      newDay = day
    }
    const identity = `${year}${month}${newDay}`
    this.state.collections.find(item => {
      if (item === identity) isActive = true
    })
    return {
      day: day,
      identity: identity,
      active: isActive
    }
  }

  calcDate (year, month) {
    let day = 1
    let i
    let haveDay = true
    let startDay = new Date(year, month, day).getDay()
    let dayInMonth = [31, (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let calendar = []

    i = 0
    while (haveDay) {
      calendar[i] = []
      for (let j in [...Array(7).keys()]) {
        j = Number(j)
        if (i === 0) {
          if (j === startDay) {
            calendar[i][j] = this.printDate(day++, year, month)
            startDay++
          } else {
            calendar[i][j] = ''
          }
        } else if (day <= dayInMonth[month]) {
          calendar[i][j] = this.printDate(day++, year, month)
        } else {
          calendar[i][j] = ''
        }
        if (day > dayInMonth[month]) {
          haveDay = false
        }
      }
      i++
    }

    this.setState(({ dates }) => ({
      dates: calendar
    }))
  }

  handleShowThumb (id, isActive) {
    const { dates } = this.state
    dates.map((week, weekIndex) => {
      week.map((day, dayIndex) => {
        if (day.identity === id) {
          dates[weekIndex][dayIndex].active = isActive
          this.setState(({ dates }) => ({
            dates: dates
          }))
        }
      })
    })
  }

  handleClickCollect (identity) {
    const { collections } = this.state
    const isDuplicate = collections.find(collectItem => collectItem === identity)
    if (isDuplicate) {
      this.setState(({ collections }) => ({
        collections: collections.filter(collect => collect !== identity)
      }))
      this.handleShowThumb(identity, false)
    } else {
      this.setState(({ collections }) => ({
        collections: collections.concat(identity)
      }))
      this.handleShowThumb(identity, true)
    }
  }

  render () {
    const { dates } = this.state
    return (
      <React.Fragment>
        <CalendarUI dates={dates} clickCollect={this.handleClickCollect.bind(this)} />
      </React.Fragment>
    )
  }
}

export default Calendar
