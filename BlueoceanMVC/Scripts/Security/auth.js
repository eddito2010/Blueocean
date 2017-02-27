$(document).ready(function () {

    home = 'http://127.0.0.1/blueocean/';
    user_id = '-1';
    seguro = 0.00;
    modulus = $('#modulus_hide').val();

    $('#user_name').val($('#name').val());
    $('#user_last_name').val($('#last_name').val());
    $('#user_ci').val($('#ci').val());
    $('#user_main_street').val($('#main_street').val());
    $('#user_second_street').val($('#second_street').val());
    $('#user_apartment').val($('#apartment').val());
    $('#user_reference').val($('#reference').val());
    $('#user_observaciones').val($('#observaciones').val());
    $('#user_ciudad').val($('#ciudad').val());
    $('#user_provincia').val($('#provincia').val());
    $('#user_email').val($('#email').val());
    $('#user_tlf_conv').val($('#tlf_conv').val());
    $('#user_tlf_cell').val($('#tlf_cell').val());

    $('#office_user_name').val($('#name').val());
    $('#office_user_last_name').val($('#last_name').val());
    $('#office_user_ci').val($('#ci').val());
    $('#office_user_email').val($('#email').val());
    $('#office_user_tlf_conv').val($('#tlf_conv').val());
    $('#office_user_tlf_cell').val($('#tlf_cell').val());
    
    laar = $('#laar').html();
    tramaco = $('#tramaco').html();
    
    if(laar !== undefined || tramaco !== undefined) {
        decide_courier(laar, tramaco);
    }

    //alert($.session.get('user'));
//
//    
//
//    $('[data-toggle="popover"]').popover({
//        html: true,
//        trigger: 'manual'
//    }).click(function (e) {
//        $(this).popover('toggle');
//        e.stopPropagation();
//    });
//
//    $('html').on('mouseup', function (e) {
//        if (!$(e.target).closest('.popover').length) {
//            $('.popover').each(function () {
//                $(this.previousSibling).popover('hide');
//            });
//        }
//    });



//    $('#register').alertOnClick({//this function attaches an onclick handler to .btn and passes the options to jAlert
//        'title': 'It worked!',
//        'content': 'You clicked the button'
//    });

//    $('#register').confirmation('show');

    $('#accept').click(function () {
        if ($(this).is(':checked')) {
            // Hacer algo si el checkbox ha sido seleccionado
            //$('#register').prop('disabled', false);
            $('#register').toggle(true);
        } else {
            // Hacer algo si el checkbox ha sido deseleccionado
            //$('#register').prop('disabled', true);
            $('#register').toggle(false);
        }
    });


    
   

});

$('#provincia').change(function () {
    llena_ciudades();
});

$('#volver_atras').click(function () {
    window.location.href = home + 'products/' + modulus + '/show_products_all';
});

$('#register').click(function () {
    window.location.href = home + 'security/Auth/register';
});

$('#regresar_atras').click(function () {
    window.location.href = home + 'products/' + modulus + '/show_products_all';
});


function llena_ciudades() {
    $('#provincia option:selected').each(function () {
        provincia = $('#provincia').val();
        $.post(home + "security/Auth/llena_ciudades", {
            id_provincia: provincia
        }, function (data) {
            $("#ciudad").html(data);
        });
    });
}


$(function () {
    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '<Ant',
        nextText: 'Sig>',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
    $('#datepicker').datepicker();
    $('#datepicker').datepicker("option", "dateFormat", "yy-mm-dd");
    $('#datepicker').datepicker("option", "changeMonth", true);
    $('#datepicker').datepicker("option", "changeYear", true);
    $('#datepicker').datepicker("option", "yearRange", "1920:2016");
});

//Envía correo al cliente con la nueva contraseña temporal
function send_email_user_change_password(email, new_password) {
    //correo para el cliente
    var done = false;
    console.log('Voy a enviar al cliente');
    $.when($.ajax({
        url: home + "security/Auth/send_email_user_change_password/" + encodeURIComponent(email) + "/" + new_password,
        type: "GET",
        dataType: "html",
        success: function () {
            console.log('Correo enviado al cliente');
            done = true;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            errorAlert('Error', 'Error ' + thrownError.message + ' ' + xhr.message + ' ' + ajaxOptions);
            error = 1;
            console.log('Error al enviar correo al cliente');
            done = false;
        }
    })).done(function (x) {
        return done;
    });
}

