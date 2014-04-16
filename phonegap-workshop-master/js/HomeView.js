var HomeView = function(store){

	HomeView.template = _.template($("#home-tpl").html());
	HomeView.liTemplate = _.template($("#employee-li-tpl").html());

    this.findByName = function() {
	
		console.log("FIND BY NAME");
		
		var self = this;
		
        store.findByName($('.search-key').val(), function(employees) {
		
			$('.employee-list').html(HomeView.liTemplate(employees));
			
        });
    };
	
	this.initialize = function(){
		// Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('keyup', '.search-key', this.findByName);
	};
	
	this.render = function(){
		this.el.html(HomeView.template);
		return this;
	};
	
	this.initialize();
	
}