//var url = 'http://vps.wpcoach.in/dev/excusepro-web/api/';
var url = 'http://192.168.43.222/excuse/api/';
var apiKey = '123';
var flag = 0;
//localhost/excuse/api/getCategories?apiKey=123

	$(document).on(
			'pageinit',
			function() {
				var data = {'apiKey':apiKey};
				if(0 == flag){
					flag = 1;
				} else {
					return false;
				}
				//Get Excuse categories
				$.ajax({
					url : url + 'getCategories',
					type : 'GET',
					data:data,
					dataType : "jsonp",
					success : function(msg) {
						console.log(msg);
						if(msg.success == true) {
							items = msg.data;
							for (i = 0; i < items.length; i++) {
								$("#itemsList").append(
										'<li id="' + items[i].id + '"><a href="#single-page" data-transition="slide" data-theme="a" data-ajax="true" id="' + items[i].id + '">'
												+ items[i].name + '</a></li>');
							}
							/* var template = $("#usage-list").html();
							console.log(template);
							$("#news-list").html(_.template(template,{items:items})); */
							
							$('#itemsList').listview('refresh');
							
						} else {
							$('#error-text').html(msg.error.message);
							$.mobile.changePage('#error','pop',false,true);
							//alert(msg.error.message);
						}
					},
					error : function(e, f, g) {
						console.log('error!');
						$('#error-text').html("Unable to send request. Check Internet connection.");
						$.mobile.changePage('#error','pop',false,true)
					}
				});
			});
				
			$(document).on('vclick', 'li',function(e) {
				var id = $(this).attr('id');
				//console.log(id);
				//alert(id);
				var data = {'apiKey':apiKey,'categoryId':id,};
				$.ajax({
					url : url + 'getExcuses',
					type : 'GET',
					data:data,
					dataType : "json",
					success : function(msg) {
						//console.log(msg);
						if(msg.success == true) {
							items = msg.data;
							$.mobile.changePage($("#excuses"),{'allowSamePageTransition':true,'transition':'slide'});
							for (i = 0; i < items.length; i++) {
								console.log(items[i].excuse);
								$("#excuseList").append('<li id="' + items[i].id + '">' 
									+ items[i].excuse + '</li>');
							}
							
							$('#excuseList').listview('refresh');
							
							
						} else {
							$('#error-text').html(msg.error.message);
							$.mobile.changePage('#error','pop',false,true);
						}
					},
					error : function(e, f, g) {
						console.log('error!');
						$('#error-text').html("Unable to send request. Check Internet connection.");
						$.mobile.changePage('#error','pop',false,true)
					}
				});
		    });