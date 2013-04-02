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
            cls: 'mainToolbar',
            title: 'GO!',
            items: [
                {
                ui: 'back',
                text: 'Settings'
            }]
        },
        {
            xtype: 'trackmap',
            id: 'mainMap',
            hidden: true,
            listeners: {
                maprender: function(cmp, map) {                     
                                        var mapOpts = Ext.JSON.decode(localStorage['mapDefaults']),
                    polyOptions = mapOpts.polyLineOptions;
                    cmp.setPolyOptions(polyOptions);
                    map.setOptions(mapOpts.mapOptions);
                    //cmp.setStartTracking(true);
                }
            }
        }],
    }, 
    initialize: function(){
            var me = this;
            me.onAfter('painted', function(){ Ext.getCmp('mainMap').show();});
    }
});
