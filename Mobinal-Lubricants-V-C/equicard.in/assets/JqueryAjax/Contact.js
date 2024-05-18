
var _email = '', _RatingId=0;
function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}

function submit() {
    if (!$('#txtName').val() || !$('#txtEmailId').val() || !$('#txtPhoneNo').val()) {
        //$.notify('Fields marketed with * is mandatory', 'error');
        alert('Fields marketed with * is mandatory');
        return
    }
    if (IsEmail($('#txtEmailId').val()) == false) {
        //$.notify('Invalid Email Id', 'error');
        alert('valid Email Id');
        return
    }
   
    var det = {
        Name: $('#txtName').val(),
        EmailId: $('#txtEmailId').val(),
        PhoneNo: $('#txtPhoneNo').val(),
        Message: $('#txtMessage').val()
    };
    $("#divLoading").show();
    $('#btnSubmit').attr('disabled', true);
    $.ajax({
        url: '/Contact/RequestQuote',
        datatype: "json",
        data: det,
        type: "post",
        success: function (data) {
            if (data.Status == 0) {
                //$.notify(data.Message, "error");
                alert(data.Message);
            }
            else {
                //$.notify(data.Message, "success");
                alert(data.Message);
                window.location.href = "/contact";

            }
            $("#divLoading").hide();
            $('#btnSubmit').attr('disabled', false);
        },
        error: function (xhr) {
            $("#divLoading").hide();
            $('#btnSubmit').attr('disabled', false);
        }
    });
};

function submitcard() {
    if (!$('#txtEName').val() || !$('#txtEEmailId').val() || !$('#txtEPhoneNo').val()) {
        //$.notify('All fields are mandatory', 'error');
        alert('All fields are mandatory');
        return
    }
    if (IsEmail($('#txtEEmailId').val()) == false) {
        //$.notify('Invalid Email Id', 'error');
        alert('Invalid Email Id');
        return
    }

    var det = {
        Name: $('#txtEName').val(),
        EmailId: $('#txtEEmailId').val(),
        PhoneNo: $('#txtEPhoneNo').val(),
        ToEmail: $('#mailid').text(),
        Message: $('#txtEMessage').val(),
        UserName: window.location.href.split('/')[3].split('#')[0]
    };
    $("#divLoading").show();
    $('#btnSubmitc').attr('disabled', true);
    $.ajax({
        url: '/Contact/RequestQuoteCard',
        datatype: "json",
        data: det,
        type: "post",
        success: function (data) {
            if (data.Status == 0) {
                //$.notify(data.Message, "error");
                alert(data.Message);
            }
            else {
                //$.notify(data.Message, "success");
                
                debugger
                if (data.Data.User.EnquiryType == "mail") {
                    alert(data.Message);
                }
                else {
                    window.location.href = "https://api.whatsapp.com/send?phone=" + data.Data.User.WhatsappNo.replace('+', '') + "&text=Name:" + $('#txtEName').val() + ", Email Id:" + $('#txtEmailId').val() + ",Phone No:" + $('#txtPhoneNo').val()+",Message:" + $('#txtMessage').val();
                }
                
                $('#txtEName').val('');
                $('#txtEEmailId').val('');
                $('#txtEPhoneNo').val('');
                $('#mailid').text('');
                $('#txtEMessage').val('');

            }
            $("#divLoading").hide();
            $('#btnSubmitc').attr('disabled', false);
        },
        error: function (xhr) {
            $("#divLoading").hide();
            $('#btnSubmitc').attr('disabled', false);
        }
    });
};

function InsertRating() {
    if (!$('#txtName').val() || !$('input[name="star-check"]:checked').val() || !$('#txtEmailId').val()) {
        //$.notify('All fields are mandatory', 'error');
        alert('All fields are mandatory');
        return
    }

    var det = {
        Name: $('#txtName').val(),
        Review: $('#txtReview').val(),
        Ratings: $('input[name="star-check"]:checked').val(),
        UserName: window.location.href.split('/')[3].split('#')[0],
        EmailId: $('#txtEmailId').val(),
        Otp: $('#txtOtp').val()
    };
    $("#divLoading").show();
    $.ajax({
        url: '/Contact/InsertRating',
        datatype: "json",
        data: det,
        type: "post",
        success: function (data) {
            if (data.Status == 0) {
                //$.notify(data.Message, "error");
                alert(data.Message);
            }
            else {
                alert(data.Message);
                window.location.reload();
            }
            $("#divLoading").hide();
        },
        error: function (xhr) {
            $("#divLoading").hide();
        }
    });
};

