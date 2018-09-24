import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css, keyframes } from 'styled-components'

const TadaAnimate = keyframes`
  0% {
      -webkit-transform: scale(1);
      transform: scale(1);
  }
  10%, 20% {
      -webkit-transform: scale(0.9) rotate(-3deg);
      transform: scale(0.9) rotate(-3deg);
  }
  30%, 50%, 70%, 90% {
      -webkit-transform: scale(1.1) rotate(3deg);
      transform: scale(1.1) rotate(3deg);
  }
  40%, 60%, 80% {
      -webkit-transform: scale(1.1) rotate(-3deg);
      transform: scale(1.1) rotate(-3deg);
  }
  100% {
      -webkit-transform: scale(1) rotate(0);
      transform: scale(1) rotate(0);
  }
`

const Container = styled.div`
  width: 350px;
  border-radius: 6px;
  padding: 1em .5em 2em .5em;
  margin: 0 auto;
  background-color: #fd79a8;
  /* background-image: url('https://lstore.graphics/meshgradients/images/14.-Prim.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center; */
  text-align: center;
  ${props => props.active && css`
    animation: ${TadaAnimate} .5s infinite;
  `}
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
  transition: all .1s ease;
  ${props => props.active && css`
    background-color: #a29bfe;
    box-shadow: 0 10px 20px -5px rgba(37,45,51,.35);
  `}
  ${props => props.today && css`
    border-bottom: 2px solid #fdcb6e;
  `}
`

class CalendarUI extends Component {
  state = {
    tada: false
  }

  handleTada () {
    this.setState(({ tada }) => ({
      tada: true
    }))

    setTimeout(() => {
      this.setState(({ tada }) => ({
        tada: false
      }))
    }, 500)
  }

  handleClickDay (identity, active) {
    if (!active) this.handleTada()
    this.props.clickCollect(identity)
  }

  handleRenderDates () {
    const { dates } = this.props
    return (
      dates.map((weekInMonth, key) => (
        <Row key={key}>
          {weekInMonth.map((dayInWeek, keyDay) => {
            if (dayInWeek !== '') {
              return (
                <Col onClick={this.handleClickDay.bind(this, dayInWeek.identity, dayInWeek.active)} key={keyDay}>
                  <DateItem active={dayInWeek.active} today={dayInWeek.isToday}>{dayInWeek.day}</DateItem>
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
        <Container active={this.state.tada}>
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
