$(document).ready(function () {
    $('#tabel1').DataTable();
    $('#tabel2').DataTable();
    asisten_data();
    asisten_req();
    koor_data();
    check_register();
    presentase();
});

//Request Asisten------------------------------------------------------------------
function asisten_req() {
    var periode = document.getElementById("periode").value;
    var praktikum = document.getElementById("praktikum").value;
    $.ajax({
        url: "query/asistenreq_select.php",
        method: "POST",
        data: {periode: periode, praktikum: praktikum},
        dataType: "text",
        success: function (data) {
            $('#req_asisten').html(data);
            check_register();
        }
    });
}

$(document).on('click', '#btn_delete3', function () {
    var nrp = $(this).data("id3");
    var periode = document.getElementById("periode").value;
    var praktikum = document.getElementById("praktikum").value;
    if (confirm("Apakah anda yakin ingin menghapus dari Request Asisten?"))
    {
        $.ajax({
            url: "query/asistenreq_delete.php",
            method: "POST",
            data: {periode: periode, praktikum: praktikum, nrp: nrp},
            dataType: "text",
            success: function (data) {
                alert(data);
                asisten_req();
                asisten_data();
            }
        });
    }
});

$(document).on('click', '#btn_update3', function () {
    var nrp = $(this).data("id3");
    var periode = document.getElementById("periode").value;
    var praktikum = document.getElementById("praktikum").value;
    if (confirm("Apakah anda yakin ?"))
    {
        $.ajax({
            url: "query/asistenreq_update.php",
            method: "POST",
            data: {periode: periode, praktikum: praktikum, nrp: nrp},
            dataType: "text",
            success: function (data) {
                alert(data);
                asisten_req();
                asisten_data();
            }
        });
    }
});

$(document).on('click', '#btn_update4', function () {
    var nrp = $(this).data("id3");
    var periode = document.getElementById("periode").value;
    var praktikum = document.getElementById("praktikum").value;
    if (confirm("Apakah anda yakin ?"))
    {
        $.ajax({
            url: "query/asistenreq_update.php",
            method: "POST",
            data: {periode: periode, praktikum: praktikum, nrp: nrp},
            dataType: "text",
            success: function (data) {
                alert(data);
                asisten_req();
                asisten_data();
            }
        });
    }
});
//Request Asisten------------------------------------------------------------------

//Asisten Data------------------------------------------------------------------
function asisten_data() {
    var periode = document.getElementById("periode").value;
    var praktikum = document.getElementById("praktikum").value;
    $.ajax({
        url: "query/asistendata_select.php",
        method: "POST",
        data: {periode: periode, praktikum: praktikum},
        dataType: "text",
        success: function (data) {
            $('#data_asisten').html(data);
        }
    });
}

$(document).on('click', '#btn_delete2', function () {
    var nrp = $(this).data("id3");
    var periode = document.getElementById("periode").value;
    var praktikum = document.getElementById("praktikum").value;
    if (confirm("Apakah ada yakin ingin menghapus ?"))
    {
        $.ajax({
            url: "query/asistendata_delete.php",
            method: "POST",
            data: {periode: periode, praktikum: praktikum, nrp: nrp},
            dataType: "text",
            success: function (data) {
                alert(data);
                asisten_data();
                asisten_req();
            }
        });
    }
});
//Asisten Data------------------------------------------------------------------

//Nilai Harian------------------------------------------------------------------
function showNilai(nrp) {
    var periode = document.getElementById("periode").value;
    var praktikum = document.getElementById("praktikum").value;
    if (nrp == "") {
        document.getElementById("live_data").innerHTML = "<b>Masukkan NRP peserta untuk melihat detail nilai...</b>";
        return;
    } else {
        $.ajax({
            url: "query/nh_select.php",
            method: "POST",
            data: {nrp: nrp, periode: periode, praktikum: praktikum},
            dataType: "text",
            success: function (data) {
                $('#live_data').html(data);
            }
        });
    }
}

