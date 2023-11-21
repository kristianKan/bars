import React, { useRef, useEffect } from 'react'

const DataGraphics = (props) => {
  const data = props.data
  const ref = useRef(null)
  return <svg ref={ref} />
}

export default DataGraphics
