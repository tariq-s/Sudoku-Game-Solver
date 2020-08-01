import data from "./puzzles.js"

var rows = document.querySelectorAll(".game-row");
var cells = document.querySelectorAll(".game-cell");
var mistake = document.querySelector(".mistakes span");
var numberButtons = document.querySelectorAll("div.numbers > button");
var Erase = document.querySelectorAll("div.opt > button")[0];
var Pencil = document.querySelectorAll("div.opt > button")[1];

//timer
var startDate = new Date().getTime();

// Run myfunc every second
var myfunc = setInterval(function() {
    var now = new Date().getTime();
    var time = now - startDate;
        
    // Calculating the days, hours, minutes and seconds left
    var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((time % (1000 * 60)) / 1000);
        
    // Result is output to the specific element
	if(minutes < 10)
		minutes = "0" + String(minutes);
	if(seconds < 10)
		seconds = "0" + String(seconds);
    document.getElementById("mins").innerHTML = minutes;
    document.getElementById("secs").innerHTML = seconds;
}, 1000);


//grid borders
var innerGridBorder = "3px solid #DAA03DFF"
rows[2].style.borderBottom = innerGridBorder;
rows[5].style.borderBottom = innerGridBorder;

for (var i = 2; i<=74; i+=9) {
	cells[i].style.borderRight = innerGridBorder;
	cells[i + 3].style.borderRight = innerGridBorder;
}

var {puzzle, solution} = data;
var fixed = {}

var mistakes = 0;
var toBeFilled = {};

// filling fixed values
var k = 0
for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; ++j) {
		if (puzzle[i][j] !== 0) {
			fixed[String(i) + " " + String(j)] = true;
			cells[k].firstElementChild.innerHTML = String(puzzle[i][j]);
		}
		else
			toBeFilled[String(i) + " " + String(j)] = true;
		k += 1
	}
}

function possible(y, x, n) {
	for (var i = 0; i < 9; i++){
		if(puzzle[y][i] === n)
			return false;
	}
	for (var i = 0; i < 9; i++){
		if(puzzle[i][x] === n)
			return false;
	}
	var x0 = Math.floor(x / 3) * 3;
	var y0 = Math.floor(y / 3) * 3;
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; ++j) {
			if (puzzle[y0 + i][x0 + j] === n) 
				return false;
		}
	}
	return true;
}

var selectedCell = -1;
var x, y;
for (var i = 0; i < cells.length; i++) {
	if (!(String(Math.floor(i / 9)) + " " + String(i % 9) in fixed)) {
		cells[i].firstElementChild.innerHTML = "";
		cells[i].addEventListener("click", function() {
			if (selectedCell !== -1) 
				selectedCell.classList.remove("selected");
			this.classList.add("selected");
			selectedCell = this;
			
			if (selectedCell !== -1) {
				var pos = -1;
				for (var t = 0; pos === -1 && t < cells.length; t++) {
					if (cells[t] === selectedCell) 
						pos = t;
				}
				x = pos % 9;
				y = Math.floor(pos / 9);
			}
		});
	}
};

Erase.addEventListener("click", function() {
	if (selectedCell !== -1) {
		selectedCell.firstElementChild.innerHTML = "";
		puzzle[y][x] = 0;
		toBeFilled[String(y) + " " + String(x)] = true;
	}
});

var pencilButtonState = false;
Pencil.addEventListener("click", function() {
	Pencil.classList.toggle("active");
	pencilButtonState = !pencilButtonState;
});

for(var i = 0; i < numberButtons.length; i++) {
	numberButtons[i].addEventListener("click", function() {
		if (selectedCell !== -1) {
			var pos = -1;
			for (var t = 0; pos === -1 && t < cells.length; t++) {
				if (cells[t] === selectedCell) {
					pos = t;
				}
				var x = pos % 9;
				var y = Math.floor(pos / 9);
			}
			if (!pencilButtonState) {
				var pencilCells = document.querySelectorAll(".selected td.pencil-cell");
				pencilCells.forEach(function(pencilCell) {
					pencilCell.innerHTML = "";
				});
				selectedCell.firstElementChild.innerHTML = this.innerHTML;
				if (Number(this.innerHTML) === solution[y][x]) {
					selectedCell.firstElementChild.style.color = "aqua";
					delete toBeFilled[String(y) + " " + String(x)];
					if(Object.keys(toBeFilled).length === 0)
						$('#staticBackdrop-end').modal('show');
				}
				else {
					mistakes += 1;
					selectedCell.firstElementChild.style.color = "red";
					mistake.innerHTML = mistakes;
					mistake.style.color = "red";
					if (mistakes === 3)
						$('#staticBackdrop').modal('show');
				}
				puzzle[y][x] = Number(this.innerHTML);
			}
			else {
				if (pos !== -1 && selectedCell.firstElementChild.innerHTML === "") {
					if (possible(y, x, Number(this.innerHTML))) {
						var pencilRow = Math.floor((this.innerHTML- 1) / 3);
						var pencilCol = (this.innerHTML-1) % 3;
						var selectedPencilCell = document.querySelector(".selected .r" + String(pencilRow) + " .c" + String(pencilCol));
						if (selectedPencilCell.innerHTML !== this.innerHTML)
							selectedPencilCell.innerHTML = this.innerHTML;
						else
							selectedPencilCell.innerHTML = "";
					}
				}
			}
		}
	});
}




