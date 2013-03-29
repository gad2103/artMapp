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
/            cls: 'mainToolbar',
            title: 'Mappiness',
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
                    cmp.setStartTracking(true);
                }
            }
        }],
    },
        initialize: function(){
            me = this;
            me.onAfter('painted', function(){ Ext.getCmp('mainMap').show();});
        }
});
