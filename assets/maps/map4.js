(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("map4",
{ "compressionlevel":-1,
 "height":9,
 "infinite":false,
 "layers":[
        {
         "data":[1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28,
            1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0,
            0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 9, 0, 0, 0, 0,
            9, 9, 9, 9, 9, 9, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 28],
         "height":9,
         "id":1,
         "name":"ground",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }, 
        {
         "draworder":"topdown",
         "id":2,
         "name":"platform",
         "objects":[
                {
                 "height":70,
                 "id":3,
                 "name":"first",
                 "rotation":0,
                 "type":"platform",
                 "visible":true,
                 "width":420,
                 "x":0,
                 "y":560
                }, 
                {
                 "height":70,
                 "id":4,
                 "name":"second",
                 "rotation":0,
                 "type":"platform",
                 "visible":true,
                 "width":490,
                 "x":630,
                 "y":560
                }, 
                {
                 "height":280,
                 "id":5,
                 "name":"wall",
                 "rotation":0,
                 "type":"wallZ",
                 "visible":true,
                 "width":70,
                 "x":1050,
                 "y":280
                }, 
                {
                 "height":70,
                 "id":6,
                 "name":"third",
                 "rotation":0,
                 "type":"platform",
                 "visible":true,
                 "width":280,
                 "x":1120,
                 "y":280
                }, 
                {
                 "height":70,
                 "id":18,
                 "name":"",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":70,
                 "x":210,
                 "y":280
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "x":0,
         "y":0
        }, 
        {
         "draworder":"topdown",
         "id":5,
         "name":"npcs",
         "objects":[
                {
                 "height":70,
                 "id":20,
                 "name":"enemy1",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":70,
                 "x":700,
                 "y":490
                }, 
                {
                 "height":70,
                 "id":28,
                 "name":"",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":70,
                 "x":1120,
                 "y":140
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "x":0,
         "y":0
        }],
 "nextlayerid":6,
 "nextobjectid":29,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.8.4",
 "tileheight":70,
 "tilesets":[
        {
         "columns":12,
         "firstgid":1,
         "image":"tiles_spritesheet.png",
         "imageheight":856,
         "imagewidth":852,
         "margin":0,
         "name":"test1",
         "spacing":0,
         "tilecount":144,
         "tileheight":70,
         "tilewidth":70
        }],
 "tilewidth":70,
 "type":"map",
 "version":"1.8",
 "width":20
});