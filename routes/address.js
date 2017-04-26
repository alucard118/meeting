var mailList=[
	'info2@ccf.org.cn',
	'jyang@ccf.org.cn',
	'info@ccf.org.cn',
	'ybai@ccf.org.cn',
	'hlfeng@ccf.org.cn'
];
var nameList={
	'info2@ccf.org.cn':'白羽',
	'jyang@ccf.org.cn':'杨婧',
	'info@ccf.org.cn':'张建泉',
	'ybai@ccf.org.cn':'白羽',
	'hlfeng@ccf.org.cn':'冯惠丽'
}


var ADDRESS={
	mailList:function () {
		return [
			'info2@ccf.org.cn',
			'jyang@ccf.org.cn',
			'info@ccf.org.cn',
			'ybai@ccf.org.cn',
			'hlfeng@ccf.org.cn'
		]
	},
	nameList:function () {
		return {
			'info2@ccf.org.cn':'白羽',
			'jyang@ccf.org.cn':'杨婧',
			'info@ccf.org.cn':'张建泉',
			'ybai@ccf.org.cn':'白羽',
			'hlfeng@ccf.org.cn':'冯惠丽'
		}
	}
}
module.exports=ADDRESS;