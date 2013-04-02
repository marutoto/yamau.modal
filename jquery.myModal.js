
;(function($) {

	//var i = 0;

	$.fn.myModal = function(options) {

		var elements = this;

		var opts = $.extend({}, $.fn.myModal.defaults, options);

		// モーダル対象の要素を1つずつ回す
		elements.each(function() {
			
			/******************************/
			/* 初期化・オプションチェック */
			/******************************/
			
			// TODO:イベントを設定（ダイアログクローズ、オープンのイベントを拾えるようにする）
			
			var $modal = $(this);
			
			if($modal[0].nodeName == 'IMG') {
			
				$modal.bind(opts.trigger, function() {
					
					/*
					var img_height = $(this).height();
					var img_width  = $(this).width();
					*/
					
					$img = $(this);
					
					var img_height, img_width;
					
					// TODO:細かく調べる
					// 参考URL：http://atm-tkd.sakura.ne.jp/pcspe/apsm_pc2.php?page=jqstudy/img_true_size.html
					// for Firefox, Safari, Chrome
					if(typeof $img[0].naturalWidth !== 'undefined') {
						img_height = $img[0].naturalHeight;
						img_width  = $img[0].naturalWidth;
					
					// for IE
					} else if(typeof $img[0].runtimeStyle !== 'undefined') {
						var run = $img[0].runtimeStyle;
				        var mem = {w: run.width, h: run.height};  // keep runtimeStyle
				        run.width  = "auto";
				        run.height = "auto";
				        w = $img[0].width;
				        h = $img[0].height;
				        run.width  = mem.w;
				        run.height = mem.h;
						
					// for Opera
					} else {
						
						
					}
					
					
					var img_src = $img.attr('src');
					
					$('body').append('<div class="overlay modal-image"></div>');
					
					$('.overlay').css({
						'background-color': opts.overlay,
						'opacity': opts.overlay_opacity
					});
					
					$('body').append('<div class="displaybox"><img src="' + img_src + '"></img></div>');
					
					$('.displaybox').css({
						'height': img_height+'px',
						'width': img_width+'px',
						'margin-top': '-'+((img_height + opts.displaybox_padding * 2) / 2)+'px',
						'margin-left': '-'+((img_width + opts.displaybox_padding * 2) / 2)+'px',
						'padding': opts.displaybox_padding+'px '+opts.displaybox_padding+'px',
						'background-color': opts.displaybox
						//'opacity': opts.displaybax_opacity,
					}).fadeIn(500);
				
					$('.displaybox').append('<img class="modal-close modal-image" src="images/modal_close_button.png">');
				
					$('.modal-close').css({
						'left': ((img_width + opts.displaybox_padding * 2) - 15) + 'px'
					});
					
				});
			
				$('.modal-close.modal-image').live('click', function() {
					$('.overlay.modal-image').remove();
					$('.displaybox').remove();
				});
			
				if(opts.displaybox_close) {
					$('.overlay.modal-image').live('click', function() {
				
						$(this).remove();
						$('.displaybox').remove();
					
					});
				}
			
			
			} else {
				
				$modal.css({'display': 'none'});
				
				opts.trigger_element.bind(opts.trigger, function() {
					
					//$(this).unbind(opts.trigger);
					
					var img_height = $modal.height();
					var img_width  = $modal.width();
					var img_src    = $modal.attr('src');
					
					$('body').append('<div class="overlay modal-dialog"></div>');
					
					$('.overlay').css({
						'background-color': opts.overlay,
						'opacity': opts.overlay_opacity
					});
					
					$modal.wrap('<div class="displaybox"></div>');
					
					$modal.css({'display': 'block'});
					
					//$('body').append('<div class="dialog"></div>');
					
					//$modal.css({'display': 'block'});
					
					//$('.dialog').append($modal);
					
					//console.log($modal);
					
					$('.displaybox').css({
						'height': img_height+'px',
						'width': img_width+'px',
						'margin-top': '-'+(img_height/2)+'px',
						'margin-left': '-'+(img_width/2)+'px'
					}).fadeIn(500);
				
				});
			
				// TODO:画面外クリックで戻すかどうかの処理
				if(opts.displaybox_close) {
					$('.overlay.modal-dialog').live('click', function() {
				
						$(this).remove();
						
						$modal.css({'display': 'none'});
						$modal.unwrap();
					
					});
				}
				
			}
			
			
			
			//i++;
			
		});

		return this;

	}

	// デフォルトオプション
	$.fn.myModal.defaults = {
		trigger: 'click',
		trigger_element: null,
		overlay: '#000000',
		overlay_opacity: 0.5,
		displaybox: '#FFFFFF',
		displaybox_opacity: 0.5,
		displaybox_padding: 20,
		displaybox_close: false
	}

}) (jQuery);