const https = require('https');

let	url = 'https://vipmail-my.sharepoint.cn/:v:/g/personal/dollarkiller_e1_tn/ETX644n2ap1GsZAovwE03pgBJay_mzDDf-75E9bYO3_LsQ?e=qTRy44'

https.get(url,function(res){	
	res.on('data',function(chunk){
		console.log(chunk.toString());
	});
	
	res.on('end',function(){
		console.log('数据包传输完毕');
	})
})