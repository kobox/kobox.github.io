var PortfolioBox = (function(){
    var panels = ['#bl-panel-work-items','#bl-panel-webapps-items','#bl-panel-graphics-items'],
        $workPanel = $('#bl-panel-work-items'),
        $workPanelItems = $workPanel.children('div'),
        totalWorkPanelItems = $workPanelItems.length,
        $nextWorkItem = $workPanel.find('nav > span.bl-next-work'),
        isAnimating = false,
        //close Panel
        $closeWorkItem = $workPanel.find('nav > span.bl-icon-close'),
        transEndEventNames = {
            'WebkitTransition' : 'webkitTransitionEnd',
            'MozTransition' : 'transitionend',
            'OTransition' : 'oTransitionEnd',
            'msTransition' : 'MSTransitionEnd',
            'transition' : 'transitionend'
        },
        // transition end event name
        transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
        // support css transitions
        supportTransitions = Modernizr.csstransitions;

    function initEvents(){
        $('#websites').on('click', function(){
            $workPanel.addClass('bl-panel-items-show');
            var $panel = $workPanel.find("[data-panel='panel-1']");
            currentWorkPanel = $panel.index();
            $panel.addClass('bl-show-work');
            //return false;
            console.log(currentWorkPanel);
        });
        // navigating the work items: current work panel scales down and the next work panel slides up
        $nextWorkItem.on( 'click', function( event ) {

            if( isAnimating ) {
                return false;
            }
            isAnimating = true;

            var $currentPanel = $workPanelItems.eq( currentWorkPanel );
            currentWorkPanel = currentWorkPanel < totalWorkPanelItems - 1 ? currentWorkPanel + 1 : 0;
            var $nextPanel = $workPanelItems.eq( currentWorkPanel );

            $currentPanel.removeClass( 'bl-show-work' ).addClass( 'bl-hide-current-work' ).on( transEndEventName, function( event ) {
                if( !$( event.target ).is( 'div' ) ) return false;
                $( this ).off( transEndEventName ).removeClass( 'bl-hide-current-work' );
                isAnimating = false;
            } );

            if( !supportTransitions ) {
                $currentPanel.removeClass( 'bl-hide-current-work' );
                isAnimating = false;
            }

            $nextPanel.addClass( 'bl-show-work' );

            return false;

        } );

        // clicking the work panels close button: the current work panel slides down and the section scales up again
        $closeWorkItem.on( 'click', function( event ) {

            // scale up main section
            //$sectionWork.removeClass( 'bl-scale-down' );
            $workPanel.removeClass( 'bl-panel-items-show' );
            $workPanelItems.eq( currentWorkPanel ).removeClass( 'bl-show-work' );

            return false;

        } );


}

    function init(){
        initEvents();
    };
    return { init : init };
})();