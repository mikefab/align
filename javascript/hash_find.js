function refresh_hash(){
	//hash_of_line_numbers[num] = return_next_line_for_timestamp_after_given_number(num);get_next_line_text
	for (var i in hash_of_line_numbers) {
	//	string = string + 'key is: ' + i + ', value is: ' + hash_of_line_numbers[i] + "\n";
		hash_of_line_numbers[i] = return_next_line_for_timestamp_after_given_number(i) ;
		alert(i + " " + hash_of_line_numbers[i]);
	}
	
}

function alert_hash_of_line_numbers(){
		string = check_if_hash_of_line_numbers_is_empty();
		alert(string);
}

function alert_cursor_position(){
		current_line_num = get_line_num_of_cursor();
		alert(current_line_num);
}

function place_cursor_at_next_line_for_timestamp(string_of_numbers){
scroll_to_position();

	array_of_line_numbers = string_of_numbers.split(/-/);
	
	highlight_line(array_of_line_numbers[0]);
}

function check_if_hash_of_line_numbers_is_empty(){
	string = "";
	for (var i in hash_of_line_numbers) {
		string = string + 'key is: ' + i + ', value is: ' + hash_of_line_numbers[i] + "<br>";
	}
	return(string);
}

// function return_next_line_number_for_timestamp(){
// 	
// 	total_lines = return_number_of_lines_including_blank_lines(document.getElementById('response').value);
// 
// 	for(i=1; i <= total_lines; i++){
// 	
// 	//if(hash_of_line_numbers[i]){alert("next line is " + i); last; }
// 		if(hash_of_line_numbers[i]){return i; }	
// 	}
// }


function return_previous_line_number_with_text(num){
	num--; //line for num definitely has text
	for(i = num; i > 0; i--){ //this should only go two back
		line_text = get_current_line_of_text(i);
		if(line_text.match(/\S/)){
			return(i);
		}
	}	
}

function return_previous_line_number_timestamp_x2(num){ //need to switch this later for something that doesn't loop
	num = num -2; //line for num definitely has text
	for(i = num; i > 0; i--){ //this should only go two back
	var	line_text = get_current_line_of_text(i);

		if(line_text.match(/^\d/)){
			return(i);
		}
	}	
}

function return_previous_line_number_timestamp(num){ //need to switch this later for something that doesn't loop
	num--; //line for num definitely has text
	for(i = num; i > 0; i--){ //this should only go two back
	var	line_text = get_current_line_of_text(i);

		if(line_text.match(/^\d/)){
			return(i);
		}
	}	
}

function return_previous_line_with_text(num){
	num--; //line for num definitely has text
	
	for(i = num; i > 0; i--){
		var line_text = get_current_line_of_text(i);
		if(line_text.match(/\S/)){
	
			return(line_text);
		}
	}	
}


function return_next_line_for_timestamp_after_given_number(num){
	num++
	total_lines = return_number_of_lines_including_blank_lines(document.getElementById('response').value);
	for(i=num; i <= total_lines; i++){


		
		if(hash_of_line_numbers[i]){return i;  }	
	}
	return "something";
}



function add_line_number_to_hash(num){

	hash_of_line_numbers[num] = return_next_line_for_timestamp_after_given_number(num);


}

// function return_next_line_for_undo(){ //unsmart --- just takes first empty slot
// 
// 	total_lines = return_number_of_lines_including_blank_lines(document.getElementById('response').value);
// 	for(i=1; i <= total_lines; i++){
// 		 if(hash_of_line_numbers[i]){
// 		 	line_text = get_current_line_of_text(i);
// 
// 		 	if(line_text.match(/__\.__\:__\.__/)){
// 				return return_previous_line_number_with_text(i); 
// 			 }else{
// 				return i; 
// 			}
// 		 }	
// 	}
// }

function return_next_line_for_undo(line_num){ //smart -looks at first filled slot on or prior to cursor -- assumes no consecutive carriage returns

	line_text = get_current_line_of_text(line_num);
	if(line_text.match(/__\.__\:__\.__/)){
		
		return return_previous_line_number_timestamp(line_num); 
	 }else if (line_text.match(/__\.__/)){
	 	return line_num;
	 }else{
	 	
	 	return line_num;
	 }
	
}


