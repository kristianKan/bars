import React from "react"
import { useParams, Link } from "react-router-dom"
import { useGetDataByIdQuery } from "../services/api"
import styled, { keyframes } from "styled-components"

const Container = styled.div`
  margin: 40px;
  color: #1b1602;
  height: 100vh;
  width: 100vw;
`

const Button = styled.button`
  background-color: transparent;
  font-size: 18px;
`

const Details = styled.section`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`

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
  top: 50%;
  left: 50%;
  font-size: 50px;
  color: #fff;
  animation-name: ${Spin};
  animation-duration: 2s;
  animation-iteration-count: infinite;
`

const Row = styled.div`
  padding: 2px;
`

const Col = styled.div`
  padding-right: 12px;
`

const Datum = () => {
  const { id } = useParams()

  const { data, error, isFetching } = useGetDataByIdQuery(id)

  return (
    <Container>
      <Link to="/">
        <Button>←</Button>
      </Link>
      {isFetching ? <Spinner>🌚</Spinner> : null}
      {error ? (
        <Error>Oh no... {error.error}</Error>
      ) : data ? (
        <>
          <StyledH1>{data.product}</StyledH1>
          <Details>
            <Col style={{ textAlign: "right" }}>
              <Row>brand</Row>
              <Row>category</Row>
              <Row>style</Row>
              <Row>quantity</Row>
              <Row>ABV</Row>
              <Row>package</Row>
            </Col>
            <Col style={{ fontWeight: "bold" }}>
              <Row>{data.brand}</Row>
              <Row>{data.category}</Row>
              <Row>{data.style ? data.style : "n/a"}</Row>
              <Row>{data.quantity} {data["quantity units"]}</Row>
              <Row>{data.abv}</Row>
              <Row>{data.package}</Row>
            </Col>
          </Details>
        </>
      ) : null}
    </Container>
  )
}

export default Datum 
