$('.addActivity').on('click', function(event){
	// event.preventDefault();

	var thisForm = $(this).parent();
	var groupid = parseInt(thisForm.data('group_id'));
	var activityName = $(this).siblings('.activity_name').children('#activity_name').val().trim();
	var category = $(this).siblings('.category').children('#category').val();
	var location = $(this).siblings('.activity_location').children('#activity_location').val().trim();
	var date = $(this).siblings('.activity_date').children('#activity_date').val().trim();
	var price = $(this).siblings('.activity_price').children('#activity_price').val().trim();
	var notes = $(this).siblings('.notes').children('#notes').val();

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
		$.post("/users/addActivity", data, function(data, response){	
		});
	
		thisForm.trigger("reset");
});

$('.createGroup').on('click', function (event) {
    event.preventDefault();

    var thisForm = $(this).parent();

	// var groupid = parseInt(thisForm.data('group_id'));
    var newGroupName = $(this).siblings('.new_group_name').children('#new_group_name').val().trim();
    var newGroupDescription = $(this).siblings('.new_group_description').children('#new_group_description').val().trim();
    var groupCode = Math.floor(Math.random() * 9000) + 1000;

    var data = {
        group_name: newGroupName,
        group_description: newGroupDescription,
        group_code: groupCode
        // group_id: groupid
    }

    // one way
    $.post("/users/createGroup", data, function (data, response) {
    });

    thisForm.trigger("reset");
});
