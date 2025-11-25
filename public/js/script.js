
 //isse hi connection request backend pr jati hai!
 const socket = io("http://localhost:3000");
 
 if(navigator.geolocation){//navigator window obj me preinstalled ata h
    navigator.geolocation.watchPosition((position)=>{
        const {latitude,longitude} = position.coords;
        socket.emit("send-location",{latitude,longitude})
    },(error)=>{
        console.log("Your Browser Don't Support Geolocation have a good one first !",error);
    },
    {
        enableHighAccuracy:true,
        timeout:5000,
        maximumAge :0 //ise caching ruk jaegi
    }
)}

const map = L.map("map").setView([0,0],30); //asking for your location

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution : "Powered by Mihir!"
}).addTo(map)


const markers = {}

socket.on("recieve-location",(data)=>{
    const {id,latitude,longitude} = data;
    map.setView([latitude,longitude]);
    if(markers[id]){
        markers[id].setLatLng([latitude,longitude])
    }
    else{
        markers[id]=L.marker([latitude,longitude]).addTo(map)
    }
})


socket.on("User-Disconnected",(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id]
    }
})