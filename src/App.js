import React, {useState} from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import './App.css';




function App() {

 
  
  const redOptions = { color: 'red' }
  const[poly, setPoly] = useState([[]]);
  const [latLng, setlatLng] = useState([38.907192, -77.036873]);
  const [latLngMarker2, setMark2] = useState([39.28302812808919 ,-76.61933898925781]);
  var [distance, setDistance] = useState(0);
  
  
//   const MapEvents = () => {
//     useMapEvents({
//       click(e) {
//         // setState your coords here
//         //const [coords, setCoords] = useState(null);
//         // coords exist in "e.latlng.lat" and "e.latlng.lng"
//         setCoords([e.latlng.lat,e.latlng.lng]);
//         coordinates = coords;
       
//         console.log(coordinates, "coordinates");

 

        
//         //console.log(e.latlng.lat);
//         //console.log(e.latlng.lng);
//       },
//     });
//     return coordinates;
// }





function toRadian(degree)
{
  //57.29577951 
  return degree * Math.PI/180;
}




function calculateDistance(delLat, delLong)
{
 var a = Math.pow(Math.sin(delLat/2.0), 2) + Math.cos(toRadian(cordsMarker1[0])) * Math.cos(toRadian(cordsMarker2[0])) * Math.pow(Math.sin(delLong/2.0), 2);
 var c = 2 * Math.asin(Math.sqrt(a));
 
  // var c = 2 *  Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //var r= 6371.0; // in KM
 var r = 3958.8; //in miles
 
  //return r * 2 * Math.asin( Math.min(1, Math.sqrt( ( Math.pow(Math.sin( (cordsMarker2[0] - cordsMarker1[0]) / 2.0), 2.0) + Math.cos(cordsMarker1[0]) * Math.cos(cordsMarker2[0]) * Math.pow(Math.sin((cordsMarker2[1] - cordsMarker1[1]) / 2.0), 2.0) ) ) ) );
   
  return  r * c;
  

}

var cordsMarker1 =[38.907192, -77.036873];
var cordsMarker2=[39.28302812808919 ,-76.61933898925781];




  return (
   

    <MapContainer center={[38.907192, -77.036873]} zoom={12}scrollWheelZoom={true}>
      <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    
     <Polyline pathOptions={redOptions} positions={poly} /> 
    
    <Marker   position={latLng} eventHandlers={{
    click: (e) => {
  						//var dis_miles = dis_km * 0.6213711922; //since 1km = 0.6213711922 miles
							//var dis_feets =  dis_km * 3280.84; //since 1km=3280.84 feets
      
              cordsMarker1 = [e.latlng.lat, e.latlng.lng];
      setlatLng([cordsMarker1[0], cordsMarker1[1]]);
      setMark2([cordsMarker2[0], cordsMarker2[1]]);
       var deltaLat =toRadian(cordsMarker2[0]  - cordsMarker1[0]);
       var deltaLong =toRadian(cordsMarker2[1] - cordsMarker1[1]);
       
       
       setDistance(calculateDistance(deltaLat, deltaLong));
       distance = distance.toFixed(2);
       setPoly( [[cordsMarker1[0], cordsMarker1[1]] , [cordsMarker2[0], cordsMarker2[1]]]);
     
    
     


      
       console.log("distance " + distance);
       console.log("Marker 1");
       console.log(cordsMarker1[0] + " cords marker 1 " + cordsMarker1[1]);
      
    }, 
    
  } }  draggable>  <Popup>{"Miles:  " + distance.toFixed(2) + " Km: " + (distance * 1.609).toFixed(2) }</Popup>  </Marker>
    
     <Marker position={latLngMarker2} eventHandlers={{
    click: (e) => {
       cordsMarker2 = [e.latlng.lat, e.latlng.lng]; 
      //57.29577951
       console.log("Distance: " + distance);
       console.log("Marker 2");
       console.log(cordsMarker2[0] + " cords marker 2 " + cordsMarker2[1]);
      
    },
  }}draggable></Marker>




       </MapContainer>

    
  
  );
}

export default App;