function undo_line(){
	current_line_num = get_line_num_of_cursor();
	line_num = return_next_line_for_undo(current_line_num); //based on cursor position
//	if(!line_num){ alert("all");line_num = return_number_of_lines_including_blank_lines(document.getElementById('response').value);} //all slots are filled
//	if (current_line_num < line_num){ undo_finish_of_current_line(); last; } //If so, then the user has selected a line prior to the last stamp.
	ar_start_end = 	current_line_positions = get_positions_for_line_number_including_line_breaks(line_num);
	var str_line_to_modify = (document.getElementById("response").value.substring(ar_start_end[0],ar_start_end[1]));
	if (str_line_to_modify.match(/\d+\.\d+\:__/)) { str_line_to_modify = str_line_to_modify.replace(/^\d+\.\d+/g,  "__.__");}

	if (!str_line_to_modify.match(/\d+\.\d+\:__/)){ str_line_to_modify = str_line_to_modify.replace(/\:\d+\.\d+/g,  ":__.__"); }
	 set_start_equals_zero_or_finish();
	// 
	insert_into_textarea(ar_start_end[0],ar_start_end[1],str_line_to_modify)
	
	//  response.setSelectionRange(0,ar_start_end[0]);
	//	highlight_line_for_next_timestamp();
	var scroll_target = ar_start_end[0]
	highlight_line(line_num);
	add_line_number_to_hash(line_num)
    document.getElementById('scroll_direction').value = "back" ; 
}
	

// function undo_line(){
// 		
// 	current_line_num = get_line_num_of_cursor();
// 	line_num = return_next_line_for_undo(); //return_next_line_for_timestamp is the new hash method
// 	if(!line_num){ line_num = return_number_of_lines_including_blank_lines(document.getElementById('response').value);} //all slots are filled
// 	if (current_line_num < line_num){ undo_finish_of_current_line(); last; } //If so, then the user has selected a line prior to the last stamp.
// 
// 	ar_start_end = 	current_line_positions = get_positions_for_line_number_including_line_breaks(line_num);
// 
// 	var str_line_to_modify = (document.getElementById("response").value.substring(ar_start_end[0],ar_start_end[1]));
// 	
// 	if (str_line_to_modify.match(/\d+\.\d+\:__/)) { str_line_to_modify = str_line_to_modify.replace(/^\d+\.\d+/g,  "__.__");}
// 
// 	if (!str_line_to_modify.match(/\d+\.\d+\:__/)){ str_line_to_modify = str_line_to_modify.replace(/\:\d+\.\d+/g,  ":__.__"); }
// 	 set_start_equals_zero_or_finish();
// 	// 
// 	insert_into_textarea(ar_start_end[0],ar_start_end[1],str_line_to_modify)
// 	
// 	  //  response.setSelectionRange(0,ar_start_end[0]);
// 	  
// //	highlight_line_for_next_timestamp();
// 
// 	var scroll_target = ar_start_end[0]
// 	highlight_line(line_num);
// 	
// 	add_line_number_to_hash(line_num)
//  
//    document.getElementById('scroll_direction').value = "back" ; 
//   
// }

function check_if_line_needs_start_stamp(line_text){

	if(line_text.match(/^__/)){
		return true;
	}else{

		return false;
	}
}

function check_if_line_needs_stamp(line_num){
	line_text = get_current_line_of_text(line_num);
	 if(line_text.match(/__\.__/)){
	 	
	 	return true;
	 }else{
	 	return false;
	 }

}

