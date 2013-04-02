Ext.define("AM.controller.Settings",{
    extend: "Ext.app.Controller",
    config: {
        refs: {
            settingsContainer: "map-settings",
            mapContainer: "main-mapp"
        },
        control: {
            settingsContainer: {
                showTrackMap: "onShowTrackMap"
            }
        }
    },
    onShowTrackMap: function() {
        var mapSettings, confVals,
        mapView;
        mapSettings = this.getSettingsContainer();
        confVals = mapSettings.getValues();
        if (confVals.name) {
            mapView = this.getMapContainer();
            mapView.getDockedItems()[0].setTitle(confVals.name);
        }
        this.storeMapConfig(confVals);
        Ext.getCmp('viewport').setActiveItem(1);
    },
    storeMapConfig: function(options) {
        var mapOpts, polyOpts, _mapOpts;
        localStorage['mapCurrent'] = Ext.JSON.encode(options);
       mapOpts = Ext.JSON.decode(localStorage['mapDefaults']);
       _mapOpts = mapOpts.mapOptions;
       polyOpts = mapOpts.polyLineOptions;
       polyOpts = this.savePolyOpts(options, polyOpts);
       _mapOpts = this.saveMapOpts(options, _mapOpts);
       mapOpts.polyLineOptions = polyOpts;
       mapOpts.mapOptions = _mapOpts;
       localStorage['mapDefaults'] = Ext.JSON.encode(mapOpts);
    },
    savePolyOpts: function(userOpts, polyDefault) {
       for ( name in polyDefault ) {
           if ( userOpts[name] ) {
               polyDefault[name] = userOpts[name];
           }
       };
       return polyDefault;
    },
    saveMapOpts: function(userOpts, mapDefaults) {
        Ext.Array.forEach(mapDefaults.styles, function(tem, index, arr){
            if (index === 0 && userOpts['hue']) {
                tem.stylers[0].hue = userOpts['hue'];
            } else if ( index > 0 ) {
                var styleArr = tem.stylers[0],
                value = userOpts[tem.featureType];
                if ( value ) {
                   if ( 'hue' in styleArr ) { 
                       styleArr.hue = value;
                   } else if ( 'color' in styleArr ) {
                       styleArr.color = value;
                   }
                } 
            }  
        });
        return mapDefaults;
    }
});
