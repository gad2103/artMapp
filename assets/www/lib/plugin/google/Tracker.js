Ext.ns('Ext.plugin.google');

Ext.define('Ext.plugin.google.Tracker', {
    extend: 'Ext.Map',
    requires: ['Ext.device.Geolocation','Ext.device.Notification'],
    xtype: 'trackmap',
    // default styles for map and lines here
    config: {
        geo: true, //BROKEN?!
        frequency: 1000,
        watchId: null,
        marker: null, // pass in marker
        polyOptions: {
            strokeColor: '#000',
            strokeOpacity: 0.6,
            strokeWeight: 3
        },
        poly: null,
        allowHighAccuracy: true,
        mapOptions: {                        
            zoom : 15,
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
        Ext.plugin.google.mapObj = this;
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
        // stop any running trackers
        if (this.watchId) {
            this.stopTrack();
        }
        Ext.plugin.google.mapObj = this;
        var mapObj = this,
        watchOpts = {
            timeout: mapObj.getFrequency(),
            enableHighAccuracy: mapObj.getAllowHighAccuracy()
        };
        mapObj.watchId = navigator.geolocation.watchPosition(mapObj.watchPositionSuccess, mapObj.watchPositionError, watchOpts);
    },
    stopTrack: function(){
        navigator.geolocation.clearWatch(this.watchId);
    },
    watchPositionSuccess: function(position){
        var mapObj = Ext.plugin.google.mapObj,
        marker = ( mapObj.getMarker() || new window.google.maps.Marker({map: mapObj.getMap()}) ),
        poly = mapObj.getPoly(),
        latLng,
        path,
        currLat = position.coords.latitude,
        currLong = position.coords.longitude,
        map = mapObj.getMap();
        mapObj.setMarker(marker);
        console.log(mapObj.getMarker());
        poly.setMap(map);
        path = poly.getPath();
        //if ( lastLat != null && ( currLat != lastLat || currLong != lastLong ) ) {
        if ( currLat === null || currLong === null ) return;
            latLng = new window.google.maps.LatLng(currLat,currLong);            
            //console.log(latLng);
            map.panTo(latLng);
            marker.setPosition(latLng); //TODO animate this along the path from last to current position so its smooth.
            path.push(latLng);
        //}
    },
    watchPositionError: function(err){
        Ext.device.Notification.show({
            title: 'GPS Error',
            message: 'Please check to ensure GPS is enabled on your device',
            buttons: Ext.MessageBox.OK,
            callback: function(button){
                mapObj.setStartTracking(false);
                console.log('OK hit');
            }
        });
    },
    resumeTracking: function(){
        this.startTracking(true);
    }
});
