# Visualize Maps App v2

This app was developed to explore and practice implementing some of the functionalities offered by the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/reference). The [@agm/core](https://angular-maps.com/) (Angular Maps) plugin was also utilized.
<br><br>

A user can search for any specific place on Google Maps via text, or the user can drag the map to a specific spot on the map. Then the user can click 'Visualize' on that location to fetch images from that spot on the map (nearby locations are also included).
<br><br>

The following stack was used for this app:<br>
Ionic | Angular | Firebase
<br><br>

The app is deployed to the following URL:<br>
[https://bit.ly/visualize-maps](https://bit.ly/visualize-maps)
<br><br>
NOTE: To run a local copy of this project, make sure to include your own Google Maps API key in `src/environments/environment.ts`:
```
export const environment = {
  production: false,
  gmapsApiKey: 'YOUR-API-KEY'
};
```
And in `src/environments/environment.prod.ts`:
```
export const environment = {
  production: true,
  gmapsApiKey: 'YOUR-API-KEY'
};
```
To serve from a local server, run `ionic serve` or `firebase serve`.
