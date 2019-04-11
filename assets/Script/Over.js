var Global = require("Global");
cc.Class({
    extends: cc.Component,

    properties: {
        score:cc.Label
       
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {

        this.score.string='分数:'+Global.Soure;
        cc.log('分数:'+Global.Soure);

     },

    ReSetGame:function(){
        cc.director.loadScene("MainScene");
    },


    start () {

    },

    // update (dt) {},
});
