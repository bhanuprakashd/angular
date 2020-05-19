import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';

import LinearGradient from './LinearGradient.js';
import './App.css';
import Axios from 'axios';

/**
* Courtesy: https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json
* Looking topojson for other countries/world? 
* Visit: https://github.com/markmarkoh/datamaps
*/
const WORLD_TOPO_JSON = require('./Topologies/countries.json');



// Red Variants
const COLOR_RANGE = [
  '#FFFAFA',
  '#F4C2C2',
  '#FF6961',
  '#FF5C5C',
  '#FF1C00',
  '#FF0800',
  '#FF0000',
  '#CD5C5C',
  '#E34234',
  '#D73B3E',
  '#CE1620',
  '#CC0000',
  '#B22222',
  '#B31B1B',
  '#A40000',
  '#800000',
  '#701C1C',
  '#3C1414'
];

const DEFAULT_COLOR = '#EEE';

const getRandomInt = () => {
  return parseInt(Math.random() * 100);
};

const geographyStyle = {
  default: {
    outline: 'none'
  },
  hover: {
    fill: '#ccc',
    transition: 'all 250ms',
    outline: 'none'
  },
  pressed: {
    outline: 'none'
  }
};






function Worldmap() {
  const [tooltipContent, setTooltipContent] = useState('');
  const [data, setData] = useState([]);

  function getWorld(){
    let indexes=[];
    let locs=[];
    let countries=[];
    //console.log(WORLD_TOPO_JSON.objects.ne_110m_admin_0_countries.geometries[0].properties.NAME)
    Axios
    .get("https://api.thevirustracker.com/free-api?countryTotals=ALL")
    .then((res)=>{//console.log(res.data.countryitems["0"]["1"].total_cases)
    countries=WORLD_TOPO_JSON.objects.ne_110m_admin_0_countries
    indexes=Object.keys(res.data.countryitems["0"])
      
      res.data.countryitems.map((dtx)=>{//console.log(dtx["1"].title)
        indexes.map((idx)=>{//console.log(dtx[idx].title)
        countries.geometries.map((rtx)=>{//console.log(rtx.properties.NAME)
          if(rtx.properties.NAME===dtx[idx].title){
            locs.push({NAME:rtx.properties.NAME,value:{"Total":dtx[idx].total_cases,"Active":dtx[idx].total_active_cases,"Recovered":dtx[idx].total_recovered,"Deaths":dtx[idx].total_deaths}})
          }
        })
        
        })
        setData(locs)
        
      })
      
    })
  
  
    .catch((err) => {
      console.log("Error from API");
    })
  }
  getWorld()


 

  const colorScale = scaleQuantile()
    .domain(data.map(d => d.value.Total))
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current = { value: 'NA' }) => {
    return () => {
      setTooltipContent(`${geo.properties.NAME} 
      Total: ${current.value.Total}
      Active:${current.value.Active}
      Recovered:${current.value.Recovered}
      Deaths:${current.value.Deaths}
      `);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent('');
  };


  return (
    <div className="full-width-height container">
      <h1 className="no-margin center">World Map</h1>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
        <ComposableMap
          projectionConfig={{
            rotate: [-10, 0, 0],
            scale: 100
          }}
          projection="geoMercator"
          
          data-tip=""
        >
          <Geographies geography={WORLD_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                //console.log(geo.id);
                const current = data.find(s => s.NAME === geo.properties.NAME);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={current ? colorScale(current.value.Total) : DEFAULT_COLOR}
                    style={geographyStyle}
                    onMouseEnter={onMouseEnter(geo, current)}
                    onMouseLeave={onMouseLeave}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
        
    </div>
  );
}

export default Worldmap;
