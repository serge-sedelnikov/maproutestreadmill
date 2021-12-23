# maproutestreadmill
Favourite videos on YouTube organized on map for virtual treadmill running

# Setup

API to provide the list of routes and links to the YouTube videos.

Web UI as PWA to display, search and watch the videos.

# User Access

Sign in with Google, Microsoft Account.

# Roadmap

## MVP
1. Client displays map;
2. List of first 10 tracks to be coming from the JSON file;
3. Track need to contain the route points as GEO JSON;
4. Track metadata for search: 
   1. location (Country, City), 
   2. Duration (fetch from video??) 
   3. Link to the video on YouTube, 
   4. Type: walk, run, ...
5. Search and Filter on map: Type, Duration (short, long, ...)
6. Sign in with Google, Microsoft, etc...

## V1
7. API to provide a list of tracks, store them to CosmosDB;
8. API to store favourite routes for user;
9. Create own route - Link YouTube Video, locate on map, points on map;
10. Automatic videos discovery on YouTube via API and sending the to moderation.