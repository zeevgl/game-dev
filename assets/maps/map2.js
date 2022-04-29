(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("map2",
{ "compressionlevel":-1,
 "height":16,
 "infinite":false,
 "layers":[
        {
         "data":[26, 26, 26, 26, 0, 0, 0, 39, 39, 39, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 39, 39, 39, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0,
            39, 39, 0, 0, 0, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0,
            39, 39, 39, 39, 39, 39, 39, 39, 39, 0, 0, 0, 0, 0, 39, 39,
            39, 39, 0, 0, 0, 0, 0, 0, 39, 39, 39, 39, 39, 39, 39, 39,
            0, 0, 0, 0, 0, 0, 0, 39, 39, 0, 0, 0, 0, 0, 39, 39,
            0, 0, 0, 0, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 1, 1, 0, 0, 0, 39, 39, 39, 39, 0, 0, 0, 0, 0, 0],
         "height":16,
         "id":1,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":16,
         "x":0,
         "y":0
        }],
 "nextlayerid":2,
 "nextobjectid":1,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.8.4",
 "tileheight":16,
 "tilesets":[
        {
         "columns":8,
         "firstgid":1,
         "image":"FreeCuteTileset\/Tileset.png",
         "imageheight":96,
         "imagewidth":128,
         "margin":0,
         "name":"Tileset",
         "spacing":0,
         "tilecount":48,
         "tileheight":16,
         "tilewidth":16
        }],
 "tilewidth":16,
 "type":"map",
 "version":"1.8",
 "width":16
});