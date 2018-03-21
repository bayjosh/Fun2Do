$( document ).ready(function() {
  $('#createGroupModal').on('shown.bs.modal', function () {
    $('#new_group_name').trigger('focus')
  })
  
});