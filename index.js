var jschardet = require('jschardet');
var iconv = require('iconv-lite');
var fs = require('fs');

function srtToVtt(srt){
    var string;
    if(srt instanceof Buffer){
        string = decode(srt);
    }else if(typeof srt == 'string'){
        if(fileExists(srt)){
            var buffer = fs.readFileSync(srt);
            string = decode(buffer);
        }else{
            string = srt;
        }
    }
    return convertToVtt(string);
}

function convertToVtt(srtString){
    var vtt = 'WEBVTT\n\n';
    vtt += srtString.replace(/([0-9]{2}:[0-9]{2}:[0-9]{2}),([0-9]{3})/g, '$1.$2');
    return vtt;
}

function decode(buffer){
    var charset = jschardet.detect(buffer);
    return iconv.decode(buffer, charset.encoding);
}

function fileExists(filepath){
    try{
        return fs.statSync(filepath).isFile();
    }catch(e){
        return false;
    }
}

exports.convert = srtToVtt;
