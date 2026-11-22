const radians=Math.PI/180;
function distanceMetres(a,b){const dLat=(b[0]-a[0])*radians,dLon=(b[1]-a[1])*radians,q=Math.sin(dLat/2)**2+Math.cos(a[0]*radians)*Math.cos(b[0]*radians)*Math.sin(dLon/2)**2;return 6371000*2*Math.atan2(Math.sqrt(q),Math.sqrt(Math.max(0,1-q)));}
function evaluateProximity(fix,target,now=Date.now()){
 if(!fix||![fix.lat,fix.lon,fix.accuracy,fix.timestamp,...target].every(Number.isFinite)||Math.abs(fix.lat)>90||Math.abs(fix.lon)>180||Math.abs(target[0])>90||Math.abs(target[1])>180||fix.accuracy<0||now-fix.timestamp>20000||fix.timestamp-now>5000)return {state:'waiting',within:false,interval:0};
 const distance=distanceMetres([fix.lat,fix.lon],target);
 if(fix.accuracy>35)return {state:'uncertain',distance,within:false,interval:0};
 const within=distance+fix.accuracy<=100;
 return {state:within?'near':'tracking',distance,within,style:distance<100?'heavy':distance<250?'medium':'light',interval:distance>500?0:distance<100?1400:distance<250?2400:4000};
}
module.exports={distanceMetres,evaluateProximity};
