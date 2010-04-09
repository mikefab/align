#!/usr/bin/perl

use CGI qw(:standard);
use CGI::Carp qw(warningsToBrowser fatalsToBrowser);


print header(-charset => 'UTF-8');

#@file_sources = qw(gloss nclr langnet edemo);

opendir(DIR,"projects");
@projects = readdir(DIR);
closedir DIR;
foreach $project(@projects){
	next if $project=~/^\./;
	$dir_product{$project} = "projects/$project/product";
	opendir(DIR,$dir_product{$project});
	@$project = readdir(DIR);


	foreach $file(@$project){
		next if $file=~/^\./ || $file !~/\./;
		open(F,"$dir_product{$project}/$file")|| die "$! $file";
		undef $/;
		$data = <F>;
		close F;
		$data =~s/\n//g;
		$audio = $2 if ($data =~ /(<audio>)(.+?)(<\/audio>)/i);
		$title = $2 if ($data =~ /(<title.*?>)(.+?)(<\/title>)/i);
		
$project{$project}{$file} = $title if ((-e "$dir_product{$project}/audio/$audio")&&($data =~ /<text>/));

	}

}


print <<END;

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=windows-1251">

	<script type="text/javascript" src="javascript/jquery.js"></script>
<script type="text/javascript" src="javascript/iframer.js"></script>
<script language="JavaScript" src="javascript/functions.js"></script>
<script language="JavaScript" src="javascript/hash_find.js"></script>
<script type="text/javascript" src="javascript/modal_popup/shCore.js" language="javascript"></script>
<script type="text/javascript" src="javascript/modal_popup/shBrushJScript.js" language="javascript"></script>
<script type="text/javascript" src="javascript/modal_popup/ModalPopups.js" language="javascript"></script>


<script>
    function setFocus(){

     document.getElementById("set_focus").focus();
        document.getElementById("response").focus();

     }
     </script>

<script>




var file_sources = new Array();
END

for(@projects){
	next if $_=~/^\./ ;
	print qq(file_sources["$_"] = "$_";\n)
}

print <<END;


<\/script>
 </head>
	<body >
<div  id = "cursor_position"> </div>

<button id = "set_focus" name = "set_focus" onClick="setFocus(); ">focus</button>

<button id = "btn_start_stop" name = "btn_start_stop" onClick="  insert_next_timestamp();   "> start / finish </button>
<button onClick=" start_equals_finish(); "> start = finish </button>
		<button id = "finish_plus_start" name = "finish_plus_start" onClick="set_start_equals_zero_or_finish();document.getElementById('response').focus();smart_finish_plus_start_v2();">finish + start</button>
 <input type = "text" id = "current_line_num" name = "current_line_num" style = "display:none;" > 
 <div id = "orig_line_num" name = "orig_line_num" style = "display:none;" > dddd </div>
 <input type = "text" id = "total_lines" name = "total_lines"  style = "display:none">

<script type="text/javascript" src="javascript/wz_tooltip.js"></script>

<div id = "audio-div"> <audio id = "aplayer"  src="Quatro - Joia.mp3" type="audio/ogg"></audio> </div>
<!--
<button onClick="continue_from_finish_of_current_line();">play from end of current line</button>

  <select id = "seconds_before_current_finish">
 	<option>1</option>
 	<option>2</option>
 	<option>3</option>
 	<option>4</option>
 	<option>5</option>
	<option>6</option
	<option>7</option>
	<option>8</option>
	<option>9</option>
 </select>
<button onClick="alert_cursor_position();">where is cursor</button>

 
 <button onClick ="alert_hash_of_line_numbers();"> report hash </button>
  -->
 <button id = "check_audio" name = "check_audio" onClick="check_audio_for_line_with_cursor();"> Check audio finish for this line</button> 
 <button id="btn_play_finishes" name = "btn_play_finishes" onClick="setup_play_finishes();"> Check all audio finishes</button> 
 <button id="btn_stop_finishes" name = "btn_stop_finishes" onClick="timer_is_on=0; this.style.display='none';"> Stop audio finishes playback</button> 


<!--
<button onClick="undo_finish_of_current_line();">undo end of current line</button> I've rolled this into back up'
-->
<table border = 0><tr><td>
 current time
 </td>
 <td><div id = "current_audio_time">  </div>
</td>
<td>
 duration
 </td>
 <td>
 <div id = "audio_duration">  </div>
</td></tr></table>

<button style = "display:none;" onClick = "get_line_number_for_position();">asdf</button>
<table border = 0>
	<tr valign="top">
		<td>
 <button onClick="wav_pause('aplayer'); update_audio_time();  ">pause</button>
 <button onClick="wav_play('aplayer'); update_audio_time();  ">play</button>

 <button onClick="wav_go_beginning('aplayer'); update_audio_time();">beginning</button>
