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
            xtype: 'fieldset',
            title: 'Your Mapp Stylez',
            instructions: 'Please enter the information above.',
            defaults: {
                //required: true,
                labelAlign: 'left',
                labelWidth: '40%'
            },
            items: [
                {
                xtype: 'textfield',
                name: 'name',
                label: 'give it a name',
                required: true,
                autoCapitalize: false
                }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Customize Your Map',
                items: [
                    {
                    xtype: 'textfield', //TODO
                    name: 'color',
                    inputCls: 'colorpicker',
                    readOnly: true,
                    label: 'give it a color'
                    },
            {
                xtype: 'textfield',
                name: 'roadColor',
                label: 'road color',
            },
            {
                xtype: 'textfield',
                name: 'highwayColor',
                label: 'highway color'
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
                items: [
            {
                xtype: 'textfield',
                name: 'pathColor',
                label: 'color',
            },
            {
                xtype: 'sliderfieldextended',
                name: 'pathWeight',
                label: 'thickness',
                labelText: 'thickness',
                value: 1,
                minValue: 1,
                maxValue: 5,
                increment: 1
            },
            {
                xtype: 'sliderfieldextended',
                name: 'pathOpacity',
                label: '(in)visibility',
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
            },

        // Create a docked bottom toolbar which will contain buttons to trigger various functions in our formpanel.
        {
            xtype: 'toolbar',
            docked: 'bottom',
            items: [
            { xtype: 'spacer' },
            // Finally we add a Save button which will mask the formpanel, and update the current record in the formpanel with
            // the latest values from the formpanel.
            {
                text: 'Save',
                ui: 'confirm',
                scope: this,
                handler: function() {
                    var form = this.form;

                    // Mask the form
                    form.setMasked({
                        xtype: 'loadmask',
                        message: 'Saving...'
                    });

                    // Put it inside a timeout so it feels like it is going to a server.
                    setTimeout(function() {
                        if (form.user) {
                            // Call the updateRecord method of formpanel with the user record instance. This will update the user record
                            // with the latest values.
                            form.updateRecord(form.user, true);
                        }

                        // Unmask the formpanel
                        form.setMasked(false);
                    }, 1000);
                }
            }
            ]
        }
        ]
    }
});
