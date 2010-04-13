//audio.js

function check_audio_for_line(line_num){
		
	
	current_line_text = get_current_line_of_text(line_num);
	next_line_text = get_next_line_text(current_line_num);
	original_start_finish = return_start_end_time_of_line(current_line_text);
	next_start_finish = return_start_end_time_of_line(next_line_text);
	start_time = original_start_finish[1] - 1;

	line_positions = (get_positions_for_line_number_including_line_breaks(current_line_num)); //re highlight original line
	highlight_between_points(line_positions[0],line_positions[1])
	play_fragment(start_time,next_start_finish[0]);

}
//common.js
function change_font_size(target_id, direction){
       var current_size = document.getElementById(target_id).style.fontSize;
       num_size = parseInt(current_size.match("^\\d+"));
       if(direction == "down"){
               document.getElementById(target_id).style.fontSize = (num_size - 5);
       }

       if(direction == "up"){
               document.getElementById(target_id).style.fontSize = (num_size + 5);
       }

}

//linework.jsfunction return_number_of_lines_including_blank_lines(text){

	text = text.split(/\n/);
	
	return (text.length);
}


function get_pos_for_line_number3(line_num){ //experimenting. Used with return_line_number_of_cursor. Some lines have no characters.
       --line_num

       var text = document.getElementById('response');            
        filter = "^(.*\\n){" + line_num +"}";
        pattern = new RegExp(filter,"mg");
        thing = text.value.match(pattern);
 	       return(thing[0].length);
}

function test_line_has_content(line_num){
	line_text = get_current_line_of_text(line_num);
	if (line_text.length >0) {return true;} else {return false;}
}




function get_next_line_num(line_num){
	orig_num = line_num;
	total_lines = return_number_of_lines_including_blank_lines(document.getElementById('response').value);
	line_num++;
	
	for(var i = line_num; i <= total_lines; i++){
	
		next_line_text = get_current_line_of_text(i);
		if (next_line_text.match(/W/)) {return line_num;	}
	}

	return orig_num;
	
}

function get_next_line_text(line_num){ //When getting the end time of one line, to get the start of the next I need to account for empty lines
	flag = 0;
	total_lines = return_number_of_lines_including_blank_lines(document.getElementById('response').value);
	next_line_text = "";
	//while(flag == 0){
	for(var i = line_num; i <= total_lines; i++){
		line_num++;
		next_line_text = get_current_line_of_text(line_num);
		if (next_line_text.length >0) {return next_line_text;}
	}
	return next_line_text;
}

function get_line_num_of_cursor(){
	textarea = document.getElementById('response');
    var ar_to_sel_end  = new Array();
    //   textarea.setSelectionRange(0, textarea.selectionEnd); //capture textup to cursor
	var str_to_sel_end = textarea.value.substr(0,(textarea.selectionEnd - 0));
    ar_to_sel_end = str_to_sel_end.split("\n"); //The length of this array is the line number for date insertion
	return(ar_to_sel_end.length)
}

function get_current_line_of_text(line_num){
	   line_positions = (get_positions_for_line_number_including_line_breaks(line_num));
	   return target_line = document.getElementById('response').value.substr(line_positions[0],(line_positions[1]-line_positions[0]));	
	
}

function return_start_end_time_of_line(target_line){

	    current_start_finish= target_line.match(/^(.{2,3}\..{2,3})(:)(.{2,3}\..{2,3})(\:\:)/);
	    current_start_finish[0]=current_start_finish[0].replace(/\:\:$/,"");
		return current_start_finish = current_start_finish[0].split(/\:/);
}

function highlight_between_points(start,end){
	

	document.getElementById('response').setSelectionRange(start, end); //capture textup to cursor
}


function get_positions_for_line_number_including_line_breaks(line_num){
	   var pos_start = get_pos_for_line_number3(line_num);
	
	//if line_num is last line then we can't increment.
	total_lines = return_number_of_lines_including_blank_lines(document.getElementById('response').value);

	if (line_num == total_lines){ 
		
		var pos_end = document.getElementById('response').value.length;
	}else{
	    line_num++;
	    var pos_end =   get_pos_for_line_number3(line_num); pos_end = pos_end-1;
	}
     // alert(document.getElementById("response").value.substring(pos_start,pos_end));
     return([pos_start,pos_end]);
}


function return_line_number_for_next_stamp(num){

       ar_textarea = new Array();
       ar_textarea = document.getElementById('response').value.split("\n");
	   num++;

        for ( var i= num; i < ar_textarea.length-1; i++){

    		if (ar_textarea[i].match(/\W/)){
                if (!ar_textarea[i].match(/^\d+/)){
                
                   return i; last;
               }
           }
       }


}
 function get_line_number_for_position(pos){
 	target_position = pos;
 
 //	thing =	document.getElementById('response').value.substring(0, target_position); alert(thing); exit;
 	if(marked_area = response.value.match(/(.+?\n)+?(\d+.\d+?\:__)/m)){
 	 	 	lines = marked_area[0].split(/\n/);
 	 	int_marked_lines = lines.length;
 	 	target_position = get_pos_for_line_number2(int_marked_lines);
 	}
 //	alert(pos + " " + target_position)
 	return target_position;
 }

