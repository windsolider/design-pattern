function SelectSort(data) {
	this.data = data;
}
SelectSort.prototype = {

	construct: SelectSort,

	sort: function() {
		var max, temp;
		for (var i = 0; i < this.data.length-1; i++) {
			max = i;
			for (var j = i+1; j < this.data.length; j++) {
				if (this.data[max] < this.data[j]) {
					max = j;
				}
			}
			if (max !==i) {
				temp = this.data[i];
				this.data[i] = this.data[max];
				this.data[max] = temp;
			}
		}
	}
};

var arr = [1,23,4,25,34,37,25,38,12,46];
var sort = new SelectSort(arr);
sort.sort()
console.log(arr);

function Bubble(data) {
	this.data = data;
}
Bubble.prototype = {

	construct: Bubble,

	sort: function() {
		var temp;
		for (var i = 0; i < this.data.length-1; i++) {
			for (var j = i+1; j < this.data.length; j++ ) {
				if (this.data[i] < this.data[j]) {
					temp = this.data[i];
					this.data[i] = this.data[j];
					this.data[j] = temp;
				}
			}
		}
	},
};

var arr1 = [1,23,4,25,34,37,25,38,12,46];
var sort1 = new Bubble(arr1);
sort1.sort()
console.log(arr1);


// function Bubble(data) {
// 	this.data = data;
// }

// Bubble.prototype = {
// 	construct: Bubble,
// 	sort: function() {
// 		var temp;
// 		for(var i = 0; i<this.data.length; i++) {
// 			for (var j = i+1; j< this.data.length; j++) {
// 				if (this.data[i] < this.data[j]) {
// 					temp = this.data[i];
// 					this.data[i] = this.data[j];
// 					this.data[j] = temp;
// 				}
// 			}
// 		}
// 	}
// };