var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	width = 700,
	height = 600;

class Board {
	constructor() {
		this.board = [];
		this.width = 6;
		this.height = 7;
		this.playing = true
		this.turn = 1
		for(var i = 0; i < this.height; i++) {
			this.board.push([])
			for(var j = 0; j < this.width; j++) {
				this.board[i].push(0)
			}	
		}
	}

	get_board() {
		return this.board
	}

	place(x, player) {
	/* place piece on board while game is still playing*/

		var has_placed = false

		if(x < this.width && x > -1 && this.playing == true) {

			// place on top if piece is there
			for(var i = this.width; i > -1; i--) {
				if(this.board[i][x] == 0 && !has_placed) {
					has_placed = true
					this.board[i][x] = player
					this.turn++;
				}
			}

			if(!has_placed){
				// throw an error
				// usually means no spots available
				console.log("spot taken!")
			}
		}

		if(this.playing == false) {
			this.reset()
		}
		game.show()
		this.check_win(player)
	}

	reset() {
		this.board = [];
		this.width = 6;
		this.height = 7;
		this.playing = true
		this.turn = 1
		for(var i = 0; i < this.height; i++) {
			this.board.push([])
			for(var j = 0; j < this.width; j++) {
				this.board[i].push(0)
			}	
		}
	}
	
	draw_piece(x, y, col) {
		var piece_width = 25
		var piece_height = 25
		var offset_x = 200
		var offset_y = 100
		ctx.beginPath()
		ctx.fillStyle = col
		ctx.fillRect(x+offset_x, y+offset_y, piece_width, piece_height)
		ctx.closePath()
	}

	show() {
		var ratio = 50;
		var board = this.get_board()
		ctx.clearRect(0, 0, width, height)
		for(var row = 0; row < this.height; row++) {
			for(var col = 0; col < this.width; col++) {
				if(board[row][col] == 1) {
					this.draw_piece(col*ratio, row*ratio, "blue" )
				}
				else if(board[row][col] == 2) {
					this.draw_piece(col*ratio, row*ratio, "red" )
				}
				else if(board[row][col] == 0) {
					this.draw_piece(col*ratio, row*ratio, "black" )
				}


			}
		}
		console.log(board)
	
	}


	horizontal_win(player) {
		var count = 0
		for(var i = 0; i < this.height; i++) {
			for(var j = 0; j < this.width; j++) {
				if(this.board[i][j] == player) {
					count++
					if(count >= 4) {
						return true
					}
				}
				else {
					count = 0
				}
			}	
		}

		return false
	}

	vertical_win(player) {
		var count = 0
		for(var i = 0; i < this.width; i++) {
			for(var j = 0; j < this.height; j++) {
				if(this.board[j][i] == player) {
					count++
					if(count >= 4) {
						return true
					}
				}
				else {
					count = 0
				}
			}	
		}

		return false
	}

	forward_diagonal(player) {
		var count = 0
		for(var row = 0; row < this.width; row++) {
			count = 0
			for(var col = 0; col < this.width-row; col++) {

					if(this.board[col][row+col] == player) {
						count++
						if(count >= 4) {
							return true
						}
					}
					else {
						count = 0
					}
			}
		}

		count = 0
		for(var row = 0; row < this.height; row++) {
			count = 0
			for(var col = 0; col < this.height-(row); col++) {
					if(col!=(this.height-1)){
						if(this.board[row+col][col] == player) {
							count++

							if(count >= 4) {
								return true
							}
						}
						else {
							count = 0
						}
					}
				
					
			}
		}

	}

	backward_diagonal(player) {

		var count = 0
		for(var row = 0; row < this.height; row++) {
			count = 0
			var row2 = row
			for(var col = this.width-1; col > row-2; col--) {
				
				if(this.board[row2][col] == player) {
							count++

							if(count >= 4) {
								return true
							}
				}
				else {
					count = 0
				}
				row2++
					
			}
		}

		for(var row = 0; row < this.height; row++) {
			count = 0
			var row2 = 0
			for(var col = this.width-1; col > row-2; col--) {

				if(this.board[row2][col-row]  == player) {
							count++

							if(count >= 4) {
								return true
							}
				}
				else {
					count = 0
				}
				/*if(col!=row-1) {
					this.board[row2][col-row] = 3
				}
				this.show()*/
				
				row2++
					
			}
		}


	}

	diagonal_win(player) {
		var count = 0
		
		if(this.forward_diagonal(player)) {
			return true
		}

		if(this.backward_diagonal(player)) {
			return true
		}




	
		return false

	}

	check_win(player) {
		if(this.vertical_win(player) || this.horizontal_win(player) || this.diagonal_win(player)) {
			ctx.font = '20px serif';
			ctx.fillText("Player " + player + " has won.", (canvas.width/2)-80, 20)
			this.playing = false
		}

	}

}


var game = new Board()
	

game.show()



	
		ctx.closePath()
canvas.addEventListener('click', function(e) { 
	var piece_width = 25
	var piece_height = 25
	var offset_x = 200
	var offset_y = 100
	var ratio = 50
	var player = 1

	var x;
	var y;
	if (e.pageX || e.pageY) { 
	  x = e.pageX;
	  y = e.pageY;
	}
	else { 
	  x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
	  y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
	} 
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;




	if(game.turn % 2 == 0) {
		player = 2
	}
	else {
		player = 1
	}
	if(x <= (offset_x+piece_width) && x >= offset_x) {
		game.place(0, player)
	}
	else if(x <= (offset_x+(piece_width*3)) && x >= (offset_x+piece_width)) {
		game.place(1, player)
	}
	else if(x <= (offset_x+(piece_width*5)) && x >= (offset_x+(piece_width*3))) {
		game.place(2, player)
	}
	else if(x <= (offset_x+(piece_width*7)) && x >= (offset_x+(piece_width*5))) {
		game.place(3, player)
	}
	else if(x <= (offset_x+(piece_width*9)) && x >= (offset_x+(piece_width*7))) {
		game.place(4, player)
	}
	else if(x <= (offset_x+(piece_width*11)) && x >= (offset_x+(piece_width*9))) {
		game.place(5, player)
	}
	else if(x <= (offset_x+(piece_width*13)) && x >= (offset_x+(piece_width*11))) {
		game.place(6, player)
	}

	





	
	

}, false);

//setInterval(tick(), 1000)