//Actualiza la nueva contraseña en la BD
function update_user_password(id_user, new_password, change_password) {
    //correo para el cliente
    var done = false;
    console.log('Voy a enviar al cliente');
    $.when($.ajax({
        url: home + "security/Auth/update_user_password/" + id_user + "/" + new_password + "/" + change_password,
        type: "GET",
        dataType: "html",
        success: function () {
            console.log('Correo enviado al cliente');
            done = true;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            errorAlert('Error', 'Error ' + thrownError.message + ' ' + xhr.message + ' ' + ajaxOptions);
            error = 1;
            console.log('Error al enviar correo al cliente');
            done = false;
        }
    })).done(function (x) {
        return done;
    });
}

function get_user_email(email) {
    //correo para el cliente
    var done = 0;
    console.log('Voy a chequear usuario en la BD');
    $.when($.ajax({
        url: home + "security/Auth/get_user_email/" + encodeURIComponent(email),
        type: "GET",
        dataType: "html",
        success: function (data) {
            console.log('Usuario chequeado en la BD');
            done = data;
            user_id = done;
            new_password = new Date().getDate().toString(36) + new Date().getMonth().toString(36) + new Date().getFullYear().toString(36) + new Date().getHours().toString(36) + new Date().getMinutes().toString(36) + new Date().getSeconds().toString(36);
            send_email_user_change_password(email, new_password);
            update_user_password(user_id, new_password, 1);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            errorAlert('Error', 'Error en la dirección de correo');
            console.log('Error al chequear al usuario en la BD');
            done = 0;
            user_id = done;
        }
    })).done(function (x) {
        console.log('get_user_email: ' + done);
        user_id = done;
        if (user_id > 0) {
            successAlert('Felicitaciones', 'Se ha enviado una contraseña temporal a su correo.');
        } else {
            errorAlert('Error', 'El correo proporcionado no se encuentra registrado.');
        }
    });
}

function forgot_user_password() {
    var i = 0;
    email = $('#email').val();

    if (email === undefined) {
        errorAlert('Tiene que especificar el correo con el que está registrado para poder enviarle la nueva contraseña.');
    } else {
        get_user_email(email);
    }
}

//---------------------------------------- Back office --------------------------------


$('#volver_atras_backoffice').click(function () {
    window.location.href = home + 'backoffice/Manager';
});


//-------------------------------------- Confirm Shopping ----------------------


$('#volver_carrito').click(function () {
    window.location.href = home + 'products/' + modulus + '/show_cart';
});

$('#volver_carrito1').click(function () {
    window.location.href = home + 'products/' + modulus + '/show_cart';
});

$('#toggle_shipping_data').click(function () {
    $('#shipping_data').toggle("slow");
    $('#ship_to').toggle("slow");
});

$('#edit_shipping_data').click(function () {
    $('#shipping_data').toggle("slow");
    $('#new_shipping_data').toggle("slow");
});

$('#cancel_new_shipping_data').click(function () {
    $('#new_shipping_data').toggle("slow");
    $('#shipping_data').toggle("slow");
});

$('#provincia_select').change(function () {
    $('#provincia_select option:selected').each(function () {
        provincia = $('#provincia_select').val();
        $.post(home + "security/Auth/llena_ciudades", {
            id_provincia: provincia
        }, function (data) {
            $("#ciudad_select").html(data);
        });
    });
});

$('#office_provincia_select').change(function () {
    $('#office_provincia_select option:selected').each(function () {
        provincia = $('#office_provincia_select option:selected').text();
        $.post(home + "security/Auth/llena_ciudades_oficinas", {
            provincia: provincia
        }, function (data) {
            $("#office_ciudad_select").html(data);
        });
    });
}); 

$('#office_ciudad_select').change(function () {
    $('#office_ciudad_select option:selected').each(function () {
        ciudad = $('#office_ciudad_select option:selected').text();
        $.post(home + "security/Auth/llena_oficinas", {
            ciudad: ciudad
        }, function (data) {
            $("#office_select").html(data);
        });
    });
}); 

