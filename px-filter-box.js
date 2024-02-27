(function ($) {
    $.fn.pxfilterbox = function (_options, _callback) {
        let _object_id = $(this).attr("id");
        let _object_class = $(this).attr("class");

        if (_options == "data") {
            let id = "";

            if (_object_id != undefined)
                id = $("[data-object-id='" + _object_id + "']").attr("id");
            else
                id = $("[data-object-class='" + _object_class + "']").attr("id");

            if (id != undefined) {
                return this.send_selected_params(id, null);
            }
            return null;
        }

        let _filterobjectshtml = $(this).html();
        let _parent = $(this).parent();

        $(this).remove();

        var defaults = {
            show_selected_values: false,
            button: false,
            type: 'filter', //'filter' or 'sort'
            button_caption: "Filtreyi Uygula",

            select_add_default_option: true,
            select_default_value: "-999",
            select_default_text: "Seçiniz",

            selected_info_text: "Filtre Seçildi",

            callback: null
        };

        if (_options !== undefined && _options != null)
            _options = $.extend(defaults, _options);
        else
            _options = defaults;

        if (_callback !== undefined)
            _options.callback = _callback;

        let _key = my_flt_create_guid();
        let _id = 'px-filter-box-' + _key;

        let _cap = (_options.type == 'filter' ? 'Filter' : 'Sıralama')

        if (_options.type == 'sort') {
            if (_options.selected_info_text == 'Filtre Seçildi') {
                _options.selected_info_text = 'Sıralama Seçildi';
            }
            if (_options.button_caption == 'Filtreyi Uygula') {
                _options.button_caption = 'Sıralamayı Uygula';
            }
        }

        _parent.append('<div id="' + _id + '" data-key="' + _key + '" data-object-id="' + _object_id + '" data-object-class="' + _object_class + '" class="px-filter-box mfb-type-' + _options.type + '" title="' + _cap + ' Seçenekleri">' +
            '   <span class="my-flt-selected-text"><i class="my-flt-selected-count">0</i> ' + _options.selected_info_text + '</span>' +
            '   <div class="my-flt-objects">' +
            '       <div class="my-flt-clean"><span class="my-flt-clean-btn">Seçimleri Temizle</span></div>' +
            //'       ' + (_options.show_selected_values ? '<div class="my-flt-selected-items"></div>' : '') +
            '       <div class="my-flt-container">' + _filterobjectshtml + '</div>' +
            '   </div>' +
            '</div>');
        _id = '#' + _id;

        $(_id + " .my-flt-objects label").addClass("my-flt-caption");

        let arrtags = ["select", "input", "textarea"];
        var select2_list = [];

        for (let i = 0; i < arrtags.length; i++) {
            const el = arrtags[i];
            let _objtag = _id + " .my-flt-objects " + el;
            if ($(_objtag).length > 0) {
                $(_objtag).addClass("my-flt-control");

                if (el == "select") {
                    $(_objtag).each(function () {
                        if (_options.select_add_default_option && $("option[value='" + _options.select_default_value + "']", $(this)).length == 0) {
                            $(this).prepend('<option value="' + _options.select_default_value + '">' + _options.select_default_text + '</option>').val(_options.select_default_value);
                        }

                        if ($(this).hasClass("select2")) {
                            try {
                                select2_list.push({ name: $(this).attr("name"), select2: $(this).select2() }); //{ container: 'body', noneSelectedText: 'Seçiniz' }
                            } catch (error) { }
                        }

                        setTimeout(() => {
                            $(".select2-search__field.my-flt-control").removeClass("my-flt-control");
                        }, 500);
                    });
                }
            }
        }

        if (_options.button == true) {
            $(_id + " .my-flt-objects").append('<button type="button" class="btn btn-success my-flt-btn">' + _options.button_caption + '</button>');
        }

        my_flt_events(_id, _options);

        function my_flt_events(_id, _options) {

            $("body").on("click", _id, function () {
                $(_id + " .my-flt-objects").addClass("show").fadeIn();
            }).on("click", _id + " .my-flt-btn", function () {
                let _id = $(this).parents(".px-filter-box").attr("id");
                send_selected_params(_id, _options.callback);
            }).on("change", _id + " select, " + _id + " input", function () {
                let _id = $(this).parents(".px-filter-box").attr("id");
                send_selected_params(_id, _options.callback);
            }).on("change", _id + " .my-flt-control", function () {
                let _id = $(this).parents(".px-filter-box").attr("id");
                //add_selected_values(_id, $(this));
                if (_options.button == false) {
                    send_selected_params(_id, _options.callback);
                }
            }).on("click", ".my-flt-clean-btn", function () {
                clean_selected_values($(this), _options.callback);
            });

            $(window).bind('keyup', function (e) {
                if (e.key === 'Escape') {
                    if ($(".px-filter-box .my-flt-objects.show").length > 0) {
                        $(".px-filter-box .my-flt-objects.show").removeClass("show").fadeOut();
                    }
                }
            });
            $(window).bind('click', function (event) {
                let _id = "";

                if ($(event.target).parents(".select2-selection__choice__remove").length > 0 || $(event.target).parents('.select2-container').length > 0 || $(event.target).hasClass('select2-selection__choice__remove')) return;

                if ($(event.target).hasClass('px-filter-box')) {
                    _id = $(event.target).attr("id")
                } else if ($(event.target).parents('.px-filter-box').length > 0) {
                    _id = $(event.target).parents('.px-filter-box').attr("id")
                }
                //console.log(_id);
                if ($(".px-filter-box .my-flt-objects.show").length > 0) {
                    $(".px-filter-box .my-flt-objects.show").each(function () {
                        // console.log("for " + $(this).parents(".px-filter-box").attr("id"))
                        // console.log("for " + $(this).parents(".px-filter-box").attr("id").indexOf(_id));
                        if (_id == "" || $(this).parents(".px-filter-box").attr("id").indexOf(_id) == -1) {
                            $(this).removeClass("show").fadeOut();
                        }
                    });
                }
            });
        }

        function add_selected_values(_id, _obj) {
            if ($(".my-flt-selected-items").length > 0) {
                let name = get_my_fltr_obj_name($(_obj));
                let vl = get_my_fltr_obj_value($(_obj));

                if (vl != null) {

                    if ($("[name='" + name + "']").length > 0) {
                        let p = vl.replaceAll("'", "").split(",");

                        for (let i = 0; i < p.length; i++) {
                            const el = p[i];

                            $("[name='" + name + "'] option[value='" + el + "']").html();
                        }
                    }

                    $(".my-flt-selected-items").append('<span data-id="' + vl + '" data-name="' + name + '"><i class="fa fa-remove"></i> ' + text + '</span>');
                }
            }
        }
        function get_my_fltr_obj_name(obj) {
            let rv = "";
            if ($(obj).attr("name") != undefined) {
                rv = $(obj).attr("name");
            } else if ($(obj).attr("data-name")) {
                rv = $(obj).attr("data-name");
            } else {
                rv = "object" + my_flt_create_guid();
            }

            return rv;
        }
        function get_my_fltr_obj_value(obj) {
            let vl = "";
            if ($(obj).prop("tagName") == "SELECT") {
                if ($(obj).parent().hasClass("bootstrap-select")) {
                    vl = $(obj).selectpicker("val");
                } else {
                    vl = $(obj).val();
                }

                if ($.isArray(vl)) {
                    if (vl.length > 0) {
                        vl = vl.toString().replace(_options.select_default_value + ',', '').trim();
                    }
                }
                if (vl == "") {
                    vl = _options.select_default_value;
                }
            } else {
                vl = $(obj).val().replace("'", "\'");

                if (vl == "") {
                    vl = _options.select_default_value;
                }
            }

            if (vl == _options.select_default_value)
                vl = null;
            else
                vl = "'" + vl + "'";

            return vl;
        }

        function clean_selected_values(_obj, _callback) {
            $(_obj).parents(".px-filter-box").addClass("clearing");

            $(".my-flt-control", $(_obj).parents(".px-filter-box")).each(function () {
                if ($(this).prop("tagName") === "SELECT") {
                    if ($(this).parent().hasClass("bootstrap-select")) {
                        $(this).selectpicker("val", _options.select_default_value);
                    } else {
                        $(this).val(_options.select_default_value);
                    }
                } else {
                    $(this).val('');
                }

                $(".my-flt-selected-count", $(this).parents(".px-filter-box")).html("0");
                $(".my-flt-caption", $(this).parents(".px-filter-box")).removeClass("my-fltr-selected-value");
            });

            if (select2_list.length > 0) {
                for (let i = 0; i < select2_list.length; i++) {
                    const el = select2_list[i];
                    el.select2.val(_options.select_default_value).trigger("change");
                }
            }

            if (_callback !== undefined && _callback !== null) {
                let _data = $(".my-flt-objects .my-flt-container", $(_obj).parents(".px-filter-box")).attr("data-json");

                if (_data && _data != "") {
                    _data = JSON.parse(_data);
                } else {
                    _data = null;
                }

                _callback(_data);
            }

            $(_obj).parents(".px-filter-box").removeClass("clearing");
        }

        function send_selected_params(_id, _callback) {
            let _objcls = "#" + _id + " .my-flt-objects .my-flt-container";
            let data = {};
            let selectedCount = 0;

            $("#" + _id + " .my-flt-caption").removeClass("my-fltr-selected-value");

            $(_objcls + " .my-flt-control").each(function () {
                let vl = get_my_fltr_obj_value($(this));
                let objname = get_my_fltr_obj_name($(this));

                for (const [key, value] of Object.entries(data)) {
                    if (objname == key) _vl = value;
                }

                if (vl != null) {
                    if ($("#" + _id + " [data-member-name='" + objname + "']").length > 0) {
                        $("#" + _id + " [data-member-name='" + objname + "']").addClass("my-fltr-selected-value");
                    } else if ($(this).attr("id") !== undefined && $("#" + _id + " label[for='" + $(this).attr("id") + "']").length > 0) {
                        $("#" + _id + " label[for='" + $(this).attr("id") + "']").addClass("my-fltr-selected-value");
                    }

                    selectedCount += (vl.indexOf(',') > -1 ? vl.split(',').length : 1);
                }

                try {
                    let newData = "";
                    if (vl != null) {
                        newData = '{ "' + objname + '": "' + vl.replaceAll("'", "").replaceAll('"', '') + '" }';
                    } else {
                        newData = '{ "' + objname + '": null }';
                    }

                    newData = JSON.parse(newData);

                    data = { ...data, ...newData };

                } catch (err) { }
            });

            $("#" + _id + " .my-flt-selected-count").html(selectedCount);

            if (!$(_objcls).parents(".px-filter-box").hasClass("clearing") && _callback !== undefined && _callback !== null) {
                $(_objcls).attr("data-json", JSON.stringify(data));

                _callback(data);
            } else
                return data;
        }

        function my_flt_create_guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }

            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
    }

    String.prototype.replaceAll = function (search, replacement) {
        //     if((typeof this)!=='string')
        //      
        //          return this;
        var target = this;
        return target.split(search).join(replacement);
    };
})(jQuery);
