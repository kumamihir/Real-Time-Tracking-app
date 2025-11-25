Pehle check karo ki browser geolocation support karta hai ya nahi.
Agar support nahi karta toh user ko bata do ki location fetch nahi ho sakti.

Geolocation ke options set karo:

High accuracy ON

Timeout: 5 seconds

MaximumAge: 0 (fresh location data)

watchPosition use karo taaki user ki location continuously track hoti rahe.
Matlab jaise jaise user move karega, tumhara code uski nayi location deta rahega.

Latitude aur longitude ko socket ke through emit karo event name "send-location" ke saath.
Agar error aaye toh console me log kar do.

Map initialize karo

Center initially (0,0) rakho (default location)

Zoom: 15

Leaflet ka use karo CDN vala le lena(recommended hai ye!!)

OpenStreetMap tiles map me add karo

Ek empty object markers banao
Ye isliye taaki har user ka marker store ho sake.

Jab socket se location data mile, tab:

id, latitude, aur longitude nikaalo

Map ko us fresh location par center karo

Marker update logic:

Agar us id ka marker pehle se exist karta hai → uski position update kar do

Agar marker nahi hai → naya marker banao aur map par add karo

Jab koi user disconnect ho jaaye, toh:

Uska marker map se remove karo(caching nhi rkhni h !);

markers object me se bhi delete kar do