$('#office_select').change(function () {
    $('#office_select option:selected').each(function () {
        oficina = $('#office_select').val();
        console.log(oficina);
        $.post(home + "security/Auth/get_oficina_data", {
            oficina: oficina
        }, function (data) {
            console.log(data);
            var parsed = JSON.parse(data);
            var dataArray = [];

            for (var x in parsed) {
                dataArray.push(parsed[x]);
            }
            console.log(dataArray);
            $('#office_telefonos').html('<strong>Teléfonos: </strong>' + dataArray[5]);
            $('#office_address').html('<strong>Dirección: </strong>' + dataArray[3]);
            $('#office_horario').html('<strong>Horario de Atención: </strong>' + dataArray[6]);
            $('#office_courier').html('<strong>Courier: </strong>' + dataArray[8]);
            if(dataArray[8] === 'LAAR') {
                var laar = '';
                $('#office_provincia_select option:selected').each(function () {
                    provincia = $('#office_provincia_select option:selected').text();
                });
                $('#office_ciudad_select option:selected').each(function () {
                    ciudad = $('#office_ciudad_select').val();
                });
                $.ajax({
                    url: home + "common/Common/get_laar_information/" + encodeURI(provincia) + "/" + encodeURI(ciudad),
                    type: "GET",
                    dataType: "text",
                    success: function (data) {
                        //$('#datos').html(data);
                        laar = data;
                        decide_courier(laar, 'null');
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert('Error ' + thrownError + ' ' + xhr + ' ' + ajaxOptions);
                    }
                });
            } else {
                var tramaco = '';
                $('#office_provincia_select option:selected').each(function () {
                    provincia = $('#office_provincia_select option:selected').text();
                });
                $('#office_ciudad_select option:selected').each(function () {
                    ciudad = $('#office_ciudad_select').val();
                });
                $.ajax({
                    url: home + "common/Common/get_tramaco_information/" + encodeURI(provincia) + "/" + encodeURI(ciudad),
                    type: "GET",
                    dataType: "text",
                    success: function (data) {
                        //$('#datos').html(data);
                        tramaco = data;
                        decide_courier('null', tramaco);
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert('Error ' + thrownError + ' ' + xhr + ' ' + ajaxOptions);
                    }
                });
            }
        });
    });
}); 

$('#confirm_shipping_data').click(function () {
    if ($('#entrega1').is(':checked')) {
        // Hacer algo si el checkbox ha sido seleccionado
        $('#shipping_data').hide("slow");
        $('#confirm_data').show("slow").scrollTop(0);
        $('#confirm').removeClass('hide');
        $('#ship_to').show("slow").scrollTop(0);
        $('#name').val(document.getElementById('user_name').value);
        $('#last_name').val(document.getElementById('user_last_name').value);
        $('#ci').val(document.getElementById('user_ci').value);
        $('#main_street').val(document.getElementById('user_main_street').value);
        $('#second_street').val(document.getElementById('user_second_street').value);
        $('#apartment').val(document.getElementById('user_apartment').value);
        $('#reference').val(document.getElementById('user_reference').value);
        $('#observaciones').val(document.getElementById('user_observaciones').value);
        $('#ciudad').val(document.getElementById('user_ciudad').value);
        $('#provincia').val(document.getElementById('user_provincia').value);
        $('#email').val(document.getElementById('user_email').value);
        $('#tlf_conv').val(document.getElementById('user_tlf_conv').value);
        $('#tlf_cell').val(document.getElementById('user_tlf_cell').value);
    } else {
        // Hacer algo si el checkbox ha sido deseleccionado
        $('#shipping_data').hide("slow");
        $('#confirm_data').show("slow").scrollTop(0);
        $('#confirm').removeClass('hide');
        $('#ship_to').show("slow").scrollTop(0);
        $('#name').val(document.getElementById('office_user_name').value);
        $('#last_name').val(document.getElementById('office_user_last_name').value);
        $('#ci').val(document.getElementById('office_user_ci').value);
        $('#main_street').val($('#office_address').html());
        $('#apartment').val('SN');
        $('#observaciones').val('El cliente recogerá el envío en la oficina.');
        $('#ciudad').val(document.getElementById('office_ciudad_select').value);
        $('#provincia').val(document.getElementById('office_provincia_select').value);
        $('#email').val(document.getElementById('office_user_email').value);
        $('#tlf_conv').val(document.getElementById('office_user_tlf_conv').value);
        $('#tlf_cell').val(document.getElementById('office_user_tlf_cell').value);
    }    
});