function highlight_line(line_num){

	document.getElementById('cursor_position').innerHTML = line_num;
	document.getElementById('hash_report').innerHTML  = check_if_hash_of_line_numbers_is_empty();
	line_positions = (get_positions_for_line_number_including_line_breaks(line_num));
	
	document.getElementById('response').setSelectionRange(line_positions[0], line_positions[1]); //capture textup to cursor
		document.getElementById('set_focus').click();

}


 function get_positions_for_line_number(line_num){
       var pos_start = get_pos_for_line_number(line_num);
       line_num++;

       var pos_end =   get_pos_for_line_number(line_num);
       return([pos_start,pos_end]);
}


 function get_pos_for_line_number(line_num){ //returns position of line number - first character position for that line
       --line_num
  
       var response = $("#response")[0];
       filter = "^(.+\\n*){" + line_num +"}";
       pattern = new RegExp(filter,"mg");
       result = response.value.match(pattern);
       scroll_target = result[0].length;
      // scroll_to_position();//get_pos_for_line_number
       return(result[0].length);
 }

 function get_pos_for_line_number2(line_num){ //same as original but doesn't call scroll_to_position
 
       line_num = line_num -2;
            
	
        filter = "^(.+?\\n+){" + line_num +"}";
        pattern = new RegExp(filter,"mg");

        result = response.value.match(pattern);

        //alert(thing[0].length);
        return(result[0].length);
	
 }
function continue_from_finish_of_current_line(){
	current_line_num = get_line_num_of_cursor();
	current_line_text = get_current_line_of_text(current_line_num);
	current_start_and_finish_time = return_start_end_time_of_line(current_line_text);

	time_to_pick_up_from = current_start_and_finish_time[1] - document.getElementById('seconds_before_current_finish').value;

	continue_playing_from(time_to_pick_up_from);
}



function undo_finish_of_current_line(){
	current_line_num = get_line_num_of_cursor();
	current_line_text = get_current_line_of_text(current_line_num);
	current_line_text = current_line_text.replace(/\:.{2,3}\..{2,3}\:\:/mg,":__.__::");
	current_line_positions = get_positions_for_line_number_including_line_breaks(current_line_num);
	insert_into_textarea(current_line_positions[0], current_line_positions[1], current_line_text);
	//highlight_line_for_next_timestamp();
	add_line_number_to_hash(current_line_num); //record new timestamp removed line in hash_of_line_numbers
}

function check_audio_for_line_with_cursor(){
	current_line_num = get_line_num_of_cursor(); //Will lose selection of current line in textarea	
	check_audio_for_line(current_line_num);
}
	var t;
	var timer_is_on=0;

function setup_play_finishes(){
	all_lines = document.getElementById('response').value.split(/\n+/);
	document.getElementById('total_lines').value = all_lines.length;
	document.getElementById('current_line_num').value = get_line_num_of_cursor();
	doTimer();
}

function timedCount(){
	
	current_line_num = document.getElementById('current_line_num').value;
	
	total_lines		 = document.getElementById('total_lines').value;
	//alert(total_lines);
	current_line_num--;
	current_line_num = get_next_line_num(current_line_num);
	highlight_line(current_line_num);
	document.getElementById('check_audio').click();
//	check_audio_for_line(current_line_num);
//	next_num =  get_next_line_num(current_line_num);
	current_line_num++;

	document.getElementById('current_line_num').value = current_line_num;
	if(current_line_num < total_lines){
		t=setTimeout("timedCount()",3500);
		
	}
}

function doTimer()
{

if (!timer_is_on)
  {
  timer_is_on=1;
  timedCount();
  }
}

function stopCount()
{
clearTimeout(t);
timer_is_on=0;
}


function check_all_audio_finishes(){
	all_lines = document.getElementById('response').value.split(/\n/);
	timer_is_on = 1;
	current_line_num = get_line_num_of_cursor();
	highlight_line(current_line_num);
	document.getElementById('check_audio').click();
//	check_audio_for_line(current_line_num);
	next_num =  get_next_line_num(current_line_num);
	
//	for(i=next_num;i<all_lines.length;i++){if(timer_is_on==1){setTimeout("if (timer_is_on){if(test_line_has_content(" + i +")){highlight_line(" + i + ");document.getElementById('check_audio').click();}}",2000*i);}}else{alert('blow');}
	for(i=next_num;i<all_lines.length;i++){if(timer_is_on==1){setTimeout("if (timer_is_on){if(test_line_has_content(" + i +")){highlight_line(" + i + ");document.getElementById('check_audio').click();}}",2000*i);}else{alert('problem');}}
//this above works
//	for(i=next_num;i<all_lines.length;i++){setTimeout("document.getElementById('testo').value = timer_is_on ;document.getElementById('testo2').value = "+ i + ";",2000*i);}

}

