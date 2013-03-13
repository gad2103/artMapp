Ext.define('AM.view.map.Mapp', {
    extend: 'Ext.Container',
    requires: [
        'Ext.plugin.google.Tracker',
    ],
    xtype: 'main-mapp',
    id: 'mapWrapper',
    config: {
        layout: {
            type: 'fit'
        },
        fullscreen: true,
        items: [
            {
            xtype: 'titlebar',
            docked: 'top',
            id: 'mainToolbar',
            title: 'Mappiness',
            items: [
                {
                ui: 'back',
                text: 'Settings'
            }]
        },/*
            {
            xtype: 'titlebar',
            docked: 'top',
            title: 'ArtMapp',
            items: [
                {
                ui: 'back',
                text: 'back'
            }]
        },*/
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
