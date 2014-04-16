var app = {
	
	showAlert: function(message, title) {
		if( navigator.notification ){
			navigator.notification.alert( message, null, title, 'OK' );
		}
		else{
			alert( title ? (title + ": " + message) : message );
		}
	},

    initialize: function() {
		
		this.detailsURL = /^#employees\/(\d{1,})/;
	
		var self = this;
        this.store = new WebSqlStore(function() {
			self.route();
		});
		
		this.registerEvents();
		
    },
	
	registerEvents: function() {
		var self = this;
		// Check of browser supports touch events...
		if (document.documentElement.hasOwnProperty('ontouchstart')) {
			// ... if yes: register touch event listener to change the "selected" state of the item
			$('body').on('touchstart', 'a', function(event) {
				$(event.target).addClass('tappable-active');
			});
			$('body').on('touchend', 'a', function(event) {
				$(event.target).removeClass('tappable-active');
			});
		} else {
			// ... if not: register mouse events instead
			$('body').on('mousedown', 'a', function(event) {
				$(event.target).addClass('tappable-active');
			});
			$('body').on('mouseup', 'a', function(event) {
				$(event.target).removeClass('tappable-active');
			});
		}
		
		$(window).on('hashchange', $.proxy(this.route, this));
	},
	
	route: function(){
		console.log("ROUTE");
			
		var hash = window.location.hash;
		if (!hash) {
			console.log("IS INDEX");
			$('body').html(new HomeView(this.store).render().el);
			return;
		}
		
		var match = hash.match(app.detailsURL);
		if (match) {
			console.log("IS EMPLOYEE");
			this.store.findById(Number(match[1]), function(employee) {
				console.log("NUMBER: "+match[1]+" ID: "+employee.firstName);
				$('body').html( new EmployeeView(employee).render().el );
			});
		}
		else
			console.log("NO MATCH");
	}

};

app.initialize();