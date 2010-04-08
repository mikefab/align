use Lingua::EN::Sentence qw( get_sentences add_acronyms );
Lingua::EN::Sentence::set_locale( 'ru_RU.utf8' );

#all demo english files should have file names with words separated by underscores. Audio should be the name with no spaces.

opendir(DIR,"source")|| die "$!";
@files = readdir(DIR);
splice(@files,0,2);

foreach $file(@files){
	$data = undef;
	
	open(F,"source/$file");
	undef $/;
	$data = <F>;
	close F;
	
	@text = split(/\n+/,$data);
	print $#text;
	$int_paragraph = 1;
	$name = $file;
	$name =~s/\..{3}$//;
	$name =~s /_/ /g;
	
		$source_content .= "<record>\n";
		$source_content .= "  <title>$name</title>\n";
		#build edit the name for making the title and then the audio file.
		$name =~s /\s+/_/g;
#		$name.= ".mp3";
		$source_content .= qq(  <audio>$name.ogg</audio>\n);
		$source_content .= qq(  <text>\n);
	$counter_p = 1;
	

	foreach $p(@text){

		$int_sentence = 1;

		$source_content .= qq(    <paragraph n = "$counter_p" language = "English">\n);
		$sentences_eng = get_sentences($p);
		for my $sentence (@$sentences_eng) {   #note use of @$... to dereference
			$source_content .= qq(      <sentence lang = "English" n = "$int_paragraph.$int_sentence">$sentence</sentence>\n);
			$int_sentence++;
		}
		$source_content .= qq(    </paragraph>\n);

	
	}
		$source_content .= qq(  </text>\n</record>);
		
	$file =~s /\..{3}/.xml/;
	open(F,">product/$file") || die "$!: $file";
	print F $source_content;
	close FILE;

}
