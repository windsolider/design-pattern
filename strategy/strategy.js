function Thead() {
	this.thead = null;
	this.strategy = null;
}
Thead.prototype.setThead = function(thead) {
	this.thead = thead;
};
Thead.prototype.setStrategy = function(strategy) {
	this.strategy = strategy;
};
Thead.prototype.renderThead = function() {
	return this.strategy.render(this.thead);
};
function PayedThead() {

}
PayedThead.prototype.render = function(thead) {
	if (typeof thead === 'undefined' || !thead.length) {
		return ;
	}
	var theadHtml = '<tr><th >产品名称</th>\
				<th >投资本金（元）</th>\
				<th >预期年收益率（%）</th>\
				<th >待收收益（元）</th>\
				<th >已经计息|剩余期限</th>\
				<th >回款日期（最晚）</th>\
				<th>操作</th></tr>';
	thead.html(theadHtml);
};
function TransThead() {
   
}
TransThead.prototype.render = function(thead) {
	if (typeof thead === 'undefined' || !thead.length) {
		return ;
	}
	var theadHtml = '<tr><th >产品名称</th>\
				<th >已转让金额（元）</th>\
				<th >手续费用（元）</th>\
				<th >已收到账（元）</th>\
				<th>操作</th></tr>';
	thead.html(theadHtml);
};

var thead = new Thead();
thead.setThead($('.regular-table thead'));
thead.setStrategy(new PayedThead());
thead.renderThead();

