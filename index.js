var jschardet = require('jschardet');
var iconv = require('iconv-lite');
var fs = require('fs');

function srtToVtt(srt, encoding){
    var string;
    if(srt instanceof Buffer){
        string = decode(srt, encoding);
    }else if(typeof srt == 'string'){
        if(fileExists(srt)){
            var buffer = fs.readFileSync(srt);
            string = decode(buffer, encoding);
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

function decode(buffer, encoding){
    encoding = encoding || jschardet.detect(buffer).encoding;
    return iconv.decode(buffer, encoding);
}

function fileExists(filepath){
    try{
        return fs.statSync(filepath).isFile();
    }catch(e){
        return false;
    }
}

exports.convert = srtToVtt;
