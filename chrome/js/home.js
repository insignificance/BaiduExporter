!function(t){function a(n){if(e[n])return e[n].exports;var o=e[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,a),o.loaded=!0,o.exports}var e={};return a.m=t,a.c=e,a.p="",a(0)}([function(t,a,e){!function(){function t(t){var a=window.location.hash;a=a.substr(1).split("&");for(var e=0;e<a.length;e++){var n=a[e],o=n.split("=");if(o[0]==t)return decodeURIComponent(decodeURIComponent(o[1]))}}function a(t){for(var a=[],e=0;e<t.length;e++)a.push({name:t[e].substr(s),link:"https://d.pcs.baidu.com/rest/2.0/pcs/file?method=download&app_id=250528&path="+encodeURIComponent(t[e])});if("TXT"==r)l.dataBox.show(),l.dataBox.fillData(a);else{var n=l.parseAuth(i),d=l.aria2Data(a,n[0],n[2]);o(d)}}function n(){var a=t("path"),e=parseInt(localStorage.getItem("rpc_fold"))||0;console.log(e),void 0==a||"/"==a||e==-1?s=1:0==e&&(s=a.length+1),window.postMessage({type:"get_selected"},"*")}function o(t){for(var a=l.parseAuth(i),e=0;e<t.length;e++){var n={url:a[1],dataType:"json",type:"POST",data:JSON.stringify(t[e]),headers:{Authorization:a[0]}};l.sendToBackground("rpc_data",n,function(t){t?l.showToast("下载成功!赶紧去看看吧~","MODE_SUCCESS"):l.showToast("下载失败!是不是没有开启aria2?","MODE_FAILURE")})}}var r="RPC",i="http://localhost:6800/jsonrpc",d=function(){function t(s){if(s==n)if(0!=o.length){i++,l.showToast("正在获取文件列表... "+i+"/"+(i+o.length-1),"MODE_SUCCESS");var c=o.pop();$.getJSON(window.location.origin+"/api/list",{dir:c,bdstoken:yunData.MYBDSTOKEN,channel:"chunlei",clienttype:0,web:1}).done(function(a){if(setTimeout(function(){t(s)},e),0!=a.errno)return l.showToast("未知错误","MODE_FAILURE"),void console.log(a);for(var n=0;n<a.list.length;n++){var i=a.list[n];i.isdir?o.push(i.path):r.push(i.path)}}).fail(function(a){l.showToast("网络请求失败","MODE_FAILURE"),console.log(a),setTimeout(function(){t(s)},e)})}else 0!=r.length?(l.showToast("正在获取下载地址... ","MODE_SUCCESS"),a(r),d.reset()):(l.showToast("一个文件都没有哦","MODE_CAUTION"),d.reset())}var e,n=0,o=[],r=[],i=0,d={};return d.addFolder=function(t){o.push(t)},d.addFile=function(t){r.push(t)},d.start=function(){e=parseInt(localStorage.getItem("rpc_delay"))||300,n=(new Date).getTime(),t(n)},d.reset=function(){n=0,o=[],r=[],i=0},d}();btoa(new Function("return "+yunData.sign2)()(yunData.sign3,yunData.sign1));window.addEventListener("message",function(t){if(t.source==window&&"selected"==t.data.type){d.reset();var a=t.data.data;if(0==a.length)return void l.showToast("请选择一下你要保存的文件哦","failure");for(var e=0;e<a.length;e++){var n=a[e];n.isdir?d.addFolder(n.path):d.addFile(n.path)}d.start()}});var s,l=e(1);l.init(),l.requestCookies([{url:"http://pan.baidu.com/",name:"BDUSS"},{url:"http://pcs.baidu.com/",name:"pcsett"}]);var c=l.addMenu.init("home");c.on("click",".rpc_export_list",function(){r="RPC",i=$(this).data("id"),n()}),c.on("click","#aria2_download",function(){r="TXT",l.dataBox.init("home"),l.dataBox.onClose(d.reset),n()}),l.showToast("初始化成功!","success")}()},function(t,a){var e=function(){const t="netdisk;5.3.4.5;PC;PC-Windows;5.1.2600;WindowsBaiduYunGuanJia",a="http://pan.baidu.com/disk/home";var n=null;return{init:function(){this.startListen(),"undefined"!=typeof browser&&(chrome=browser,chrome.storage.sync||(chrome.storage.sync=chrome.storage.local)),chrome.storage.sync.get(null,function(t){for(var a in t)localStorage.setItem(a,t[a])})},escapeString:function(t){if(navigator.platform.indexOf("Win")!=-1)return t;var a="'"+t.replace("'","'\\''")+"'";return a},setCenter:function(t){var a=$(window).width(),e=$(window).height(),n=$(document).scrollTop(),o=(a-t.width())/2,r=(e-t.height())/2+n;t.css({left:o+"px",top:r+"px"})},startListen:function(){function t(t,a){var e=new Object;e[t]=a,chrome.storage.sync.set(e,function(){})}window.addEventListener("message",function(a){if(a.source==window){if(a.data.type&&"config_data"==a.data.type)for(var e in a.data.data)localStorage.setItem(e,a.data.data[e]),a.data.data.rpc_sync===!0?t(e,a.data.data[e]):chrome.storage.sync.clear();a.data.type&&"clear_data"==a.data.type&&chrome.storage.sync.clear()}},!1)},sendToBackground:function(t,a,e){chrome.runtime.sendMessage({method:t,data:a},e)},showToast:function(t,a){window.postMessage({type:"show_toast",data:{message:t,type:a}},"*")},getVersion:function(){var t={jsonrpc:"2.0",method:"aria2.getVersion",id:1,params:[]},a=$("#rpc_url_1").val(),e=this.parseAuth(a);e[0]&&e[0].startsWith("token")&&t.params.unshift(e[0]);var n={url:e[1],dataType:"json",type:"POST",data:JSON.stringify(t)};e[0]&&e[0].startsWith("Basic")&&(n.headers={Authorization:e[0]}),this.sendToBackground("rpc_version",n,function(t){t?$("#send_test").html("ARIA2版本为： "+t.result.version):$("#send_test").html("错误,请查看是否开启Aria2")})},parseAuth:function(t){var a=new URL(t),e=""!=a.username?a.username+":"+decodeURI(a.password):null,n=[];e&&0!=e.indexOf("token:")&&(e="Basic "+btoa(e));var o=a.hash.substr(1);o&&o.split("&").forEach(function(t){t=t.split("="),t[0].length>1&&n.push([t[0],2==t.length?t[1]:"enabled"])});var r=a.origin+a.pathname;return[e,r,n]},addMenu:{init:function(t){if(0!=$("#export_menu").length)return $("#export_menu");var a=$("<span>").attr("id","export_menu"),n=$("<div>").addClass("menu").attr("id","aria2_list").hide().appendTo(a);$("<a>").text("导出下载").addClass("g-button-menu").attr("id","aria2_download").appendTo(n);var o=$("<a>").text("设置").addClass("g-button-menu").appendTo(n);return"home"==t?(a.addClass("g-dropdown-button").prepend($("<a>").addClass("g-button").append($("<span>").addClass("g-button-right").append($("<em>").addClass("icon icon-download"),$("<span>").addClass("text").text("导出下载")))),$(".g-dropdown-button").eq(3).after(a)):"share"==t?($(".bar").css("position","absolute"),a.addClass("g-dropdown-button").prepend($("<a>").addClass("g-button").append($("<span>").addClass("g-button-right").append($("<em>").addClass("icon icon-download"),$("<span>").addClass("text").text("导出下载")))),$('a[data-button-id="b3"]').parent().prepend(a)):"album"==t&&(a.addClass("save-button").append('<em class="global-icon-download"></em><b>导出下载</b>'),$("#albumFileSaveKey, #emphsizeButton").parent().prepend(a)),a.mouseenter(function(){a.toggleClass("button-open"),n.show()}),a.mouseleave(function(){a.toggleClass("button-open"),n.hide()}),o.click(function(){0==$("#setting_div").length&&e.setting.init(),$("#setting_divtopmsg").html(""),$("#setting_div").show()}),this.update(),a},update:function(){$(".rpc_export_list").remove();for(var t=JSON.parse(localStorage.getItem("rpc_list")||'[{"name":"ARIA2 RPC","url":"http://localhost:6800/jsonrpc"}]');t.length>0;){var a=t.pop();$("<a class='rpc_export_list'>").addClass("g-button-menu").attr("data-id",a.url).text(a.name).prependTo($("#aria2_list"))}}},setting:{init:function(){var t=this,a=document.createElement("div");if(a.id="setting_div",0!=$("#setting_div").length)return a.id;var n=['<div class="top"><div title="关闭" id="setting_div_close" class="close"></div><h3>导出设置</h3></div>','<div style=" margin: 20px 10px 10px 10px; ">','<div id="setting_divtopmsg" style="position:absolute; margin-top: -18px; margin-left: 10px; color: #E15F00;"></div>','<table id="setting_div_table" >',"<tbody>",'<tr><td><label>开启配置同步:</label></td><td><input id="rpc_sync" type="checkbox"></td></tr>','<tr><td><label>文件夹结构层数：</label></td><td><input type="text" id="rpc_fold" class="input-small">(默认0表示不保留,-1表示保留完整路径)</td></tr>','<tr><td><label>递归下载延迟：</label></td><td><input type="text" id="rpc_delay" class="input-small">(单位:毫秒)<div style="position:absolute; margin-top: -20px; right: 20px;"><a id="send_test" type="0" href="javascript:;" >测试连接，成功显示版本号。</a></div></td></tr>','<tr><td><label>下载路径:</label></td><td><input type="text" placeholder="只能设置为绝对路径" id="setting_aria2_dir" class="input-large"></td></tr>','<tr><td><label>User-Agent :</label></td><td><input type="text" id="setting_aria2_useragent_input" class="input-large"></td></tr>','<tr><td><label>Referer ：</label></td><td><input type="text" id="setting_aria2_referer_input" class="input-large"></td></tr>','<tr><td colspan="2"><div style="color: #656565;">Headers<label style="margin-left: 65px;">※使用回车分隔每个headers。</label></div><li class="b-list-item separator-1"></li></td></tr>','<tr><td><label>headers ：</label></td><td><textarea id="setting_aria2_headers" ></textarea></td></tr>',"</tbody>","</table>",'<div style="margin-top:10px;">','<div id="copyright">© Copyright <a href="https://github.com/acgotaku/BaiduExporter">雪月秋水 </a><br/> Version:0.8.9 更新日期: 2017/01/10 </div>','<div style="margin-left:50px; display:inline-block"><a href="javascript:;" id="apply" class="button">应用</a><a href="javascript:;" id="reset" class="button">重置</a></div>',"</div>","</div>"];return a.innerHTML=n.join(""),document.body.appendChild(a),$("#setting_divtopmsg").html(""),t.update(),$("#setting_div").on("click",function(a){switch(a.target.id){case"setting_div_close":$("#setting_div").hide();break;case"apply":t.save(),setTimeout(function(){e.addMenu.update()},60),$("#setting_divtopmsg").html("设置已保存.");break;case"reset":localStorage.clear(),window.postMessage({type:"clear_data"},"*"),$("#setting_divtopmsg").html("设置已重置."),t.update();break;case"send_test":e.getVersion();break;case"add_rpc":var n=$(".rpc_list").length+1,o='<tr class="rpc_list"><td><input id="rpc_name_'+n+'" type="text" value="ARIA2 RPC '+n+'" class="input-medium">：</td><td><input id="rpc_url_'+n+'" type="text" class="input-large"></td></tr>';$(o).insertAfter($(".rpc_list").eq(n-2))}}),e.setCenter($("#setting_div")),a.id},save:function(){var t={};t.UA=document.getElementById("setting_aria2_useragent_input").value,t.rpc_delay=$("#rpc_delay").val(),t.referer=$("#setting_aria2_referer_input").val(),t.rpc_dir=$("#setting_aria2_dir").val(),t.rpc_fold=$("#rpc_fold").val(),t.rpc_headers=$("#setting_aria2_headers").val(),t.rpc_sync=$("#rpc_sync").prop("checked");for(var a=[],n=0;n<$(".rpc_list").length;n++){var o=n+1;""!=$("#rpc_url_"+o).val()&&""!=$("#rpc_name_"+o).val()&&a.push({name:$("#rpc_name_"+o).val(),url:$("#rpc_url_"+o).val()})}t.rpc_list=JSON.stringify(a),e.sendToBackground("config_data",t),window.postMessage({type:"config_data",data:t},"*")},update:function(){$("#rpc_delay").val(localStorage.getItem("rpc_delay")||"300"),$("#rpc_fold").val(localStorage.getItem("rpc_fold")||"0");var e=localStorage.getItem("rpc_sync");"false"==e?$("#rpc_sync").prop("checked",!1):$("#rpc_sync").prop("checked",!0),$("#setting_aria2_dir").val(localStorage.getItem("rpc_dir")),$("#setting_aria2_useragent_input").val(localStorage.getItem("UA")||t),$("#setting_aria2_referer_input").val(localStorage.getItem("referer")||a),$("#setting_aria2_headers").val(localStorage.getItem("rpc_headers"));var n=JSON.parse(localStorage.getItem("rpc_list")||'[{"name":"ARIA2 RPC","url":"http://localhost:6800/jsonrpc"}]');$(".rpc_list").remove();for(var o in n){var r=+o+1,i=1==r?'<a id="add_rpc" href="javascript:;" >ADD RPC</a>':"",d='<tr class="rpc_list"><td><input id="rpc_name_'+r+'" type="text" value="'+n[o].name+'" class="input-medium">：</td><td><input id="rpc_url_'+r+'" type="text" class="input-large" value="'+n[o].url+'">'+i+"</td></tr>";$(".rpc_list").length>0?$(d).insertAfter($(".rpc_list").eq(r-2)):$(d).prependTo($("#setting_div_table>tbody"))}}},copyText:function(t){var a=document.createElement("textarea");document.body.appendChild(a),a.style.position="fixed",a.style.left="0",a.style.top="0",a.value=t,a.focus(),a.select();var e=document.execCommand("copy");a.remove(),console.log(e),e?this.showToast("拷贝成功~","MODE_SUCCESS"):this.showToast("拷贝失败 QAQ","MODE_FAILURE")},requestCookies:function(t){this.sendToBackground("get_cookies",t,function(t){n=t})},getHeader:function(e){var o=[],r=localStorage.getItem("UA")||t,i=localStorage.getItem("headers"),d=localStorage.getItem("referer")||a;if(o.push("User-Agent: "+r),o.push("Referer: "+d),i)for(var s=i.split("\n"),l=0;l<s.length;l++)o.push(s[l]);if(n){var c=[];for(var p in n)c.push(p+"="+n[p]);o.push("Cookie: "+c.join(";"))}var u="";if("aria2c_line"==e){for(l=0;l<o.length;l++)u+=" --header "+JSON.stringify(o[l]);return u}if("aria2c_txt"==e){for(l=0;l<o.length;l++)u+=" header="+o[l]+" \n";return u}if("idm_txt"==e){for(l=0;l<o.length;l++)0!=o[l].indexOf("Referer")&&(u+=o[l].split(": ")[0].toLowerCase()+": "+o[l].split(": ")[1]+"\n");return u.replace(/\n$/,"")}return o},aria2Data:function(t,a,e){var n=[],o=this;if(t.length>0)for(var r=t.length,i=0;i<r;i++){var d={jsonrpc:"2.0",method:"aria2.addUri",id:(new Date).getTime(),params:[[t[i].link],{out:t[i].name,dir:localStorage.getItem("rpc_dir")||null,header:o.getHeader()}]};if(console.log(e),e.length>0){var s=d.params[d.params.length-1];e.forEach(function(t){s[t[0]]=t[1]})}a&&0==a.indexOf("token:")&&d.params.unshift(a),n.push(d),console.log(d)}return n},dataBox:{init:function(t){if(0!=$("#download_ui").length)return this;var a=$("<div>").attr("id","download_ui").append('<div class="top"><a href="javascript:;" title="关闭" id="aria2_download_close" class="close"></a><h3><em></em>ARIA2导出</h3></div>'),n=$("<div>").addClass("content").attr("id","content_ui").appendTo(a);a.hide().appendTo($("body")),n.empty();var o=$("<div>").css({"margin-bottom":"10px"}).appendTo(n);$("<a>").attr("id","aria2c_btn").attr({download:"aria2c.down",target:"_blank"}).addClass("save-button ").html('<em class="global-icon-download"></em><b>存为aria2文件</b>').appendTo(o),$("<a>").attr("id","idm_btn").attr({download:"idm.ef2",target:"_blank"}).addClass("save-button ").html('<em class="global-icon-download"></em><b>存为IDM文件</b>').appendTo(o),$("<a>").attr("id","download_txt_btn").attr({download:"download_link.txt",target:"_blank"}).addClass("save-button ").html('<em class="global-icon-download"></em><b>保存下载链接</b>').appendTo(o),$("<a>").attr("id","copy_txt_btn").attr({href:"javascript:void(0);",data:""}).addClass("save-button ").html('<em class="global-icon-download"></em><b>拷贝下载链接</b>').appendTo(o),$("<textarea>").attr({id:"download_link",wrap:"off",spellcheck:!1}).css({width:"100%",overflow:"scroll",height:"180px",resize:"none"}).appendTo(n),e.setCenter($("#download_ui")),$("#download_ui").on("click","#aria2_download_close",function(){navigator.msSaveBlob?$("#aria2c_btn, #idm_btn, #download_txt_btn").data("href",""):$("#aria2c_btn, #idm_btn, #download_txt_btn").attr("href","data:text/plain;charset=utf-8,"),$("#copy_txt_btn").attr("data",""),$("#download_link").val(""),a.hide()}),$("#download_ui").on("click","#copy_txt_btn",function(){e.copyText($("#copy_txt_btn").attr("data"))}),navigator.msSaveBlob?$("#aria2c_btn, #idm_btn, #download_txt_btn").click(function(t){t.preventDefault();var a=$(this);navigator.msSaveBlob(new Blob([a.data("href")]),a.attr("download"))}):$("#aria2c_btn, #idm_btn, #download_txt_btn").attr("href","data:text/plain;charset=utf-8,")},show:function(){$("#download_ui").show()},onClose:function(t){$("#download_ui").on("click","#aria2_download_close",t)},fillData:function(t){var a=[],n=[],o=[],r=[];if(t.length>0){for(var i=t.length,d=0;d<i;d++){var s=navigator.platform.indexOf("Win")!=-1?JSON.stringify(t[d].name):e.escapeString(t[d].name);a.push("aria2c -c -s10 -k1M -x10 --enable-rpc=false -o "+s+e.getHeader("aria2c_line")+" "+JSON.stringify(t[d].link)+"\n"),n.push([t[d].link,e.getHeader("aria2c_txt")," out="+t[d].name," continue=true"," max-connection-per-server=10"," split=10"," min-split-size=1M","\n"].join("\n")),o.push(["<",t[d].link,e.getHeader("idm_txt"),"out="+t[d].name,">\r\n"].join("\r\n")),r.push(t[d].link+"\n")}navigator.msSaveBlob?($("#aria2c_btn").data("href",$("#aria2c_btn").data("href")+n.join("")),$("#idm_btn").data("href",$("#idm_btn").data("href")+o.join("")),$("#download_txt_btn").data("href",$("#download_txt_btn").data("href")+r.join(""))):($("#aria2c_btn").attr("href",$("#aria2c_btn").attr("href")+encodeURIComponent(n.join(""))),$("#idm_btn").attr("href",$("#idm_btn").attr("href")+encodeURIComponent(o.join(""))),$("#download_txt_btn").attr("href",$("#download_txt_btn").attr("href")+encodeURIComponent(r.join("")))),$("#copy_txt_btn").attr("data",$("#copy_txt_btn").attr("data")+r.join("")),$("#download_link").val($("#download_link").val()+a.join(""))}}}}}();t.exports=e}]);