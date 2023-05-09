import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

const TwitterRedirect = (props) => {
  const history = useHistory()
  const location = useLocation()
  useEffect(()=>{
    console.log(location)
    const params = new URLSearchParams(location.search);
    let data = {}
    const entries = params.entries();
  for(const [key, value] of entries) { // each 'entry' is a [key, value] tupple
    data = JSON.parse(key)
    break
  }
  localStorage.setItem("data", JSON.stringify(data))
  history.push('/home')
  
  },[location])



  return (
    <>
    Loading...</>
  );
};

export default TwitterRedirect;