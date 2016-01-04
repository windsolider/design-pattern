function renderData(tabName, curPage, initPage) {
    var thead = $('.regular-table2 thead tr'),
        dataHead = '';
     if(tabName === 'payed') {
        dataHead = '<th >产品名称</th>\
				<th >投资本金（元）</th>\
				<th >预期年收益率（%）</th>\
				<th >待收收益（元）</th>\
				<th >已经计息|剩余期限</th>\
				<th >回款日期（最晚）</th>\
				<th>操作</th>';
    } else if(tabName === 'trans') {
        dataHead = '<th >产品名称</th>\
				<th >已转让金额（元）</th>\
				<th >手续费用（元）</th>\
				<th >已收到账（元）</th>\
				<th>操作</th>';
    }
    thead.html(dataHead);
}
function payedHead() {

}
function transHead() {
    
}

