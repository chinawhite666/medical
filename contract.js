"use strict"

var Item = function(text) {
	if(text) {
		// 解析json
		var obj=JSON.parse(text);
		this.id=obj.id;  //患者id即患者钱包
		this.content = obj.content;
		this.account = obj.account;
		this.date = obj.date;
	}else {
		this.id = "";
		this.content = "";
		this.account = "";
		this.date="";
	}
};


Item.prototype ={
	toString :function() {
		return JSON.stringify(this);
	}
};


var Connotations = function (){
	LocalContractStorage.defineMapProperty(this,"Map",{
		parse: function (text) {
            return new Item(text);
        },
        stringify: function (o) {
            return o.toString();
        }
        
    });
    LocalContractStorage.defineProperty(this, "length",null);
}


Connotations.prototype ={
	init: function(){
		
		this.length=100;
	},
	
	save: function(idd,value,date1){
		

		
		var from= Blockchain.transaction.from;
		var item = new Item();
		item.id=idd;
		item.content=value;
		item.account=from;
		item.date=date1;
		
		
		var a=0;
		while(this.get(from+a))
		{a++;}
		var now =from+a;
		this.Map.put(now,item);
		var b=0;
		while(this.get(idd+b))
		{b++;}
		var now1 =idd+b;
		this.Map.put(now1,item);


	
	},



	
	get:function(x){
		return this.Map.get(x);
	},

	getall:function(iddd){

		var arr = new Array();         //先声明一维
       	for(var i=0;i<10;i++){          //一维长度为5
              
             arr[i]=0;
       		
		} 


				for(let m=0;m<10;m++){

					if(this.get(iddd+m)){
						arr[m]=this.get(iddd+m);
					}

				}

	


		return arr;

	}



};
module.exports = Connotations;