function insert_next_timestamp(){
	current_line_num = get_line_num_of_cursor();

		
    document.getElementById('scroll_direction').value = "forward" ;
    
	if (check_if_line_needs_stamp(current_line_num)){
   	
		var ar_start_end  = get_positions_for_line_number_including_line_breaks(current_line_num);
 
		var str_line_to_modify = (document.getElementById("response").value.substring(ar_start_end[0],ar_start_end[1]));
	
		str_line_to_modify = str_line_to_modify.replace(/__.__/,  convert_to_float( document.getElementById("aplayer").currentTime)); 
	//	toggle();}

		insert_into_textarea(ar_start_end[0],ar_start_end[1],str_line_to_modify);
		

		if(str_line_to_modify.match(/__\.__/)){
			highlight_line(current_line_num);
		}else{
	
			highlight_line(return_next_line_for_timestamp_after_given_number(current_line_num));
		}
	
		if(!str_line_to_modify.match(/__\.__/)){ delete hash_of_line_numbers[current_line_num];}
		document.getElementById('hash_report').innerHTML  = check_if_hash_of_line_numbers_is_empty();
	}

	 document.getElementById('scroll_target').innerHTML = get_pos_for_line_number2(return_next_line_for_timestamp_after_given_number(current_line_num)); 
	
	 
//	 highlight_line(document.getElementById('cursor_position').innerHTML);

	
//	 setTimeout("highlight_line(document.getElementById('cursor_position').innerHTML); ", 1000);

					


}
function insert_next_timestamp_specific(optional_timestamp){
     document.getElementById('scroll_direction').value = "forward" ; 	
 	current_line_num = get_line_num_of_cursor();
  	
  	if (check_if_line_needs_stamp(current_line_num)){
  		var ar_start_end  = get_positions_for_line_number_including_line_breaks(current_line_num);
  		var str_line_to_modify = (document.getElementById("response").value.substring(ar_start_end[0],ar_start_end[1]));
  	 
  			str_line_to_modify = str_line_to_modify.replace(/__.__/,  convert_to_float(optional_timestamp)); 
  	//	toggle();}
  		insert_into_textarea(ar_start_end[0],ar_start_end[1],str_line_to_modify);
  		if(str_line_to_modify.match(/__\.__/)){
  	
  			highlight_line(current_line_num);
  		}else{
  			highlight_line(return_next_line_for_timestamp_after_given_number(current_line_num));
  		}
  		if(!str_line_to_modify.match(/__\.__/)){ delete hash_of_line_numbers[current_line_num];}
  		document.getElementById('hash_report').innerHTML  = check_if_hash_of_line_numbers_is_empty();
  	}
	 // scroll_target = get_pos_for_line_number2(return_next_line_for_timestamp_after_given_number(current_line_num)); 
	 // scroll_to_position();
	 // highlight_line(document.getElementById('cursor_position').innerHTML);
  }
 
  function insert_next_timestamp_specific_with_scroll_to_position(optional_timestamp){
     document.getElementById('scroll_direction').value = "forward" ; 	
 	current_line_num = get_line_num_of_cursor();
  	
  	if (check_if_line_needs_stamp(current_line_num)){
  		var ar_start_end  = get_positions_for_line_number_including_line_breaks(current_line_num);
  		var str_line_to_modify = (document.getElementById("response").value.substring(ar_start_end[0],ar_start_end[1]));
  	 
  			str_line_to_modify = str_line_to_modify.replace(/__.__/,  convert_to_float(optional_timestamp)); 
  	//	toggle();}
  		insert_into_textarea(ar_start_end[0],ar_start_end[1],str_line_to_modify);
  		if(str_line_to_modify.match(/__\.__/)){
  	
  			highlight_line(current_line_num);
  		}else{
  			highlight_line(return_next_line_for_timestamp_after_given_number(current_line_num));
  		}
  		if(!str_line_to_modify.match(/__\.__/)){ delete hash_of_line_numbers[current_line_num];}
  		document.getElementById('hash_report').innerHTML  = check_if_hash_of_line_numbers_is_empty();
  	}
	 document.getElementById('scroll_target').innerHTML = get_pos_for_line_number2(return_next_line_for_timestamp_after_given_number(current_line_num)); 

	 highlight_line(document.getElementById('cursor_position').innerHTML);
  }
  
  
function start_equals_finish(){

	current_line_num = get_line_num_of_cursor();
	line_text = get_current_line_of_text(current_line_num);
	previous_text = return_previous_line_with_text(current_line_num);


	if(current_line_num==1){
			insert_next_timestamp_specific("00.00");
			insert_next_timestamp();
					return false;
	}

	if((line_text.match(/^__\.__\:__/))&&(thing = previous_text.match(/(^\d+\.\d+\:)(\d+\.\d+)/))){

			insert_next_timestamp_specific(thing[2]);

			insert_next_timestamp();

	}else{

			highlight_line(current_line_num);
		}
}  
   
