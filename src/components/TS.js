import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import './App.css';



/**
* Courtesy: https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json
* Looking topojson for other countries/world? 
* Visit: https://github.com/markmarkoh/datamaps
*/
const TS_TOPO_JSON = require('./Topologies/telangana.json');

const PROJECTION_CONFIG = {
  scale: 350,
  center: [78.9629, 22.5937] // always in [East Latitude, North Longitude]
};

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




function TS() {

  const [tooltipContent, setTooltipContent] = useState('');
  const[data,setData]=useState([])

  function getRegional() {
   
    let locs=[];
    let districts=[];
    axios
      .get("https://api.covid19india.org/state_district_wise.json")
      .then((res) => {
      
      districts=Object.keys(res.data["Telangana"].districtData)
      

      
      districts.map((dtx)=>{
        TS_TOPO_JSON.objects.telangana_district.geometries.map((rtx)=>{
          if(rtx.properties.district===dtx){
              locs.push({dt_code:rtx.properties.dt_code,district:dtx,
                value:{"Total":  res.data["Telangana"].districtData[dtx].confirmed,
                "Active":  res.data["Telangana"].districtData[dtx].active,
                "Recovered":  res.data["Telangana"].districtData[dtx].recovered,
                "Deaths": res.data["Telangana"].districtData[dtx].deceased
                }})
          }
          return(locs)
        })
      
         return(locs)
        })
          setData(locs)
  
      })
  
      .catch((err) => {
        console.log("Error from API");
      });
      
  }
  getRegional()
  
  

  const colorScale = scaleQuantile()
    .domain(data.map(d => d.value.Total))
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current = { value: 'NA' }) => {
  
    return () => {
      
      setTooltipContent(`${geo.properties.district}: 
      Total:${current.value.Total}
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
      <h1 className="no-margin center">Telangana State</h1>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
        <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          width={600}
          height={220}
          data-tip=""
        >
          <Geographies geography={TS_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                //console.log(geo.id);
                const current = data.find(s=>s.dt_code===geo.properties.dt_code);
                //console.log("TESTING")
                //console.log(current)
                //console.log("OUT")
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

export default TS;
