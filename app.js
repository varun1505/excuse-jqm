var url = 'http://localhost/excuse/api/';
var apiKey = '123';
//localhost/excuse/api/getCategories?apiKey=123

	$(document).on(
			'pageinit',
			function() {
				var data = {'apiKey':apiKey};
				//Get Excuse categories
				$.ajax({
					url : url + 'getCategories',
					type : 'GET',
					data:data,
					dataType : "json",
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
							alert(msg.error.message);
						}
					},
					error : function(e, f, g) {
						console.log('error!');
					}
				});
			});
				
			$(document).on('vclick', 'li',function(e) {
				var id = $(this).attr('id');
				var post = items[id];
				//console.log(post);
				$("#blog-title").html(post.title);
				$("#blog-content").html(post.content);
		    });