Ext.define('AM.view.Main', {
    extend: 'Ext.Container',
    requires: [
    ],
    id: 'viewport',
    config: {
        layout: {
            type: 'fit'
        },
        fullscreen: true,
        items: [
            {
            xtype: 'titlebar',
            docked: 'top',
            title: 'ArtMapp',
            items: [
                {
                ui: 'back',
                text: 'back'
                }
            ]
        },
        {
            xtype: 'map',
            id: 'mainMap',
            //useCurrentLocation: true,
            polyOptions: {
                strokeColor: '#000000',
                strokeOpacity: 1.0,
                strokeWeight: 3
            },
            listeners: {
                maprender: function(comp, map) {
                    var poly = new google.maps.Polyline(this.config.polyOptions),
                    path = poly.getPath(),
                    latLng,
                    lat,
                    latCount=0,
                    geoLoc; //TODO delete this: was using for testing the polyline drawing...
                    poly.setMap(map);
                    Ext.merge(Ext.device.Geolocation, {test: 'FUCK'});// i guess we can use this to add methods to the geolocation function?see tracker plugin for methods...
                    Ext.device.Geolocation.watchPosition({
                        frequency: 3000,
                        allowHighAccuracy: true,
                        callback: function(position) {
                            if( lat != null && lat != position.coords.latitude){} // TODO make this check for both lat and long. if position has changed then draw else return
                            lat = position.coords.latitude + latCount;
                            latLng = new google.maps.LatLng(lat, position.coords.longitude);
                            path.push(latLng);
                            map.panTo(latLng);//TODO remove this is just for testing in static location
                            console.log(lat);
                            latCount+=.0025;
                        },
                        failure: function(){}
                    });
                    var styles = [
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
                    ]; 
                    var mopts = {
                        gabe: 'TEST',
                        zoom : 12,
                        mapTypeId : google.maps.MapTypeId.ROADMAP,
                        styles: styles,
                        navigationControl: false,
                        streetViewControl: false,
                        navigationControlOptions: {
                            style: google.maps.NavigationControlStyle.DEFAULT
                        },
                        mapTypeControlOptions: {
                            mapTypeIds: []
                        } 
                    }
                    map.setOptions(mopts);
                    console.log(map);
                }
            }
        }
        ],
    }
});