$('#confirm_new_shipping_data').click(function () {
    $('#new_shipping_data').hide("slow");
    $('#confirm_data').show("slow").scrollTop(0);
    $('#confirm').removeClass('hide');
    $('#ship_to').show("slow").scrollTop(0);
    $('#name').val(document.getElementById('new_name').value);
    $('#last_name').val(document.getElementById('new_last_name').value);
    $('#ci').val(document.getElementById('new_ci').value);
    $('#main_street').val(document.getElementById('new_main_street').value);
    $('#second_street').val(document.getElementById('new_second_street').value);
    $('#apartment').val(document.getElementById('new_apartment').value);
    $('#reference').val(document.getElementById('new_reference').value);
    $('#observaciones').val(document.getElementById('new_observaciones').value);
    $('#ciudad').val($('#ciudad_select option:selected').text());
    $('#provincia').val($('#provincia_select option:selected').text());
    $('#email').val(document.getElementById('new_email').value);
    $('#tlf_conv').val(document.getElementById('new_tlf_conv').value);
    $('#tlf_cell').val(document.getElementById('new_tlf_cell').value);
});


$('#seguro_select').click(function () {
    valor = $('#valor').html();
    total = $('#total').html();

    if ($(this).is(':checked')) {
        // Hacer algo si el checkbox ha sido seleccionado
        seguro = valor * 0.005;
        seguro_iva = seguro * 0.14;
        $('#seguro_hide').html(parseFloat(seguro) + parseFloat(seguro_iva));
        $('#seguro').html((parseFloat(seguro) + parseFloat(seguro_iva)).toFixed(2));
        $('#seguro_hide').val(parseFloat(seguro) + parseFloat(seguro_iva));
        $('#seguro_text').html('Seguro (Incluye IVA):');
        $('#total').html((parseFloat(total) + parseFloat(seguro) + parseFloat(seguro_iva)).toFixed(2));
    } else {
        // Hacer algo si el checkbox ha sido deseleccionado
        $('#seguro_hide').html(parseFloat(seguro) + parseFloat(seguro_iva));
        $('#seguro').html('0.00');
        $('#seguro_hide').val('0.00');
        $('#seguro_text').html('Seguro (Opcional):');
        $('#total').html((parseFloat(total) - parseFloat(seguro) - parseFloat(seguro_iva)).toFixed(2));
    }
});

$('#entrega1').click(function () {
    if ($('input:radio[name=entrega]:checked')) {
        $('#entrega_casa').show("slow");
        $('#entrega_oficina').hide("slow");
    }
});

$('#entrega2').click(function () {
    if ($('input:radio[name=entrega]:checked')) {
        $('#entrega_casa').hide("slow");
        $('#entrega_oficina').show("slow");
    }
});

$('#regresar_datos_envio').click(function () {
    if ($('#entrega2').is(':checked')) {
        $('#shipping_data').show("slow");
        $('#confirm_data').hide("slow");
        $('#entrega_casa').hide("slow");
        $('#entrega_oficina').show("slow");
    } else {
        $('#shipping_data').show("slow");
        $('#confirm_data').hide("slow");
        $('#entrega_casa').show("slow");
        $('#entrega_oficina').hide("slow");
    }
});