<button onClick ="get_last_start();">continue</button><br>
<!--
(Long sentence / slow speech)
		<button id = "btn_toggle" onClick="return_next_line_for_timestamp('toggle');"> start / finish  </button>
<br>

(Short sentence / fast speech)
		<button id = "finish_plus_start" name = "finish_plus_start" onClick="set_start_equals_zero_or_finish();smart_finish_plus_start();">finish + start</button> <br>(click at end of sentence only)
-->
	</td>
	<td>
<table border = 0>
	<tr>
		<td>
	<button onClick="wav_jump_back(document.getElementById('a_back_small_unit').value, 'aplayer');"> < </button>
		</td>
		<td>
	<button onClick="wav_jump_ahead(document.getElementById('a_ahead_small_unit').value, 'aplayer');"> > </button>
		
		</td>
		<td>
	<button onClick="wav_jump_back(document.getElementById('a_back_big_unit').value, 'aplayer');"> << </button>
		
		</td>
		<td>
	<button onClick="wav_jump_ahead(document.getElementById('a_ahead_big_unit').value, 'aplayer');"> >> </button>
		
		</td>
	</tr>
	<tr>
		<td>
 <select id = "a_back_small_unit">
 	<option>1</option>
 	<option>2</option>
 	<option>3</option>
 	<option>4</option>
 	<option>5</option>
	<option>6</option>
 </select> 
 		</td>
 		<td>     
  <select id = "a_ahead_small_unit">
 	<option>1</option>
 	<option>2</option>
 	<option>3</option>
 	<option>4</option>
 	<option>5</option>
	<option>6</option>
 </select>      
		</td>
		<td>

 <select id = "a_back_big_unit">
 	<option>10</option>
 	<option>15</option>
 	<option>30</option>
 	<option>40</option>
 	<option>50</option>
	<option>60</option>
 </select>   

		</td>
		<td>
 <select id = "a_ahead_big_unit">
 	<option>10</option>
 	<option>15</option>
 	<option>30</option>
 	<option>40</option>
 	<option>50</option>
	<option>60</option>
</select>   
		</td>
	</tr>
</table>
	</td>
	<td>
 <button onClick="wav_reduce_speed('aplayer');"> slower </button>
 <button onClick="wav_accelerate_speed('aplayer');"> faster </button>
 <button onClick="wav_normal_speed('aplayer');"> normal</button>
 <button onClick="wav_check_speed('aplayer');"> check </button>
		</td>
		<td>
			<button id = "btn_font_smaller" onClick="change_font_size('response','down');">smaller</button>
			<button id = "btn_font_bigger" onClick="change_font_size('response','up');">bigger</button>
			<input type="submit" onClick = "ModalPopupsConfirm();" id="save1" value="save">
			<input type="submit"  id="save" style = "display:none;" value="save">

		</td>
	</tr>
</table>

	<!--	<button id = "btn_s_equals_f" name = "btn_s_equals_f" > infer start </button>
		<button onClick="return_next_line_for_timestamp('undo');">back up</button>

-->
<button onClick="undo_line();">back up</button>
		<button onClick="reset();">erase all times</button>
		
<br>


   	<div class="wrapper">
   		   	
	<p>
   <form action="upload.pl" method="post" id = "form_text_chooser"  name = "form_text_chooser" enctype="multipart/form-data">

		<input type="submit" id = "submit_text_chooser" style = "display:none">
 
		<br>
		<select id = "file_source" name "file_source" onChange = "document.getElementById('source_name').value = this.value;display_file_selects(); ">
			<option value = "">Select a source</option>		
END

for(@projects){
	next if $_=~/^\./;
	print qq(<option value = "$_">$_</option>);
}
print qq(</select>);

foreach $project(@projects){
	next if $project=~/^\./;

print qq(<select id = "$project"  style = "display:none;" name = "$project"  onChange = "update_file_name('$project'); submit_file_chooser_form('form_text_chooser');">);

		print qq(<option>Select a story<\/option selected>);
		for(@$project){
			next if $_=~/^\./ || $_!~/\./;
			print qq(<option value = "$_">$project{$project}{$_}</option>);
		}
print qq(</select>);
}
print <<END;	

 <input type = "hidden" id = "file_name" name = "file_name">
 <input type = "hidden" id = "source_name" name = "source_name">

		</form>
		</div>

