(function(window,document){
    //http://localhost/shen/album/newwaterfall.html
	
	function waterfall(param) {
        return new waterfall.prototype.init(param);
    }

    waterfall.prototype = {

        constructor: waterfall,
        minImgCount: 3,
        maxImgCount: 6,
        imgCounter: 0,
        flag      : 0,

        //初始化
        init: function(param) {

            var self = this;

            self.colsWidth = param.colsWidth;  //每一列的宽度来确定列数。
            self.colmargine=param.colmargine||20;
            self.colHeight=[0];
            self.colLeft=[0];
            self.wrap = $(param.wrap);
            self.width = self.wrap.offsetWidth; //获取div的宽度,一般情况下不推荐使用style.width
            self.wrap.className += ' waterfall';
            self.imgList = Array.prototype.slice.call($$('img', self.wrap));  //是变成数组的形式吗
            
            //弹出层初始化
            self.imgPop = $('#waterfall-pop') || null;
            if(!self.imgPop) {
                document.body.appendChild(create({id: "waterfall-pop"}));
                //self.wrap.innerHTML += '<div id="wowPhoto-pop"></div>'; 会导致self.wrap指向不正确
                self.imgPop = $('#waterfall-pop');
            }

            //弹出层点击黑色区域隐藏
            self.imgPop.addEventListener('click', function(event) {
                event = event || window.event;
                if(event.target.id === 'waterfall-pop') {
                    self.imgPop.className = self.imgPop.className.replace('show', '');
                }
            });

            window.addEventListener('resize', function() {
                self.update();
            });

            //为整个图片添加委托事件，这样就比较好；
            $(param.wrap).addEventListener('click', function(event) {

                event = event || window.event;
                var target = event.target;

                //弹出大图，就是当你点击的时候，就会产生大图片
                if (target.tagName.toLowerCase() === 'img') {
                    self.pop({src: target.src});
                }
            });

            self.widthchange(self.colsWidth); //调用widthChange确定每一列的间距等等。
            self.createCol(self.imgList);

            
        },

        createCol: function(imgList) {

            var self = this,
                tempList = {},
                divString="",
                temDiv="",
                j, k = 0, rowImgCounter = 0, prevImg,
                temple='<div class="wf" style="width:'+self.colsWidth+'px;height:{0}px;"><p>{1}</p><img src="{2}" style="height:{3}px;width:'+self.colsWidth+'px;"></div>';

            if(imgList.type && imgList.type.toLowerCase() === 'json') {

                var data = imgList.data;
                for (var key in data) {//key应该是代表每一个对象吧，只有这样才能解释后面的data[key].src


                    console.log(data[key].src);
                   // tempList.push(data[key]);
                    
                }
                console.log(data[0].src);
                imgList = data;
                console.log(data)
            }
            var len=imgList.length+self.imgCounter;

            for(var i=self.imgCounter; i<len; i++){
            	//console.log(imgList[i].src);
            	var height=self.random(300,500);
            	 divString+= temple.replacer([height,i+1, imgList[i-self.imgCounter].src, height-45]);
            	}
            		
            if (self.flag==0){
            	temDiv="";
            	self.flag=1;
            }else{
            	temDiv=self.wrap.innerHTML;
        	}

            self.wrap.innerHTML=temDiv+divString;
            //console.log(self.wrap.innerHTML);
            	
            self.setStyle(imgList);

        },

        //设置每个小块的样式，边距等等
        setStyle:function(imgList){
        	var self=this;
        	var wf=document.getElementsByClassName("wf");

             //设置每个小块的样式，边距等等
             var len=imgList.length+self.imgCounter;

            for(var i=self.imgCounter; i<len; i++){

            	//获取高度最小的一列的序号
                var lowcol=self.getMinCol(self.colHeight);
                //设置样式
                wf[i].style.left=self.colLeft[lowcol]+"px";
                wf[i].style.top=self.colHeight[lowcol]+"px";
                self.colHeight[lowcol]=wf[i].offsetHeight+wf[i].offsetTop+self.colmargine;//offsetTop是数值
                //console.log(wf[i].offsetHeight+"   "+wf[i].offsetTop)
            	self.imgCounter=i;
            }
            self.imgCounter=self.imgCounter+1;
            var maxcol=self.getMaxCol(self.colHeight);
            self.wrap.style.height=self.colHeight[maxcol]+"px";
            //console.log(maxcol);
            //console.log(maxcol);
        },

        update:function(){
            var self=this;
            var imgList=document.getElementsByClassName("wf");
            self.widthchange(self.colsWidth);
            self.imgCounter=0;
            self.setStyle(imgList);
        },

        random:function(m,n){
        return Math.ceil(Math.random()*(n-m)+m);
        },

        //获取页面的大小，从而调整列数。
        widthchange:function(imgWidth){
        	console.log(imgWidth);
        	var self=this;
           	var winWidth = document.body.clientWidth; //获取页面的宽度
            //console.log("ttt   "+document.documentElement.clientHeight);
            var cols=Math.floor((winWidth-40)/imgWidth);  //40是页面的两边的边距
            //console.log(self.imgWidth);
            var colsmar=Math.floor((winWidth-40-self.colmargine*(cols+1))/imgWidth); //列数
            //console.log(colsmar);
            self.cmargin=Math.floor(winWidth-imgWidth*colsmar-40)/(colsmar+1);  //每一列的间距    
            //console.log(cmargin);
            for(var i=0;i<colsmar;i++){
                self.colHeight[i]=self.colmargine;
                self.colLeft[i]=(i+1)*self.cmargin+i*imgWidth;
            }
            //console.log(self.colHeight);
            //console.log(colsmar)

        },

        //弹出函数
        pop: function (param) {

            var src,
                self = this,
                html = '<img src="{0}">';

            //判断传递过来的是图片src还是索引值
            src = param.src ? param.src : self.imgList[param].src;

            self.imgPop.innerHTML = html.replacer([src]);

            self.imgPop.className += ' show';

            return this;
        },

        //最小值的下标
        getMinCol:function(arr){
            var ca = arr,cl = arr.length,temp = ca[0],minc = 0;
            for(var ci = 0; ci < cl; ci++){
                if(temp > ca[ci]){
                    temp = ca[ci];
                    minc = ci;
                }
            }
            return minc;
        },
        getMaxCol:function(arr){
            var ca = arr,cl = arr.length,temp = ca[0],maxc = 0;
            for(var ci = 0; ci < cl; ci++){
                if(temp < ca[ci]){
                    temp = ca[ci];
                    maxc = ci;
                }
            }
            return maxc;
        },

        load: function(url, dealWith) {

            var self = this;

            self.wrap.appendChild(create({className: 'loading'}));

            var xhr = new XMLHttpRequest();

            xhr.open('get', url, true);
            xhr.send(null);

            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4) {
                    if(xhr.status == 200) {

                        $('.loading', self.wrap).remove();

                        var retData = dealWith(JSON.parse(xhr.responseText));

                        self.createCol(retData);  //传入creat当中
                    }
                }
            };

            return this;
        },

    }




    //获取元素
    function $(selector, context) {

        if(context) {
            return context.querySelector(selector);
        }
        return document.querySelector(selector);
    }

    //获取元素列表
    function $$(selector, context) {

        if(context) {
            return context.querySelectorAll(selector);
        }
        return document.querySelectorAll(selector);
    }

    //生成指定元素
    function create(param) {

        param = param || {};

        var ele = document.createElement(param.tag || 'div'),
            key;
        //如果有id就赋予其id
        if(param.id) {
            ele.id = param.id;
        }

        if (param.className) {
            ele.className = param.className;
        }

        if(param.style) {
            for(key in param.style) {
                ele.style[key] = param.style[key];
            }
        }

        if(param.attr) {
            for(key in param.attr) {
                ele.setAttribute(key, param.attr[key]);
            }
        }

        return ele;
    }

    String.prototype.replacer = function(arr) {

        var fullStr = this.toString();

        for(var i=0; i<arr.length; i++) {
            fullStr = fullStr.replace('{' + i + '}', arr[i]);
        }

        return fullStr;
    };
    waterfall.prototype.init.prototype = waterfall.prototype;
    window.waterfall = waterfall;
    
})(window,document);