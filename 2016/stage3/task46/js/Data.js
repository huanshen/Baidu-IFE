    
    //获取屏幕的尺寸
    var CANVAS_WIDTH=document.getElementsByTagName('body')[0].offsetWidth,  
        CANVAS_HEIGHT=document.getElementsByTagName('body')[0].offsetHeight,
        KEY_CODES = {   //键盘的值与对应的方向
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        },
        KEY_STATUS = {  //记录是否向某方向移动
            'left':false,
            'top':false,
            'right':false,
            'down':false
        },
        MAP={                                   //这个游戏的地图，主要记录障碍物（1）和空地（0），
            arr:[],                             //二维数组
            width:CANVAS_WIDTH,                 //地图宽度
            height:CANVAS_HEIGHT,
            cell_width:30,                      //每小格宽度
            cell_height:30,
            rows:parseInt(CANVAS_WIDTH/30)+1,   //地图横行格数
            cols:parseInt(CANVAS_HEIGHT/30)+1
        };
