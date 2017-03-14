(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('ccb.web', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick panel
            'app.quick-panel',

            'ccb.components'
        ]);
})();