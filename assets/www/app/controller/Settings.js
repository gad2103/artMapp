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
        console.log('controller fired');
        Ext.getCmp('viewport').setActiveItem(1);
    }
});
