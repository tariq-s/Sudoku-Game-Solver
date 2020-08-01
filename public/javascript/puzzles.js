function isValid(board, row, col, k) {
		for (let i = 0; i < 9; i++) {
			const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
			const n = 3 * Math.floor(col / 3) + i % 3;
			if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
			  return false;
			}
		}
		return true;
	}

function sodokoSolver(data) {
	  for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
		  if (data[i][j] === 0) {
			for (let k = 1; k <= 9; k++) {
			  if (isValid(data, i, j, k)) {
				data[i][j] = k;
			  if (sodokoSolver(data)) {
			   return true;
			  } else {
			   data[i][j] = 0;
			  }
			 }
		   }
		   return false;
		 }
	   }
	 }
	 return true;
	}

var puzzles = [ 
	[
		[3, 0, 6, 5, 0, 8, 4, 0, 0], 
		[5, 2, 0, 0, 0, 0, 0, 0, 0], 
		[0, 8, 7, 0, 0, 0, 0, 3, 1], 
		[0, 0, 3, 0, 1, 0, 0, 8, 0], 
		[9, 0, 0, 8, 6, 3, 0, 0, 5], 
		[0, 5, 0, 0, 9, 0, 6, 0, 0], 
		[1, 3, 0, 0, 0, 0, 2, 5, 0], 
		[0, 0, 0, 0, 0, 0, 0, 7, 4], 
		[0, 0, 5, 2, 0, 6, 3, 0, 0]
	]
];


var solutions = [
	[
		[3, 1, 6, 5, 7, 8, 4, 9, 2], 
		[5, 2, 9, 1, 3, 4, 7, 6, 8], 
		[4, 8, 7, 6, 2, 9, 5, 3, 1], 
		[2, 6, 3, 4, 1, 5, 9, 8, 7],
		[9, 7, 4, 8, 6, 3, 1, 2, 5], 
		[8, 5, 1, 7, 9, 2, 6, 4, 3],
		[1, 3, 8, 9, 4, 7, 2, 5, 6], 
		[6, 9, 2, 3, 5, 1, 8, 7, 4], 
		[7, 4, 5, 2, 8, 6, 3, 1, 9] 
	]
];

export default {
	puzzle: puzzles[0],
	solution: solutions[0]
}
