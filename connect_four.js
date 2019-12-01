class Board {
	constructor() {
		this.board = [];
		this.width = 6;
		this.height = 7;
		this.playing = true
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
					this.check_win(player)
				}
			}

			if(!has_placed){
				// throw an error
				// usually means no spots available
				console.log("spot taken!")
			}
		}

	}

	show() {
		console.log(this.get_board())
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
			console.log("Player " + player + " has won.")
			this.playing = false
		}

	}

}

var game = new Board()

//setInterval(tick(), 1000)




