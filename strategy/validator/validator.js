function Validator() {
	this.cache = []; //save rules
}
var re = {
	mobile: /^1[3|5|8][0-9]{9}$/
};
var strategies = {
	isNonEmpty: function(value, errormsg) {
		if (value === '') {
			return errormsg;
		}
	},
	minlength: function(value, length, errormsg) {
		if (value.length < length) {
			return errormsg;
		}
	},
	isMobile: function(value, errormsg) {
		if (!re.mobile.test(value)) {
			return errormsg;
		}
	}
};
Validator.prototype.add = function(dom, rule, errormsg) {
	var ary = rule.split(':');
	this.cache.push(function(){
		var strategy = ary.shift();
		ary.unshift(dom.value);
		ary.push(errormsg);
		return strategies[strategy].apply(dom, ary);
	});
};
Validator.prototype.start = function() {
	for (var i = 0, validatorFunc; validatorFunc = this.cache[i++]) {
		var msg = validatorFunc();
		if (msg) {
			return msg;
		}
	}
};

//eg
var validator = new Validator();
validator.add(document.getElementById('username'), 'minlength:6', '密码长度不少于6位');
validator.start();


