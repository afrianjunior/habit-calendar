import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Container = styled.div`
  width: 350px;
  border-radius: 6px;
  padding: 1em .5em 2em .5em;
  margin: 0 auto;
  background-image: url('https://lstore.graphics/meshgradients/images/14.-Prim.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  text-align: center;
`

const Head = styled.div`
  padding: 1em;
  font-size: 12px;
  font-weight: 900;
  color: #fff;
`

const Body = styled.div`
  font-size: 13px;
  color: #fff;
`
const Row = styled.div`
  &::after {
    content: "";
    display: table;
    clear: both;
    padding: .3em .5em;
  }
`

const Col = styled.div`
  width: calc(100% / 7);
  float: left;
  text-align: center;
  padding: .3em 0;
  cursor: pointer;

  &::after {
    content: "";
    display: table;
    clear: both;
    padding: .3em .5em;
  }
`

const DateItem = styled.span`
  border-radius: 4px;
  width: 30px;
  height: 30px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  box-shadow: 0 10px 20px -5px rgba(37,45,51,0);
  transition: all .3s ease;
  ${props => props.active && css`
    background-color: #a29bfe;
    box-shadow: 0 10px 20px -5px rgba(37,45,51,.35);
  `}
`

class CalendarUI extends Component {
  handleClickDay (e) {
    this.props.clickCollect(e)
  }

  handleRenderDates () {
    const { dates } = this.props
    return (
      dates.map((weekInMonth, key) => (
        <Row key={key}>
          {weekInMonth.map((dayInWeek, keyDay) => {
            if (dayInWeek !== '') {
              return (
                <Col onClick={this.handleClickDay.bind(this, dayInWeek.identity)} key={keyDay}>
                  <DateItem active={dayInWeek.active}>{dayInWeek.day}</DateItem>
                </Col>
              )
            } else {
              return <Col key={keyDay}></Col>
            }
          })}
        </Row>
      ))
    )
  }

  render () {
    return (
      <React.Fragment>
        <Container>
          <Head>Calendar</Head>
          <Body>
            {this.handleRenderDates()}
          </Body>
        </Container>
      </React.Fragment>
    )
  }
}

CalendarUI.propTypes = {
  dates: PropTypes.array,
  clickCollect: PropTypes.func
}

export default CalendarUI
