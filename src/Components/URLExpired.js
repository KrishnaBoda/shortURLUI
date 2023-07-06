import React, { useEffect } from 'react'

export default function URLExpired() {
  useEffect(() => {
    alert("The URL has Expired");
  }, []);
  return (
    <div style={{display : 'flex',justifyContent : 'center'}}>
      <h1 style={{color : 'red'}}>
        URL HAS EXPIRED
      </h1>
    </div>
  )
}
