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
    this.calcDate(2018, 10)
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
          // haveDay = false
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

  render () {
    const { dates } = this.state
    let printDate = []
    dates.map(item => {
      printDate = printDate.concat(item)
    })
    return (
      <React.Fragment>
        <CalendarUI dates={this.state.dates} />
        {/* <p>
          {printDate.map((item, index) => {
            if (item !== '') {
              return <div>{item.identity}</div>
            }
          })}
        </p> */}
      </React.Fragment>
    )
  }
}

export default Calendar
