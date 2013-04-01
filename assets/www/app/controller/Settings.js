Ext.define("AM.controller.Settings",{
    extend: "Ext.app.Controller",
    config: {
        refs: {
            settingsContainer: "map-settings"
        },
        control: {
            settingsContainer: {
                showTrackMap: "onShowTrackMap"
            }
        }
    },
    onShowTrackMap: function() {
        var mapView, confVals;
        mapView = this.getSettingsContainer();
        confVals = mapView.getValues();
        console.log(confVals);
        Ext.getCmp('viewport').setActiveItem(1);
    }
});
