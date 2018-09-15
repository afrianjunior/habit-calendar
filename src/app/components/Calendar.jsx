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
    dates: []
  }

  componentDidMount () {
    this.calcDate(2018, 11)
  }

  printDate (day, year, month, info) {
    let newDay = null
    if (day.toString().length < 2) {
      newDay = `0${day}`
    } else {
      newDay = day
    }
    return {
      day: day,
      identity: `${year}${month}${newDay}`,
      info: info
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
            calendar[i][j] = this.printDate(day++, year, month, '250k')
            startDay++
          } else {
            calendar[i][j] = ''
          }
        } else if (day <= dayInMonth[month]) {
          calendar[i][j] = this.printDate(day++, year, month, '250k')
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

  handleClickCollect (data) {
    console.log(data)
  }

  render () {
    const { dates } = this.state
    return (
      <React.Fragment>
        <CalendarUI dates={dates} clickCollect={this.handleClickCollect} />
      </React.Fragment>
    )
  }
}

export default Calendar