$(document).on('click', '#btn_add', function () {
    var pertemuan = $('#pertemuan').text();
    var nrp = document.getElementById("nrp").value;
    var tp = $('#tp').text();
    var th = $('#th').text();
    var ta = $('#ta').text();
    var periode = document.getElementById("periode").value;
    var praktikum = document.getElementById("praktikum").value;
    if (pertemuan == '') {
        alert("Masukkan Pertemuan Terlebih Dahulu");
        return false;
    }
    if (tp == '') {
        alert("Masukkan Nilai TP Terlebih Dahulu");
        return false;
    }
    if (th == '') {
        alert("Masukkan Nilai TH Terlebih Dahulu");
        return false;
    }
    if (ta == '') {
        alert("Masukkan Nilai TA Terlebih Dahulu");
        return false;
    }
    $.ajax({
        url: "query/nh_insert.php",
        method: "POST",
        data: {pertemuan: pertemuan, tp: tp, th: th, ta: ta, periode: periode, praktikum: praktikum, nrp: nrp},
        dataType: "text",
        success: function (data)
        {
            alert(data);
            showNilai(nrp, periode, praktikum);
        }
    })
});

$(document).on('click', '#btn_delete', function () {
    var id = $(this).data("id5");
    var nrp = document.getElementById("nrp").value;
    var periode = document.getElementById("periode").value;
    var praktikum = document.getElementById("praktikum").value;
    if (confirm("Are you sure you want to delete this?"))
    {
        $.ajax({
            url: "query/nh_delete.php",
            method: "POST",
            data: {id: id},
            dataType: "text",
            success: function (data) {
                alert(data);
                showNilai(nrp, periode, praktikum);
            }
        });
    }
});

function edit_data(id, text, column_name) {
    $.ajax({
        url: "query/nh_update.php",
        method: "POST",
        data: {id: id, text: text, column_name: column_name},
        dataType: "text",
        success: function (data) {
            alert(data);
        }
    });
}
$(document).on('blur', '.pertemuan', function () {
    var id = $(this).data("id1");
    var pertemuan = $(this).text();
    edit_data(id, pertemuan, "pertemuan");
});
$(document).on('blur', '.tp', function () {
    var id = $(this).data("id2");
    var tp = $(this).text();
    edit_data(id, tp, "tp");
});
$(document).on('blur', '.th', function () {
    var id = $(this).data("id3");
    var th = $(this).text();
    edit_data(id, th, "th");
});
$(document).on('blur', '.ta', function () {
    var id = $(this).data("id4");
    var th = $(this).text();
    edit_data(id, th, "th");
});
//Nilai Harian------------------------------------------------------------------

//Presentase Nilai------------------------------------------------------------------
function presentase() {
    var periode = document.getElementById("periode").value;
    var praktikum = document.getElementById("praktikum").value;
    $.ajax({
        url: "query/presentase_select.php",
        method: "POST",
        data: {periode: periode, praktikum: praktikum},
        dataType: "text",
        success: function (data) {
            $('#presentase').html(data);
        }
    });
}

$(document).on('click', '#pre_add', function () {
    var abs = $('#abs').text();
    var nh = $('#nh').text();
    var uts = $('#uts').text();
    var uas = $('#uas').text();
    var pro = $('#pro').text();
    var periode = document.getElementById("periode").value;
    var praktikum = document.getElementById("praktikum").value;
    if (nh == '') {
        alert("Masukkan Presentase Nilai Harian Terlebih Dahulu");
        return false;
    }
    if (abs == '') {
        alert("Masukkan Presentase Absensi Terlebih Dahulu");
        return false;
    }
    if (uts == '') {
        alert("Masukkan Presentase Nilai UTS Terlebih Dahulu");
        return false;
    }
    if (uas == '') {
        alert("Masukkan Presentase Nilai UAS Terlebih Dahulu");
        return false;
    }
    if (pro == '') {
        alert("Masukkan Presentase Nilai Project Terlebih Dahulu");
        return false;
    }
    if (parseInt(nh) + parseInt(abs) + parseInt(uts) + parseInt(uas) + parseInt(pro) != 100) {
        alert("Pastikan Total Presentase Nilai 100%");
    } else {
        $.ajax({
            url: "query/presentase_insert.php",
            method: "POST",
            data: {periode: periode, praktikum: praktikum, abs: abs, nh: nh, uts: uts, uas: uas, pro: pro},
            dataType: "text",
            success: function (data)
            {
                alert(data);
                presentase();
            }
        })
    }
});

$(document).on('click', '#pre_delete', function () {
    var id = $(this).data("id6");
    if (confirm("Apakah anda yakin ingin menghapus presentase nilai ?"))
    {
        $.ajax({
            url: "query/presentase_delete.php",
            method: "POST",
            data: {id: id},
            dataType: "text",
            success: function (data) {
                alert(data);
                presentase();
            }
        });
    }
});

