import React, { useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as d3 from 'd3'
import { actions as datumSliceActions } from '../features/datumSlice'
import { getUniqueKeys } from './utils'

// side margin
const MARGIN = 40
// Axis padding
const PADDING = 20
// datapicker and header height
const TOP = 196

const DataGraphics = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ref = useRef(null)

  // an ease function to make animation more funky
  const customElastic = d3.easeElastic.period(0.6)

  // should be moved to utils
  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const onClick = (d) => {
    dispatch(datumSliceActions.setSelected(d.id))
    navigate(`/neo/${d.id}`)
  }

  const onMouseOver = (e, d) => {
    const circle = d3.select(e.currentTarget)
    // magnify radius by the factor of 2
    circle.attr('r', circle.attr('r') * 2)
  }

  const onMouseOut = (e, d) => {
    const circle = d3.select(e.currentTarget)
    // set radius to its original value
    circle.attr('r', circle.attr('r') / 2)
  }

  const drawAxis = ({ x, height }) => {
    // display the first and the last tick values only
    const axis = d3.axisBottom(x)
    .tickSize(0)
    .tickPadding(10)

    // since x axis is absolute it's not updated
    return (node) => {
      node
        .selectAll('.axis')
        .data(['dummy'])
        .join((enter) => {
          return enter
            .append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0, ${height - PADDING})`)
            .call(axis)
            .call((g) => {
              g.select('.domain')
                .style('stroke', 'black')
                .attr('stroke-opacity', 0.4)
                .attr('stroke-dasharray', '2,2')
              g.selectAll('.tick line')
                .style('stroke', 'black')
                .attr('stroke-opacity', 0.4)
              g.selectAll('.tick text')
                .style('fill', '#ff00ff')
                .attr('opacity', 0.4)
                .attr("transform", `translate(${-x.bandwidth() / 2},0)`)
            })
        })
    }
  }

  const getX = (x) => {
    return (d) => {
      if (d.xIndex % 2 === 1) {
        return x(d.volume) + d.xIndex * -3 - 3 
      } else {
        return x(d.volume) + d.xIndex * 3
      }
    }
  }

  const drawCircles = ({ data, height, width, x, y, r }) => {
    return (node) => {
      node
        .selectAll('circle')
        .data(data, (d) => d.id)
        .join(
          (enter) => {
            return enter
              .append('circle')
              .attr('cx', () => randomInt(-100, width + 100))
              .attr('cy', height / 2)
              .style('fill', 'black')
              .transition()
              .duration(1000)
              .ease(customElastic)
              .attr('cx', getX(x))
              .attr('cy', (d, i) => y(d.yIndex)) 
              .attr('r', (d) => 2)
          },
          (update) => {
            return update
              .transition()
              .duration(2000)
              .style('fill', 'black')
              .attr('cx', getX(x))
              .attr('cy', (d, i) => y(d.yIndex)) 
              .attr('r', (d) => 2)
          },
          (exit) => {
            exit
              .transition()
              .duration(1000)
              .attr('cx', () => randomInt(-100, width + 100))
              .attr('r', 0)
              .style('fill', 'transparent')
          }
        )
        .attr('cursor', 'pointer')
        .on('click', (e, d) => onClick(d))
        .on('mouseover', (e, d) => onMouseOver(e, d))
        .on('mouseout', (e, d) => onMouseOut(e, d))
    }
  }

  useEffect(() => {
    // if there's no date and no ref, there's nothing to do here
    if (!props.data || !ref.current) {
      return null
    }

    const data = props.data 

    // some quick and dirty layout calculations
    let height = ref.current.parentElement.offsetHeight - TOP - MARGIN * 2
    let width = ref.current.parentElement.offsetWidth - MARGIN * 2

    const { keys } = getUniqueKeys(data, 'volume')

    // set x scale to map categories to pixels
    const x = d3
      .scaleBand()
      .domain(keys) // volumes
      .range([PADDING, width - PADDING]) // pixels

    const y = d3
      .scaleBand()
      .domain(data.map((d) => d.yIndex)) // Use the index as the domain
      .range([height - PADDING, PADDING]) // Map the domain to the height of the SVG
      .padding(0.1); // Add some padding between the circles

    // set r scale to map magnitude to circle radius
    const r = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.volume))
      .range([2, 10])

    // select ref and draw all components
    d3.select(ref.current)
      .attr('height', height)
      .attr('width', width)
      .call(drawAxis({ x, height }))
      .call(drawCircles({ data, height, width, x, y, r }))
  })

  return <svg ref={ref} />
}

export default DataGraphics