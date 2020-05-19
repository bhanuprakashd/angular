import React, { useState } from 'react';

import axios from 'axios';

import './App.css';
import { LineChart, PieChart,ColumnChart,BarChart } from 'react-chartkick'
import 'chart.js'
import 'math-abs';





function Worldcharts(){
    const [globalcases,setGlobalcases]=useState(0)
    const [globalactive,setGlobalactive]=useState(0)
    const [globalrecovered,setGlobalrecovered]=useState(0)
    const [globaldeaths,setGlobaldeaths]=useState(0)

    const [globaltoptencases,setGlobaltoptencases]=useState([])
    const [globaltoptenactive,setGlobaltoptenactive]=useState([])
    const [globaltoptenrecovered,setGlobaltoptenrecovered]=useState([])
    const [globaltoptendeaths,setGlobaltoptendeaths]=useState([])

    const [globalcasesseries,setGlobalcasesseries]=useState([])
    const [globalactiveseries,setGlobalactiveseries]=useState([])
    const [globalrecoveredseries,setGlobalrecoveredseries]=useState([])
    const [globaldeathsseries,setGlobaldeathsseries]=useState([])


    function getGlobalSummary() {
           
      
        axios
          .get("https://api.thevirustracker.com/free-api?global=stats")
          .then((res) => {res.data.results.map((dat)=>{
            //console.log(dat.total_deaths)
            setGlobalcases(dat.total_cases)
            setGlobalactive(dat.total_active_cases)
            setGlobalrecovered(dat.total_recovered)
            setGlobaldeaths(dat.total_deaths)
          })
            
             
    
            
    
        
          })
      
          .catch((err) => {
            console.log("Error from API");
          });
      }
      getGlobalSummary()

      function getGlobaltopten() {
        var listy1=[]
        var listy2=[]
        var listy3=[]
        var listy4=[]
    
        var locs1=[]
        var locs2=[]
        var locs3=[]
        var locs4=[]
    
        let sortedlisty1=[];
        let sortedlisty2=[];
        let sortedlisty3=[];
        let sortedlisty4=[];
    
        var toptentotal={}
        var toptenactive={}
        var toptenrecovered={}
        var toptendeaths={}
    
        let worldkeys=[];
        axios
          .get("https://api.thevirustracker.com/free-api?countryTotals=ALL")
          .then((res) => {//console.log(res.data.countryitems)
            res.data.countryitems.map((dat)=>{
                    worldkeys=Object.keys(dat)
                worldkeys.map((val)=>{
                  listy1.push({country:dat[val].title,value:dat[val].total_cases})
                  listy2.push({country:dat[val].title,value:dat[val].total_active_cases})
                  listy3.push({country:dat[val].title,value:dat[val].total_recovered})
                  listy4.push({country:dat[val].title,value:dat[val].total_deaths})
                })
    
              })
             
              locs1=listy1.sort(function(a,b){return b.value - a.value});
              locs2=listy2.sort(function(a,b){return b.value - a.value});
              locs3=listy3.sort(function(a,b){return b.value - a.value});
              locs4=listy4.sort(function(a,b){return b.value - a.value});
    
              sortedlisty1=[locs1[0],locs1[1],locs1[2],locs1[3],locs1[4],locs1[5],locs1[6],locs1[7],locs1[8],locs1[9]]
              sortedlisty2=[locs2[0],locs2[1],locs2[2],locs2[3],locs2[4],locs2[5],locs2[6],locs2[7],locs2[8],locs2[9]]
              sortedlisty3=[locs3[0],locs3[1],locs3[2],locs3[3],locs3[4],locs3[5],locs3[6],locs3[7],locs3[8],locs3[9]]
              sortedlisty4=[locs4[0],locs4[1],locs4[2],locs4[3],locs4[4],locs4[5],locs4[6],locs4[7],locs4[8],locs4[9]]
    
              sortedlisty1.map((val)=>{toptentotal[val.country]=(val.value).toString()})
              sortedlisty2.map((val)=>{toptenrecovered[val.country]=(val.value).toString()})
              sortedlisty3.map((val)=>{toptenactive[val.country]=(val.value).toString()})
              sortedlisty4.map((val)=>{toptendeaths[val.country]=(val.value).toString()})
              
              setGlobaltoptenactive(toptenactive)
              setGlobaltoptencases(toptentotal)
                setGlobaltoptenrecovered(toptenrecovered)
                setGlobaltoptendeaths(toptendeaths)    
              
            })
             
             
        
       
      
          .catch((err) => {
            console.log("Error from API");
          });
      }
      getGlobaltopten()

      function getGlobalSeries() {
  

        var globaltotalseries={}
        var globalactiveseries={}
        var globalrecoveredseries={}
        var globaldeathseries={}
    
        let worlddatekeys=[];
        axios
          .get("https://covidapi.info/api/v1/global/count")
          .then((res) => {console.log(res.data.result["2020-01-22"].confirmed)
                worlddatekeys=Object.keys(res.data.result)
              worlddatekeys.map((date)=>{
                globaltotalseries[date]=res.data.result[date].confirmed
                globalactiveseries[date]=res.data.result[date].confirmed-res.data.result[date].recovered
                globalrecoveredseries[date]=res.data.result[date].recovered
                globaldeathseries[date]=res.data.result[date].deaths
               
              })
              setGlobalcasesseries(globaltotalseries)
              setGlobalactiveseries(globalactiveseries)
              setGlobalrecoveredseries(globalrecoveredseries)
              setGlobaldeathsseries(globaldeathseries)
            })
             
             
        
       
      
          .catch((err) => {
            console.log("Error from API");
          });
      }
      getGlobalSeries()
    
    
    
  
  

  return (
    <div className="container-fluid">
      <h3>Covid-19 Global Dashboard</h3>
    <div className="row" style={{ marginLeft: 150 }}>
  <div className="col-lg-2" style={{backgroundColor: "#f6968d",color:"white",fontSize:"25px"}}>
    <h3 style={{color:"white"}}>Total </h3><br />{globalcases}<br/>
    
    </div>
    <div className="col-lg-1"></div>
  <div className="col-lg-2"  style={{backgroundColor: "#70a0be",color:"white",fontSize:"25px"}}><h3 style={{color:"white"}}>Active</h3><br />{globalactive}</div>
  <div className="col-lg-1"></div>
      <div className="col-lg-2" style={{ backgroundColor: "#61c1a1",color:"white",fontSize:"25px"}}><h3 style={{color:"white"}}>Recovered </h3><br />{globalrecovered}</div>
      <div className="col-lg-1"></div>
  <div className="col-lg-2" style={{backgroundColor: "#5f575f",color:"white",fontSize:"25px"}}><h3 style={{color:"white"}}>Deaths</h3><br />{globaldeaths}</div>
  
  </div><br/>

    <div className="container" >
    <div className="row">
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px"}}>
            <h3 className="no-margin center">Global Confirmed Cases </h3><br />
              <LineChart data={globalcasesseries} ></LineChart>  
            </div>
            
            <div className="col-lg-2" style={{height:"400px"}}>
            
            </div>
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px"}}>
            <h3 className="no-margin center">Global Active Cases</h3><br />
              <ColumnChart data={globalactiveseries} ></ColumnChart>  
            </div>
         
          </div><br /><br />
          <div className="row">
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px"}}>
            <h3 className="no-margin center">Global Recovered Cases</h3><br />
              <ColumnChart data={globalrecoveredseries} ></ColumnChart>  
            </div>
            
            <div className="col-lg-2" style={{height:"400px"}}>
            
            </div>
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px"}}>
            <h3 className="no-margin center">Global Death Cases</h3><br />
              <LineChart data={globaldeathsseries} ></LineChart>  
            </div>
         
          </div><br /><br />



          <div className="row" >
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px",boxShadow:"5px"}}>
            <h3 className="no-margin center">Top10 countries with highest total Cases</h3><br />
              <BarChart data={globaltoptencases} ></BarChart>
            </div>
            
            <div className="col-lg-2" style={{height:"400px"}}>

            </div>
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px"}}>
            <h3 className="no-margin center">Top10 countries with highest active Cases</h3><br />
              <BarChart data={globaltoptenactive} ></BarChart>
            </div>
             
          
         
          </div><br /><br />
          <div className="row">
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px"}}>
            <h3 className="no-margin center">Top10 countries with highest Recovered Cases</h3><br />
              <BarChart data={globaltoptenrecovered} ></BarChart>
            </div>
            
            <div className="col-lg-2" style={{height:"400px"}}>

            </div>
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px"}}>
            <h3 className="no-margin center">Top10 countries with highest death Cases</h3><br />
              <BarChart data={globaltoptendeaths} ></BarChart>  
            </div>
         
          </div><br /><br />
         
          
        </div>
        </div>
    
  );
}

export default Worldcharts;
