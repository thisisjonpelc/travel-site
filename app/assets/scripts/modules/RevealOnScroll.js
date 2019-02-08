import $ from 'jquery';
import waypoints from './../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll{
    constructor(itemsToReveal, offset){
        this.itemsToReveal = itemsToReveal;
        this.offset = offset;
        
        this.hideInitially();
        this.createWaypoints();
    }

    hideInitially(){
        this.itemsToReveal.addClass('reveal-item');
    }

    createWaypoints() {
        var that = this;
        this.itemsToReveal.each(function() {
            const currentItem = this;
            new Waypoint({
                element: currentItem,
                handler: () => {
                    $(currentItem).addClass('reveal-item--is-visible');
                },
                offset: that.offset
            });
        });
    }
}

export default RevealOnScroll;