/*jshint browser: true */

$(document).ready(function(){
	//
	// FAQ
	//
    
    $(".accordion-button").on('click', function(){
        if($(this).hasClass("open-section")){
            $(this).removeClass("open-section");
            var answer = $(this).next();
            answer.slideToggle("100");
            
        }else{
            $(this).addClass("open-section");
            var answer = $(this).next();
            answer.slideToggle("100");

        }
    });
    $(".faq-title").on('click', function(){
        if($(this).hasClass("open-question")){
            $(this).removeClass("open-question");
            var answer = $(this).next();
            answer.slideToggle("100");
            
        }else{
            $(".faq-title.open-question").next().slideToggle("100");
            $(".faq-title.open-question").removeClass("open-question");
            
            $(this).addClass("open-question");
            var answer = $(this).next();
            answer.slideToggle("100").addClass("open-question");

        }
    });
    
	//
	// Toggle Mobile Menu
	//
	$('#nav-menu-icon').on("click", function(){
		$('nav').toggleClass("menu-show");
	});
	//
	// Fade-Ins 
		//
		// Header
		//
	$('nav .fade-in').addClass('in');
	$('#line-1').addClass('in');
	$('#line-2').addClass('in');
	$('header .image-wrapper').addClass('in');

	$(window).scroll(function () {
		/* Check the location of each desired element */
		$('.on-scroll').each(function (i) {

			var middle_of_object = $(this).position().top; //+ ( $(this).outerHeight() / 2 );
			var bottom_of_window = $(window).scrollTop() + $(window).height();

			/* If the object is completely visible in the window, fade it in */
			if (bottom_of_window > middle_of_object) {
				$(this).addClass('in');
			}
			
		});
	});
	//
	// Smooth Scroll
	//
	var $groupPre = $('.group-pre');
	var $groupCoffee = $('.group-coffee');
	var $groupDrinks = $('.group-drinks');
	var $groupShots = $('.group-shots');
	var $vsTitle = $('#vs-title');
	var $vsContent = $('#vs-content');
	
	$groupPre.on('click', function(){
		$groupCoffee.removeClass('active');
		$groupDrinks.removeClass('active');
		$groupShots.removeClass('active');
		$groupPre.addClass('active');
		
		$vsTitle.html('Exercise Supplements');
		$vsContent.html("Friends don&#8217;t let friends use pre-workout. Elite athletes choose Verb. They were Verb's first customers and always the first to give us feedback. We hear &#8220;Thank you! Thank you! Thank you!&#8221; and &#8220;I just had the best workout of my life&#8221; a lot.");
		
	});
	$groupCoffee.on('click', function(){
		$groupPre.removeClass('active');
		$groupDrinks.removeClass('active');
		$groupShots.removeClass('active');
		$groupCoffee.addClass('active');
		
		$vsTitle.html('Coffee');
		$vsContent.html("Alright, confession time. We love coffee. We love the taste. We love the ritual. But we don&#8217;t love spending 20 minutes and $4.50 on jittery fleeting caffeine fixes when we actually need quick and convenient all-day energy. When we want energy, we grab Verb Bars, and save coffee for when we can enjoy it.");
		
	});
	$groupShots.on('click', function(){
		$groupCoffee.removeClass('active');
		$groupDrinks.removeClass('active');
		$groupPre.removeClass('active');
		$groupShots.addClass('active');
		
		$vsTitle.html('Energy Shots');
		$vsContent.html("We're wary of any &#8220;dietary supplement&#8221; with 8333% of your daily recommended value of anything. Verb is good energy&#8212;you know what's in it, it makes you feel great, and you can feel good about eating it.");
		
	});
	$groupDrinks.on('click', function(){
		$groupCoffee.removeClass('active');
		$groupPre.removeClass('active');
		$groupShots.removeClass('active');
		$groupDrinks.addClass('active');
		
		$vsTitle.html('Energy Drinks & Soda');
		$vsContent.html("If you like pantothenic acid, glucuronolactone, maltodextrin, or 45 grams of sugar, then energy drinks are for you. If any of those made you cringe, try Verb.");
		
	});
	//
	// Pull Quotes
	//
		var childQuotes = $("#quote-list").children();
		var quoteArray = [];
		for (var i = 0; i < childQuotes.length; i++) {
			quoteArray.push(childQuotes[i]);
		}
		i = 0;
		var toggleActive = function () {
			//        console.log(quoteArray[i]);
			$(quoteArray[i]).removeClass("active-quote");
			if (i == quoteArray.length - 1) {
				i = 0;
			} else i++;
			$(quoteArray[i]).addClass("active-quote");
		};
		setInterval(toggleActive, 5000);
  //
	// Smooth Scroll
	//
	$(function() {
		$('a[href*="#"]:not([href="#"]):not([href="#header-carousel"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		  var target = $(this.hash);
		  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		  if (target.length) {
		  	var offset;
			if ($(window).width() < 768) {
				offset = 110;
			} else {
				offset = 130;
			}

			$('html, body').animate({
			  scrollTop: target.offset().top - offset
			}, 400);
			return false;
		  }
		}
	  });
	});
    	
	/* Order Section JS */
	//Show continue shopping button
    Snipcart.api.configure('show_continue_shopping', true);
	
	Snipcart.subscribe('cart.ready', function() {
		if ($(window).width() > 768) {
			addSpacesToPrice();
		}
		moveShippingSameAsBilling();
	}); 
    
    
    
	Snipcart.subscribe('cart.opened', function() {
		if ($(window).width() > 768) {
			addSpacesToPrice();
		}
		moveShippingSameAsBilling();
        
        if ($(window).width() < 768) {
            $("body").addClass("fixed");
        }
        
        
        Snipcart.unsubscribe('cart.opened');
        var html = $("#cart-content-text").html();
        $(html).insertBefore($("#snipcart-footer"));
   
	});
    Snipcart.subscribe('cart.closed', function() {
        $("body").removeClass("fixed");
	});
	Snipcart.subscribe('page.change', function (page) {
		setTimeout(customPageChange, 150);
	});
	
	var interval;
	var currentSnipcartId = "";
	function customPageChange() {
		newSnipcartId = $(".snip-layout__main-container").attr("id");
		if (newSnipcartId != currentSnipcartId) {
			if ($(window).width() > 768) {
				addSpacesToPrice();
			}
			moveShippingSameAsBilling();
		}
		currentSnipcartId = newSnipcartId;
	}

	
	function addSpacesToPrice() {
		$("#snipcart-plans-list tr").each(function(i, item){
			var txt1 = $(item).find("td:nth-of-type(3)").text();
			$(item).find("td:nth-of-type(3)").text(txt1.replace(/\s/g, ''));
			var txt2 = $(item).find("td:nth-of-type(4)").text();
			$(item).find("td:nth-of-type(4)").text(txt2.replace(/\s/g, ''));
		});
	}
	function moveShippingSameAsBilling() {
		$("#snip-shippingSameAsBilling").closest(".snipcart-checkbox-field").addClass("shifted");
		$("#snip-shippingSameAsBilling").closest(".snipcart-checkbox-field").prependTo("#snipcart-billingaddress-form .snip-cols .snip-col:nth-of-type(3)");
	}
	

	$(".quantity-increment").on('click', function(){
        
        if($(".order-button button.shown").data("item-id")){
		  var curQuant = parseInt($(".quantity-select .cur-quant").text(), 10);
            if ($(this).hasClass("down")) {
                //inc. down
                if (curQuant > 10) {
                    curQuant-=10;
                    $(".quantity-select .cur-quant").html(curQuant);
                    $(".order-button button.shown").data("item-quantity", curQuant/10);
                }
            } else {
                //inc. up
                curQuant+=10;
                $(".quantity-select .cur-quant").html(curQuant);
                $(".order-button button.shown").data("item-quantity", curQuant/10);
            }
        }
        else{
            var curQuant = parseInt($("#30bars .subscription-bar-quantity").text(),10);
            console.log(curQuant);
            
            if ($(this).hasClass("down")) {
                //inc. down
                if (curQuant > 30) {
                    curQuant-=10;
                    $(".sub-plan-button .quantity-increment.up").removeClass("disabled");
                    $(".order-button button.shown").data("quantity", curQuant/10);
                    if(curQuant==30){
                        $(this).addClass("disabled");
                    }
                }
            
            } else {
                //inc. up
                if(curQuant<60){                
                    curQuant+=10;
                    $(".sub-plan-button .quantity-increment.down").removeClass("disabled");
                    if(curQuant==60){
                        $(".sub-plan-button .quantity-increment.up").addClass("disabled")
                    }
                }

            }
            var htmlString = htmlString='<span class="sub-plus">+</span>'+String(curQuant)+'<span class="sub-plus">+</span>';
            $("#30bars .subscription-bar-quantity").html(htmlString);
            console.log(curQuant);
            $(".order-button button.shown").data("plan-quantity", curQuant/10);
            $("#30bars").children(".box-quantity").html(curQuant/10);
            
        }
	});
    
    
    $(".snipcart-add-plan").on("click", function(){
        $("#subitem").data("item-quantity",$(this).data("plan-quantity"));
        $("#subitem").click(); 
    });
    
    

    
    $(".sub-plan-button").on('click', function(){
        if(!$(this).hasClass("active")){
            $(".sub-plan-button").removeClass("active");

            $(this).addClass("active");
            
            $(".order-button button").addClass("hidden").removeClass("shown");
            $($(this).children(".subid").text()).removeClass("hidden").addClass("shown");
            
            $("#sub-price").html($(this).children(".hidden-sub-price").html());

            $(".order-button button.shown").data("plan-quantity",$(this).children(".box-quantity").html());
        }
        
    });
    
	$(".order-type .order-type-button").on('click', function(e){
		e.preventDefault();
		var curType;
		if (!$(this).hasClass("active")) {
          $(".order-type .order-type-button").removeClass("active");	
          $(this).addClass("active");
          $(".order-button button").addClass("hidden").removeClass("shown");
          $(".price-type .price-item").addClass("hidden");

          if ($(this).hasClass("single")) {
              //then show single button
              $(".order-button button.single-order").removeClass("hidden").addClass("shown");
              $(".quantity-select button").prop("disabled", false);
              $(".price-type .single-price").removeClass("hidden");
              $(".cur-quant").removeClass('three-bar');
              $(".quantity-increment").css("visibility", "visible");
              
              $(".quantity-select").css("display","block");
              $(".subscription-select").css("display","none");
              

          }  else if ($(this).hasClass("sub-button")) {
              $($(".sub-plan-button.active").children(".subid").text()).removeClass("hidden").addClass("shown");

              $(".price-type .single-sub-price").removeClass("hidden");
              $(".cur-quant").removeClass('three-bar');

              
              $(".quantity-select").css("display","none");
              $(".subscription-select").css("display","block");

          }
        }
	});
	
	
	Snipcart.subscribe('item.added', function (ev, item, items) {
        
        var cart = Snipcart.api.cart.get();
	    setTimeout(function(){
	    	var cart = Snipcart.api.cart.get();
	    	if (cart.items.length > 0 || cart.plans.length > 0) {
		    	$(".cart-wrapper .svg-wrapper").addClass("active");
		    } else {
		    	$(".cart-wrapper .svg-wrapper").removeClass("active");
		    }
	    }, 100);
	}); Snipcart.subscribe('item.removed', function (ev, item, items) {
        
        if(ev["id"] == "sub-discount-item"){

            var planID = (ev["quantity"] < 3) ? "Monthly-Sub-"+String(ev["quantity"])+"0" : "Monthly-Sub-30plus";
            
            console.log(planID);
            
            var plan = Snipcart.collections.plans.findWhere(function(p) {return p.get('id') == planID});
            if(plan){plan.destroy();}
        }
        
	}); 
    

});
















