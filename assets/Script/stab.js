
cc.Class({
    extends: cc.Component,

    properties: {
        stab: cc.Node,
        intervalStab: 500,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {


        
        var self = this;

        self.schedule(function () {

            var locationInNode = self.stab.getPosition();
           // cc.log(locationInNode);
            var ToUp =cc.moveTo(1,cc.p(locationInNode.x,locationInNode.y+self.intervalStab));
            self.stab.runAction(ToUp);
            //self.setPosition(cc.p(locationInNode.x, locationInNode.y + self.intervalStab))

        }, 1)

    },

    start() {

    },

    update (dt) {

       // cc.log(this.stab.getBoundingBox());
        var player = cc.find("Canvas/normal").getComponent(cc.Sprite);
        if(this.stab.getBoundingBox().intersects(player.node.getBoundingBox()))
        {
            cc.log(this.stab.getBoundingBox());
            cc.log(player.node.getBoundingBox());
            cc.log('碰撞');
            cc.director.loadScene("OverScene");
        }

       
    
       


    },
});