import React, { useState } from 'react';

import axios from 'axios';

import './App.css';
import { LineChart, PieChart,ColumnChart,BarChart } from 'react-chartkick'
import 'chart.js'
import 'math-abs';




function App() {
 
  const[totalseries,setTotalSeries]=useState([])
  const[dischargedseries,setDischargedSeries]=useState([])
  const[activeseries,setActiveSeries]=useState([])
  const[deathseries,setDeathSeries]=useState([])

  const[totaldailyseries,setTotaldailySeries]=useState([])
  const[dischargeddailyseries,setDischargeddailySeries]=useState([])
  const[activedailyseries,setActivedailySeries]=useState([])
  const[deathdailyseries,setDeathdailySeries]=useState([])


  const[total,setTotal]=useState(0)
  const[discharged,setDischarged]=useState(0)
  const[active,setActive]=useState(0)
  const[deaths,setDeaths]=useState(0)
  
  const[topfivetotals,setTopfivetotals]=useState([])
  const[topfivedeaths,setTopfivedeaths]=useState([])
  const[topfiveActive,setTopfiveActive]=useState([])
  const[topfiveRecovered,setTopfiveRecovered]=useState([])

  function getSeries(){
    var totalseries={}
    var dischargedseries={}
    var deathseries={}
    var activeseries={}

    var totaldailyseries={}
    var dischargeddailyseries={}
    var deathdailyseries={}
    var activedailyseries={}

    let total=0;
    let dischargedCases=0;
    let activeCases=0;
    let totaldeaths=0;
    let latestupdatedindex=0


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
        .get("https://api.covid19india.org/data.json")
        .then((res) => {//console.log(res.data.cases_time_series)
          latestupdatedindex=res.data.cases_time_series.length-1
        //console.log(latestupdatedindex)
        total=res.data.cases_time_series[latestupdatedindex].totalconfirmed
        dischargedCases=res.data.cases_time_series[latestupdatedindex].totalrecovered
        totaldeaths=res.data.cases_time_series[latestupdatedindex].totaldeceased
        activeCases=res.data.cases_time_series[latestupdatedindex].totalconfirmed-res.data.cases_time_series[latestupdatedindex].totalrecovered

          setTotal(total)
          setDischarged(dischargedCases)
          setActive(activeCases)
          setDeaths(totaldeaths)

          for(let i=0;i<res.data.cases_time_series.length;i++){
            //console.log(res.data.cases_time_series[i].totalconfirmed)
            //let keyvalue=res.data.cases_time_series[i].totalconfirmed
            totalseries[res.data.cases_time_series[i].date.trim()+"2020"]=res.data.cases_time_series[i].totalconfirmed
            dischargedseries[res.data.cases_time_series[i].date.trim()+"2020"]=res.data.cases_time_series[i].totalrecovered
            activeseries[res.data.cases_time_series[i].date.trim()+"2020"]=res.data.cases_time_series[i].totalconfirmed-res.data.cases_time_series[i].totalrecovered
            deathseries[res.data.cases_time_series[i].date.trim()+"2020"]=res.data.cases_time_series[i].totaldeceased
            totaldailyseries[res.data.cases_time_series[i].date.trim()+"2020"]=res.data.cases_time_series[i].dailyconfirmed
            dischargeddailyseries[res.data.cases_time_series[i].date.trim()+"2020"]=res.data.cases_time_series[i].dailyrecovered
            activedailyseries[res.data.cases_time_series[i].date.trim()+"2020"]=Math.abs(res.data.cases_time_series[i].dailyconfirmed-res.data.cases_time_series[i].dailyrecovered)
            deathdailyseries[res.data.cases_time_series[i].date.trim()+"2020"]=res.data.cases_time_series[i].dailydeceased
          }

          setTotalSeries(totalseries)
          setDischargedSeries(dischargedseries)
          setActiveSeries(activeseries)
          setDeathSeries(deathseries)

          setTotaldailySeries(totaldailyseries)
          setDischargeddailySeries(dischargeddailyseries)
          setActivedailySeries(activedailyseries)
          setDeathdailySeries(deathdailyseries)



          for(let i=1;i<res.data.statewise.length;i++){
            listy1.push({state:res.data.statewise[i].state,value:(res.data.statewise[i].confirmed/total)*100})
            listy2.push({state:res.data.statewise[i].state,value:((res.data.statewise[i].recovered)/discharged)*100})
            listy3.push({state:res.data.statewise[i].state,value:((res.data.statewise[i].active)/active)*100})
            listy4.push({state:res.data.statewise[i].state,value:((res.data.statewise[i].deaths)/deaths)*100})
          }

          locs1=listy1.sort(function(a,b){return b.value - a.value});
          locs2=listy2.sort(function(a,b){return b.value - a.value});
          locs3=listy3.sort(function(a,b){return b.value - a.value});
          locs4=listy4.sort(function(a,b){return b.value - a.value});

          sortedlisty1=[locs1[0],locs1[1],locs1[2],locs1[3],locs1[4]]
          sortedlisty2=[locs2[0],locs2[1],locs2[2],locs2[3],locs2[4]]
          sortedlisty3=[locs3[0],locs3[1],locs3[2],locs3[3],locs3[4]]
          sortedlisty4=[locs4[0],locs4[1],locs4[2],locs4[3],locs4[4]]

          sortedlisty1.map((val)=>{topfivetotal[val.state]=(val.value).toString()})
          sortedlisty2.map((val)=>{topfiverecovered[val.state]=(val.value).toString()})
          sortedlisty3.map((val)=>{topfiveactive[val.state]=(val.value).toString()})
          sortedlisty4.map((val)=>{topfivedeaths[val.state]=(val.value).toString()})

          setTopfivetotals(topfivetotal)
          setTopfiveRecovered(topfiverecovered)
          setTopfiveActive(topfiveactive)
          setTopfivedeaths(topfivedeaths)

         

          



          
          //console.log(serieslist)
        })
        
    
        .catch((err) => {
          console.log("Error from API");
        });
  }
  getSeries()

 
 
  
  

  return (
    <div className="container-fluid">
      <h3>Covid-19 India Dashboard</h3>
    <div className="row" style={{marginLeft:"100px"}}>
  <div className="col-lg-2" style={{backgroundColor: "#f6968d",color:"white",fontSize:"25px"}}>
    <h3 style={{color:"white"}}>Total </h3><br />{total}<br/>
    
    </div>
    <div className="col-lg-1"></div>
  <div className="col-lg-2"  style={{backgroundColor: "#70a0be",color:"white",fontSize:"25px"}}><h3 style={{color:"white"}}>Active</h3><br />{active}</div>
  <div className="col-lg-1"></div>
      <div className="col-lg-2" style={{ backgroundColor: "#61c1a1",color:"white",fontSize:"25px"}}><h3 style={{color:"white"}}>Recovered </h3><br />{discharged}</div>
      <div className="col-lg-1"></div>
  <div className="col-lg-2" style={{backgroundColor: "#5f575f",color:"white",fontSize:"25px"}}><h3 style={{color:"white"}}>Deaths</h3><br />{deaths}</div>
  
  </div><br/>

    <div className="container" >
          <div className="row" >
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px",boxShadow:"5px"}}>
            <h3 className="no-margin center">Total Confirmed Cases</h3><br />
              <LineChart data={totalseries} ></LineChart>
            </div>
            
            <div className="col-lg-2" style={{height:"400px"}}>

            </div>
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px"}}>
            <h3 className="no-margin center">Total Active Cases</h3><br />
              <ColumnChart data={activeseries}></ColumnChart>
            </div>
             
          
         
          </div><br /><br />
          <div className="row">
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px"}}>
            <h3 className="no-margin center">Total Recovered Cases</h3><br />
            <LineChart data={dischargedseries} ></LineChart>
            </div>
            
            <div className="col-lg-2" style={{height:"400px"}}>
            
            </div>
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px"}}>
            <h3 className="no-margin center">Total Death Cases</h3><br />
            <ColumnChart data={deathseries} ></ColumnChart>
            </div>
         
          </div><br /><br />

          <div className="row" >
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px",boxShadow:"5px"}}>
            <h3 className="no-margin center">Daily Confirmed Cases</h3><br />
              <LineChart data={totaldailyseries} ></LineChart>
            </div>
            
            <div className="col-lg-2" style={{height:"400px"}}>

            </div>
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px"}}>
            <h3 className="no-margin center">Daily Active Cases</h3><br />
              <LineChart data={activedailyseries}></LineChart>
            </div>
             
          
         
          </div><br /><br />
          <div className="row">
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px"}}>
            <h3 className="no-margin center">Daily Recovered Cases</h3><br />
            <LineChart data={dischargeddailyseries} ></LineChart>
            </div>
            
            <div className="col-lg-2" style={{height:"400px"}}>
            
            </div>
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px"}}>
            <h3 className="no-margin center">Daily Death Cases</h3><br />
            <ColumnChart data={deathdailyseries} ></ColumnChart>
            </div>
         
          </div><br /><br />

          <div className="row">
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px"}}>
            <h3 className="no-margin center">Top 5 States with Highest cases</h3><br />
            <BarChart data={topfivetotals} ></BarChart>
            </div>
            
            <div className="col-lg-2" style={{height:"400px"}}>

            </div>
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px"}}>
            <h3 className="no-margin center">Top 5 States with Highest Death Rates</h3><br />
            <PieChart data={topfivedeaths} ></PieChart>
            </div>
         
          </div><br /><br />
          <div className="row">
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px"}}>
            <h3 className="no-margin center">Top 5 States with Highest Active cases</h3><br />
            <BarChart data={topfiveActive} ></BarChart>
            </div>
            
            <div className="col-lg-2" style={{height:"400px"}}>

            </div>
            <div className="col-lg-5" style={{backgroundColor:"white",height:"400px"}}>
            <h3 className="no-margin center">Top 5 States with Highest Recovered Rates</h3><br />
            <PieChart data={topfiveRecovered} ></PieChart>
            </div>
         
          </div><br /><br />

          
        </div>
        </div>
    
  );
}

export default App;
