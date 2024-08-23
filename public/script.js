
const baseURL = window.location.origin.includes('localhost')
   ? 'http://localhost:4000'
  : window.location.origin;

function saveUser() {
    $('.error-message').text('');
    const user = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        mobileNo: $('#mobileNo').val(),
        email: $('#email').val(),
        address: {
            street: $('#street').val(),
            city: $('#city').val(),
            state: $('#state').val(),
            country: $('#country').val()
        },
        loginId: $('#loginId').val(),
        password: $('#password').val()
    };

    $.ajax({
       url: `${baseURL}/api/users`,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(user),
        success: function(response) {
            // Clear the form and error messages
            $('form')[0].reset();
            $('.error-message').text('');
            alert('User saved successfully');
            window.location.href = 'display-users.html';
        },
        error: function(jqXHR) {
            const errorResponse = jqXHR.responseJSON || {};
            if (errorResponse.errors) {
                // Clear previous error messages
                $('.error-message').text('');
                // Display errors under the corresponding fields
                for (const key in errorResponse.errors) {
                    if (errorResponse.errors.hasOwnProperty(key)) {
                        $(`#${key}Error`).text(errorResponse.errors[key].message);
                    }
                }
            } else {
                alert(errorResponse.message || 'Unknown error');
            }
        }
    });
}
