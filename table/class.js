var Zltable = {
	template:'<table><tr><th v-for="he in heads">{{he}}</th></tr><tr v-for="(bo,ke) in cons"><td v-for="(b,k) in bo"><template v-if="typeof b == \'object\'"><template v-for="btn in b"><button v-if="btn.type==\'info\'" v-on:click="info(bo)">{{btn.name}}</button><button v-else-if="btn.type==\'edit\'" v-on:click="edit(bo)">{{btn.name}}</button><button v-else-if="btn.type==\'remove\'" v-on:click="move(bo)">{{btn.name}}</button><button v-else-if="btn.type==\'myfun\'" v-on:click="myfun(bo)">{{btn.name}}</button><button v-else>{{btn.name}}</button></template></template><template v-else>{{b}}</template></td></tr></table>',
	props: ['heads','cons'],
	methods:{
		info:function(obj){
			this.$emit('info',{cons:obj})
		},
		edit:function(obj){
			this.$emit('edit',{cons:obj})
		},
		move:function(obj){
			this.$emit('move',{cons:obj})
		},
		myfun:function(obj){
			this.$emit('myfun',{cons:obj})
		}
	}
}

var Zlpage = {
	template:'<ul><li v-for="pa in plist" v-on:click="setpage(pa)"><a>{{pa.name}}</a></li></ul>',
	props:['page','limit','size','url'],
	data:function(){
		return {
			page:this.page,
			limit:this.limit,
			size:this.size,
			url:this.url
		}
	},
	methods:{
		setpage:function(obj)
		{
			if(obj.type=='pfirst'){
				this.page=1;
			}else if(obj.type=='plast'){
				this.page=this.size;
			}else{
				this.page=obj.name;
			}
			this.$emit('setpage',{page:this.page})
		}
	},
	computed:{
		plist:function(){
			var arr=[];
			if(this.size!=1)
			{
				if(this.size<this.limit)
				{
					var i=1;
					while (i<=this.size)
					{
						arr.push({type:'num',name:i});
						i++;
					}
				}else{
					if(this.page>Math.floor(this.limit/2)+1){
						arr.push({type:'pfirst',name:'<<'});
					}
					var i=this.page<Math.floor(this.limit/2)+1?1:this.page-parseInt(this.limit/2);
					if(this.page>=this.size-Math.floor(this.limit/2)){
						i=this.size-this.limit+1;
					}
					var j=i+this.limit;
					while(i<j)
					{
						arr.push({type:'num',name:i});
						i++;
					}
					if(this.page+parseInt(this.limit/2)<+this.size){
						arr.push({type:'plast',name:'>>'});
					}
				}
			}
			return arr;
		}
	}
}