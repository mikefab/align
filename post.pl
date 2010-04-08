#!/usr/bin/perl

use CGI qw(:standard);
use CGI::Carp qw(warningsToBrowser fatalsToBrowser);


print header(-charset => 'UTF-8');


my %form;




foreach my $p (param()) {

    $form{$p} = param($p);
    print "$p = $form{$p}<br>\n";
}

$form{source_name} =~s/files_//i;
#get first and last parts of original xml file
#open(F, "c:/work/mike/scripts/gloss/product/$form{file_name}") || die "$!";
#open(F, "c:/work/mike/scripts/$form{source_name}/product/$form{file_name}") || die "$!";
open(F, "projects/$form{source_name}/product/$form{file_name}") || die "$!";
undef $/;
$data = <F>;
close F;
$data =~s/\n/\^\^\^/g;
$top = $1 if ($data =~ /(<record.+?<text>)/);
$bottom = $1 if ($data =~ /(<\/text>.+?<\/record>)/);

$top =~s /\^\^\^/\n/g;
$bottom =~s /\^\^\^/\n/g;



#open(FILE, ">uploads/text/$form{file_name}");
open(FILE, ">c:/work/mike/scripts/$form{source_name}/product/$form{file_name}");
	$counter_p = 0;
	$counter_s = 1; 
	foreach $p(@paragraphs = split(/\n\n/,$form{response})){
		$counter_p++;
		$xml .= qq(    <paragraph n = "$counter_p" language = "Russian">\n);
		foreach $s(@sentences = split(/\n/,$p)){
			$counter_s++;	

			@timestamps = split(/:/,$s);
			
			@s = split(/::/,$s);
			$s[1]=~s/^\s+//;			
			$xml .= qq (      <sentence n = "$counter_p.$counter_s" start = "$timestamps[0]" end = "$timestamps[1]">$s[1]<\/sentence>\n);
		}
		$xml .= qq(      <\/paragraph>\n);
	}
#	print FILE $form{response};
		#	$top =  Encode::decode('utf16',$top);
		#	$top = encode_utf8($top);
	print FILE "$top\n$xml\n$bottom\n";

#foreach my $p (param()) {
  #  $form{$p} = param($p);
  #  print FILE "$p ... $form{$p}\n";
#}
close FILE;
print end_html