<!--
<video id = "vplayer"  src="DavidRowe.ogg.ogv"  ></video>

 <button onClick="wav_play('vplayer'); update_video_time(); "> play </button>
 <div id = "current_video_time">  </div>
 <button onClick="wav_pause('vplayer');"> pause </button>

 <button onClick="wav_jump_ahead(document.getElementById('v_ahead_small_unit').value, 'vplayer');"> jump ahead a bit </button>
 <select id = "v_ahead_small_unit">
 	<option>1</option>
 	<option>2</option>
 	<option>3</option>
 	<option>4</option>
 	<option>5</option>
	<option>6</option>
 </select>      


	<button onClick="wav_jump_back(document.getElementById('v_back_small_unit').value, 'vplayer');"> jump back a bit </button>

 <select id = "v_back_small_unit">
 	<option>1</option>
 	<option>2</option>
 	<option>3</option>
 	<option>4</option>
 	<option>5</option>
	<option>6</option>
 </select>      

 	<button onClick="wav_jump_ahead(document.getElementById('v_ahead_big_unit').value, 'vplayer');"> jump ahead big </button>

 <select id = "v_ahead_big_unit">
 	<option>10</option>
 	<option>15</option>
 	<option>30</option>
 	<option>40</option>
 	<option>50</option>
	<option>60</option>
</select>   

	<button onClick="wav_jump_back(document.getElementById('v_back_big_unit').value, 'vplayer');"> jump back big </button>

 <select id = "v_back_big_unit">
 	<option>10</option>
 	<option>15</option>
 	<option>30</option>
 	<option>40</option>
 	<option>50</option>
	<option>60</option>
 </select>   


 <button onClick="wav_reduce_speed('vplayer');"> speed down </button>
 <button onClick="wav_accelerate_speed('vplayer');"> speed up </button>
 <button onClick="wav_normal_speed('vplayer');"> normal speed </button>
 <button onClick="wav_check_speed('vplayer');"> check speed </button>



   <p>
      <input type="text" size="30" id="query"> <input type="button" value="Find" onclick="findNext(document.getElementById('query').value);">
   </p>
   <p>
   	<input type = "text" id = "insertion"> <input type = "button" value = "Insert" onclick = "insertAtCursor(document.getElementById('response'), document.getElementById('insertion').value); ">
   </p>
-->
 <div id="wrapper">
 	<form action="post.pl" method="POST" id = "in" name = "in">
 	
 	<textarea cols="100%" rows="5"  onClick="do_text_area_stuff();" onkeypress = "if (event.keyCode == 13){ return false;}"  id="response"  style = "font-size:20; width:100%; height:40%" >

</textarea>
<br>

</form>
<!--
<button id = "test" onClick = "scroll_target = 100; scroll_to_position();"> scroll test </button>
-->

<button  id ="btn_target_scroll"    onClick="scroll_to_position();">
scroll to position</button>

<input type = "text" id = "scroll_direction" name = "scroll_direction"> 

<!--
   	<div class="wrapper">
	<p>
-
   <form action="upload.pl" method="post" id = "form_audio_chooser"  name = "form_audio_chooser" enctype="multipart/form-data">
      	Choose media: <input type="file" name="file" onChange = "update_audio_player(document.form_audio_chooser.file.value);" />
		<input type="submit" id = "submit_audio_chooser" style = "display:none">
 </form></p>
		</div>
	-->
   <p>

</p>

		<p>
<!--		
		<button onClick="var timestamp = return_next_line_for_timestamp('finish'); return_next_line_for_timestamp('finish_equals_start',timestamp);">f=s </button>
	</p>
-->

<!--
		<button onClick="return_next_line_for_timestamp('start');">start </button>

		<button onClick="return_next_line_for_timestamp('finish');">finish </button>
-->
			

<!--
		<button onClick="toggle();">toggle s=f </button>
-->

<!--
	<p>
		<button onClick = "document.getElementById('response').value = add_time_prefixes(document.getElementById('response').value);"> add time prefixes</button>
	<p>
-->
<!--		
	<button onClick = "get_pos_for_line_number(document.getElementById('line_num').value);">Go to line:</button>
	<input type= "text" id = "line_num">
	</p>
	<p>
	<button onClick = "get_positions_for_line_number(document.getElementById('line_positions').value);">Get positions for line:</button>
	<input type= "text" id = "line_positions">
	</p>


	<p>
	<button onClick = "scroll_target = document.getElementById('scroll_to_pos').value; scroll_to_position();">Scroll to position </button>
	<input type="text" id = "scroll_to_pos" >
	</p>
-->
<div id = "scroll_target" > </div>
<div id = "hash_report" > </div>
<div id = "scroll_to_test" > </div>

	</body>
</html>

END
