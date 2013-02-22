Ext.define('AM.view.Main', {
    extend: 'Ext.Container',
    requires: [
        'Ext.plugin.google.Tracker',
    ],
    id: 'viewport',
    config: {
        layout: {
            type: 'fit'
        },
        fullscreen: true,
        items: [{
            xtype: 'titlebar',
            docked: 'top',
            title: 'ArtMapp',
            items: [
                {
                ui: 'back',
                text: 'back'
            }]
        },
        {
            xtype: 'trackmap',
            id: 'mainMap',
            listeners: {
                maprender: function(cmp, map) {
                    cmp.setStartTracking(true);
                }
            }
        }],
    }
});
