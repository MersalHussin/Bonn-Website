'use client'
import { useEffect } from "react";
import Services from "../components/Sections/Services"

const ServicesPage = () =>{ 
  useEffect(()=>{
    scrollTo(0,0)
  })

  return (
    <Services/>
  )
}

export default ServicesPage;