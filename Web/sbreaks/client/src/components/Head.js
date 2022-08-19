import React from 'react'

const Head = (props) => {
  React.useEffect(() => {
    document.title = 'SBRAKES - ' + props.title

  }, [props])

  return <></>
}

export default Head