function smart_finish_plus_start_v2(){

	current_line_num = get_line_num_of_cursor();
	
	line_text = get_current_line_of_text(current_line_num);
	next_text = get_next_line_text(current_line_num);

	if((line_text.match(/\d+\.\d+:__/))&& (next_text.match(/__/))){
		 current_time = document.getElementById('aplayer').currentTime;

		 insert_next_timestamp_specific(current_time);
		 		 insert_next_timestamp_specific_with_scroll_to_position(current_time);	

	}else{
		highlight_line(current_line_num);
	}
}


function undo_line(){
	current_line_num = get_line_num_of_cursor();
	line_num = return_next_line_for_undo(current_line_num); //based on cursor position
//	if(!line_num){ alert("all");line_num = return_number_of_lines_including_blank_lines(document.getElementById('response').value);} //all slots are filled
//	if (current_line_num < line_num){ undo_finish_of_current_line(); last; } //If so, then the user has selected a line prior to the last stamp.
	ar_start_end = 	current_line_positions = get_positions_for_line_number_including_line_breaks(line_num);
	var str_line_to_modify = (document.getElementById("response").value.substring(ar_start_end[0],ar_start_end[1]));
	if (str_line_to_modify.match(/\d+\.\d+\:__/)) { str_line_to_modify = str_line_to_modify.replace(/^\d+\.\d+/g,  "__.__");}

	if (!str_line_to_modify.match(/\d+\.\d+\:__/)){ str_line_to_modify = str_line_to_modify.replace(/\:\d+\.\d+/g,  ":__.__"); }
	 set_start_equals_zero_or_finish();
	// 
	insert_into_textarea(ar_start_end[0],ar_start_end[1],str_line_to_modify)
	
	//  response.setSelectionRange(0,ar_start_end[0]);
	//	highlight_line_for_next_timestamp();
	var scroll_target = ar_start_end[0]
	highlight_line(line_num);
	add_line_number_to_hash(line_num);
	
    document.getElementById('scroll_direction').value = "back" ; 	
	 document.getElementById('scroll_target').innerHTML = get_pos_for_line_number2(return_previous_line_number_timestamp_x2(line_num)); 

	 scroll_to_position();
	
	 highlight_line(document.getElementById('cursor_position').innerHTML);
	


}

// function insert_next_timestamp(){
// 
// 	line_number_for_next_timestamp = return_next_line_number_for_timestamp();
// 	var ar_start_end  = get_positions_for_line_number_including_line_breaks(line_number_for_next_timestamp);
// 	var str_line_to_modify = (document.getElementById("response").value.substring(ar_start_end[0],ar_start_end[1]));
// 	str_line_to_modify = str_line_to_modify.replace(/__.__/,  convert_to_float(document.getElementById("aplayer").currentTime)); 
// //	toggle();}
// 	insert_into_textarea(ar_start_end[0],ar_start_end[1],str_line_to_modify);
// 
// 	highlight_line(line_number_for_next_timestamp);
// 
// 	if(!str_line_to_modify.match(/__\.__/)){ delete hash_of_line_numbers[line_number_for_next_timestamp];}
// 	document.getElementById('hash_report').innerHTML  = check_if_hash_of_line_numbers_is_empty();
// }


// function insert_next_timestamp_specific(timestamp){
// 
// 	line_number_for_next_timestamp = return_next_line_number_for_timestamp();
// 	var ar_start_end  = get_positions_for_line_number_including_line_breaks(line_number_for_next_timestamp);
// 	var str_line_to_modify = (document.getElementById("response").value.substring(ar_start_end[0],ar_start_end[1]));
// 	str_line_to_modify = str_line_to_modify.replace(/__.__/,  convert_to_float(timestamp)); 
// //	toggle();}
// 	insert_into_textarea(ar_start_end[0],ar_start_end[1],str_line_to_modify);
// 
// 	if(!str_line_to_modify.match(/__\.__/)){ delete hash_of_line_numbers[line_number_for_next_timestamp];}
// }



