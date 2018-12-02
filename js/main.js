$(function() {
    const folder = "audio/";
    const ext = ".mp3";
	const singers = [
		{
	    	firstName:"Avicii", 
	    	lastName:"",
	    	folder: "avicii/",
	    	pic:"images/avicii/1.jpg",
	    	songs:[
	    		"Waiting For Love","You Be Love ft. Billy Raffoul","I Could Be The One"
	    	]
		}, 
	    {
	    	firstName:"Bazzi",
	    	lastName:"", 
	    	folder: "bazzi/",
	    	pic:"images/bazzi/1.jpg",
	    	songs:[
	    		"Beautiful feat. Camila"
	    	]
		}
	]
	
	class Radio{
		constructor(singers,folder,ext){
			this.singers = singers;
			this.folder = folder;
			this.ext = ext;
		}
		presentArtists(){
			// 		console.log(this.singers[0].songs[0])
			// for (let key in this.singers) {
			// 	console.log(this.singers[key].songs);
			// }
			// let singersLength = this.singers.length;
			//.attr('size',singersLength)
			$.each(this.singers,function (key, value ) {
				$('#artists').append(
					$("<option>").val(key).text(`${value.firstName} ${value.lastName}`)
				);
			});
			
			// console.log(this.singers[1].songs[0]);
			//\ this.changeSongList();
		}
		changeSongList(){
			//I cannot use this.singers inside the function
			let singers = this.singers;
			
			//when another singer is selected
			$("#artists").on("change",this.updateSongList);
		}
		updateSongList(){
			//console.log(this.singers);
			//empty the list of songs before adding them
			$("#songs").empty();
			
			//Grab the selected artist
			let selectedArtist = $("#artists").val();
			
			// console.log(singers[selectedArtist].pic);
			 $("#artistImage").attr("src",singers[selectedArtist].pic);
			//grab the songs of the selected artist
			let songs = singers[selectedArtist].songs;
			
			//grab the length of the song so I can set the limit of the list
			let songsLength = songs.length;
			// console.log(songs);
			// <option disabled selected value> -- select a song -- </option>
			$("#songs").append(
					$("<option>").attr("disabled","disabled").attr("selected","selected").attr("value",null).text("-- Pick a song --")
				);
			$.each(songs,function (key, value) {
				// body...
				// .attr("size",songsLength)
				$("#songs").attr("size",songsLength+1).append(
					$("<option>").val(key).text(`${value}`)
				);
			});
		}
		playSong(){
			let then = this;
			$("#songs").on("change",function () {
				// body...
				let selectedSong =$("#songs option:selected");
				let selectedArtist =$("#artists option:selected");
				let selectedArtistFolder =then.singers[selectedArtist.val()].folder;
				
				$("#song").text(selectedSong.text());
				$("#artist").text(selectedArtist.text());
				
				let audio = document.getElementById("audio");
				 //$("#player").attr("src","").play;
				audio.setAttribute("src", then.folder+selectedArtistFolder+selectedSong.text()+then.ext);
				audio.play();
			});
		}
		toggleLoop(){
			$("#loop").on("click",function() {
			    let audio = document.getElementById("audio");
				if (audio.loop) {
					audio.loop = false;
					$("#loop").removeClass("btn-primary");
				}
				else{
					audio.loop = true;
					$("#loop").addClass("btn-primary");
				}
			});
		}
		toggleShuffle(){
			let then = this;
			$("#shuffle").on("click",function() {
			     let songsLength = $("#songs option").length-1;
			     let randomIndex = Math.floor(Math.random()* songsLength);
			     //console.log(randomIndex);
			     $("#songs > option").each(function () {
			     	 console.log(randomIndex +":"+ this.value)
			     	if (randomIndex == this.value) {
			     		$("#songs").val(randomIndex);
			     		$("#songs").trigger("change");
			     		 console.log("selected!");
			     	}
			     	// console.log(index +":"+ this.value);
			     });
			});
			
		}
	}
	
	
	let radio = new Radio(singers,folder,ext);
	radio.presentArtists();
	radio.updateSongList();
	radio.changeSongList();
	radio.playSong();
	radio.toggleLoop();
	radio.toggleShuffle();
});
