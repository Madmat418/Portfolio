/* back to top */
$(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() != 0) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    });

    $('#toTop').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 3500);
    });
});
/** tooltip ***/
$(document).ready(function() {
    $("[rel=tooltip]").tooltip();
});
/** About Slider ***/
$(document).ready(function() {
    var slider = $('#slider').leanSlider({
        directionNav: '#slider-direction-nav',
        controlNav: '#slider-control-nav'
    });
});

/**parallax **/
$(document).ready(function(){
	//.parallax(xPosition, speedFactor, outerHeight) options:
	//xPosition - Horizontal position of the element
	//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
	//outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
	var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

	var testMobile = isMobile.any();
	
	if (testMobile == null)
	{
		$('#intro').parallax("50%", 0.1);
	$('#second').parallax("50%", 0.1);
	$('#third').parallax("50%", 0.1);
	$('#fourth').parallax("50%", 0.1);
	$('#fifth').parallax("50%", 0.4);
	}
})


/***Filter Page***/
$(document).ready(function() {

    var items = $('#stage li'),
    itemsByTags = {};

    // Looping though all the li items:
    items.each(function(i) {
        var elem = $(this),
        tags = elem.data('tags').split(',');

        // Adding a data-id attribute. Required by the Quicksand plugin:
        elem.attr('data-id', i);

        $.each(tags, function(key, value) {

            // Removing extra whitespace:
            value = $.trim(value);

            if (! (value in itemsByTags)) {
                // Create an empty array to hold this item:
                itemsByTags[value] = [];
            }

            // Each item is added to one array per tag:
            itemsByTags[value].push(elem);
        });

    });

    // Creating the "Everything" option in the menu:
    createList('Show All', items);

    // Looping though the arrays in itemsByTags:
    $.each(itemsByTags, function(k, v) {
        createList(k, v);
    });

    $('#filter a').live('click', function(e) {
        var link = $(this);

        link.addClass('active').siblings().removeClass('active');

        // Using the Quicksand plugin to animate the li items.
        // It uses data('list') defined by our createList function:
        $('#stage').quicksand(link.data('list').find('li'));
        e.preventDefault();
    });

    $('#filter a:first').click();

    function createList(text, items) {

        // This is a helper function that takes the
        // text of a menu button and array of li items
        // Creating an empty unordered list:
        var ul = $('<ul>', {
            'class': 'hidden'
        });

        $.each(items, function() {
            // Creating a copy of each li item
            // and adding it to the list:
            $(this).clone().appendTo(ul);
        });

        ul.appendTo('#container');

        // Creating a menu item. The unordered list is added
        // as a data parameter (available via .data('list'):
        var a = $('<a>', {
            html: text,
            href: '#',
            data: {
                list: ul
            }
        }).appendTo('#filter');
    }
});

/**form validate**/
$(document).ready(function() {
    $('#registerHere input').hover(function() {
        $(this).popover('show')
        });
    $("#registerHere").validate({
        rules: {
            user_name: "required",
            user_email: {
                required: true,
                email: true
            },
            pwd: {
                required: true,
                minlength: 30
            },
            cpwd: {
                required: false,
                equalTo: "#pwd"
            },
            gender: "required"
        },
        messages: {
            user_name: "Enter your first and last name",
            user_email: {
                required: "Enter your email address",
                email: "Enter valid email address"
            },
            pwd: {
                required: "Enter your Your Subject",
                minlength: "Your Subject must be minimum 30 characters"
            },
            cpwd: {
                required: "Send Message",
                equalTo: "Type Your Message"
            },
            gender: "Select Gender"
        },
        errorClass: "help-inline",
        errorElement: "span",
        highlight: function(element, errorClass, validClass) {
            $(element).parents('.control-group').addClass('error');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parents('.control-group').removeClass('error');
            $(element).parents('.control-group').addClass('success');
        }
    });
});

/****Scroll js for Nav****/
$(document).ready(function() {

    $(".nav a").click(function() {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top + "px"
        }, {
            duration: 1500,
            easing: "easeInOutQuint"
        });
        return false;
    });
});

/***scrollspy for Nav**/
$('[data-spy="scroll"]').each(function() {
    var $spy = $(this).scrollspy('refresh')
    });
	
