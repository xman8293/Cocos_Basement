var Global = require("Global");
cc.Class({
    extends: cc.Component,

    properties: {
        player: cc.Node,
        stab: cc.Prefab,

        intervalStab: 100, //地刺间距离
        diciCount: 0,//地刺数量

        StickToTime: 0,// 坚持事件
    },

    // LIFE-CYCLE CALLBACKS:

    CallBack: function () {

        this.InstantiateStab();
        this.StickToTime++;
    },

    onLoad() {

        this.setInputControl();
        for (var i = 0; i < 2; i++) {
            this.InstantiateStab();
        }
        this.schedule(this.CallBack, 1);



    },
    setInputControl: function () {
        var self = this;
        self.node.on(cc.Node.EventType.TOUCH_START, function (touches) {

            var target = touches.getCurrentTarget(); //获取事件所绑定的target
            var locationInNode = target.convertToNodeSpace(touches.getLocation());
            //cc.log('locationInNode: ' + locationInNode.x);
            if (locationInNode.x > self.node.width / 2) {
                // cc.log("click right");
                self.PlayerJumpRight();
            } else {
                // cc.log("click left");
                self.PlayerJumpLeft();
            }


        });
    },
    PlayerJumpLeft: function () {
        var goleft = cc.moveTo(0.2, cc.p(-this.node.width / 2 + 80, this.player.getPosition().y))
        var gol1 = cc.moveTo(0.1, cc.p(-this.node.width / 2 + 80 + 30, this.player.getPosition().y));
        var gol2 = cc.moveTo(0.1, cc.p(-this.node.width / 2 + 80, this.player.getPosition().y));
        var seq = cc.sequence(gol1, gol2);
        if (this.player.rotationY == -0) {
            this.player.runAction(seq);
        } else {
            this.player.rotationY = 0;
            this.player.runAction(goleft);
        }


    },
    PlayerJumpRight: function () {
        var goright = cc.moveTo(0.2, cc.p(this.node.width / 2 - 80, this.player.getPosition().y))
        var gor1 = cc.moveTo(0.1, cc.p(this.node.width / 2 - 80 - 30, this.player.getPosition().y));
        var gor2 = cc.moveTo(0.1, cc.p(this.node.width / 2 - 80, this.player.getPosition().y));
        var seq = cc.sequence(gor1, gor2);
        if (this.player.rotationY == 180) {
            this.player.runAction(seq);
        } else {
            this.player.rotationY = 180;
            this.player.runAction(goright);
        }



    },

    InstantiateStab: function () {

        this.diciCount++;
        var newstab = new cc.instantiate(this.stab);
        this.node.addChild(newstab);
        var randD = Math.random();
        if (randD > 0.5) {
            newstab.rotationY = 180;
        } else {
            newstab.rotationY = 0;
        }

        newstab.setPosition(this.SetstabPosition(randD));

    },
    SetstabPosition: function (randD) {

        var StabPositionX = 0;
        var StabPositionY = 0;
        StabPositionX = this.node.width / 2 - 80;
        if (randD > 0.5) {
            StabPositionX = -this.node.width / 2 + 80;
        }
        if (this.diciCount <= 8) {
            StabPositionY = (this.node.height / 2) - (this.intervalStab * this.diciCount) - this.intervalStab * 1;
        } else {
            StabPositionY = (this.node.height / 2) - (this.intervalStab * 8) - this.intervalStab * 1;
        }
        return cc.p(StabPositionX, StabPositionY);


    },

    start() {

    },

    // update (dt) {},
});