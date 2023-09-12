import React from 'react'

function Background() {
  return (
    <>
    <div style={{zIndex: -9999}} className=" w-1/2 h-3/5 top-0 left-0 bg-[#f6c1ff] rounded-400px absolute blur-[150px]" />
    <div style={{zIndex: -9999}} className=" w-1/2 h-3/5 top-1/2 left-1/2 bg-[#cdc9ff] rounded-400px absolute blur-[150px]" />
    </>
  )
}

export default Background