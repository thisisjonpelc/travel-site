import $ from 'jquery';
import smoothScroll from 'jquery-smooth-scroll';

import waypoints from './../../../../node_modules/waypoints/lib/noframework.waypoints';

export default class StickyHeader {
    constructor(){
        this.lazyImages = $('.lazyload');
        this.siteHeader = $('.site-header');
        this.headerTriggerElement = $('.large-hero__title');

        this.createHeaderWaypoint();

        this.pageSections = $('.page-section');
        this.headerLinks = $('.primary-nav a');
        this.createPageSectioinWayPoints();
        this.addSmoothScrolling();
        this.refreshWayPoints();
    }

    refreshWayPoints(){
        this.lazyImages.on('load', function(){
            Waypoint.refreshAll();
        });
    }

    addSmoothScrolling(){
        this.headerLinks.smoothScroll();
    }

    createHeaderWaypoint(){
        const that = this;
        new Waypoint({
            element: this.headerTriggerElement[0],
            handler: function (direction){
                if(direction === 'down'){
                    that.siteHeader.addClass('site-header--dark');
                }
                else{
                    that.siteHeader.removeClass('site-header--dark');
                }


            }
        });
    }

    createPageSectioinWayPoints(){
        const that = this;
        this.pageSections.each(function() {
            const currentPageSection = this;
            new Waypoint({
                element:currentPageSection,
                handler: (direction) => {
                    if(direction === 'down'){
                        const matchingHeaderLink = currentPageSection.getAttribute('data-matching-link');
                        that.headerLinks.removeClass('is-current-link');
                        $(matchingHeaderLink).addClass('is-current-link');
                    }

                },
                offset: '18%'
            });

            new Waypoint({
                element:currentPageSection,
                handler: (direction) => {
                    if(direction === 'up'){
                        const matchingHeaderLink = currentPageSection.getAttribute('data-matching-link');
                        that.headerLinks.removeClass('is-current-link');
                        $(matchingHeaderLink).addClass('is-current-link');
                    }

                },
                offset: '-40%'
            });
        });
    }
}