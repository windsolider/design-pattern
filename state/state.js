/*
 * 小定宝用户页
 */
$(document).ready(function() {
    //page
    var PAGENUM = 10;  // 每页评论条数
    var pageCount = 0;  // 分页计数器
    var tabName = $('.js-tab ul li.active a').attr('href').split('#')[1];  // 起始标签
    var pageTotal;  // 总页数
    var $pagination = $('#pagination');
    var	API_URL = {
        'hold': '/api/dq/get_trade_summary_list',  // 持有中接口
        'payed': '/api/dq/get_trade_summary_list',  // 已还款接口
        'trans': '/api/trans/get_my_apply_list'
    };
    // 分页
    var pageInit = function(pageTotal) {
        $pagination.pagination({
            total: pageTotal,  // 总页数
            firstClass: 'first',
            lastClass: 'last',
            firstText: '首页',
            lastText: '尾页',
            prevClass: 'prev',
            nextClass: 'next',
            prevText: '上一页',
            nextText: '下一页'
        }).on('switch', function() {
            // 当前页，组件返回
            var curPage = arguments[1];
            renderData(tabName, curPage);
        });
    }

    //  取 token
    function getToken() {
        var $reqtoken = $('#__global_reqtoken');
        if ($reqtoken[0]) {
            return $reqtoken.val();
        } else {
            return '';
        }
    }

    // 渲染表格数据
    function renderData(tabName, curPage, initPage) {
        var thead = $('.regular-table2 thead tr'),
            dataHead = '';
        var requestData = '';
         if(tabName === 'payed') {
            dataHead = '<th >产品名称</th>\
					<th >投资本金（元）</th>\
					<th >预期年收益率（%）</th>\
					<th >待收收益（元）</th>\
					<th >已经计息|剩余期限</th>\
					<th >回款日期（最晚）</th>\
					<th>操作</th>';
            requestData = {
                search_type: tabName,
                page_no: curPage,
                reqtoken: getToken()
            };
        } else if(tabName === 'trans') {
            dataHead = '<th >产品名称</th>\
					<th >已转让金额（元）</th>\
					<th >手续费用（元）</th>\
					<th >已收到账（元）</th>\
					<th>操作</th>';
            requestData = {
                page_no: curPage,
                reqtoken: getToken()
            };
        }
        thead.html(dataHead);
        $.ajax({
            url: API_URL[tabName],
            type: 'post',
            dataType: 'json',
            data: requestData
        }).done(function(ret) {
            if (ret.errno === 0) {
                var tbody = $('.regular-table2 tbody');
                var $total = $('#total');

                // 如果有数据
                if (ret.data.totalCount > 0) {
                    var total = ret.data.totalCount;
                    var dataHtml = '';
                    var trHtml = '';
                    var tdHtml = '';
                    var moneyHtml = '';
                    var trade_type = '';
                    pageTotal = Math.ceil(total / PAGENUM);  // 总页数

                    // 点标签生成分页
                    if (initPage) {
                        $pagination.pagination({
                            total: pageTotal
                        });
                        $pagination.show();
                    }

                    // 总条数
                    $total.css('visibility', 'visible');
                    $total.children('b').html(total);

                    function productDetail(obj) {
                        var productDetailHtml = '';
                        var productContentDetail = '';
                        if (obj.tradeType === 'normal') {
                            productContentDetail = '<p>收益方式：' + obj.extInfo.payment_desc +'</p>' +
                                '<p>产品协议：<a href="'+ obj.extInfo.contract_link +'">《xxx合同》</a></p>'+
                                '<p>原始资产：<a href="'+ obj.extInfo.org_pro_link +'">' + obj.productName + '</a></p>';
                        } else if (obj.tradeType === 'transfer') {
                            productContentDetail = '<p>收益方式：' + obj.extInfo.payment_desc +'</p>' +
                                '<p>产品协议：<a href="'+ obj.extInfo.contract_link +'">《xxx合同》</a></p>';
                        }
                        productDetailHtml = '<div class="more-details">' +
                                                '<span>详情<i></i></span>' +
                                                '<div class="user-regular-details hide">' +
                                                    '<div class="user-regular-details-icon"></div>' +
                                                    productContentDetail +

                                                '</div>' +
                                            '</div>';
                        return productDetailHtml;
                    }
                    // 渲染表格数据
                    $.each(ret.data.list, function(k, v) {
                        if (k % 2 === 0) {
                            trHtml = '<tr>';
                        } else {
                            trHtml = '<tr class="even">';
                        }
                        if(tabName === 'payed') {
                            dataHtml +=
                                trHtml +
                                '<td>' + v.productName + '</td>' +
                                '<td>' + v.investAmount + '</td>' +
                                '<td>' + v.prodictYearProfit + '</td>' +
                                '<td>' + v.prodictProfitAmount + '</td>' +
                                '<td>' + v.inProfitDays + '|' + v.leftProfitDays +  '</td>' +
                                '<td>' + v.repaymentDate + '</td>' +
                                '<td>' + productDetail(v) + '</td>'+
                                '</tr>';
                        } else if (tabName === 'trans') {
                            dataHtml +=
                                trHtml +
                                '<td>' + v.productName + '</td>' +
                                '<td>' + v.applyCount + '</td>' +
                                '<td>' + v.salerFeeRadio + '</td>' +
                                '<td>' + v.predirectPayAmount + '</td>' +
                                '<td>' + '<a href="' + v.sale_record_link +'">成交明细</a>'+ '</td>'+
                                '</tr>';
                        }
                    });
                    tbody.html(dataHtml);
                    detailFun();
                    // 初始化一次分页
                    if(pageCount == 0) {
                        pageInit(pageTotal);
                        pageCount++;
                    }
                } else {
                    $total.css('visibility', 'hidden');
                    $pagination.hide();
                    if (tabName === 'interest') {  // 无收益
                        tbody.html('<tr class="no-data"><td colspan="5">当前暂无收益产生，如已持有小活宝资产，请查看<a href="/help/hqb_profit">收益发放规则</a>。</td></tr>');
                    } else {
                        tbody.html('<tr class="no-data"><td colspan="5">暂无记录！</td></tr>');
                    }
                }
            } else {
                location.href = loginPage;
            }
        });
    }
    // 标签切换
    function tabHandler(evt) {
        evt.preventDefault();
        var self = $(this);
        tabName = self.attr('href').split('#')[1];
        self.parent().parent().find('li').removeClass('active');
        self.parent().addClass('active');
        if (tabName === 'hold') {
            $('.dealconfirm').show();
            $('.regular-table').show();
            $('.regular-table2').hide();
            $('#total').hide();
            $('#pagination').hide();
            return;
        } else {
            $('.dealconfirm').hide();
            $('.regular-table').hide();
            $('.regular-table2').show();
            $('#total').show();
            $('#pagination').show();
        }
        renderData(tabName, 1, true);
    }
    function detailFun(){
        var timer;
        $('.more-details').on('mouseover',function(){
            clearTimeout(timer);
            $('.more-details').removeClass('more-details-cur').css('z-index','1001');
            $('.user-regular-details').addClass('hide');
            $(this).addClass('more-details-cur').css('z-index','1002');
            $(this).find('.user-regular-details').removeClass('hide');
        }).on('mouseout',function(){
            var that = this;
            timer = setTimeout(function() {
                $(that).removeClass('more-details-cur').css('z-index','1001');
                $(that).find('.user-regular-details').addClass('hide');
            },100);
        })
    }
    // 初始化数据
    //renderData(tabName,1);
    // 标签切换
    $('.js-tab a').on('click', tabHandler);
});