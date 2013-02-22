Ext.ns('Ext.plugin.google');

Ext.define('Ext.plugin.google.Tracker', {
    extend: 'Ext.Map',
    requires: 'Ext.device.Geolocation',
    xtype: 'trackmap',
    // default styles for map and lines here
    config: {
        geo: true, //BROKEN?!
        frequency: 3000,
        marker: null, // pass in marker
        polyOptions: {
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 3
        },
        poly: null,
        allowHighAccuracy: true,
        mapOptions: {                        
            zoom : 12,
            mapTypeId : google.maps.MapTypeId.ROADMAP,
            navigationControl: false,
            streetViewControl: false,
            styles: [
                {
                stylers: [
                    { hue: "#00ffe6" },
                    { saturation: -80 }
                ]
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [
                    { lightness: 100 },
                    { visibility: "simplified" }
                ]
            },
            {
                featureType: "road",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
                ]
            },
            {
                featureType: "poi",
                elementType: "labels.text",
                stylers: [
                    { "visibility": "off" }
                ]
            },
            {
                featureType: "poi",
                elementType: "labels.icon",
                stylers: [
                    { "visibility": "off" }
                ]
            },
            {
                featureType: "administrative",
                elementType: "labels.text",
                stylers: [
                    { "visibility": "off" }
                ]
            }
            ],
            navigationControlOptions: {
                style: google.maps.NavigationControlStyle.DEFAULT
            }
        },
        startTracking: 'init' 
    },
    /**
     * Initialize the plugin, binding to the host Ext.Map instance
     * @param {Ext.Map} host
*/
    initialize: function() {
        this.callParent(arguments);
    },
    applyPolyOptions: function(optionsObj) {
        return optionsObj;
    },
    updatePolyOptions: function(optionsObj) {
        this.setPolyOptions(optionsObj);
        this.setPoly(new google.maps.Polyline(optionsObj));
    },
    changePoly: function(options) {
        var polyOpts = this.getPolyOptions();
        for ( prop in options ) {
            polyOpts[prop] = options[prop];
        }
        this.setPolyOptions(polyOpts);
        this.setPoly = new google.maps.Polyline(this.getPolyOptions());
    },
    applyStartTracking: function(bool){
        return bool;
    },
    updateStartTracking: function(bool){
        if ( bool === true ) {
            this.startTrack();
        } else if ( bool === false ) {
            this.stopTrack();
        } 
    },
    startTrack: function() {
        if ( this.stopTrack ) {
            this.stopTrack();
        }
        var gm = (window.google || {}).maps,
        mapObj = this,
        marker = ( mapObj.getMarker() || new gm.Marker({map: mapObj.getMap()}) ),
        poly = mapObj.getPoly(),
        lastLat,
        lastLong,
        latLng,
        map = mapObj.getMap();
        //get reference to parent map
        poly.setMap(map);
        var path = poly.getPath();
        // this might not be necessary in production. we just need to useCurrentLocation on the map...
        Ext.device.Geolocation.getCurrentPosition({
            success: function(position) {
                lastLat = position.coords;
                lastLong = position.coords;
                mapObj.setMapCenter(lastLat,lastLong);
            },
            failure: function(){
                console.log('could not get initial position');
            }
        });
        Ext.device.Geolocation.watchPosition({
            frequency: mapObj.getFrequency(),
            allowHighAccuracy: mapObj.getAllowHighAccuracy(),
            callback: function(position) {
                var currLat = position.coords.latitude,
                currLong = position.coords.longitude;
                if ( lastLat != null && ( currLat != lastLat || currLong != lastLong ) ) {
                    latLng = new gm.LatLng(currLat,currLong);            
                    console.log(latLng);
                    map.panTo(latLng);
                    marker.setPosition(latLng); //TODO animate this along the path from last to current position so its smooth.
                    path.push(latLng);
                }
                lastLat = currLat;
                lastLong = currLong;
            },
            failure: function(){
                console.log('fuck, something happened with the geolocation');
            }
        });
    },
    stopTrack: function(){
        Ext.device.Geolocation.clearWatch();
    },
    resumeTracking: function(){
        this.startTracking(true);
    }
});
