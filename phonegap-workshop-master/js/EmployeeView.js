var EmployeeView = function(employee){

	
	this.initialize = function(){
			console.log("INITIALIZE");
		// Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
		this.el.on('click', '.add-location-btn', this.addLocation);
	};
	
	this.render = function(){
			console.log("RENDER");
		this.el.html(EmployeeView.template(employee));
			console.log("AFTER");
		return this;
	};
	
	this.addLocation = function(event) {
		event.preventDefault();
		console.log('addLocation');
		navigator.geolocation.getCurrentPosition(
			function(position) {
				$('.location', this.el).html(position.coords.latitude + ',' + position.coords.longitude);
			},
			function() {
				alert('Error getting location');
			});
		return false;
	};
	
	this.initialize();
	
}
	
	
EmployeeView.template = _.template( $("#employee-tpl").html() );