/**
* Map Options form
*/
// TODO create colorpicker plugin/view and add initialize function to set up color picker modal dialog
Ext.define('AM.view.map.Settings', {
    extend: 'Ext.form.Panel',
    requires: [], //should put the hsl picker in here,
    id: 'mapSettings',
    xtype: 'map-settings',
    config: {
        scrollable: true,
        items: [
            {
            xtype: 'toolbar',
            docked: 'top',
            title: 'Mappiness',
            items: [
                {
                xtype: 'spacer'
            },
                {
                xtype: 'button',
                ui: 'action',
                text: 'Start!',
                handler: function() {
                    this.parent.parent.fireEvent("showTrackMap",this.parent.parent);
                }
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Your Mapp Stylez',
            instructions: 'Please enter the information above.',
            defaults: {
                //required: true,
                labelAlign: 'top',
                labelWidth: '50%',
            },
            items: [
                {
                xtype: 'textfield',
                name: 'mapName',
                label: 'give it a name',
                required: true,
                autoCapitalize: false
            }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Customize Your Map',
            defaults: {
                //required: true,
                labelAlign: 'top',
                labelWidth: '50%',
            },
            items: [
                {
                xtype: 'textfield', //TODO
                name: 'mapHue',
                inputCls: 'colorpicker',
                readOnly: true,
                label: 'give it a color'
            },
            {
                xtype: 'textfield',
                name: 'roadHue',
                label: 'road color',
                readOnly: true,
                inputCls: 'colorpicker'
            },
            {
                xtype: 'textfield',
                name: 'highwayHue',
                label: 'highway color',
                readOnly: true,
                inputCls: 'colorpicker'
            },
            {
                xtype: 'togglefield',
                name: 'showLabels',
                label: 'map labels'
            }
            ]
        },{
            xtype: 'fieldset',
            title: 'Customize Your Path',
            defaults: {
                //required: true,
                labelAlign: 'top',
                labelWidth: '50%',
            },

            items: [
                {
                xtype: 'textfield',
                name: 'strokeColor',
                label: 'color',
                readOnly: true,
                inputCls: 'colorpicker'
            },
            {
                xtype: 'sliderfieldextended',
                name: 'strokeWeight',
                label: 'thickness',
                labelText: 'thickness',
                value: 1,
                minValue: 1,
                maxValue: 5,
                increment: 1
            },
            {
                xtype: 'sliderfieldextended',
                name: 'strokeOpacity',
                label: 'opacity',
                labelText: 'opacity',
                value: .75,
                minValue: 0,
                maxValue: 1,
                increment: .25
            }
            ]
        },{
            xtype: 'fieldset',
            title: 'Transportation Method',
            items: [
                {
                xtype: 'selectfield',
                name: 'transportationType',
                valueField: 'rank',
                displayField: 'title',
                store: {
                    data: [
                        { rank: 'walking', title: 'Walk'},
                        { rank: 'driving', title: 'Drive'},
                        { rank: 'biking', title: 'Bike'},
                    ]
                }
            }
            ]
        }
        ]
    },
    initialize: function() {
        var me = this,
        colorDialog;
        me.callParent();
        me.element.on({
            tap: function(list, index, target, record, e, eOpts){
                //console.log(index);
                var self = this;
                if (self.overlay) {
                    self.overlay.destroy();
                }
                self.overlay = Ext.Viewport.add({
                    xtype: 'panel',
                    modal: true,
                    centered: true,
                    hideOnMaskTap: true,
                    html: '<div id="colorpicker" class="cp-default"></div>',
                    width: 273,
                    height: 231
                });
                ColorPicker(document.getElementById('colorpicker'), function(hex,hsv,rgb){
                    index.value = hex;
                    index.style.background = hex;
                });
                self.overlay.show();
            },
            delegate: 'input.colorpicker'
        });
    }
});
