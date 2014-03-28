/**
 * Created by ko on 17.03.14.
 */
'use strict'
var PortfolioBox = (function(){
    var panels = {'panel-1':'#bl-panel-work-items',
                  'panel-2':'#bl-panel-webapps-items',
                  'panel-3':'#bl-panel-graphics-items'
        },
        $workPanel,
        $workPanelItems,
        totalWorkPanelItems,
        $nextWorkItem,
        currentWorkPanel,
        $panel,
        isAnimating = false,
    //close Panel
        $closeWorkItem,
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
        $('#menu').find('div > span > i').each(function(){
            var $menu = $(this);
            $menu.on('click', function(){
                $workPanel =$(panels[$(this).data('panel')]);
                $workPanelItems = $workPanel.children('div');
                totalWorkPanelItems = $workPanelItems.length;
                $nextWorkItem = $workPanel.find('nav > span.bl-next-work');
                $closeWorkItem = $workPanel.find('nav > span.bl-icon-close');
                $workPanel.addClass('bl-panel-items-show');
                $panel = $workPanelItems.eq(0);//$workPanel.find("[data-panel='panel-1']");
                currentWorkPanel = 0;//$panel.index();
                console.log('menu '+currentWorkPanel);
                $panel.addClass('bl-show-work');
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
                        if( !$( event.target ).is( 'div' ) )
                            return false;
                        $( this ).off( transEndEventName ).removeClass( 'bl-hide-current-work' );
                        isAnimating = false;
                    } );

                    if( !supportTransitions ) {
                        $currentPanel.removeClass( 'bl-hide-current-work' );
                        isAnimating = false;
                    }

                    $nextPanel.addClass( 'bl-show-work' );

                    event.preventDefault();

                } );
                // clicking the work panels close button: the current work panel slides down and the section scales up again
                $closeWorkItem.on( 'click', function( event ) {
                    $workPanel.removeClass( 'bl-panel-items-show' );
                    $workPanelItems.eq( currentWorkPanel ).removeClass( 'bl-show-work' );

                    return false;

                } );
                ga('send', 'event', $(this).data('panel'), 'clicked');

                return false;
            });
        });
    } var slide=true;
    $('#bars').click(function(){

        if (slide){
        $(this).addClass('slide');
        $('.about').addClass('slide');
        } else {
            $('.about').removeClass('slide');
            $(this).removeClass('slide');
        }
        slide=!slide;
    });
    function init(){
        initEvents();
    }
    return { init : init };
})();