function do_text_area_stuff(){
	timer_is_on = 0;  //related to check line finishes function
	stopCount();	 //related to check line finishes function
	current_line_num = get_line_num_of_cursor();
	text = get_current_line_of_text(current_line_num);
	if(text.length <1){current_line_num = get_next_line_num(current_line_num);}

	line_positions = (get_positions_for_line_number_including_line_breaks(current_line_num));
	highlight_between_points(line_positions[0],line_positions[1]);
	document.getElementById('cursor_position').innerHTML = current_line_num;
	

	
}




 $(document).ready(function(){
       $(document).ready(function(){ 
               $("#save").click(function(){ 
                       $.post('post.pl', {
                               response: $('#response').val(),
                               file_name: $('#file_name').val(),
                               source_name: $('#source_name').val()
                              
                       });

						write_to_start_finish_button(); alert("display_audio_duration"); ;
						setTimeout('display_audio_duration();', 1000);
						
						 

               });
       });
 });
	

 function add_time_prefixes(data){
       var separator = "__.__:__.__::";
       if(!data.match(/\d+.\d+\:/)){ //not sure why I do this mjf 11/5/09

           data = data.replace(/\n/ig, "\n"+separator);

           data = separator + data;
           data = data.replace(/__.__:__.__::\s+\n/g,"\n");
		   data = data.replace(/__.__:__.__::\n__.__:__.__::$/, "") //Knocking off the last two timecontainers with no text
           data = data.replace(/(__.__\:__.__\:\:)(\s*)(\d+.\d+)(-)(.+\..+)( ##)/ig, "$3\:$5\:\:");
		   data = data.replace(/\:\:\s*/g,":: ")
       }
       return data;

 }
 jQuery(function(){
       $('#form_text_chooser').iframer({
               onComplete: function(data){
                       if(data.match("There was a problem")){
                              

                       }else{
                data = data.split("^^");
                update_audio_time();

								update_audio_player(data[0]);
								string_of_numbers = data[2];

  								hash_of_line_numbers = return_hash_of_line_numbers(string_of_numbers)
                    	
                       	     	data = add_time_prefixes(data[1]);
                               	$('#response').val(data); //returned data
                               	document.getElementById('response').scrollTop = 0; //make sure scroll bar is a top on text load
								line_num_to_begin = return_line_to_begin_with(string_of_numbers);
								if(line_num_to_begin >1){
									document.getElementById('scroll_target').innerHTML = get_pos_for_line_number(return_previous_line_number_with_text(line_num_to_begin));
								} else{
								document.getElementById('scroll_target').innerHTML = get_pos_for_line_number(1);
		
								}
    							place_cursor_at_next_line_for_timestamp(string_of_numbers);
   							
    							
    						
    	
 
                       }
               }
       });
});

 jQuery(function(){
       $('#form_audio_chooser').iframer({
               onComplete: function(data){
                       $('#response').val(data); //returned data
                       //$("#save").click();

               }
       });
});

function prepare_begining_line(){


}

function return_line_to_begin_with(string_of_numbers){

	string_of_numbers = string_of_numbers.split(/-/);
	
	return string_of_numbers[0];
	
}

function return_hash_of_line_numbers(string_of_numbers){
	string_of_numbers = string_of_numbers.replace(/\n+/g,"");
	array_of_line_numbers = string_of_numbers.split(/-/);
	hash_of_line_numbers = new Array();
	for ( var i=-1, len=array_of_line_numbers.length; i<len; ++i ){
		
		if (array_of_line_numbers[i]){ hash_of_line_numbers[array_of_line_numbers[i]] = array_of_line_numbers[i+1] || array_of_line_numbers[i];}
	}
	return hash_of_line_numbers;
}


//this uses array. probably will not use
function mark_timestamp(textarea){
       var ar_textarea = new Array();
       ar_textarea = textarea.value.split("\n");
       var int_line_number = return_line_number_for_next_stamp(textarea);
       ar_textarea[int_line_number] = document.getElementById("aplayer").currentTime + " " + ar_textarea[int_line_number];//add timestamp to line
       str_text_area = ar_textarea.join("\r"); //put textarea back together and refresh textarea
       textarea.value = str_text_area;
}

function save_textarea(){


}



// function start_is_finish(start_finish){
// 	filter = "^(\\d+.+\\n*)+"; 
// 	 pattern = new RegExp(filter,"mg"); 
// 	 result = response.value.match(pattern);
// 	 result = result[0].split(/\n+/);
//      var ar_start_end  = get_positions_for_line_number(result.length-1); 
//     var str_line_to_modify = (document.getElementById("response").value.substring(ar_start_end[0],ar_start_end[1]));
// 	//(\\:)(__.__)(.+))+
//     //str_line_to_modify = str_line_to_modify.replace(/(^\d+.\d+)(:)(__.__)(.+)/);
// 	filter = "^(\\d+.\\d+)(\:)(__.__)(.+)"; 
// 	pattern = new RegExp(filter,"mg"); 
// 	str_line_to_modify = str_line_to_modify.replace(/(^\d+.\d+):(__.__)/,"$1:$1");
// alert(str_line_to_modify);
// 	insert_into_textarea(ar_start_end[0],ar_start_end[1],str_line_to_modify)
// 
//     response.setSelectionRange(0,ar_start_end[0]);
//     scroll_to_position(ar_start_end[0])
//     //refactor with return_next_line_for_timestamp
// }



function set_beginning_to_zero(){
	response.value = response.value.replace(/^.{1,2}\..{2}:/,"00.00:");
	
}

function set_start_equals_zero_or_finish(){ //need to rename this to something like set_start_to_zero_if_necessary
	if(response.value.match(/^__/)){
		set_beginning_to_zero(); //No time stamps exist, set first start to zero.
	}
}

function toggle_start_finish(){

	//alert("toggle_start_finish");
	set_start_equals_zero_or_finish();
	filter = "^(\\d+.+\\n*)+";
	pattern = new RegExp(filter,"mg"); 
	result = response.value.match(pattern)
	
	if(result[0].match(/_/)){
		exit; //if a user is using this properly, consistently clicking start,finish,start...then this start equals last finish should not be allowed.
	}
	 filter = "((\\d+)(\\:\\:\.+\\n$))";
	 pattern = new RegExp(filter,"mg"); ;
	result = result[0].split(/\n+/);
	var ar_start_end  = get_positions_for_line_number(result.length-1);
	var str_line_to_extract = (document.getElementById("response").value.substring(ar_start_end[0],ar_start_end[1]));
	var finish = (str_line_to_extract.replace(/(^\d+.\d+:)(\d+.\d+)(::.+)/,"$2"));
 	finish = finish.replace(/\n$/,"");
	insert_fixed_time_into_next_start(finish);
 }

 function insert_fixed_time_into_next_start(fixed_time){
 	//alert("insert_fixed_time_into_next_start");
 	filter = "^(\\d+.+\\n*)+";
 	pattern = new RegExp(filter,"mg"); 
 	result = response.value.match(pattern);
	result = result[0].split(/\n+/);
    var ar_start_end  = get_positions_for_line_number(result.length); 
    var str_line_to_modify = (document.getElementById("response").value.substring(ar_start_end[0],ar_start_end[1]));  
    str_line_to_modify = str_line_to_modify.replace(/^__.__/, fixed_time);

	str_line_to_modify = str_line_to_modify.replace(/(\d)(\n)(\:)/,"$1$3");

	        insert_into_textarea(ar_start_end[0],ar_start_end[1],str_line_to_modify)

         response.setSelectionRange(0,ar_start_end[0]);
         var scroll_target = ar_start_end[0]
    
		 document.getElementById('scroll_position').value = "ahead";	      
         scroll_to_position(); //insert_fixed_time_into_next_start
 }
 
 function add_a_zeros(fl_number){
 	var str_number = fl_number.toString();
 	if(str_number.match(/\.\d$/)){
 		str_number = str_number + "0";
 	}
 	if(str_number.match(/^\d\./)){
 		str_number = "0" + str_number;
 	}

	return(str_number);
 }
 
 function convert_to_float(timestamp){
 	timestamp = Math.round(timestamp*100)/100; //round to the tenth
   
 	var timestamp = timestamp.toString(); //add two zeros if integer
 	var a = timestamp.split(".");
 	if(a[1] == null){
 		a[1] = "00";
 	}
  	timestamp = a.join(".");
 	timestamp = add_a_zeros(timestamp);
 	return timestamp 	
}

function highlight_line_for_next_timestamp(){
	line_num = find_line_to_change();
	line_positions = (get_positions_for_line_number(line_num));
	highlight_between_points(line_positions[0],line_positions[1])
	check_need_for_finish_plus_start();
}

function write_to_start_finish_button(){
	highlight_line_for_next_timestamp();

	text_area = response.value.split(/::/);
	c = text_area.length -1;
	status = "<b>start</b> / finish";
	while(c >= 0){
		if(text_area[c].match(/\d+.\d+\:__/)){
	
			status = "start / <b>finish</b>";
				document.getElementById('btn_toggle').innerHTML = status;
			exit;
		}
		c = c -1;
	}
	document.getElementById('btn_toggle').innerHTML = status;
	
	// if(response.value.match(/^__/)){ alert('fresh');}
	// if(trash = response.value.match(/(\d+\.\d+:\d+\.\d+::.+?\n+)+(\d+\.\d+:__)/)){ alert('a start' + trash);}
	// if(thing = response.value.match(/(\d+\.\d+:\d+\.\d+::.+?\n+)+(\d+\.\d+:\d+)/)){ alert('a finish' + thing);}	
}

function smart_finish_plus_start(){
	alert("checking it smart_finish_plus_start is being used");
	if (path_last_start = response.value.match(/(\d+\.\d+\:\d+.+\n+)*(\d+\.\d+\:)(\d+.\d+)(.+?\n)(__)/m)){
//	if (path_last_start = response.value.match(/(\d{2}\.\d{2}\:\d{2}.+\n*)*(\d+\.\d+)(:\d+\.\d+.+?\n)(\d{2}\.\d{2})((\:\d+.\d+|\:__))/m)){

	setTimeout("return_next_line_for_timestamp('finish');",500);
	return_next_line_for_timestamp('start_special',path_last_start[3]);
	
	
	}else{
		var timestamp = return_next_line_for_timestamp('finish'); return_next_line_for_timestamp('finish_equals_start',timestamp);
		
	}
}

function get_last_start(){//need to rename this
	current_line_num = get_line_num_of_cursor();
	line_text = get_current_line_of_text(current_line_num);
	
	if(!line_text.match(/^\d/)){	
		current_line_num = return_previous_line_number_timestamp(current_line_num);
		line_text = get_current_line_of_text(current_line_num);
	}

	if(thing = line_text.match(/(^\d+\.\d+)(:)(\d+\.\d+)/)){
		document.getElementById('aplayer').currentTime = thing[3];
		document.getElementById('aplayer').play();
		highlight_line(return_next_line_for_timestamp_after_given_number(current_line_num));
	}
	if(thing = line_text.match(/(^\d+\.\d+)(\:__)/)){
		document.getElementById('aplayer').currentTime = thing[1];
		document.getElementById('aplayer').play();
		highlight_line(current_line_num);
	}
// 	if (path_last_start = response.value.match(/(\d+\.\d+\:\d+.+\n+)*(\d+\.\d+)((\:\d+.\d+|\:__))(.+?\n+)(_)/m)){ alert(path_last_start);
// //	if (path_last_start = response.value.match(/(\d{2}\.\d{2}\:\d{2}.+\n*)*(\d+\.\d+)(:\d+\.\d+.+?\n)(\d{2}\.\d{2})((\:\d+.\d+|\:__))/m)){
// 		current_play_rate  = document.getElementById('aplayer').playbackRate; //to make sure that play rate doesn't reset to 1.
// 		document.getElementById('aplayer').currentTime = path_last_start[2];
// 		number_of_lines = return_number_of_lines_including_blank_lines(path_last_start[0]);
// 		highlight_line(number_of_lines);
// 		document.getElementById('aplayer').play();
// 		document.getElementById('aplayer').playbackRate = current_play_rate;
// 	}
}

function compare_times(){
//	if(path_last_finish = response.value.match(/(\d{2}\.\d{2}\:\d{2}\..+?\n+)+?(\d{2}\.\d{2})(\:)(\d{2}\.\d{2})(.+?\n+)(__)/)){ //assumes there are no empty fields between begin and last stamp
	if(path_last_finish = response.value.match(/(\d+\.\d{2}\:\d+\..+?\n+)+?(\d+\.\d{2})(\:)(\d+\.\d+)(.+?\n+)(__)/)){ //assumes there are no empty fields between begin and last stamp

			if(convert_to_float(document.getElementById("aplayer").currentTime) <= path_last_finish[4]){
			alert(path_last_finish[4] + ' You must add a time later than the previous finish1');
			exit;
		}
	}
	
//	if (path_last_start = response.value.match(/(\d{2}\.\d{2}\:\d{2}.+\n*)+(\d{2}\.\d{2})(\:__)/m)){ //assumes there are no empty fields between begin and last stamp
	if (path_last_start = response.value.match(/(\d+\.\d+\:\d+.+\n*)+(\d+\.\d+)(\:__)/m)){ //assumes there are no empty fields between begin and last stamp

			if(convert_to_float(document.getElementById("aplayer").currentTime) <= path_last_start[2]){
				alert(path_last_start[2] + ' You must add a time later than the previous start 1');
				exit;
			}
		}	
	 if(single_entry = response.value.match(/(^\d+\.\d{2})(:__)/)){
	  	if(convert_to_float(document.getElementById("aplayer").currentTime) <= single_entry[1]){
				alert('You must add a time later than the previous start 2');
				exit;
			}
		}
	 if(double_entry = response.value.match(/(^\d{2}\.\d{2}\:)(\d{2}\.\d{2})(\:\:.+?\n+__)/)){
		if(convert_to_float(document.getElementById("aplayer").currentTime) <= double_entry[2]){
		 	alert(double_entry[2] + '  You must add a time later than the previous finish2');
	 		exit;
		}
	}
	
}


function find_line_to_change(){
	
 //if (path_last_start = response.value.match        (/(\d+\.\d+\:\d+.+\n+)*(\d+\.\d+)((\:\d+.\d+|\:__))(.+?\n+)(_)/m)){ alert(path_last_start);

 if(thing =	document.getElementById('response').value.match(/^\d+\.\d+\:__/)){ return 1; }
 else if(thing =	document.getElementById('response').value.match(/^__/)){ return 1; }

 else if(thing =	document.getElementById('response').value.match(/^(\d+\.\d+\:\d+\.\d+.+?\n+)+(__\.__\:__)/)){number_of_lines = thing[0].split(/\n+/); number_of_lines = number_of_lines.length; number_of_lines--;  return number_of_lines;}
 else if(thing =	document.getElementById('response').value.match(/^(\d+\.\d+\:\d+\.\d+.+?\n+)+(\d+\.\d+\:__)/)){ number_of_lines = thing[0].split(/\n+/); return number_of_lines.length;}

	// 	} else if (myArray[i].match(/__.__\:__\.__/)){
	// 
	// //if reaches this far than the file is full with stamps and it's the last line last stamp to be edited.
	// return(num);
}

// function find_line_to_change(){
// 	myArray = response.value.split(/\n+/);
// 	num = myArray.length;
// 	for ( var i=0, len=myArray.length; i<len; ++i ){
// 		if(myArray[i].match(/\d+\.\d+\:__\.__/)){
// 			num= i+1;
// 			return(num);
// 			last;
// 		} else if (myArray[i].match(/__.__\:__\.__/)){
// 			num = i+1;
// 			return(i);
// 			last;
// 		}
// 	}
// 	//if reaches this far than the file is full with stamps and it's the last line last stamp to be edited.
// 	return(num);
// }

function disable_finish_plus_start(){
	document.getElementById('finish_plus_start').disabled = true;
}

function check_need_for_finish_plus_start(){ //This is still sort of a bottle neck.
	
	// if (document.getElementById('response').value.match(/^(\d+.\d+\:\d+.+?\n+)+(\d+\:_.+?\n+\d)/)){
	// 	document.getElementById('finish_plus_start').disabled = true; exit;
	// }else if (document.getElementById('response').value.match(/^(\d+.\d+\:\d+.+?\n+)+(__.__\:__.+?\n+)(\d)/)){
	// 	document.getElementById('finish_plus_start').disabled = true; exit;
	// }else{
	// 	document.getElementById('finish_plus_start').disabled = false;
	// 	
	// }
	// 	
}

// function undo_line(){
// 	current_line_num = get_line_num_of_cursor();
// 	line_num = find_line_to_change();
// 
// 	if (current_line_num < line_num){ undo_finish_of_current_line(); last; } //If so, then the user has selected a line prior to the last stamp.
// 	
// 	ar_start_end = get_positions_for_line_number(line_num);
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
// 	highlight_line_for_next_timestamp();
// 	var scroll_target = ar_start_end[0]
// 	
//  
//    document.getElementById('scroll_direction').value = "back" ; 
//   
// 	 
// }

function return_next_line_for_timestamp(str_start_or_end,optional_timestamp){

	if((str_start_or_end == 'finish') || (str_start_or_end == 'toggle')){
	//	compare_times();
	}
	
	var searchTxt = document.getElementById('response').value;
	//test need for start. Should not be done if follows an empty finish.
	 test_need_for_s = 1;
//	 if ((response.value.match(/\d+.\d+\:_/)) && (str_start_or_end == "start")) { alert('You need to add a finish first.'); exit; };

// if (str_start_or_end == "start") 				{ filter = "^(\\d+.+\\n*)+"; }                //start
	if (str_start_or_end == "start_special") 		{ filter = "^(\\d+.+\\n*)+"; }                //start
	if (str_start_or_end == "finish_equals_start") { filter = "^(\\d+.+\\n*)+"; }  //start
	if (str_start_or_end == "finish")   			{ filter ="^(\\d+.\\d+\\:\\d+.+\\n*)+";}  //finish
 
 	flag_first_start = 0;
	if(response.value.match(/^_/) || response.value.match(/^\d+\.\d+:__\.__::.+?\n+\d/)){ //Test if change is being made to first line of textarea
 		flag_first_start = 1;
 	}
 
	if (str_start_or_end == "toggle"){ filter ="^(\\d+.\\d+\\:\\d+.+\\n*)*";} 
// if (str_start_or_end == "toggle") 			    { filter ="^(\\d+.\\d+\\:\\d+.+\\n*)+";} 

	pattern = new RegExp(filter,"mg");
	if (!response.value.match(pattern) || flag_first_start == 1){ //Change is being made to first line of textarea
    	var ar_start_end  = get_positions_for_line_number(1);
  	} else {
         result = response.value.match(pattern);
         result = result[0].split(/\n+/); //get line number of field to be updated
         //need to replace a start
//         if(str_start_or_end != "undo"  ){ var ar_start_end  = get_positions_for_line_number(result.length);} //11/16/09 
          var ar_start_end  = get_positions_for_line_number(result.length);
	}
    var str_line_to_modify = (document.getElementById("response").value.substring(ar_start_end[0],ar_start_end[1]));

		//test for need for finish
	   if ((str_start_or_end == "finish") && (str_line_to_modify.match(/^__/))){ toggle_start_finish();}// alert('You need to add a start first'); exit;}

//       if (str_start_or_end == "start") {        str_line_to_modify = str_line_to_modify.replace(/^__.__/, convert_to_float(document.getElementById("aplayer").currentTime));}
       if (str_start_or_end == "finish") {       str_line_to_modify = str_line_to_modify.replace(/\:__.__/,":" + convert_to_float(document.getElementById("aplayer").currentTime));}
       if (str_start_or_end == "toggle") {       str_line_to_modify = str_line_to_modify.replace(/__.__/,  convert_to_float(document.getElementById("aplayer").currentTime)); toggle();}
	   if (str_start_or_end == "start_special"){ str_line_to_modify = str_line_to_modify.replace(/^__.__/, optional_timestamp);}
	   if (str_start_or_end == "finish_equals_start") { str_line_to_modify = str_line_to_modify.replace(/^__.__/, optional_timestamp);}
       insert_into_textarea(ar_start_end[0],ar_start_end[1],str_line_to_modify)
	   response.setSelectionRange(0,ar_start_end[0]);
          scroll_target = ar_start_end[0];

//		if(str_start_or_end != "undo"){ document.getElementById('scroll_direction').value = "ahead"; }	//11/16/09 
		document.getElementById('scroll_direction').value = "ahead"; 	//11/16/09 
		scroll_to_position(); 
		write_to_start_finish_button();
        return (convert_to_float(document.getElementById("aplayer").currentTime));
}


function reset(){

 // 	document.getElementById('response').value.replace(/\n.{2}\..{2}\:.{2}\..{2}\:\:/g,"\n__.__:__.__::");
// 	document.getElementById('response').value  = document.getElementById('response').value.replace(/^\d{2,3}\.\d+:/g,"__.__:");
// 	document.getElementById('response').value  = document.getElementById('response').value.replace(/\d{2,3}\.\d{2}\:\:/g,"__.__::");
 	document.getElementById('response').value  = document.getElementById('response').value.replace(/\d{2,3}\.\d+\:.+>?::/g,"__.__:__.__::");
//	write_to_start_finish_button();
	
	all_lines = document.getElementById('response').value.split(/\n/);
	hash_of_line_numbers = new Array();
	c = 1;
	//hash_of_line_numbers[all_lines.length] = all_lines.length;
	for ( var i=0, len=all_lines.length; i<len; ++i ){

		if(all_lines[i].match(/\W/)){
			var next_line_num = get_next_line_num(c);		
		hash_of_line_numbers[c] = next_line_num;
		}
		c++;
	}
	
	document.getElementById('scroll_target').innerHTML = get_pos_for_line_number(1);
	scroll_to_position();
    highlight_line(1);

}

 function toggle(){ //changes value of toggle button (start|finish)
 	// if (document.getElementById('btn_toggle').innerHTML.match(/start/)){
 	// document.getElementById('btn_toggle').innerHTML = "finish";
 	// } else {
 	// 	document.getElementById('btn_toggle').innerHTML ="start";
 	// }
 }

 function return_next_line_for_end_timestamp(){

  filter = "^(\\d+.\\d+\\:\\d+.+\\n*)+";
  pattern = new RegExp(filter,"mg");
  alert(document.getElementById("response").value.match(pattern));
  }

function insert_into_textarea(start_pos, end_pos, string){

       var response = $("#response")[0];
        response.value = response.value.substring(0, start_pos)
          + string
          + response.value.substring(end_pos, response.value.length);
}
// //mike 10/11/09
// function insert_next_timestamp(){
// 
//  var response = $("#response")[0];
//  var searchTxt = response.value;
//  filter = "^(\\d+.+\\n*)+";
// 
//  pattern = new RegExp(filter,"mg");
//  result = response.value.match(pattern);
//  response.focus();
//  if (!result){
//        var pos = 0.00; //There are no timstamps
//  }else{
// 
//         var pos = result[0].length;
// 
//  }
// 
//  response.setSelectionRange(0,pos);
//  response.value = response.value.substring(0, pos)
//  + convert_to_float(document.getElementById("aplayer").currentTime)
// + ":__.__"
//  + response.value.substring(pos, response.value.length);
// 
// 
//  scroll_to_position(pos)
//  // var searchTxt = response.value;
//  //  var ev = document.createEvent("KeyboardEvent");
//  //  ev.initKeyboardEvent('keypress', true, true, window, false, false, false, false, 0, searchTxt.charCodeAt(pos));
//  //  response.dispatchEvent(ev); //causes the scrolling
//  //  response.setSelectionRange(pos, pos);
// }
// 
// // function scroll_to_position(pos){
// //    var response = $("#response")[0];
// //        var searchTxt = response.value;
// //        var searchTxt = response.value;
// //        response.focus();
// // 
// //            response.setSelectionRange(pos-1, pos);
// // 
// //    var ev = document.createEvent("KeyboardEvent");
// //    ev.initKeyboardEvent('keypress', true, true, window, false, false,false, false, 0, searchTxt.charCodeAt(pos));
// //    response.dispatchEvent(ev); //causes the scrolling
// // 
// //    response.setSelectionRange(pos, pos);
// // }

function test(pos){
	
   var response = $("#response")[0];
         var searchTxt = response.value;
         var searchTxt = response.value;
         response.focus();
   
             response.setSelectionRange(pos-1, pos);
   
     var ev = document.createEvent("KeyboardEvent");
     ev.initKeyboardEvent('keypress', true, true, window, false, false,false, false, 0, searchTxt.charCodeAt(pos));
     response.dispatchEvent(ev); //causes the scrolling
   
     response.setSelectionRange(pos, pos);
   	document.getElementById('test').click();
}


function scroll_to_position() { 
	 // document.getElementById('set_focus').focus(); 
	 //      setTimeout("document.getElementById('set_focus').click();",300);
	// caller = document.getElementById("btn_target_scroll");
	// inputEl = document.getElementById("response"); //text area
	// 
	// selStart = parseInt(document.getElementById('scroll_target').innerHTML); 
	//   	if(document.getElementById('scroll_direction').value == "back"){selStart = selStart-200; } //la little bit hackish
	// 
	// 
	//     selEnd = selStart;         //to handle a range, but we just do cursor pos.
	//  
	//    if (inputEl.createTextRange) {
	//    
	//      var range = inputEl.createTextRange(); 
	//      range.collapse(true); 
	//      range.moveEnd('character', selEnd); 
	//      range.moveStart('character', selStart); 
	//      range.select(); 
	//    } else if (inputEl.setSelectionRange) { // ---- Firefox Workaround ----
	//   
	//      inputEl.focus(); 
	//      inputEl.setSelectionRange(selEnd, selEnd);
	//  
	//  // Send a virtual key, which is the character immediately after the 
	//  // selected text. Rewrites the same character -- doesn't change content.
	//    
	//      var evt = document.createEvent("KeyboardEvent");
	//   
	//      if (typeof(evt.initKeyboardEvent) != 'undefined') { //not FF
	//        if (inputEl.value.length == selEnd) { //add space if short textarea
	//          evt.initKeyboardEvent("keypress", true, true, window, false, false, false, false, 0, 32 );
	//         } else { //normal handling
	//          evt.initKeyboardEvent("keypress", true, true, window, false, false, false, false, 0, inputEl.value.charCodeAt(selEnd) );
	//        }
	//      } else {  // is FF
	//        if (inputEl.value.length == selEnd) { //add space if short textarea
	//          evt.initKeyEvent("keypress", true, true, null, false, false, false, false, 0, 32);
	//        } else { //normal handling
	//          evt.initKeyEvent("keypress", true, true, null, false, false, false, false, 0, inputEl.value.charCodeAt(selEnd));
	//        }
	//      }
	//      inputEl.dispatchEvent(evt);
	//      inputEl.setSelectionRange(selStart, selEnd);
	//    }
	//   
	//    caller.focus(); //back to the caller
	//    caller.click(); //back to the caller
	//    document.getElementById('btn_start_stop').focus(); //take focus away from textarea.
	//   
}//centerTextarea



function ModalPopupsConfirm() {
    ModalPopups.Confirm("idConfirm1",
        "Save Confirmation",
        "<div style='padding: 25px;'><b>Are you sure you wish to save?</b></div>", 
        {
            yesButtonText: "Yes",
            noButtonText: "No",
            onYes: "ModalPopupsConfirmYes()",
            onNo: "ModalPopupsConfirmNo()"
        }
    );
}
function ModalPopupsConfirmYes() {
    document.getElementById('save').click();
    ModalPopups.Close("idConfirm1");
}
function ModalPopupsConfirmNo() {
    //alert('You pressed No');
    ModalPopups.Cancel("idConfirm1");
}

function display_file_selects(){
	var file_source = document.getElementById('file_source').value;

	document.getElementById(file_source).style.display='inline';
	for (var i in file_sources) {

		if (file_source != i){
			document.getElementById(i).style.display='none';
		//alert('key is: ' + i + ', value is: ' + file_sources[i]);
		}
	}
}


function play_fragment(start,finish){

	total_time = finish-start;
//	alert(total_time);
	total_time = total_time * 1000;
//	alert(total_time);

	document.getElementById('aplayer').currentTime = start;
	document.getElementById('aplayer').play();
	setTimeout("document.getElementById('aplayer').pause();", total_time);
	
	
	
}


function submit_file_chooser_form(file_type){

	document.getElementById('submit_text_chooser').click();
}

 function update_file_name(select_menu_name){

 document.getElementById('file_name').value = document.getElementById(select_menu_name).value;

 }
 function start_audio_timer(){
        setTimeout('update_audio_time();', 100);
 }

 function start_video_timer(){
        setTimeout('update_video_time();', 100);
 }

 function display_audio_duration(){
 	document.getElementById("audio_duration").innerHTML = document.getElementById('aplayer').duration.toFixed(1);
    document.getElementById("current_audio_time").innerHTML = document.getElementById('aplayer').currentTime.toFixed(1);

 }

 function update_audio_time(){

  document.getElementById("current_audio_time").innerHTML = document.getElementById('aplayer').currentTime.toFixed(1);

   start_audio_timer();
  }
 function update_video_time(){
  document.getElementById("current_video_time").innerHTML = document.getElementById('vplayer').currentTime.toFixed(1);
   start_video_timer();
  }

 var play_status = 0; // status of player. 0 == paused.
  function wav_play(player){
        //       if( play_status == 0){
              document.getElementById(player).play();
       // play_status = 1;
        // }else {
        //          document.getElementById(player).pause();
        //         play_status = 0;
        // }
  }
 function continue_playing_from(time){
	document.getElementById('aplayer').currentTime = time;
	document.getElementById('aplayer').play();
	 	
 }

 function wav_pause(player){
 
       document.getElementById(player).pause();
  }

 function wav_go_beginning( player) {
   document.getElementById(player).currentTime = 0;
   document.getElementById(player).pause();

 }

 function wav_pause(player)  {
   document.getElementById(player).pause();
 }

 function wav_jump_ahead(unit, player) {
   document.getElementById(player).currentTime = document.getElementById(player).currentTime + parseInt(unit);
 }

 function wav_jump_back(unit, player){
   document.getElementById(player).currentTime = document.getElementById(player).currentTime - parseInt(unit);
 }


        function wav_accelerate_speed(player)
        {
//       document.getElementById("player").playbackRate =document.getElementById("player").playbackRate += 0.5;

       document.getElementById(player).playbackRate =document.getElementById(player).playbackRate +=return_unit_of_increment(document.getElementById(player).playbackRate, "up");
}


 function wav_normal_speed(player){
  document.getElementById(player).playbackRate = 1.0;
 }


 function wav_check_speed(player) {
   alert( document.getElementById(player).playbackRate);
 }


 function update_audio_player(audio_file){
//       $("#audio-div").html('<audio id = "aplayer"  src="uploads/audio/' +audio_file + '" type="audio/mp3"></audio>')
var thing = document.getElementById('source_name').value.replace(/files_/,"");
       $("#audio-div").html('<audio id = "aplayer"  src="projects/' + thing + '/product/audio/' + audio_file + '" type="audio/mp3"></audio>')
//alert(document.getElementById('audio-div').innerHTML);
 }
 
  function wav_reduce_speed(player) {
   document.getElementById(player).playbackRate =document.getElementById(player).playbackRate +=return_unit_of_increment(document.getElementById(player).playbackRate, "down");
 }
 
 //this makes sure that playbackRate never changes to zero.
//otherwise play stops
function return_unit_of_increment(fl_current_rate, direction){
	if (direction == "down"){
    	test = fl_current_rate - .5;
    	if (test == 0) {
    		return -1;
    	}else {
        	return -.5;
     	}
	}
    if (direction == "up"){
        test = fl_current_rate + .5;
    	if (test == 0) {
          return 1;
         }else {
          return .5;
         }
    }
}
