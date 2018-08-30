var Vue = require("vue");
var vm = new Vue({
    el: '#app',
    data: {
        panel: undefined,
        isPause: true,
        size: 10, //大小
        speed: 0, //间距
        point: { x: 10, y: 0 }, //初始点 size的整数倍
        direction: { x: 0, y: 0 }, //方向
        rafId: undefined, //requestAnimationFrame id
        snakes: [],
        rate: 0, //速率
        upgrade: 10, //每吃10个等级加一
        eatFoodNum: 0, //记录吃到食物个数
        grade: 9, //当前等级 0-10
        maxGrade: 10,
        initLength: 3,
        isAdd: false, //是否加长
        panelWidth: 1200, //画板宽度
        panelHeight: 500, //画板长度
        food: { x: 0, y: 0, fillStyle: "#0000ff" }, //食物
    },
    mounted: function() {
        var that = this;
        that.$nextTick(function() {
            that.init();
            // that.animate();
        });
    },
    methods: {
        init: function() {
            var that = this;
            that.panel = document.getElementById("panel").getContext('2d');
            that.panel.canvas.width = that.panelWidth;
            that.panel.canvas.height = that.panelHeight;
            that.reStart();
            //绑定按键
            document.onkeyup = function(event) {
                var e = event || window.event;
                var keyCode = e.keyCode || e.which;
                switch (keyCode) {
                    //up
                    case 38:
                        // console.log("up");
                        that.direction.x = 0;
                        that.direction.y = -that.size;
                        break;
                        //down
                    case 40:
                        // console.log("down");
                        that.direction.x = 0;
                        that.direction.y = that.size;
                        break;
                        //left
                    case 37:
                        // console.log("left");
                        that.direction.x = -that.size;
                        that.direction.y = 0;
                        break;
                        //right
                    case 39:
                        // console.log("right");
                        that.direction.x = that.size;
                        that.direction.y = 0;
                        break;
                        //pause
                    case 32:
                        vm.pause();
                        break;
                }
            }
        },
        reStart: function() {
            var that = this;
            window.cancelAnimationFrame(that.rafId);
            that.rafId = 0;
            that.panel.clearRect(0, 0, that.panelWidth, that.panelHeight);
            that.snakes = [];
            that.grade = 0;
            that.rate = that.maxGrade - that.grade;
            that.tempRate = that.rate;
            that.direction.x = that.direction.x || that.size;
            that.direction.y = 0;
            for (var i = 0; i < that.initLength; i++) {
                if (i == 0) {
                    that.snakes.push({
                        point: { x: that.point.x, y: that.point.y },
                        fillStyle: "#FF0000"
                    });
                } else {
                    var x = that.snakes[i - 1].point.x - (that.speed + that.size);
                    that.snakes.push({
                        point: { x: x, y: that.snakes[i - 1].point.y },
                        fillStyle: "#00ff00"
                    });
                }
            }
            that.render();
            that.renderFood();
        },
        render: function() {
            var that = this;
            if (that.isAdd) {
                that.snakes.push({
                    point: {
                        x: that.snakes[that.snakes.length - 1].point.x - that.size - that.speed,
                        y: that.snakes[that.snakes.length - 1].point.y
                    },
                    fillStyle: "#00ff00"
                });
                //计算等级
                that.eatFoodNum += 1;
                if (that.eatFoodNum >= that.upgrade && that.grade < that.maxGrade) {
                    that.eatFoodNum = 0;
                    that.grade += 1;
                    that.rate -= 1;
                }
                that.isAdd = false;
            }
            for (var i = that.snakes.length - 1; i >= 0; i--) {
                // 蛇头
                if (i == 0) {
                    if (that.direction.x > 0) {
                        that.snakes[i].point.x += that.direction.x;
                    } else if (that.direction.x < 0) {
                        that.snakes[i].point.x += that.direction.x;
                    }
                    if (that.direction.y > 0) {
                        that.snakes[i].point.y += that.direction.y;
                    } else if (that.direction.y < 0) {
                        that.snakes[i].point.y += that.direction.y;
                    }
                    that.panel.fillStyle = that.snakes[i].fillStyle;
                    that.panel.beginPath();
                    // that.panel.fillRect(that.snakes[i].point.x, that.snakes[i].point.y, that.size, that.size);
                    that.panel.arc(that.snakes[i].point.x + that.size / 2, that.snakes[i].point.y + that.size / 2, that.size / 2, 0, 2 * Math.PI);
                    that.panel.fill();
                } else {
                    that.snakes[i].point.x = that.snakes[i - 1].point.x;
                    that.snakes[i].point.y = that.snakes[i - 1].point.y;

                    that.panel.fillStyle = that.snakes[i].fillStyle;
                    // that.panel.fillRect(that.snakes[i].point.x, that.snakes[i].point.y, that.size, that.size);
                    that.panel.fillRect(that.snakes[i].point.x+1, that.snakes[i].point.y+1, that.size-2, that.size-2);

                }
            }
        },
        renderFood: function(point) {
            var that = this;
            that.panel.fillStyle = that.food.fillStyle;
            if (point) {
                that.panel.fillRect(point.x, point.y, that.size, that.size);
            } else {
                that.food.x = parseInt(Math.random() * that.panelWidth / that.size) * that.size;
                that.food.y = parseInt(Math.random() * that.panelHeight / that.size) * that.size;
                that.panel.fillRect(that.food.x, that.food.y, that.size, that.size);
            }
        },
        raf: function(callback) {
            var raf = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 60);
                }
            return raf(callback);
        },
        animate: function(timeStamp) {
            var that = this;

            that.rafId = that.raf(that.animate);
            if (!that.isPause) {
                if (that.tempRate <= 0) {
                    that.play();
                    that.tempRate = that.rate;
                } else {
                    that.tempRate--;
                }
            }
        },
        play: function() {
            var that = this;
            // console.log("x:", that.point.x, "y:", that.point.y);
            that.panel.clearRect(0, 0, that.panelWidth, that.panelHeight);
            that.render();
            if (that.snakes.length <= 0) { console.error('snakes lenght 0!'); return false; }
            // 边界检测
            //向右走
            if (that.direction.x > 0) {
                if (that.snakes[0].point.x + that.size > that.panel.canvas.width) {
                    that.gameOver();
                }
                that.collideDetection("right");
            }
            //向左走
            if (that.direction.x < 0) {
                if (that.snakes[0].point.x < 0) {
                    that.gameOver();
                }
                that.collideDetection("left");
            }
            //向下走
            if (that.direction.y > 0) {
                if (that.snakes[0].point.y + that.size > that.panel.canvas.height) {
                    that.gameOver();
                }
                that.collideDetection("down");
            }
            //向上走
            if (that.direction.y < 0) {
                if (that.snakes[0].point.y < 0) {
                    that.gameOver();
                }
                that.collideDetection("up");
            }

        },
        //碰撞检测
        collideDetection: function(direction) {
            var that = this;
            if (that.snakes[0].point.x == that.food.x && that.snakes[0].point.y == that.food.y) {
                that.isAdd = true;
                that.renderFood();
            } else {
                that.renderFood(that.food);
            }
        },
        gameOver: function() {
            var that = this;
            that.isPause = true;
            window.cancelAnimationFrame(that.rafId);
            that.panel.font = "40px Georgia";
            that.panel.textBaseline = "top";
            that.panel.fillText("Game Over!", that.panelWidth/2-104, that.panelHeight/2-20);
        },
        start: function() {
            var that = this;
            that.isPause = false;
            if (!that.rafId) {
                that.animate();
            }
        },
        pause: function() {
            var that = this;
            that.isPause = true;
        },
        add: function() {
            var that = this;
            that.isAdd = true;
        }
    }
});