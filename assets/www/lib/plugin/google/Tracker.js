Ext.ns('Ext.plugin.google');

Ext.define('Ext.plugin.google.Tracker', {
    extend: 'Ext.Map',
    requires: 'Ext.device.Geolocation',
    xtype: 'trackmap',
    // default styles for map and lines here
    config: {
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
        }
        ],
            navigationControlOptions: {
                style: google.maps.NavigationControlStyle.DEFAULT
            }
        },
        startTracking: true
    },
    /**
     * Initialize the plugin, binding to the host Ext.Map instance
     * @param {Ext.Map} host
*/
    initialize: function() {
        //this.on('maprender', this.startTrack());
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
        } else {
            return false;
        }
    },
    startTrack: function() {
        if ( this.stopTrack ) {
            this.stopTrack();
        }
        var gm = (window.google || {}).maps,
        marker = ( this.getMarker() || new gm.Marker({map: this.getMap()}) ),
        poly = this.getPoly(),
        lastLat,lastLong,latLng;

        //get reference to parent map
        poly.setMap(this.getMap());
        var path = poly.getPath();
        Ext.device.Geolocation.watchPosition({
            frequency: this.getFrequency(),
            allowHighAccuracy: this.getAllowHighAccuracy(),
            callback: function(position) {
                var currLat = position.coords.latitude,
                currLong = position.coords.longitude;
                console.log(position);
                if ( lastLat != null && ( currLat != lastLat && currLong != lastLong ) ) {
                    latLng = new gm.LatLng(currLat,currLong);            
                    marker.setPosition(latLng);
                    path.push(latLng);
                }
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
