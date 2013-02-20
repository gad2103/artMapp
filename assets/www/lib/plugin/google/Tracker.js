Ext.ns('Ext.plugin.google');

Ext.define('Ext.plugin.google.Tracker', {
    extend: 'Ext.Map',
    xtype: 'trackmap',
    // default styles for map and lines here
    config: {
        frequency: 3000,
        marker: null, // pass in marker
        trackSuspended: false,
        polyOptions: {
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 3
        },
        poly: null,
        allowHighAccuracy: true,
        styles: [
            {
            stylers: [
                { hue: "#00ffe6" },
                { saturation: -20 }
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
        mapOptions: {                        
            zoom : 12,
            mapTypeId : google.maps.MapTypeId.ROADMAP,
            styles: this.styles,
            navigationControl: false,
            streetViewControl: false,
            navigationControlOptions: {
                style: google.maps.NavigationControlStyle.DEFAULT
            }
        }
    },

    /**
     * Initialize the plugin, binding to the host Ext.Map instance
     * @param {Ext.Map} host
*/
    initialize: function() {
        this.callParent(arguments);
        this.setPoly(new google.maps.Polyline(this.getPolyOptions));
        this.on('maprender', this.startTracking());
    },

    changePoly: function(options) {
        var polyOpts = this.getPolyOptions();
        for ( prop in options ) {
            polyOpts[prop] = options[prop];
        }
        this.setPolyOptions(polyOpts);
        this.setPoly = new google.maps.Polyline(this.getPolyOptions());
    },
    startTracking: function(isResume) {
        this.stopTracking();
        var gm = (window.google || {}).maps,
        marker = ( this.getMarker() || new gm.Marker({map: this}) ),
        poly = (isResume) ? new gm.Polyline(this.getPolyOptions()) : this.getPoly(),
        lastLat,lastLong,latLng;

        //get reference to parent map
        poly.setMap(this.getHost().getMap());
        var path = poly.getPath();
        this.watchPosition({
            frequency: this.getFrequency(),
            allowHighAccuracy: this.getAllowHighAccuracy(),
            callback: function(position) {
                var currLat = position.coords.latitude,
                currLong = position.coords.longitude;
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
    stopTracking: function(){
        Ext.device.Geolocation.clearWatch();
    },
    resumeTracking: function(){
        this.startTracking(true);
    }
});
