function run() {
    windowScroll();
    arrowClick();
    moreButtonClick();
    burgerMenuClick();
    $('.dialog_form').on('click', (event) => openDialog(event));
    $("#request_phone").mask("+7 (999) 999-99-99");
    $("#diler_phone").mask("+7 (999) 999-99-99");
    $('#request_button').on('click', () => requestClick('request_'));
    $('#diler_button').on('click', () => requestClick('diler_'));
}

function requestClick(prefix) {
    let name = $(`#${prefix}name`).val();
    const phone = $(`#${prefix}phone`).val();
    const email = $(`#${prefix}email`).val();
    const company = $(`#${prefix}company`).val();

    $.ajax({
        url : "/send.php",
        type: "POST",
        data: {
            name,
            phone,
            email,
            company,
        },
        ContentType: 'text/html; charset=utf-8',
        success : function (response) {
            console.log(response);
            response = JSON.parse(response);
            if(response.success == 'ok'){
                $("#success_request").modal({
                    fadeDuration: 100
                });
            }
        }
    });
}

function windowScroll() {
    $(window).scroll(() => {
        if ($(this).scrollTop() != 0) {
            $('#toTop').fadeIn();
            $('#menu_top').fadeIn();
        } else {
            $('#toTop').fadeOut();
            $('#menu_top').fadeOut();
        }
    });
}

function arrowClick() {
    $('#toTop').click(() => {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
    });
}

function moreButtonClick() {
    $('.button_more').click((event) => {
        $('#catalog_more').show();
        $(event.currentTarget).hide();
    });
}

function burgerMenuClick() {
    $('#header_bars').click(() => {
        $('#burger_header').toggleClass('show');
    });

    $('#top_bars').click(() => {
        $('#burger_top').toggleClass('show');
    });
}

function checkParams() {
    var name = $('#request_name').val();
    var email = $('#request_email').val();
    var phone = $('#request_phone').val();

    if (name.length >= 2 && (email.length >= 5 || phone.length >= 7)) {
        $('#request_button').removeAttr('disabled');
        $('#request_button').addClass('button_hover1');
    } else {
        $('#request_button').attr('disabled', 'disabled');
    }
}

function checkParamsDiler() {
    var name = $('#diler_name').val();
    var company = $('#diler_company').val();
    var email = $('#diler_email').val();
    var phone = $('#diler_phone').val();

    if (name.length >= 2 && company.length >= 2 && (email.length >= 5 || phone.length >= 7)) {
        $('#diler_button').removeAttr('disabled');
        $('#diler_button').addClass('button_hover1');
    } else {
        $('#diler_button').attr('disabled', 'disabled');
    }
}

function openDialog(event) {
    var buttonTitle = event.currentTarget.innerHTML;
    var dialogTitle;
    if (buttonTitle == 'Получить светильник сейчас') {
        dialogTitle = 'Оставить заявку на получение светильника';
    } else {
        dialogTitle = 'Оставить заявку на получение прайс-листа';
    }
    $("#dialog h4").html(dialogTitle);

    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        title: 'Оставьте заявку',
        open: function() {
            jQuery('.ui-widget-overlay').bind('click', function() {
                jQuery('#dialog').dialog('close');
            })
        }
    });
}

function sendInfo(element) {
    var name = $('#zayvka_name').val();
    var email = $('#zayvka_email').val();
    var phone = $('#zayvka_phone').val();
    var val_email = $('#zayvka_email')[0].validationMessage;
    var val_phone = $('#zayvka_phone')[0].validationMessage;
    if (val_phone) {
        val_phone = $('#zayvka_phone')[0].title;
    }
    var error = val_email + val_phone;
    if (name.length >= 2 && (email.length >= 5 || phone.length >= 7) &&  error== '') {
        console.dir($('#zayvka_phone'));
        $(element).dialog("close");
    } else {
        $("#zayvka_error").show();
        var errorContent = $("#zayvka_error").html();
        $("#zayvka_error").html(errorContent + error);
    } 
}

window.onload = () => run();