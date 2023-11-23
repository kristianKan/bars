import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedCategory, selectIndexedData } from "../features/dataSlice"
import { useGetDataQuery } from "../services/api"
import DataGraphics from "./DataGraphics"
import styled, { keyframes } from "styled-components"
import { selectUniqueKeys } from "../features/dataSlice"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 40px;
  height: 100vh;
`

const Header = styled.div``

const StyledH1 = styled.h1`
  color: #ffa5ff;
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

const Selector = styled.select`
  background-color: transparent;
`

const Data = () => {
  const dispatch = useDispatch()

  const { data, error, isFetching } = useGetDataQuery()
  const indexedData = useSelector(selectIndexedData)
  const selectedCategory = useSelector(state => state.category)
  const keys = useSelector(selectUniqueKeys)

  const handleCategoryChange = (event) => {
    dispatch(setSelectedCategory(event.target.value))
  }

  return (
    <Container>
      {isFetching ? <Spinner>🌚</Spinner> : null}
      <Header>
        <StyledH1>Beverages</StyledH1>
        <Selector value={selectedCategory} onChange={handleCategoryChange}>
          <option value="volume">quantity</option>
          <option value="abv">abv</option>
        </Selector>
      </Header>
      {error ? (
        <Error>{error.message}</Error>
      ) : data ? (
        <DataGraphics data={indexedData} keys={keys} category={selectedCategory} data-testid="data-graphics" />
      ) : null}
    </Container>
  )
}

export default Data 