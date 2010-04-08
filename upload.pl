#!/usr/bin/perl

use CGI qw(:standard);
use CGI::Carp qw(warningsToBrowser fatalsToBrowser);


use File::Basename;
$CGI::POST_MAX = 1024 * 5000;
my $safe_filename_characters = "a-zA-Z0-9_.-";
my $upload_dir = "c:/www/av/uploads";
my $query = new CGI;  
my $filename = $query->param("file_name");
my $source_name = $query->param("source_name");  
print header;
$source_name =~s/files_//;


if ( !$filename )  
{  
# print $query->header ( );  
 print "There was a problem uploading your photo (try a smaller file).";  
 exit;  
}
my ( $name, $path, $extension ) = fileparse ( $filename, '\..*' );  
$filename = $name . $extension;
$filename =~ tr/ /_/;  
$filename =~ s/[^$safe_filename_characters]//g;
if ( $filename =~ /^([$safe_filename_characters]+)$/ )  
{  
 $filename = $1;  
}  
else  
{  
 die "Filename contains invalid characters";  
}

if ($filename =~ /.xml$/){
	 $upload_dir = "projects/$source_name/product";
	 	# $upload_dir = "c:/work/mike/scripts/gloss/product";
	
} elsif ($filename =~ /(ogg|mp3|wav)$/){
	 $upload_dir = "projects/$source_name/product/audio";
}elsif ($filename =~/(ogv|wmv)$/){
	 $upload_dir = "projects/$source_name/product/video";	
}
my $upload_filehandle = $query->upload("file");

# right now this program is just for selecting a file, not uploading it. Mike 10/15/09
# open ( UPLOADFILE, ">$upload_dir/$filename" ) or die "$!";  
# binmode UPLOADFILE;  
#  
# while ( <$upload_filehandle> )  {  
#  print UPLOADFILE;  
# }   
# close UPLOADFILE;


open FILE, "<$upload_dir/$filename";#get contents of uploaded file and return to page
#my $file_contents = do { local $/; <FILE> };
undef $/;
$data = <FILE>;
$data =~s /\n/ /g;
close FILE;
$audio 	 = $2 if ($data =~/(<audio>)(.+?)(<\/audio>)/);
$p_and_s = $2 if ($data =~/(<text>)(.+?)(<\/text>)/);
$p_and_s =~s /\s+/ /g;

$p_and_s =~s /(<paragraph.+?>)//g;
$p_and_s =~s /(<\/paragraph>)/\n\n/g;
#if start/stop times are in place then remove the tag but keep those attributes
$p_and_s =~s /(<sentence)(.+?)(start = ")(\d+\.\d+)(" end = ")([\d_]+\.[\d_]+)(">)/$4-$6 ##/g;
$p_and_s =~s /(<sentence.+?>)//g;
$p_and_s =~s /(<\/sentence>)/\n/g;

$p_and_s =~s /\n\n\s+/\n/g;
$p_and_s =~s /\s+$//g;
$p_and_s =~s /\n+$//g;
#$p_and_s =~s /\n$//g;



#####get next line number for stamp;
$p_and_s_test = $p_and_s;

@text = split(/\n+/,$p_and_s_test);
$next_line_number_to_change = 0;
for(@text){
	$c++;
	if((($_=~/__\.__/)||($_!~/^\s*\d+\.\d+\-\d+\.\d+/))&&($_=~/\S/)){
		$string.= "$c-";
	}
}
	$string =~s/\-$//;	



if ($filename =~ /(.html$|.txt$|.xml$)/){ #only return content if file is .txt

#this gets returned to index.pl for loading audio
	print "$audio^^$p_and_s^^$string";
}


print end_html


