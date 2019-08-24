var mW=400;
var mH=400;

var mData=[
["血量",50],
["力量",60],
["敏捷",70],
["智力",80],
["幸運",90],
];

var mName="羊肉能力值";

var mCount=mData.length;//邊數
var mCenter=mW/2;//中心點
var mRadius=mCenter-50;//半徑
var mAngle=Math.PI*2/mCount;//角度

var mColorPolygon="#B8B8B8";//多邊形顏色
var mColorLines="#B8B8B8";//頂點連線顏色
var mColorText="#000000";//文字
/*
       //初始化
        (function () {

            document.getElementById("ability1_string").innerHTML = mData[0][0];//載入預設能力值名字
            document.getElementById("ability2_string").innerHTML = mData[1][0];
            document.getElementById("ability3_string").innerHTML = mData[2][0];
            document.getElementById("ability4_string").innerHTML = mData[3][0];
            document.getElementById("ability5_string").innerHTML = mData[4][0];
         
			alert("初始化成功");
            drawset();
        })();
*/
		
		function init(){
			document.getElementById("ability1_string").innerHTML = mData[0][0];//載入預設能力值名字
            document.getElementById("ability2_string").innerHTML = mData[1][0];
            document.getElementById("ability3_string").innerHTML = mData[2][0];
            document.getElementById("ability4_string").innerHTML = mData[3][0];
            document.getElementById("ability5_string").innerHTML = mData[4][0];
         
			alert("初始化成功");
            drawset();
		}

		
		
		//寫入值
        function SetData() {
            //getElementsByTagName 跟get其他方法取得的值型別不一樣
            var inputElement = document.getElementsByTagName("input");//需要判斷如果為空的話 直接return掉

            for (var i = 0; i < inputElement.length; i++) {

                if (inputElement[i].value == "") {
                    alert("輸入錯誤");
                    return;
                }

            }

            mName = inputElement[0].value + "能力值";

            mData[0][1] = GetInputValue(parseInt(inputElement[1].value));//最大為100
            mData[1][1] = GetInputValue(parseInt(inputElement[2].value));
            mData[2][1] = GetInputValue(parseInt(inputElement[3].value));
            mData[3][1] = GetInputValue(parseInt(inputElement[4].value));
            mData[4][1] = GetInputValue(parseInt(inputElement[5].value));

            drawset();
        }
		
		
		 //計算輸入進來的值
        function GetInputValue(value) {
            if (value > 100) {
                return 100;
            }
            else if (value < 0) {
                return 0;
            }
            else {
                return value;
            }
        }
		
		//畫圖
        function drawset() {

            //if (document.getElementById("radercanvas")) {
            //    alert("存在");
            //}
            //else {
            //    alert("不存在");
            //}

            var canvas = document.getElementById("radercanvas");
 
            document.body.appendChild(canvas);

            var mCtx = canvas.getContext('2d');

            canvas.height = mH;
            canvas.width = mW;

            drawPolygon(mCtx);
            drawLines(mCtx);
            drawLine1(mCtx);

            drawRegion(mCtx);
            drawCircle(mCtx);
            drawText(mCtx);


            drawName(mCtx);
        }

        function drawName(ctx) {
            ctx.save();

            //中心繪製文字
            ctx.font = "bold 30px Arial";
            ctx.fillStyle = '#1478FA'
            ctx.fillText(mName, 20, 25);

            ctx.restore();
        }

        function drawPolygon(ctx) {
            ctx.save();//保存Canvas的狀態
            ctx.strokeStyle = mColorPolygon;

            var r = mRadius / mCount;//半徑

            //畫五個圈
            for (var i = 0; i < mCount; i++) {
                ctx.beginPath();
                var currR = r * (i + 1);

                //畫5條邊
                for (var j = 0; j < mCount; j++) {
                    var x = mCenter + currR * Math.cos(mAngle * j);//角度 不知道怎麼算
                    var y = mCenter + currR * Math.sin(mAngle * j);

                    //alert("c:" + Math.cos(mAngle * j) + " s:" + currR * Math.sin(mAngle * j));

                    ctx.lineTo(x, y);
                }

                ctx.closePath();
                ctx.stroke();//ctx.fill(); 也可以
            }

            ctx.restore();
        }

        //頂點連線
        function drawLines(ctx) {
            ctx.save();

            ctx.beginPath();

            for (var i = 0; i < mCount; i++) {
                var x = mCenter + mRadius * Math.cos(mAngle * i);
                var y = mCenter + mRadius * Math.sin(mAngle * i);

                ctx.moveTo(mCenter, mCenter);
                ctx.lineTo(x, y);
            }

            ctx.stroke();

            ctx.restore();
        }

        //資料點之間的連線
        function drawLine1(ctx) {
            ctx.save();
            ctx.beginPath();

            var count = 0;

            for (var i = 0; i < mCount; i++) {
                var x = mCenter + mRadius * Math.cos(mAngle * i) * mData[i][1] / 100;
                var y = mCenter + mRadius * Math.sin(mAngle * i) * mData[i][1] / 100;

                count = i + 1;

                if (count < mCount) {
                    var x1 = mCenter + mRadius * Math.cos(mAngle * (i + 1)) * mData[i + 1][1] / 100;
                    var y1 = mCenter + mRadius * Math.sin(mAngle * (i + 1)) * mData[i + 1][1] / 100;
                }
                else {
                    var x1 = mCenter + mRadius * Math.cos(mAngle * 0) * mData[0][1] / 100;
                    var y1 = mCenter + mRadius * Math.sin(mAngle * 0) * mData[0][1] / 100;
                }

                ctx.moveTo(x, y);
                ctx.lineTo(x1, y1);
                ctx.lineWidth = 2;//設定線寬狀態
                ctx.strokeStyle = '#1478FA';//設定線顏色狀態
            }

            ctx.stroke();

            ctx.restore();
        }

        //繪製文字
        function drawText(ctx) {
            ctx.save();

            var fontSize = mCenter / 12;
            ctx.font = fontSize + 'px Microsoft Yahei';
            ctx.fillStyle = mColorText;

            for (var i = 0; i < mCount; i++) {
                var x = mCenter + mRadius * Math.cos(mAngle * i);
                var y = mCenter + mRadius * Math.sin(mAngle * i);

                if (mAngle * i >= 0 && mAngle * i <= Math.PI / 2) {
                    ctx.fillText(mData[i][0], x, y + fontSize);
                }
                else if (mAngle * i > Math.PI / 2 && mAngle * i <= Math.PI) {
                    ctx.fillText(mData[i][0], x - ctx.measureText(mData[i][0]).width, y + fontSize);
                }
                else if (mAngle * i > Math.PI && mAngle * i <= Math.PI * 3 / 2) {
                    ctx.fillText(mData[i][0], x - ctx.measureText(mData[i][0]).width, y);
                }
                else {
                    ctx.fillText(mData[i][0], x, y);
                }
            }

            //中心繪製文字

            var t = (mData[0][1] + mData[1][1] + mData[2][1] + mData[3][1] + mData[4][1]);

            ctx.font = "bold 36px Arial";
            ctx.fillStyle = '#1478FA';
            ctx.fillText(Math.round(t / 5), mCenter - 18, mCenter + 16);

            ctx.restore();
        }

        //繪製資料區域
        function drawRegion(ctx) {
            ctx.save();

            ctx.beginPath();
            for (var i = 0; i < mCount; i++) {
                var x = mCenter + mRadius * Math.cos(mAngle * i) * mData[i][1] / 100;
                var y = mCenter + mRadius * Math.sin(mAngle * i) * mData[i][1] / 100;

                ctx.lineTo(x, y);
            }

            ctx.closePath();
            ctx.fillStyle = 'rgba(255,0,0,0.5)';
            ctx.fill();

            ctx.restore();
        }

        //畫點
        function drawCircle(ctx) {
            ctx.save();

            var r = mCenter / 50;

            for (var i = 0; i < mCount; i++) {
                var x = mCenter + mRadius * Math.cos(mAngle * i) * mData[i][1] / 100;
                var y = mCenter + mRadius * Math.sin(mAngle * i) * mData[i][1] / 100;

                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(20,120,250,0.8)';
                ctx.fill();
            }

            ctx.restore();
        }
		