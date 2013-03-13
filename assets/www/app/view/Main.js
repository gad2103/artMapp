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
                type: 'cover'
            }
        },
        fullscreen: true,
        items: [
{
            xtype: 'map-settings'
        },{
            xtype: 'main-mapp'
        }
        ],
        listeners: {
            delegate: '#mainToolbar button',
            tap: function(button) {
                var parent = Ext.getCmp('viewport');
                if ( button.getText() != "Settings" ){
                parent.setActiveItem(Ext.getCmp('mapWrapper'));
                }
                else {
                    parent.setActiveItem(Ext.getCmp('mapSettings'));
                }
            }
        }
    }
});
