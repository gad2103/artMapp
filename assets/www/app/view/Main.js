Ext.define('AM.view.Main', {
    extend: 'Ext.Container',
    requires: [
        'AM.view.map.Settings', 'AM.view.map.Mapp'
    ],
    id: 'viewport',
    config: {
        layout: {
            type: 'card',
            animation: {
                type: 'flip'
            }
        },
        fullscreen: true,
        items: [
            {
            xtype: 'titlebar',
            docked: 'top',
            id: 'mainToolbar',
            title: 'ArtMapp',
            items: [
                {
                ui: 'action',
                text: 'Start Mapping!'
            }]
        },{
            xtype: 'map-settings'
        },{
            xtype: 'main-mapp'
        }
        ],
    }
});
