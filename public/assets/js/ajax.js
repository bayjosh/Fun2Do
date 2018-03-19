$('.addActivity').on('click', function(event){
	event.preventDefault();

    var thisForm = $(this).parent();
    

	var groupid = parseInt(thisForm.data('group_id'));
	var activityName = $('#activity_name').val().trim();
	var category = $('#category').val();
	var location = $('#activity_location').val().trim();
	var date = $('#activity_date').val().trim();
	var price = $('#activity_price').val().trim();
	var notes = $('#notes').val();

	var data = {
		activity_name: activityName,
		category: category,
		activity_location: location,
		activity_date: date,
		activity_price: price,
		notes: notes,
		group_id: groupid
    }

	// one way
		$.post("/users/addActivity", data, function(response){
			console.log(response);
			alert("the response from the server is: " + response + ". If 200 then that's good. If 500 then there was something wrong.");
		});
	});