function UpdateRating() {
    if (!$('#txtName1').val() || !$('input[name="star-check1"]:checked').val() ) {
        //$.notify('All fields are mandatory', 'error');
        alert('All fields are mandatory');
        return
    }

    var det = {
        RatingId: _RatingId,
        Name: $('#txtName1').val(),
        Review: $('#txtReview1').val(),
        Ratings: $('input[name="star-check1"]:checked').val(),
        UserName: window.location.href.split('/')[3].split('#')[0],
    };
    $("#divLoading").show();
    $.ajax({
        url: '/Contact/UpdateRating',
        datatype: "json",
        data: det,
        type: "post",
        success: function (data) {
            if (data.Status == 0) {
                //$.notify(data.Message, "error");
                alert(data.Message);
            }
            else {
                alert(data.Message);
                window.location.reload();
            }
            $("#divLoading").hide();
        },
        error: function (xhr) {
            $("#divLoading").hide();
        }
    });
};

function showServices() {
    $('.divServices').show();
    $('#btnShowServices').hide();
}

function showGalleries() {
    $('.divGalleries').show();
    $('#btnShowGalleries').hide();
}

function showVideos() {
    $('.divVideos').show();
    $('#btnShowVideos').hide();
}

function toggleReview() {
    $('.divAddReviewButton').hide();
    $('.divAddReview').show();

    $('.divOtp').hide();
}

function RatingOTP() {
    if (!$('#txtName').val() || !$('input[name="star-check"]:checked').val() || !$('#txtEmailId').val()) {
        //$.notify('All fields are mandatory', 'error');
        alert('All fields are mandatory');
        return
    }

    var det = {
        Name: $('#txtName').val(),
        Review: $('#txtReview').val(),
        Ratings: $('input[name="star-check"]:checked').val(),
        UserName: window.location.href.split('/')[3].split('#')[0],
        EmailId: $('#txtEmailId').val(),
    };
    $("#divLoading").show();
    $.ajax({
        url: '/Contact/RatingOTP',
        datatype: "json",
        data: det,
        type: "post",
        success: function (data) {
            if (data.Status == 0) {
                //$.notify(data.Message, "error");
                alert(data.Message);
            }
            else {
                alert(data.Message);
                $('.sendOtp').hide();
                $('.divOtp').show();
            }
            $("#divLoading").hide();
        },
        error: function (xhr) {
            $("#divLoading").hide();
        }
    });
};

function RatingOTP_Edit(email, RatingId) {
    _email = email;
    _RatingId = RatingId;
    var det = {
        EmailId: email
    };
    $("#divLoading").show();
    $.ajax({
        url: '/Contact/RatingOTP',
        datatype: "json",
        data: det,
        type: "post",
        success: function (data) {
            if (data.Status == 0) {
                //$.notify(data.Message, "error");
                alert(data.Message);
            }
            else {
                alert(data.Message);
                $('.divAddReviewEdit').show();
                $('.divOtp').show();
                $('.divOther').hide();
                $('.divAddReviewButton').hide();
                $('.divAddReview').hide();

                $('html, body').animate({
                    scrollTop: $("#enquiry").offset().top
                }, 100);
            }
            $("#divLoading").hide();
        },
        error: function (xhr) {
            $("#divLoading").hide();
        }
    });
};

function VerifyRatingOTPEdit() {
    var det = {
        EmailId: _email,
        Otp: $('#txtOtp1').val(),
        RatingId: _RatingId
    };
    $("#divLoading").show();
    $.ajax({
        url: '/Contact/VerifyRatingOTP',
        datatype: "json",
        data: det,
        type: "post",
        success: function (data) {
            if (data.Status == 0) {
                //$.notify(data.Message, "error");
                alert(data.Message);
            }
            else {
                alert(data.Message);
                $('.divOtp').hide();
                $('.divOther').show();

                $('#txtName1').val(data.Data.Rating.Name);
                $('#txtReview1').val(data.Data.Rating.Review);

                if (data.Data.Rating.Ratings==1)
                    $("#one-star1").prop("checked", true);

                if (data.Data.Rating.Ratings == 2)
                    $("#two-star1").prop("checked", true);

                if (data.Data.Rating.Ratings == 3)
                    $("#three-star1").prop("checked", true);

                if (data.Data.Rating.Ratings == 4)
                    $("#four-star1").prop("checked", true);

                if (data.Data.Rating.Ratings == 5)
                $("#five-star1").prop("checked", true);
            }
            $("#divLoading").hide();
        },
        error: function (xhr) {
            $("#divLoading").hide();
        }
    });
}