$('#ciudad_select').change(function () {
    var laar = '';
    var tramaco = '';
    $('#provincia_select option:selected').each(function () {
        provincia = $('#provincia_select option:selected').text();
    });
    $('#ciudad_select option:selected').each(function () {
        ciudad = $('#ciudad_select').val();
    });
    $.ajax({
        url: home + "common/Common/get_laar_information/" + encodeURI(provincia) + "/" + encodeURI(ciudad),
        type: "GET",
        dataType: "text",
        success: function (data) {
            //$('#datos').html(data);
            laar = data;
            $.ajax({
                url: home + "common/Common/get_tramaco_information/" + encodeURI(provincia) + "/" + encodeURI(ciudad),
                type: "GET",
                dataType: "text",
                success: function (data) {
                    //$('#datos').html(data);
                    tramaco = data;
                    decide_courier(laar, tramaco);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert('Error ' + thrownError + ' ' + xhr + ' ' + ajaxOptions);
                }
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error ' + thrownError + ' ' + xhr + ' ' + ajaxOptions);
        }
    });
});

function decide_courier(laar, tramaco) {
    
//    alert(laar);
//    alert(tramaco);
    
    console.log('Laar: ' + laar);
    console.log('Tramaco: ' + tramaco);
    
    if (tramaco !== 'null' && tramaco !== '' && tramaco !== null) {
        var parsed = JSON.parse(tramaco);
        var tramacoArray = [];

        for (var x in parsed) {
            tramacoArray.push(parsed[x]);
            //console.log(tramacoArray);
        }
    } else {
        tramaco = 'null';
    }
    
    if (laar !== 'null' && laar !== '' && laar !== null) {
        var parsed = JSON.parse(laar);
        var laarArray = [];

        for (var x in parsed) {
            laarArray.push(parsed[x]);
            //console.log(laarArray);
        }
    } else {
        laar = 'null';
    }   

    var kg_total = parseFloat($('#total_weight').val()).toFixed(2);
    var kg_standard = parseFloat('2').toFixed(2);
    var kg_extra = parseFloat(kg_total) - parseFloat(kg_standard);
    var total = parseFloat($('#total').html());
    
    
    if (laar === 'null' && tramaco === 'null') {
        errorAlert('Error', 'En esta ciudad no hay cobertura por parte del courier. Seleccione la opción Recoger en las Oficinas del Courier y escoja la más cercana a usted.');
    } else if ((laar === 'null' || laarArray[7] === '0') && (tramaco !== 'null' && tramacoArray[7] !== '0')) {
        //El courier a usar es Tramaco
        console.log('Uso Tramaco');
        var costo_carga_tramaco = tramacoArray[5];
        var costo_kg_extra_tramaco = tramacoArray[9];
        var flete_tramaco = parseFloat('0').toFixed(2);
        var flete_tramaco_iva = parseFloat('0').toFixed(2);

        flete_tramaco = ((parseFloat(kg_standard) * parseFloat(costo_carga_tramaco)) + (parseFloat(kg_extra) * parseFloat(costo_kg_extra_tramaco))).toFixed(2);
        flete_tramaco_iva = (flete_tramaco * 0.14);
        total += parseFloat(flete_tramaco) + parseFloat(flete_tramaco_iva);
        console.log('Costo Flete Tramaco: ' + flete_tramaco);
        console.log('IVA Flete Tramaco: ' + flete_tramaco_iva);

        $('#courier_name').val('Tramaco');
        $('#courier_route').val(tramacoArray[3]);
        $('#courier_document_cost').val(tramacoArray[4]);
        $('#courier_freight_cost').val(tramacoArray[5]);
        $('#courier_delivery_time').val(tramacoArray[6]);
        $('#courier_coverage').val(tramacoArray[7]);
        $('#courier_has_agency').val(tramacoArray[8]);
        $('#courier_kg_extra_cost').val(tramacoArray[9]);
        $('#flete_final').html(parseFloat(flete_tramaco) + parseFloat(flete_tramaco_iva));
        $('#flete_hide').val(parseFloat(flete_tramaco) + parseFloat(flete_tramaco_iva));
        $('#total').html(total.toFixed(2));
        
    } else if ((laar !== 'null' && laarArray[7] !== '0') && (tramaco === 'null' || tramacoArray[7] === '0')) {
        //El courier a usar es Laar
        console.log('Uso Laar');
        var costo_carga_laar = laarArray[5];
        var costo_kg_extra_laar = laarArray[9];
        var flete_laar = parseFloat('0').toFixed(2);
        var flete_laar_iva = parseFloat('0').toFixed(2);

        flete_laar = ((parseFloat(kg_standard) * parseFloat(costo_carga_laar)) + (parseFloat(kg_extra) * parseFloat(costo_kg_extra_laar))).toFixed(2);
        flete_laar_iva = (flete_laar * 0.14);
        total += parseFloat(flete_laar) + parseFloat(flete_laar_iva);
        console.log('Costo Flete Laar: ' + flete_laar);
        console.log('IVA Flete Laar: ' + flete_laar_iva);

        $('#courier_name').val('Laar Courier');
        $('#courier_route').val(laarArray[3]);
        $('#courier_document_cost').val(laarArray[4]);
        $('#courier_freight_cost').val(laarArray[5]);
        $('#courier_delivery_time').val(laarArray[6]);
        $('#courier_coverage').val(laarArray[7]);
        $('#courier_has_agency').val(laarArray[8]);
        $('#courier_kg_extra_cost').val(laarArray[9]);
        $('#flete_final').html((parseFloat(flete_laar) + parseFloat(flete_laar_iva)).toFixed(2));
        $('#flete_hide').val((parseFloat(flete_laar) + parseFloat(flete_laar_iva)).toFixed(2));
        $('#total').html(total.toFixed(2));

    } else if (laar !== 'null' && tramaco !== 'null') {
        //Definir el courier a usar
        var costo_carga_laar = laarArray[5];
        var costo_carga_tramaco = tramacoArray[5];
        var costo_kg_extra_laar = laarArray[9];
        var costo_kg_extra_tramaco = tramacoArray[9];
        var flete_laar = parseFloat('0').toFixed(2);
        var flete_tramaco = parseFloat('0').toFixed(2);

        console.log('Costo de Carga: ' + costo_carga_laar);
        console.log('Costo de Carga: ' + costo_carga_tramaco);
        console.log('Costo de Kg extra: ' + costo_kg_extra_laar);
        console.log('Costo de Kg extra: ' + costo_kg_extra_tramaco);
        console.log('Total de Kg: ' + kg_total);
        console.log('Kg standard: ' + kg_standard);
        console.log('Kg extra: ' + kg_extra);
        
        flete_laar = ((parseFloat(kg_standard) * parseFloat(costo_carga_laar)) + (parseFloat(kg_extra) * parseFloat(costo_kg_extra_laar))).toFixed(2);
        flete_laar_iva = (flete_laar * 0.14);
        flete_tramaco = ((parseFloat(kg_standard) * parseFloat(costo_carga_tramaco)) + (parseFloat(kg_extra) * parseFloat(costo_kg_extra_tramaco))).toFixed(2);
        flete_tramaco_iva = (flete_tramaco * 0.14);
        console.log('Costo Flete Laar: ' + flete_laar);
        console.log('Costo Flete Tramaco: ' + flete_tramaco);
        
        if(parseFloat(flete_laar) < parseFloat(flete_tramaco)) {
            total += parseFloat(flete_laar) + parseFloat(flete_laar_iva);
            console.log('Uso Laar');
            $('#courier_name').val('Laar Courier');
            $('#courier_route').val(laarArray[3]);
            $('#courier_document_cost').val(laarArray[4]);
            $('#courier_freight_cost').val(laarArray[5]);
            $('#courier_delivery_time').val(laarArray[6]);
            $('#courier_coverage').val(laarArray[7]);
            $('#courier_has_agency').val(laarArray[8]);
            $('#courier_kg_extra_cost').val(laarArray[9]);
            $('#flete_final').html((parseFloat(flete_laar) + parseFloat(flete_laar_iva)).toFixed(2));
            $('#flete_hide').val((parseFloat(flete_laar) + parseFloat(flete_laar_iva)).toFixed(2));
            $('#total').html(total.toFixed(2));

        } else {
            total += parseFloat(flete_tramaco) + parseFloat(flete_tramaco_iva);
            console.log('Uso Tramaco');
            $('#courier_name').val('Tramaco');
            $('#courier_route').val(tramacoArray[3]);
            $('#courier_document_cost').val(tramacoArray[4]);
            $('#courier_freight_cost').val(tramacoArray[5]);
            $('#courier_delivery_time').val(tramacoArray[6]);
            $('#courier_coverage').val(tramacoArray[7]);
            $('#courier_has_agency').val(tramacoArray[8]);
            $('#courier_kg_extra_cost').val(tramacoArray[9]);
            $('#flete_final').html((parseFloat(flete_tramaco) + parseFloat(flete_tramaco_iva)).toFixed(2));
            $('#flete_hide').val((parseFloat(flete_tramaco) + parseFloat(flete_tramaco_iva)).toFixed(2));
            $('#total').html(total.toFixed(2));
            
        }
    }
    $('#nota_entrega').html('NOTA: Su compra será entregada en un plazo de ' + $('#courier_delivery_time').val() + ' laborables por ' + $('#courier_name').val());
}

//---------------------------------- Fin Confirm Shopping ----------------------