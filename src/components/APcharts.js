import React, { useState } from 'react';

import axios from 'axios';

import './App.css';
import { LineChart, PieChart,ColumnChart,BarChart } from 'react-chartkick'
import 'chart.js'
import 'math-abs';


function APcharts() {
 
  const[aptotalseries,setApTotalSeries]=useState([])
  const[apdischargedseries,setApDischargedSeries]=useState([])
 
  const[apdeathseries,setApDeathSeries]=useState([])

  const[topfivetotals,setTopfivetotals]=useState([])
  const[topfivedeaths,setTopfivedeaths]=useState([])
  const[topfiveActive,setTopfiveActive]=useState([])
  const[topfiveRecovered,setTopfiveRecovered]=useState([])

  const[total,setTotal]=useState(0)
  const[deaths,setDeaths]=useState(0)
  const[active,setActive]=useState(0)
  const[recovered,setRecovered]=useState(0)

  function getAPSeries() {
 
    let stconfirmed={};
    let strecovered={};
    let stdeceased={};
    let stlength=0;
    axios
      .get("https://api.covid19india.org/states_daily.json")
      .then((res) => {//console.log(res.data.states_daily[0].ap)
        stlength=res.data.states_daily.length
        for(let i=0;i<stlength;i++){
          if(res.data.states_daily[i].status==="Confirmed" & res.data.states_daily[i].ap!=null){
            stconfirmed[res.data.states_daily[i].date]=res.data.states_daily[i].ap
          }
          else if(res.data.states_daily[i].status==="Recovered" & res.data.states_daily[i].ap!=null){
            strecovered[res.data.states_daily[i].date]=res.data.states_daily[i].ap
          }
          else if(res.data.states_daily[i].status==="Deceased" & res.data.states_daily[i].ap!=null){
            stdeceased[res.data.states_daily[i].date]=res.data.states_daily[i].ap
          }
          
        }
      
     
      setApDeathSeries(stdeceased)
      setApDischargedSeries(strecovered)
      setApTotalSeries(stconfirmed)
      })
  
      .catch((err) => {
        console.log("Error from API");
      });
  }
  getAPSeries()


  function getAPdistrictstopfive() {
 
   

    var topfivetotal={}
    var topfiveactive={}
    var topfiverecovered={}
    var topfivedeaths={}

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
    axios
      .get("https://api.covid19india.org/v2/state_district_wise.json")
      .then((res) => {//console.log(res.data[1].districtData)
        res.data[1].districtData.map((cases)=>{
          listy1.push({district:cases.district,value:cases.confirmed})
          listy2.push({district:cases.district,value:cases.active})
          listy3.push({district:cases.district,value:cases.recovered})
          listy4.push({district:cases.district,value:cases.deceased})
        })

          locs1=listy1.sort(function(a,b){return b.value - a.value});
          locs2=listy2.sort(function(a,b){return b.value - a.value});
          locs3=listy3.sort(function(a,b){return b.value - a.value});
          locs4=listy4.sort(function(a,b){return b.value - a.value});

          sortedlisty1=[locs1[0],locs1[1],locs1[2],locs1[3],locs1[4]]
          sortedlisty2=[locs2[0],locs2[1],locs2[2],locs2[3],locs2[4]]
          sortedlisty3=[locs3[0],locs3[1],locs3[2],locs3[3],locs3[4]]
          sortedlisty4=[locs4[0],locs4[1],locs4[2],locs4[3],locs4[4]]

          sortedlisty1.map((val)=>{topfivetotal[val.district]=(val.value).toString()})
          sortedlisty2.map((val)=>{topfiverecovered[val.district]=(val.value).toString()})
          sortedlisty3.map((val)=>{topfiveactive[val.district]=(val.value).toString()})
          sortedlisty4.map((val)=>{topfivedeaths[val.district]=(val.value).toString()})

          setTopfivetotals(topfivetotal)
          setTopfiveRecovered(topfiverecovered)
          setTopfiveActive(topfiveactive)
          setTopfivedeaths(topfivedeaths)

    
      })
  
      .catch((err) => {
        console.log("Error from API");
      });
  }
  getAPdistrictstopfive()
 
  function getAPtotal() {
 
    

    axios
      .get("https://api.covid19india.org/data.json")
      .then((res) => {//console.log(res.data.statewise)
        res.data.statewise.map((state)=>{
          if(state.state==="Andhra Pradesh"){
            setTotal(state.confirmed)
            setActive(state.active)
            setRecovered(state.recovered)
            setDeaths(state.deaths)
          }
        })
    
      })
  
      .catch((err) => {
        console.log("Error from API");
      });
  }
  getAPtotal()
 
  
  

  return (
    <div className="container-fluid">
      <h3>Covid-19 Andhra Pradesh Dashboard</h3>
    <div className="row" style={{ marginLeft: 100 }}>
  <div className="col-lg-2" style={{backgroundColor: "#f6968d",color:"white",fontSize:"25px"}}>
    <h3 style={{color:"white"}}>Total </h3><br />{total}<br/>
    
    </div>
    <div className="col-lg-1"></div>
  <div className="col-lg-2"  style={{backgroundColor: "#70a0be",color:"white",fontSize:"25px"}}><h3 style={{color:"white"}}>Active</h3><br />{active}</div>
  <div className="col-lg-1"></div>
      <div className="col-lg-2" style={{ backgroundColor: "#61c1a1",color:"white",fontSize:"25px"}}><h3 style={{color:"white"}}>Recovered </h3><br />{recovered}</div>
      <div className="col-lg-1"></div>
  <div className="col-lg-2" style={{backgroundColor: "#5f575f",color:"white",fontSize:"25px"}}><h3 style={{color:"white"}}>Deaths</h3><br />{deaths}</div>
  
  </div><br/>

    <div className="container" >
          <div className="row" >
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px",boxShadow:"5px"}}>
            <h3 className="no-margin center">Daily Confirmed Cases</h3><br />
              <LineChart data={aptotalseries} ></LineChart>
            </div>
            
            <div className="col-lg-2" style={{height:"400px"}}>

            </div>
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px"}}>
            <h3 className="no-margin center">Daily Recovered Cases</h3><br />
              <ColumnChart data={apdischargedseries}></ColumnChart>
            </div>
             
          
         
          </div><br /><br />
          <div className="row">
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px"}}>
            <h3 className="no-margin center">Daily Death Cases</h3><br />
            <LineChart data={apdeathseries} ></LineChart>
            </div>
            
            <div className="col-lg-2" style={{height:"400px"}}>
            
            </div>
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px"}}>
                <h3 className="no-margin center">Top 5 districts with highest cases</h3><br />
                <BarChart data={topfivetotals} ></BarChart>
            </div>
         
          </div><br /><br />
          <div className="row">
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px"}}>
            <h3 className="no-margin center">Top 5 districts with Active cases</h3><br />
            <LineChart data={topfiveActive} ></LineChart>
            </div>
            
            <div className="col-lg-2" style={{height:"400px"}}>
            
            </div>
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px"}}>
                <h3 className="no-margin center">Top 5 districts with highest Recovery</h3><br />
                <BarChart data={topfiveRecovered} ></BarChart>
            </div>
         
          </div><br /><br />
          <div className="row">
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px"}}>
            <h3 className="no-margin center">Top 5 districts with Death cases</h3><br />
            <LineChart data={topfivedeaths} ></LineChart>
            </div>
            
            <div className="col-lg-2" style={{height:"400px"}}>
            
            </div>
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px"}}>
                
            </div>
         
          </div><br /><br />
          
        </div>
        </div>
    
  );
}

export default APcharts;
