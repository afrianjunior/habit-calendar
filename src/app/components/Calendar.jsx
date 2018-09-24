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
    this.calcDate(2018, 8)
  }

  getToday () {
    const date = new Date()
    let month = date.getUTCMonth()
    let day = date.getUTCDate()
    let year = date.getUTCFullYear()

    if (day.toString().length === 1) day = `0${day}`
    if (month.toString().length === 1) month = `0${month}`

    return `${year}${month}${day}`
  }

  printDate (...args) {
    let [day, year, month, today] = args
    let isActive = false
    let isToday = false

    if (day.toString().length < 2) day = `0${day}`
    if (month.toString().length < 2) month = `0${month}`

    const identity = `${year}${month}${day}`
    this.state.collections.find(item => {
      if (item === identity) isActive = true
    })
    if (today === identity) isToday = true
    return {
      day: day,
      identity: identity,
      active: isActive,
      isToday: isToday
    }
  }

  calcDate (year, month) {
    const today = this.getToday()
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
            calendar[i][j] = this.printDate(day++, year, month, today)
            startDay++
          } else {
            calendar[i][j] = ''
          }
        } else if (day <= dayInMonth[month]) {
          calendar[i][j] = this.printDate(day++, year, month, today)
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