function edit_presentase(id, text, column_name) {
    var abs = $('.abs').text();
    var nh = $('.nh').text();
    var uts = $('.uts').text();
    var uas = $('.uas').text();
    var pro = $('.pro').text();
    if (parseInt(nh) + parseInt(abs) + parseInt(uts) + parseInt(uas) + parseInt(pro) == 100){
        $.ajax({
            url: "query/presentase_update.php",
            method: "POST",
            data: {id: id, text: text, column_name: column_name},
            dataType: "text",
            success: function (data) {
                alert(data);
            }
        });
    }else{
        alert("Pastikan Total Presentase Nilai 100%");
    }
}
$(document).on('blur', '.nh', function () {
    var id = $(this).data("id1");
    var nh = $(this).text();
    edit_presentase(id, nh, "nilai_harian");
});
$(document).on('blur', '.abs', function () {
    var id = $(this).data("id2");
    var abs = $(this).text();
    edit_presentase(id, abs, "absensi");
});
$(document).on('blur', '.uts', function () {
    var id = $(this).data("id3");
    var uts = $(this).text();
    edit_presentase(id, uts, "uts");
});
$(document).on('blur', '.uas', function () {
    var id = $(this).data("id4");
    var uas = $(this).text();
    edit_presentase(id, uas, "uas");
});
$(document).on('blur', '.pro', function () {
    var id = $(this).data("id5");
    var pro = $(this).text();
    edit_presentase(id, pro, "project");
});
//Presentase Nilai------------------------------------------------------------------

//Koordinator Asisten------------------------------------------------------------------
function koor_data() {
    var periode = document.getElementById("periode").value;
    var praktikum = document.getElementById("praktikum").value;
    $.ajax({
        url: "query/asistenkoor_select.php",
        method: "POST",
        data: {periode: periode, praktikum: praktikum},
        dataType: "text",
        success: function (data) {
            $('#data_koor').html(data);
        }
    });
}

function update_koor(nrp, periode, praktikum) {
    var periode = document.getElementById("periode").value;
    var praktikum = document.getElementById("praktikum").value;
    if (nrp == "") {
        return;
    } else {
        $.ajax({
            url: "query/asistenkoor_insert.php",
            method: "POST",
            data: {nrp: nrp, periode: periode, praktikum: praktikum},
            dataType: "text",
            success: function (data) {
                //$('#data_koor').html(data);
                alert(data);
                koor_data();
            }
        });
    }
}

$(document).on('click', '#btn_delete4', function () {
    var nrp = $(this).data("id1");
    var periode = document.getElementById("periode").value;
    var praktikum = document.getElementById("praktikum").value;
    if (confirm("Apakah anda yakin ingin menghapus dari Koordinator Asisten ?"))
    {
        $.ajax({
            url: "query/asistenkoor_delete.php",
            method: "POST",
            data: {periode: periode, praktikum: praktikum, nrp: nrp},
            dataType: "text",
            success: function (data) {
                alert(data);
                koor_data();
            }
        });
    }
});
//Koordinator Asisten------------------------------------------------------------------

//Open Register------------------------------------------------------------------
function check_register() {
    var periode = document.getElementById("periode").value;
    var praktikum = document.getElementById("praktikum").value;
    $.ajax({
        url: "query/openregister_select.php",
        method: "POST",
        data: {periode: periode, praktikum: praktikum},
        dataType: "text",
        success: function (data) {
            $('#regtext').html(data);
        }
    });
}

$(document).on('click', '#btn_register', function () {
    var periode = document.getElementById("periode").value;
    var praktikum = document.getElementById("praktikum").value;
    var cv = document.getElementById("cv").value;
    var transkrip = document.getElementById("transkrip").value;
    var foto = document.getElementById("foto").value;
    var note = document.getElementById("note").value;
    $.ajax({
        url: "query/openregister_insert.php",
        method: "POST",
        data: {periode: periode, praktikum: praktikum, cv: cv, transkrip: transkrip, foto: foto, note: note},
        dataType: "text",
        success: function (data)
        {
            alert(data);
            check_register();
        }
    })
});

$(document).on('click', '#closereg', function () {
    var periode = document.getElementById("periode").value;
    var praktikum = document.getElementById("praktikum").value;
    if (confirm("Apakah Anda Yakin Ingin Menutup Pendaftaran ?"))
    {
        $.ajax({
            url: "query/openregister_delete.php",
            method: "POST",
            data: {periode: periode, praktikum: praktikum},
            dataType: "text",
            success: function (data) {
                alert(data);
                check_register();
            }
        });
    }
});
//Open Register------------------------------------------------------------------