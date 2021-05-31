this is a developpment project

build a web page for visualizing photos on a map. the page uses the leaflet , ign and mapbox api's.
gps coordinates are extract with the exif package.

Installation:
1/download the package.
2/ run npm install
2/create a ./dist/photos directory 
3/put your picture ine that photos directory
4/ type npm run exif on your console this will generate an exifdataFile.json file with gps coordinates for all the pictures found in the ./dist/photos directory
5/ run npm start and see the result on your navigator at localhost:9000