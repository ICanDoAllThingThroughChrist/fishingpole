/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
function cfinit(){
if(!window.ColdFusion){
ColdFusion={};
var $C=ColdFusion;
if(!$C.Ajax){
$C.Ajax={};
}
var $A=$C.Ajax;
if(!$C.AjaxProxy){
$C.AjaxProxy={};
}
var $X=$C.AjaxProxy;
if(!$C.Bind){
$C.Bind={};
}
var $B=$C.Bind;
if(!$C.Event){
$C.Event={};
}
var $E=$C.Event;
if(!$C.Log){
$C.Log={};
}
var $L=$C.Log;
if(!$C.Util){
$C.Util={};
}
var $U=$C.Util;
if(!$C.DOM){
$C.DOM={};
}
var $D=$C.DOM;
if(!$C.Spry){
$C.Spry={};
}
var $S=$C.Spry;
if(!$C.Pod){
$C.Pod={};
}
var $P=$C.Pod;
if(!$C.objectCache){
$C.objectCache={};
}
if(!$C.required){
$C.required={};
}
if(!$C.importedTags){
$C.importedTags=[];
}
if(!$C.requestCounter){
$C.requestCounter=0;
}
if(!$C.bindHandlerCache){
$C.bindHandlerCache={};
}
window._cf_loadingtexthtml="<div style=\"text-align: center;\">"+window._cf_loadingtexthtml+"&nbsp;"+CFMessage["loading"]+"</div>";
$C.globalErrorHandler=function(_108,_109){
if($L.isAvailable){
$L.error(_108,_109);
}
if($C.userGlobalErrorHandler){
$C.userGlobalErrorHandler(_108);
}
if(!$L.isAvailable&&!$C.userGlobalErrorHandler){
alert(_108+CFMessage["globalErrorHandler.alert"]);
}
};
$C.handleError=function(_10a,_10b,_10c,_10d,_10e,_10f,_110,_111){
var msg=$L.format(_10b,_10d);
if(_10a){
$L.error(msg,"http");
if(!_10e){
_10e=-1;
}
if(!_10f){
_10f=msg;
}
_10a(_10e,_10f,_111);
}else{
if(_110){
$L.error(msg,"http");
throw msg;
}else{
$C.globalErrorHandler(msg,_10c);
}
}
};
$C.setGlobalErrorHandler=function(_113){
$C.userGlobalErrorHandler=_113;
};
$A.createXMLHttpRequest=function(){
try{
return new XMLHttpRequest();
}
catch(e){
}
var _114=["Microsoft.XMLHTTP","MSXML2.XMLHTTP.5.0","MSXML2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP"];
for(var i=0;i<_114.length;i++){
try{
return new ActiveXObject(_114[i]);
}
catch(e){
}
}
return false;
};
$A.isRequestError=function(req){
return ((req.status!=0&&req.status!=200)||req.getResponseHeader("server-error"));
};
$A.sendMessage=function(url,_118,_119,_11a,_11b,_11c,_11d){
var req=$A.createXMLHttpRequest();
if(!_118){
_118="GET";
}
if(_11a&&_11b){
req.onreadystatechange=function(){
$A.callback(req,_11b,_11c);
};
}
if(_119){
_119+="&_cf_nodebug=true&_cf_nocache=true";
}else{
_119="_cf_nodebug=true&_cf_nocache=true";
}
if(window._cf_clientid){
_119+="&_cf_clientid="+_cf_clientid;
}
if(_118=="GET"){
if(_119){
_119+="&_cf_rc="+($C.requestCounter++);
if(url.indexOf("?")==-1){
url+="?"+_119;
}else{
url+="&"+_119;
}
}
$L.info("ajax.sendmessage.get","http",[url]);
req.open(_118,url,_11a);
req.send(null);
}else{
$L.info("ajax.sendmessage.post","http",[url,_119]);
req.open(_118,url,_11a);
req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
if(_119){
req.send(_119);
}else{
req.send(null);
}
}
if(!_11a){
while(req.readyState!=4){
}
if($A.isRequestError(req)){
$C.handleError(null,"ajax.sendmessage.error","http",[req.status,req.statusText],req.status,req.statusText,_11d);
}else{
return req;
}
}
};
$A.callback=function(req,_120,_121){
if(req.readyState!=4){
return;
}
req.onreadystatechange=new Function;
_120(req,_121);
};
$A.submitForm=function(_122,url,_124,_125,_126,_127){
var _128=$C.getFormQueryString(_122);
if(_128==-1){
$C.handleError(_125,"ajax.submitform.formnotfound","http",[_122],-1,null,true);
return;
}
if(!_126){
_126="POST";
}
_127=!(_127===false);
var _129=function(req){
$A.submitForm.callback(req,_122,_124,_125);
};
$L.info("ajax.submitform.submitting","http",[_122]);
var _12b=$A.sendMessage(url,_126,_128,_127,_129);
if(!_127){
$L.info("ajax.submitform.success","http",[_122]);
return _12b.responseText;
}
};
$A.submitForm.callback=function(req,_12d,_12e,_12f){
if($A.isRequestError(req)){
$C.handleError(_12f,"ajax.submitform.error","http",[req.status,_12d,req.statusText],req.status,req.statusText);
}else{
$L.info("ajax.submitform.success","http",[_12d]);
if(_12e){
_12e(req.responseText);
}
}
};
$C.empty=function(){
};
$C.setSubmitClicked=function(_130,_131){
var el=$D.getElement(_131,_130);
el.cfinputbutton=true;
$C.setClickedProperty=function(){
el.clicked=true;
};
$E.addListener(el,"click",$C.setClickedProperty);
};
$C.getFormQueryString=function(_133,_134){
var _135;
if(typeof _133=="string"){
_135=(document.getElementById(_133)||document.forms[_133]);
}else{
if(typeof _133=="object"){
_135=_133;
}
}
if(!_135||null==_135.elements){
return -1;
}
var _136,elementName,elementValue,elementDisabled;
var _137=false;
var _138=(_134)?{}:"";
for(var i=0;i<_135.elements.length;i++){
_136=_135.elements[i];
elementDisabled=_136.disabled;
elementName=_136.name;
elementValue=_136.value;
if(!elementDisabled&&elementName){
switch(_136.type){
case "select-one":
case "select-multiple":
for(var j=0;j<_136.options.length;j++){
if(_136.options[j].selected){
if(window.ActiveXObject){
_138=$C.getFormQueryString.processFormData(_138,_134,elementName,_136.options[j].attributes["value"].specified?_136.options[j].value:_136.options[j].text);
}else{
_138=$C.getFormQueryString.processFormData(_138,_134,elementName,_136.options[j].hasAttribute("value")?_136.options[j].value:_136.options[j].text);
}
}
}
break;
case "radio":
case "checkbox":
if(_136.checked){
_138=$C.getFormQueryString.processFormData(_138,_134,elementName,elementValue);
}
break;
case "file":
case undefined:
case "reset":
break;
case "button":
_138=$C.getFormQueryString.processFormData(_138,_134,elementName,elementValue);
break;
case "submit":
if(_136.cfinputbutton){
if(_137==false&&_136.clicked){
_138=$C.getFormQueryString.processFormData(_138,_134,elementName,elementValue);
_137=true;
}
}else{
_138=$C.getFormQueryString.processFormData(_138,_134,elementName,elementValue);
}
break;
case "textarea":
var _13b;
if(window.FCKeditorAPI&&(_13b=$C.objectCache[elementName])&&_13b.richtextid){
var _13c=FCKeditorAPI.GetInstance(_13b.richtextid);
if(_13c){
elementValue=_13c.GetXHTML();
}
}
_138=$C.getFormQueryString.processFormData(_138,_134,elementName,elementValue);
break;
default:
_138=$C.getFormQueryString.processFormData(_138,_134,elementName,elementValue);
break;
}
}
}
if(!_134){
_138=_138.substr(0,_138.length-1);
}
return _138;
};
$C.getFormQueryString.processFormData=function(_13d,_13e,_13f,_140){
if(_13e){
if(_13d[_13f]){
_13d[_13f]+=","+_140;
}else{
_13d[_13f]=_140;
}
}else{
_13d+=encodeURIComponent(_13f)+"="+encodeURIComponent(_140)+"&";
}
return _13d;
};
$A.importTag=function(_141){
$C.importedTags.push(_141);
};
$A.checkImportedTag=function(_142){
var _143=false;
for(var i=0;i<$C.importedTags.length;i++){
if($C.importedTags[i]==_142){
_143=true;
break;
}
}
if(!_143){
$C.handleError(null,"ajax.checkimportedtag.error","widget",[_142]);
}
};
$C.getElementValue=function(_145,_146,_147){
if(!_145){
$C.handleError(null,"getelementvalue.noelementname","bind",null,null,null,true);
return;
}
if(!_147){
_147="value";
}
var _148=$B.getBindElementValue(_145,_146,_147);
if(typeof (_148)=="undefined"){
_148=null;
}
if(_148==null){
$C.handleError(null,"getelementvalue.elnotfound","bind",[_145,_147],null,null,true);
return;
}
return _148;
};
$B.getBindElementValue=function(_149,_14a,_14b,_14c,_14d){
var _14e="";
if(window[_149]){
var _14f=eval(_149);
if(_14f&&_14f._cf_getAttribute){
_14e=_14f._cf_getAttribute(_14b);
return _14e;
}
}
var _150=$C.objectCache[_149];
if(_150&&_150._cf_getAttribute){
_14e=_150._cf_getAttribute(_14b);
return _14e;
}
var el=$D.getElement(_149,_14a);
var _152=(el&&((!el.length&&el.length!=0)||(el.length&&el.length>0)||el.tagName=="SELECT"));
if(!_152&&!_14d){
$C.handleError(null,"bind.getbindelementvalue.elnotfound","bind",[_149]);
return null;
}
if(el.tagName!="SELECT"){
if(el.length>1){
var _153=true;
for(var i=0;i<el.length;i++){
var _155=(el[i].getAttribute("type")=="radio"||el[i].getAttribute("type")=="checkbox");
if(!_155||(_155&&el[i].checked)){
if(!_153){
_14e+=",";
}
_14e+=$B.getBindElementValue.extract(el[i],_14b);
_153=false;
}
}
}else{
_14e=$B.getBindElementValue.extract(el,_14b);
}
}else{
var _153=true;
for(var i=0;i<el.options.length;i++){
if(el.options[i].selected){
if(!_153){
_14e+=",";
}
_14e+=$B.getBindElementValue.extract(el.options[i],_14b);
_153=false;
}
}
}
if(typeof (_14e)=="object"){
$C.handleError(null,"bind.getbindelementvalue.simplevalrequired","bind",[_149,_14b]);
return null;
}
if(_14c&&$C.required[_149]&&_14e.length==0){
return null;
}
return _14e;
};
$B.getBindElementValue.extract=function(el,_157){
var _158=el[_157];
if((_158==null||typeof (_158)=="undefined")&&el.getAttribute){
_158=el.getAttribute(_157);
}
return _158;
};
$L.init=function(){
if(window.YAHOO&&YAHOO.widget&&YAHOO.widget.Logger){
YAHOO.widget.Logger.categories=[CFMessage["debug"],CFMessage["info"],CFMessage["error"],CFMessage["window"]];
YAHOO.widget.LogReader.prototype.formatMsg=function(_159){
var _15a=_159.category;
return "<p>"+"<span class='"+_15a+"'>"+_15a+"</span>:<i>"+_159.source+"</i>: "+_159.msg+"</p>";
};
var _15b=new YAHOO.widget.LogReader(null,{width:"30em",fontSize:"100%"});
_15b.setTitle(CFMessage["log.title"]||"ColdFusion AJAX Logger");
_15b._btnCollapse.value=CFMessage["log.collapse"]||"Collapse";
_15b._btnPause.value=CFMessage["log.pause"]||"Pause";
_15b._btnClear.value=CFMessage["log.clear"]||"Clear";
$L.isAvailable=true;
}
};
$L.log=function(_15c,_15d,_15e,_15f){
if(!$L.isAvailable){
return;
}
if(!_15e){
_15e="global";
}
_15e=CFMessage[_15e]||_15e;
_15d=CFMessage[_15d]||_15d;
_15c=$L.format(_15c,_15f);
YAHOO.log(_15c,_15d,_15e);
};
$L.format=function(code,_161){
var msg=CFMessage[code]||code;
if(_161){
for(i=0;i<_161.length;i++){
if(!_161[i].length){
_161[i]="";
}
var _163="{"+i+"}";
msg=msg.replace(_163,_161[i]);
}
}
return msg;
};
$L.debug=function(_164,_165,_166){
$L.log(_164,"debug",_165,_166);
};
$L.info=function(_167,_168,_169){
$L.log(_167,"info",_168,_169);
};
$L.error=function(_16a,_16b,_16c){
$L.log(_16a,"error",_16b,_16c);
};
$L.dump=function(_16d,_16e){
if($L.isAvailable){
var dump=(/string|number|undefined|boolean/.test(typeof (_16d))||_16d==null)?_16d:recurse(_16d,typeof _16d,true);
$L.debug(dump,_16e);
}
};
$X.invoke=function(_170,_171,_172,_173,_174){
return $X.invokeInternal(_170,_171,_172,_173,_174,false,null,null);
};
$X.invokeInternal=function(_175,_176,_177,_178,_179,_17a,_17b,_17c){
var _17d="method="+_176+"&_cf_ajaxproxytoken="+_177;
if(_17a){
_17d+="&_cfclient="+"true";
var _17e=$X.JSON.encodeInternal(_175._variables,_17a);
_17d+="&_variables="+encodeURIComponent(_17e);
var _17f=$X.JSON.encodeInternal(_175._metadata,_17a);
_17d+="&_metadata="+encodeURIComponent(_17f);
}
var _180=_175.returnFormat||"json";
_17d+="&returnFormat="+_180;
if(_175.queryFormat){
_17d+="&queryFormat="+_175.queryFormat;
}
if(_175.formId){
var _181=$C.getFormQueryString(_175.formId,true);
if(_178!=null){
for(prop in _181){
_178[prop]=_181[prop];
}
}else{
_178=_181;
}
_175.formId=null;
}
var _182="";
if(_178!=null){
_182=$X.JSON.encodeInternal(_178,_17a);
_17d+="&argumentCollection="+encodeURIComponent(_182);
}
$L.info("ajaxproxy.invoke.invoking","http",[_175.cfcPath,_176,_182]);
if(_175.callHandler){
_175.callHandler.call(null,_175.callHandlerParams,_175.cfcPath,_17d);
return;
}
var _183;
var _184=_175.async;
if(_17b!=null){
_184=true;
_183=function(req){
$X.callbackOp(req,_175,_179,_17b,_17c);
};
}else{
if(_175.async){
_183=function(req){
$X.callback(req,_175,_179);
};
}
}
var req=$A.sendMessage(_175.cfcPath,_175.httpMethod,_17d,_184,_183,null,true);
if(!_184){
return $X.processResponse(req,_175);
}
};
$X.callback=function(req,_189,_18a){
if($A.isRequestError(req)){
$C.handleError(_189.errorHandler,"ajaxproxy.invoke.error","http",[req.status,_189.cfcPath,req.statusText],req.status,req.statusText,false,_18a);
}else{
if(_189.callbackHandler){
var _18b=$X.processResponse(req,_189);
_189.callbackHandler(_18b,_18a);
}
}
};
$X.callbackOp=function(req,_18d,_18e,_18f,_190){
if($A.isRequestError(req)){
var _191=_18d.errorHandler;
if(_190!=null){
_191=_190;
}
$C.handleError(_191,"ajaxproxy.invoke.error","http",[req.status,_18d.cfcPath,req.statusText],req.status,req.statusText,false,_18e);
}else{
if(_18f){
var _192=$X.processResponse(req,_18d);
_18f(_192,_18e);
}
}
};
$X.processResponse=function(req,_194){
var _195=true;
for(var i=0;i<req.responseText.length;i++){
var c=req.responseText.charAt(i);
_195=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_195){
break;
}
}
var _198=(req.responseXML&&req.responseXML.childNodes.length>0);
var _199=_198?"[XML Document]":req.responseText;
$L.info("ajaxproxy.invoke.response","http",[_199]);
var _19a;
var _19b=_194.returnFormat||"json";
if(_19b=="json"){
try{
_19a=_195?null:$X.JSON.decode(req.responseText);
}
catch(e){
if(typeof _194._metadata!=="undefined"&&_194._metadata.servercfc&&typeof req.responseText==="string"){
_19a=req.responseText;
}else{
throw e;
}
}
}else{
_19a=_198?req.responseXML:(_195?null:req.responseText);
}
return _19a;
};
$X.init=function(_19c,_19d,_19e){
if(typeof _19e==="undefined"){
_19e=false;
}
var _19f=_19d;
if(!_19e){
var _1a0=_19d.split(".");
var ns=self;
for(i=0;i<_1a0.length-1;i++){
if(_1a0[i].length){
ns[_1a0[i]]=ns[_1a0[i]]||{};
ns=ns[_1a0[i]];
}
}
var _1a2=_1a0[_1a0.length-1];
if(ns[_1a2]){
return ns[_1a2];
}
ns[_1a2]=function(){
this.httpMethod="GET";
this.async=false;
this.callbackHandler=null;
this.errorHandler=null;
this.formId=null;
};
_19f=ns[_1a2].prototype;
}else{
_19f.httpMethod="GET";
_19f.async=false;
_19f.callbackHandler=null;
_19f.errorHandler=null;
_19f.formId=null;
}
_19f.cfcPath=_19c;
_19f.setHTTPMethod=function(_1a3){
if(_1a3){
_1a3=_1a3.toUpperCase();
}
if(_1a3!="GET"&&_1a3!="POST"){
$C.handleError(null,"ajaxproxy.sethttpmethod.invalidmethod","http",[_1a3],null,null,true);
}
this.httpMethod=_1a3;
};
_19f.setSyncMode=function(){
this.async=false;
};
_19f.setAsyncMode=function(){
this.async=true;
};
_19f.setCallbackHandler=function(fn){
this.callbackHandler=fn;
this.setAsyncMode();
};
_19f.setErrorHandler=function(fn){
this.errorHandler=fn;
this.setAsyncMode();
};
_19f.setForm=function(fn){
this.formId=fn;
};
_19f.setQueryFormat=function(_1a7){
if(_1a7){
_1a7=_1a7.toLowerCase();
}
if(!_1a7||(_1a7!="column"&&_1a7!="row"&&_1a7!="struct")){
$C.handleError(null,"ajaxproxy.setqueryformat.invalidformat","http",[_1a7],null,null,true);
}
this.queryFormat=_1a7;
};
_19f.setReturnFormat=function(_1a8){
if(_1a8){
_1a8=_1a8.toLowerCase();
}
if(!_1a8||(_1a8!="plain"&&_1a8!="json"&&_1a8!="wddx")){
$C.handleError(null,"ajaxproxy.setreturnformat.invalidformat","http",[_1a8],null,null,true);
}
this.returnFormat=_1a8;
};
$L.info("ajaxproxy.init.created","http",[_19c]);
if(_19e){
return _19f;
}else{
return ns[_1a2];
}
};
$U.isWhitespace=function(s){
var _1aa=true;
for(var i=0;i<s.length;i++){
var c=s.charAt(i);
_1aa=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_1aa){
break;
}
}
return _1aa;
};
$U.getFirstNonWhitespaceIndex=function(s){
var _1ae=true;
for(var i=0;i<s.length;i++){
var c=s.charAt(i);
_1ae=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_1ae){
break;
}
}
return i;
};
$C.trim=function(_1b1){
return _1b1.replace(/^\s+|\s+$/g,"");
};
$U.isInteger=function(n){
var _1b3=true;
if(typeof (n)=="number"){
_1b3=(n>=0);
}else{
for(i=0;i<n.length;i++){
if($U.isInteger.numberChars.indexOf(n.charAt(i))==-1){
_1b3=false;
break;
}
}
}
return _1b3;
};
$U.isInteger.numberChars="0123456789";
$U.isArray=function(a){
return (typeof (a.length)=="number"&&!a.toUpperCase);
};
$U.isBoolean=function(b){
if(b===true||b===false){
return true;
}else{
if(b.toLowerCase){
b=b.toLowerCase();
return (b==$U.isBoolean.trueChars||b==$U.isBoolean.falseChars);
}else{
return false;
}
}
};
$U.isBoolean.trueChars="true";
$U.isBoolean.falseChars="false";
$U.castBoolean=function(b){
if(b===true){
return true;
}else{
if(b===false){
return false;
}else{
if(b.toLowerCase){
b=b.toLowerCase();
if(b==$U.isBoolean.trueChars){
return true;
}else{
if(b==$U.isBoolean.falseChars){
return false;
}else{
return false;
}
}
}else{
return false;
}
}
}
};
$U.checkQuery=function(o){
var _1b8=null;
if(o&&o.COLUMNS&&$U.isArray(o.COLUMNS)&&o.DATA&&$U.isArray(o.DATA)&&(o.DATA.length==0||(o.DATA.length>0&&$U.isArray(o.DATA[0])))){
_1b8="row";
}else{
if(o&&o.COLUMNS&&$U.isArray(o.COLUMNS)&&o.ROWCOUNT&&$U.isInteger(o.ROWCOUNT)&&o.DATA){
_1b8="col";
for(var i=0;i<o.COLUMNS.length;i++){
var _1ba=o.DATA[o.COLUMNS[i]];
if(!_1ba||!$U.isArray(_1ba)){
_1b8=null;
break;
}
}
}
}
return _1b8;
};
$X.JSON=new function(){
var _1bb={}.hasOwnProperty?true:false;
var _1bc=/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/;
var pad=function(n){
return n<10?"0"+n:n;
};
var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"};
var _1c0=function(s){
if(/["\\\x00-\x1f]/.test(s)){
return "\""+s.replace(/([\x00-\x1f\\"])/g,function(a,b){
var c=m[b];
if(c){
return c;
}
c=b.charCodeAt();
return "\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16);
})+"\"";
}
return "\""+s+"\"";
};
var _1c5=function(o){
var a=["["],b,i,l=o.length,v;
for(i=0;i<l;i+=1){
v=o[i];
switch(typeof v){
case "undefined":
case "function":
case "unknown":
break;
default:
if(b){
a.push(",");
}
a.push(v===null?"null":$X.JSON.encode(v));
b=true;
}
}
a.push("]");
return a.join("");
};
var _1c8=function(o){
return "\""+o.getFullYear()+"-"+pad(o.getMonth()+1)+"-"+pad(o.getDate())+"T"+pad(o.getHours())+":"+pad(o.getMinutes())+":"+pad(o.getSeconds())+"\"";
};
this.encode=function(o){
return this.encodeInternal(o,false);
};
this.encodeInternal=function(o,cfc){
if(typeof o=="undefined"||o===null){
return "null";
}else{
if(o instanceof Array){
return _1c5(o);
}else{
if(o instanceof Date){
if(cfc){
return this.encodeInternal({_date_:o.getTime()},cfc);
}
return _1c8(o);
}else{
if(typeof o=="string"){
return _1c0(o);
}else{
if(typeof o=="number"){
return isFinite(o)?String(o):"null";
}else{
if(typeof o=="boolean"){
return String(o);
}else{
if(cfc&&typeof o=="object"&&typeof o._metadata!=="undefined"){
return "{\"_metadata\":"+this.encodeInternal(o._metadata,false)+",\"_variables\":"+this.encodeInternal(o._variables,cfc)+"}";
}else{
var a=["{"],b,i,v;
for(var i in o){
if(!_1bb||o.hasOwnProperty(i)){
v=o[i];
switch(typeof v){
case "undefined":
case "function":
case "unknown":
break;
default:
if(b){
a.push(",");
}
a.push(this.encodeInternal(i,cfc),":",v===null?"null":this.encodeInternal(v,cfc));
b=true;
}
}
}
a.push("}");
return a.join("");
}
}
}
}
}
}
}
};
this.decode=function(json){
if(typeof json=="object"){
return json;
}
if($U.isWhitespace(json)){
return null;
}
var _1d0=$U.getFirstNonWhitespaceIndex(json);
if(_1d0>0){
json=json.slice(_1d0);
}
if(window._cf_jsonprefix&&json.indexOf(_cf_jsonprefix)==0){
json=json.slice(_cf_jsonprefix.length);
}
try{
if(_1bc.test(json)){
return eval("("+json+")");
}
}
catch(e){
}
throw new SyntaxError("parseJSON");
};
}();
if(!$C.JSON){
$C.JSON={};
}
$C.JSON.encode=$X.JSON.encode;
$C.JSON.encodeInternal=$X.JSON.encodeInternal;
$C.JSON.decode=$X.JSON.decode;
$C.navigate=function(url,_1d2,_1d3,_1d4,_1d5,_1d6){
if(url==null){
$C.handleError(_1d4,"navigate.urlrequired","widget");
return;
}
if(_1d5){
_1d5=_1d5.toUpperCase();
if(_1d5!="GET"&&_1d5!="POST"){
$C.handleError(null,"navigate.invalidhttpmethod","http",[_1d5],null,null,true);
}
}else{
_1d5="GET";
}
var _1d7;
if(_1d6){
_1d7=$C.getFormQueryString(_1d6);
if(_1d7==-1){
$C.handleError(null,"navigate.formnotfound","http",[_1d6],null,null,true);
}
}
if(_1d2==null){
if(_1d7){
if(url.indexOf("?")==-1){
url+="?"+_1d7;
}else{
url+="&"+_1d7;
}
}
$L.info("navigate.towindow","widget",[url]);
window.location.replace(url);
return;
}
$L.info("navigate.tocontainer","widget",[url,_1d2]);
var obj=$C.objectCache[_1d2];
if(obj!=null){
if(typeof (obj._cf_body)!="undefined"&&obj._cf_body!=null){
_1d2=obj._cf_body;
}
}
$A.replaceHTML(_1d2,url,_1d5,_1d7,_1d3,_1d4);
};
$A.checkForm=function(_1d9,_1da,_1db,_1dc,_1dd){
var _1de=_1da.call(null,_1d9);
if(_1de==false){
return false;
}
var _1df=$C.getFormQueryString(_1d9);
$L.info("ajax.submitform.submitting","http",[_1d9.name]);
$A.replaceHTML(_1db,_1d9.action,_1d9.method,_1df,_1dc,_1dd);
return false;
};
$A.replaceHTML=function(_1e0,url,_1e2,_1e3,_1e4,_1e5){
var _1e6=document.getElementById(_1e0);
if(!_1e6){
$C.handleError(_1e5,"ajax.replacehtml.elnotfound","http",[_1e0]);
return;
}
var _1e7="_cf_containerId="+encodeURIComponent(_1e0);
_1e3=(_1e3)?_1e3+"&"+_1e7:_1e7;
$L.info("ajax.replacehtml.replacing","http",[_1e0,url,_1e3]);
if(_cf_loadingtexthtml){
try{
_1e6.innerHTML=_cf_loadingtexthtml;
}
catch(e){
}
}
var _1e8=function(req,_1ea){
var _1eb=false;
if($A.isRequestError(req)){
$C.handleError(_1e5,"ajax.replacehtml.error","http",[req.status,_1ea.id,req.statusText],req.status,req.statusText);
_1eb=true;
}
var _1ec=new $E.CustomEvent("onReplaceHTML",_1ea);
var _1ed=new $E.CustomEvent("onReplaceHTMLUser",_1ea);
$E.loadEvents[_1ea.id]={system:_1ec,user:_1ed};
if(req.responseText.search(/<script/i)!=-1){
try{
_1ea.innerHTML="";
}
catch(e){
}
$A.replaceHTML.processResponseText(req.responseText,_1ea,_1e5);
}else{
try{
_1ea.innerHTML=req.responseText;
$A.updateLayouttab(_1ea);
}
catch(e){
}
}
$E.loadEvents[_1ea.id]=null;
_1ec.fire();
_1ec.unsubscribe();
_1ed.fire();
_1ed.unsubscribe();
$L.info("ajax.replacehtml.success","http",[_1ea.id]);
if(_1e4&&!_1eb){
_1e4();
}
};
try{
$A.sendMessage(url,_1e2,_1e3,true,_1e8,_1e6);
}
catch(e){
try{
_1e6.innerHTML=$L.format(CFMessage["ajax.replacehtml.connectionerrordisplay"],[url,e]);
}
catch(e){
}
$C.handleError(_1e5,"ajax.replacehtml.connectionerror","http",[_1e0,url,e]);
}
};
$A.replaceHTML.processResponseText=function(text,_1ef,_1f0){
var pos=0;
var _1f2=0;
var _1f3=0;
_1ef._cf_innerHTML="";
while(pos<text.length){
var _1f4=text.indexOf("<s",pos);
if(_1f4==-1){
_1f4=text.indexOf("<S",pos);
}
if(_1f4==-1){
break;
}
pos=_1f4;
var _1f5=true;
var _1f6=$A.replaceHTML.processResponseText.scriptTagChars;
for(var i=1;i<_1f6.length;i++){
var _1f8=pos+i+1;
if(_1f8>text.length){
break;
}
var _1f9=text.charAt(_1f8);
if(_1f6[i][0]!=_1f9&&_1f6[i][1]!=_1f9){
pos+=i+1;
_1f5=false;
break;
}
}
if(!_1f5){
continue;
}
var _1fa=text.substring(_1f2,pos);
if(_1fa){
_1ef._cf_innerHTML+=_1fa;
}
var _1fb=text.indexOf(">",pos)+1;
if(_1fb==0){
pos++;
continue;
}else{
pos+=7;
}
var _1fc=_1fb;
while(_1fc<text.length&&_1fc!=-1){
_1fc=text.indexOf("</s",_1fc);
if(_1fc==-1){
_1fc=text.indexOf("</S",_1fc);
}
if(_1fc!=-1){
_1f5=true;
for(var i=1;i<_1f6.length;i++){
var _1f8=_1fc+2+i;
if(_1f8>text.length){
break;
}
var _1f9=text.charAt(_1f8);
if(_1f6[i][0]!=_1f9&&_1f6[i][1]!=_1f9){
_1fc=_1f8;
_1f5=false;
break;
}
}
if(_1f5){
break;
}
}
}
if(_1fc!=-1){
var _1fd=text.substring(_1fb,_1fc);
var _1fe=_1fd.indexOf("<!--");
if(_1fe!=-1){
_1fd=_1fd.substring(_1fe+4);
}
var _1ff=_1fd.lastIndexOf("//-->");
if(_1ff!=-1){
_1fd=_1fd.substring(0,_1ff-1);
}
if(_1fd.indexOf("document.write")!=-1||_1fd.indexOf("CF_RunContent")!=-1){
if(_1fd.indexOf("CF_RunContent")!=-1){
_1fd=_1fd.replace("CF_RunContent","document.write");
}
_1fd="var _cfDomNode = document.getElementById('"+_1ef.id+"'); var _cfBuffer='';"+"if (!document._cf_write)"+"{document._cf_write = document.write;"+"document.write = function(str){if (_cfBuffer!=null){_cfBuffer+=str;}else{document._cf_write(str);}};};"+_1fd+";_cfDomNode._cf_innerHTML += _cfBuffer; _cfBuffer=null;";
}
try{
eval(_1fd);
}
catch(ex){
$C.handleError(_1f0,"ajax.replacehtml.jserror","http",[_1ef.id,ex]);
}
}
_1f4=text.indexOf(">",_1fc)+1;
if(_1f4==0){
_1f3=_1fc+1;
break;
}
_1f3=_1f4;
pos=_1f4;
_1f2=_1f4;
}
if(_1f3<text.length-1){
var _1fa=text.substring(_1f3,text.length);
if(_1fa){
_1ef._cf_innerHTML+=_1fa;
}
}
try{
_1ef.innerHTML=_1ef._cf_innerHTML;
$A.updateLayouttab(_1ef);
}
catch(e){
}
_1ef._cf_innerHTML="";
};
$A.updateLayouttab=function(_200){
var _201=_200.id;
if(_201.length>13&&_201.indexOf("cf_layoutarea")==0){
var s=_201.substr(13,_201.length);
var cmp=Ext.getCmp(s);
var _204=_200.innerHTML;
if(cmp){
cmp.update("<div id="+_200.id+">"+_200.innerHTML+"</div>");
}
var _205=document.getElementById(_201);
if(_205){
_205.innerHTML=_204;
}
}
};
$A.replaceHTML.processResponseText.scriptTagChars=[["s","S"],["c","C"],["r","R"],["i","I"],["p","P"],["t","T"]];
$D.getElement=function(_206,_207){
var _208=function(_209){
return (_209.name==_206||_209.id==_206);
};
var _20a=$D.getElementsBy(_208,null,_207);
if(_20a.length==1){
return _20a[0];
}else{
return _20a;
}
};
$D.getElementsBy=function(_20b,tag,root){
tag=tag||"*";
var _20e=[];
if(root){
root=$D.get(root);
if(!root){
return _20e;
}
}else{
root=document;
}
var _20f=root.getElementsByTagName(tag);
if(!_20f.length&&(tag=="*"&&root.all)){
_20f=root.all;
}
for(var i=0,len=_20f.length;i<len;++i){
if(_20b(_20f[i])){
_20e[_20e.length]=_20f[i];
}
}
return _20e;
};
$D.get=function(el){
if(!el){
return null;
}
if(typeof el!="string"&&!(el instanceof Array)){
return el;
}
if(typeof el=="string"){
return document.getElementById(el);
}else{
var _212=[];
for(var i=0,len=el.length;i<len;++i){
_212[_212.length]=$D.get(el[i]);
}
return _212;
}
return null;
};
$E.loadEvents={};
$E.CustomEvent=function(_214,_215){
return {name:_214,domNode:_215,subs:[],subscribe:function(func,_217){
var dup=false;
for(var i=0;i<this.subs.length;i++){
var sub=this.subs[i];
if(sub.f==func&&sub.p==_217){
dup=true;
break;
}
}
if(!dup){
this.subs.push({f:func,p:_217});
}
},fire:function(){
for(var i=0;i<this.subs.length;i++){
var sub=this.subs[i];
sub.f.call(null,this,sub.p);
}
},unsubscribe:function(){
this.subscribers=[];
}};
};
$E.windowLoadImpEvent=new $E.CustomEvent("cfWindowLoadImp");
$E.windowLoadEvent=new $E.CustomEvent("cfWindowLoad");
$E.windowLoadUserEvent=new $E.CustomEvent("cfWindowLoadUser");
$E.listeners=[];
$E.addListener=function(el,ev,fn,_220){
var l={el:el,ev:ev,fn:fn,params:_220};
$E.listeners.push(l);
var _222=function(e){
if(!e){
var e=window.event;
}
fn.call(null,e,_220);
};
if(el.addEventListener){
el.addEventListener(ev,_222,false);
return true;
}else{
if(el.attachEvent){
el.attachEvent("on"+ev,_222);
return true;
}else{
return false;
}
}
};
$E.isListener=function(el,ev,fn,_227){
var _228=false;
var ls=$E.listeners;
for(var i=0;i<ls.length;i++){
if(ls[i].el==el&&ls[i].ev==ev&&ls[i].fn==fn&&ls[i].params==_227){
_228=true;
break;
}
}
return _228;
};
$E.callBindHandlers=function(id,_22c,ev){
var el=document.getElementById(id);
if(!el){
return;
}
var ls=$E.listeners;
for(var i=0;i<ls.length;i++){
if(ls[i].el==el&&ls[i].ev==ev&&ls[i].fn._cf_bindhandler){
ls[i].fn.call(null,null,ls[i].params);
}
}
};
$E.registerOnLoad=function(func,_232,_233,user){
if($E.registerOnLoad.windowLoaded){
if(_232&&_232._cf_containerId&&$E.loadEvents[_232._cf_containerId]){
if(user){
$E.loadEvents[_232._cf_containerId].user.subscribe(func,_232);
}else{
$E.loadEvents[_232._cf_containerId].system.subscribe(func,_232);
}
}else{
func.call(null,null,_232);
}
}else{
if(user){
$E.windowLoadUserEvent.subscribe(func,_232);
}else{
if(_233){
$E.windowLoadImpEvent.subscribe(func,_232);
}else{
$E.windowLoadEvent.subscribe(func,_232);
}
}
}
};
$E.registerOnLoad.windowLoaded=false;
$E.onWindowLoad=function(fn){
if(window.addEventListener){
window.addEventListener("load",fn,false);
}else{
if(window.attachEvent){
window.attachEvent("onload",fn);
}else{
if(document.getElementById){
window.onload=fn;
}
}
}
};
$C.addSpanToDom=function(){
var _236=document.createElement("span");
document.body.insertBefore(_236,document.body.firstChild);
};
$E.windowLoadHandler=function(e){
if(window.Ext){
Ext.BLANK_IMAGE_URL=_cf_ajaxscriptsrc+"/resources/ext/images/default/s.gif";
}
$C.addSpanToDom();
$L.init();
$E.registerOnLoad.windowLoaded=true;
$E.windowLoadImpEvent.fire();
$E.windowLoadImpEvent.unsubscribe();
$E.windowLoadEvent.fire();
$E.windowLoadEvent.unsubscribe();
if(window.Ext){
Ext.onReady(function(){
$E.windowLoadUserEvent.fire();
});
}else{
$E.windowLoadUserEvent.fire();
}
$E.windowLoadUserEvent.unsubscribe();
};
$E.onWindowLoad($E.windowLoadHandler);
$B.register=function(_238,_239,_23a,_23b){
for(var i=0;i<_238.length;i++){
var _23d=_238[i][0];
var _23e=_238[i][1];
var _23f=_238[i][2];
if(window[_23d]){
var _240=eval(_23d);
if(_240&&_240._cf_register){
_240._cf_register(_23f,_23a,_239);
continue;
}
}
var _241=$C.objectCache[_23d];
if(_241&&_241._cf_register){
_241._cf_register(_23f,_23a,_239);
continue;
}
var _242=$D.getElement(_23d,_23e);
var _243=(_242&&((!_242.length&&_242.length!=0)||(_242.length&&_242.length>0)||_242.tagName=="SELECT"));
if(!_243){
$C.handleError(null,"bind.register.elnotfound","bind",[_23d]);
}
if(_242.length>1&&!_242.options){
for(var j=0;j<_242.length;j++){
$B.register.addListener(_242[j],_23f,_23a,_239);
}
}else{
$B.register.addListener(_242,_23f,_23a,_239);
}
}
if(!$C.bindHandlerCache[_239.bindTo]&&typeof (_239.bindTo)=="string"){
$C.bindHandlerCache[_239.bindTo]=function(){
_23a.call(null,null,_239);
};
}
if(_23b){
_23a.call(null,null,_239);
}
};
$B.register.addListener=function(_245,_246,_247,_248){
if(!$E.isListener(_245,_246,_247,_248)){
$E.addListener(_245,_246,_247,_248);
}
};
$B.assignValue=function(_249,_24a,_24b,_24c){
if(!_249){
return;
}
if(_249.call){
_249.call(null,_24b,_24c);
return;
}
var _24d=$C.objectCache[_249];
if(_24d&&_24d._cf_setValue){
_24d._cf_setValue(_24b);
return;
}
var _24e=document.getElementById(_249);
if(!_24e){
$C.handleError(null,"bind.assignvalue.elnotfound","bind",[_249]);
}
if(_24e.tagName=="SELECT"){
var _24f=$U.checkQuery(_24b);
var _250=$C.objectCache[_249];
if(_24f){
if(!_250||(_250&&(!_250.valueCol||!_250.displayCol))){
$C.handleError(null,"bind.assignvalue.selboxmissingvaldisplay","bind",[_249]);
return;
}
}else{
if(typeof (_24b.length)=="number"&&!_24b.toUpperCase){
if(_24b.length>0&&(typeof (_24b[0].length)!="number"||_24b[0].toUpperCase)){
$C.handleError(null,"bind.assignvalue.selboxerror","bind",[_249]);
return;
}
}else{
$C.handleError(null,"bind.assignvalue.selboxerror","bind",[_249]);
return;
}
}
_24e.options.length=0;
var _251;
var _252=false;
if(_250){
_251=_250.selected;
if(_251&&_251.length>0){
_252=true;
}
}
if(!_24f){
for(var i=0;i<_24b.length;i++){
var opt=new Option(_24b[i][1],_24b[i][0]);
_24e.options[i]=opt;
if(_252){
for(var j=0;j<_251.length;j++){
if(_251[j]==opt.value){
opt.selected=true;
}
}
}
}
}else{
if(_24f=="col"){
var _256=_24b.DATA[_250.valueCol];
var _257=_24b.DATA[_250.displayCol];
if(!_256||!_257){
$C.handleError(null,"bind.assignvalue.selboxinvalidvaldisplay","bind",[_249]);
return;
}
for(var i=0;i<_256.length;i++){
var opt=new Option(_257[i],_256[i]);
_24e.options[i]=opt;
if(_252){
for(var j=0;j<_251.length;j++){
if(_251[j]==opt.value){
opt.selected=true;
}
}
}
}
}else{
if(_24f=="row"){
var _258=-1;
var _259=-1;
for(var i=0;i<_24b.COLUMNS.length;i++){
var col=_24b.COLUMNS[i];
if(col==_250.valueCol){
_258=i;
}
if(col==_250.displayCol){
_259=i;
}
if(_258!=-1&&_259!=-1){
break;
}
}
if(_258==-1||_259==-1){
$C.handleError(null,"bind.assignvalue.selboxinvalidvaldisplay","bind",[_249]);
return;
}
for(var i=0;i<_24b.DATA.length;i++){
var opt=new Option(_24b.DATA[i][_259],_24b.DATA[i][_258]);
_24e.options[i]=opt;
if(_252){
for(var j=0;j<_251.length;j++){
if(_251[j]==opt.value){
opt.selected=true;
}
}
}
}
}
}
}
}else{
_24e[_24a]=_24b;
}
$E.callBindHandlers(_249,null,"change");
$L.info("bind.assignvalue.success","bind",[_24b,_249,_24a]);
};
$B.localBindHandler=function(e,_25c){
var _25d=document.getElementById(_25c.bindTo);
var _25e=$B.evaluateBindTemplate(_25c,true);
$B.assignValue(_25c.bindTo,_25c.bindToAttr,_25e);
};
$B.localBindHandler._cf_bindhandler=true;
$B.evaluateBindTemplate=function(_25f,_260,_261,_262,_263){
var _264=_25f.bindExpr;
var _265="";
if(typeof _263=="undefined"){
_263=false;
}
for(var i=0;i<_264.length;i++){
if(typeof (_264[i])=="object"){
var _267=null;
if(!_264[i].length||typeof _264[i][0]=="object"){
_267=$X.JSON.encode(_264[i]);
}else{
var _267=$B.getBindElementValue(_264[i][0],_264[i][1],_264[i][2],_260,_262);
if(_267==null){
if(_260){
_265="";
break;
}else{
_267="";
}
}
}
if(_261){
_267=encodeURIComponent(_267);
}
_265+=_267;
}else{
var _268=_264[i];
if(_263==true&&i>0){
if(typeof (_268)=="string"&&_268.indexOf("&")!=0){
_268=encodeURIComponent(_268);
}
}
_265+=_268;
}
}
return _265;
};
$B.jsBindHandler=function(e,_26a){
var _26b=_26a.bindExpr;
var _26c=new Array();
var _26d=_26a.callFunction+"(";
for(var i=0;i<_26b.length;i++){
var _26f;
if(typeof (_26b[i])=="object"){
if(_26b[i].length){
if(typeof _26b[i][0]=="object"){
_26f=_26b[i];
}else{
_26f=$B.getBindElementValue(_26b[i][0],_26b[i][1],_26b[i][2],false);
}
}else{
_26f=_26b[i];
}
}else{
_26f=_26b[i];
}
if(i!=0){
_26d+=",";
}
_26c[i]=_26f;
_26d+="'"+_26f+"'";
}
_26d+=")";
var _270=_26a.callFunction.apply(null,_26c);
$B.assignValue(_26a.bindTo,_26a.bindToAttr,_270,_26a.bindToParams);
};
$B.jsBindHandler._cf_bindhandler=true;
$B.urlBindHandler=function(e,_272){
var _273=_272.bindTo;
if($C.objectCache[_273]&&$C.objectCache[_273]._cf_visible===false){
$C.objectCache[_273]._cf_dirtyview=true;
return;
}
var url=$B.evaluateBindTemplate(_272,false,true,false,true);
var _275=$U.extractReturnFormat(url);
if(_275==null||typeof _275=="undefined"){
_275="JSON";
}
if(_272.bindToAttr||typeof _272.bindTo=="undefined"||typeof _272.bindTo=="function"){
var _272={"bindTo":_272.bindTo,"bindToAttr":_272.bindToAttr,"bindToParams":_272.bindToParams,"errorHandler":_272.errorHandler,"url":url,returnFormat:_275};
try{
$A.sendMessage(url,"GET",null,true,$B.urlBindHandler.callback,_272);
}
catch(e){
$C.handleError(_272.errorHandler,"ajax.urlbindhandler.connectionerror","http",[url,e]);
}
}else{
$A.replaceHTML(_273,url,null,null,_272.callback,_272.errorHandler);
}
};
$B.urlBindHandler._cf_bindhandler=true;
$B.urlBindHandler.callback=function(req,_277){
if($A.isRequestError(req)){
$C.handleError(_277.errorHandler,"bind.urlbindhandler.httperror","http",[req.status,_277.url,req.statusText],req.status,req.statusText);
}else{
$L.info("bind.urlbindhandler.response","http",[req.responseText]);
var _278;
try{
if(_277.returnFormat==null||_277.returnFormat==="JSON"){
_278=$X.JSON.decode(req.responseText);
}else{
_278=req.responseText;
}
}
catch(e){
if(req.responseText!=null&&typeof req.responseText=="string"){
_278=req.responseText;
}else{
$C.handleError(_277.errorHandler,"bind.urlbindhandler.jsonerror","http",[req.responseText]);
}
}
$B.assignValue(_277.bindTo,_277.bindToAttr,_278,_277.bindToParams);
}
};
$A.initSelect=function(_279,_27a,_27b,_27c){
$C.objectCache[_279]={"valueCol":_27a,"displayCol":_27b,selected:_27c};
};
$S.setupSpry=function(){
if(typeof (Spry)!="undefined"&&Spry.Data){
Spry.Data.DataSet.prototype._cf_getAttribute=function(_27d){
var val;
var row=this.getCurrentRow();
if(row){
val=row[_27d];
}
return val;
};
Spry.Data.DataSet.prototype._cf_register=function(_280,_281,_282){
var obs={bindParams:_282};
obs.onCurrentRowChanged=function(){
_281.call(null,null,this.bindParams);
};
obs.onDataChanged=function(){
_281.call(null,null,this.bindParams);
};
this.addObserver(obs);
};
if(Spry.Debug.trace){
var _284=Spry.Debug.trace;
Spry.Debug.trace=function(str){
$L.info(str,"spry");
_284(str);
};
}
if(Spry.Debug.reportError){
var _286=Spry.Debug.reportError;
Spry.Debug.reportError=function(str){
$L.error(str,"spry");
_286(str);
};
}
$L.info("spry.setupcomplete","bind");
}
};
$E.registerOnLoad($S.setupSpry,null,true);
$S.bindHandler=function(_288,_289){
var url;
var _28b="_cf_nodebug=true&_cf_nocache=true";
if(window._cf_clientid){
_28b+="&_cf_clientid="+_cf_clientid;
}
var _28c=window[_289.bindTo];
var _28d=(typeof (_28c)=="undefined");
if(_289.cfc){
var _28e={};
var _28f=_289.bindExpr;
for(var i=0;i<_28f.length;i++){
var _291;
if(_28f[i].length==2){
_291=_28f[i][1];
}else{
_291=$B.getBindElementValue(_28f[i][1],_28f[i][2],_28f[i][3],false,_28d);
}
_28e[_28f[i][0]]=_291;
}
_28e=$X.JSON.encode(_28e);
_28b+="&method="+_289.cfcFunction;
_28b+="&argumentCollection="+encodeURIComponent(_28e);
$L.info("spry.bindhandler.loadingcfc","http",[_289.bindTo,_289.cfc,_289.cfcFunction,_28e]);
url=_289.cfc;
}else{
url=$B.evaluateBindTemplate(_289,false,true,_28d);
$L.info("spry.bindhandler.loadingurl","http",[_289.bindTo,url]);
}
var _292=_289.options||{};
if((_28c&&_28c._cf_type=="json")||_289.dsType=="json"){
_28b+="&returnformat=json";
}
if(_28c){
if(_28c.requestInfo.method=="GET"){
_292.method="GET";
if(url.indexOf("?")==-1){
url+="?"+_28b;
}else{
url+="&"+_28b;
}
}else{
_292.postData=_28b;
_292.method="POST";
_28c.setURL("");
}
_28c.setURL(url,_292);
_28c.loadData();
}else{
if(!_292.method||_292.method=="GET"){
if(url.indexOf("?")==-1){
url+="?"+_28b;
}else{
url+="&"+_28b;
}
}else{
_292.postData=_28b;
_292.useCache=false;
}
var ds;
if(_289.dsType=="xml"){
ds=new Spry.Data.XMLDataSet(url,_289.xpath,_292);
}else{
ds=new Spry.Data.JSONDataSet(url,_292);
ds.preparseFunc=$S.preparseData;
}
ds._cf_type=_289.dsType;
var _294={onLoadError:function(req){
$C.handleError(_289.errorHandler,"spry.bindhandler.error","http",[_289.bindTo,req.url,req.requestInfo.postData]);
}};
ds.addObserver(_294);
window[_289.bindTo]=ds;
}
};
$S.bindHandler._cf_bindhandler=true;
$S.preparseData=function(ds,_297){
var _298=$U.getFirstNonWhitespaceIndex(_297);
if(_298>0){
_297=_297.slice(_298);
}
if(window._cf_jsonprefix&&_297.indexOf(_cf_jsonprefix)==0){
_297=_297.slice(_cf_jsonprefix.length);
}
return _297;
};
$P.init=function(_299){
$L.info("pod.init.creating","widget",[_299]);
var _29a={};
_29a._cf_body=_299+"_body";
$C.objectCache[_299]=_29a;
};
$B.cfcBindHandler=function(e,_29c){
var _29d=(_29c.httpMethod)?_29c.httpMethod:"GET";
var _29e={};
var _29f=_29c.bindExpr;
for(var i=0;i<_29f.length;i++){
var _2a1;
if(_29f[i].length==2){
_2a1=_29f[i][1];
}else{
_2a1=$B.getBindElementValue(_29f[i][1],_29f[i][2],_29f[i][3],false);
}
_29e[_29f[i][0]]=_2a1;
}
var _2a2=function(_2a3,_2a4){
$B.assignValue(_2a4.bindTo,_2a4.bindToAttr,_2a3,_2a4.bindToParams);
};
var _2a5={"bindTo":_29c.bindTo,"bindToAttr":_29c.bindToAttr,"bindToParams":_29c.bindToParams};
var _2a6={"async":true,"cfcPath":_29c.cfc,"httpMethod":_29d,"callbackHandler":_2a2,"errorHandler":_29c.errorHandler};
if(_29c.proxyCallHandler){
_2a6.callHandler=_29c.proxyCallHandler;
_2a6.callHandlerParams=_29c;
}
$X.invoke(_2a6,_29c.cfcFunction,_29c._cf_ajaxproxytoken,_29e,_2a5);
};
$B.cfcBindHandler._cf_bindhandler=true;
$U.extractReturnFormat=function(url){
var _2a8;
var _2a9=url.toUpperCase();
var _2aa=_2a9.indexOf("RETURNFORMAT");
if(_2aa>0){
var _2ab=_2a9.indexOf("&",_2aa+13);
if(_2ab<0){
_2ab=_2a9.length;
}
_2a8=_2a9.substring(_2aa+13,_2ab);
}
return _2a8;
};
$U.replaceAll=function(_2ac,_2ad,_2ae){
var _2af=_2ac.indexOf(_2ad);
while(_2af>-1){
_2ac=_2ac.replace(_2ad,_2ae);
_2af=_2ac.indexOf(_2ad);
}
return _2ac;
};
$U.cloneObject=function(obj){
var _2b1={};
for(key in obj){
var _2b2=obj[key];
if(typeof _2b2=="object"){
_2b2=$U.cloneObject(_2b2);
}
_2b1.key=_2b2;
}
return _2b1;
};
$C.clone=function(obj,_2b4){
if(typeof (obj)!="object"){
return obj;
}
if(obj==null){
return obj;
}
var _2b5=new Object();
for(var i in obj){
if(_2b4===true){
_2b5[i]=$C.clone(obj[i]);
}else{
_2b5[i]=obj[i];
}
}
return _2b5;
};
$C.printObject=function(obj){
var str="";
for(key in obj){
str=str+"  "+key+"=";
value=obj[key];
if(typeof (value)=="object"){
value=$C.printObject(value);
}
str+=value;
}
return str;
};
}
}
cfinit();
