import React from 'react'
import { useGetDataQuery } from '../services/api'
import DataGraphics from './DataGraphics'
import styled, { keyframes } from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 40px;
  height: 100vh;
`

const Header = styled.div``

const StyledH1 = styled.h1`
  color: #ff00ff;
  font-size: 50px;
`

const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 50px;
  color: #ffe000;
`

const Spin = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
`

const Spinner = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  font-size: 50px;
  color: #fff;
  animation-name: ${Spin};
  animation-duration: 2s;
  animation-iteration-count: infinite;
`

const Data = () => {
  //const params = useParams()

  const { data, error, isFetching } = useGetDataQuery()

  return (
    <Container>
      {isFetching ? <Spinner>🌚</Spinner> : null}
      <Header>
        <StyledH1>Beverages</StyledH1>
      </Header>
      {error ? (
        <Error>Oh no... {error.error}</Error>
      ) : data ? (
        <DataGraphics data={data} />
      ) : null}
    </Container>
  )
}

export default Data 