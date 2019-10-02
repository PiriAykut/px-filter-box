
## install
> npm i jquery <br><br>
> npm i px-filter-box


## html
> \<div class="my-filter-blok d-none"\><br>
>        \<label id="filter-sube" data-member-name="sube"\>Şube\</label\> <br>
>        \<select id="filter-sube" name="sube"\> <br>
>            \<option value="1"\>Option 1\</option\> <br>
>            \<option value="2"\>Option 2\</option\> <br>
>        \</select\> <br>
>        \<label for="filter-departman" data-member-name="departman"\>Departman\</label\> <br>
>        \<select id="filter-departman" name="departman"\> <br>
>            \<option value="1"\>Option 1\</option\> <br>
>            \<option value="2"\>Option 2\</option\> <br>
>        \</select\> <br>
>        \<label data-member-name="durum"\>Durum\</label\> <br>
>        \<select name="durum" multiple\> <br>
>            \<option value="1"\>Durum 1\</option\> <br>
>            \<option value="2"\>Durum 2\</option\> <br>
>        \</select\> <br>
>    \</div\> <br>

## css
> @import "~px-filter-box/px-filter-box.css";

## javascript - jquery
> require('px-filter-box');


### init
> $(".my-filter-blok").pxfilterbox({ <br>
>            show_selected_values: false,<br>
>            button: true,<br>
>            type: 'filter', //'filter' or 'sort'<br>
>            button_caption: "Filtreyi Uygula",<br>
>            select_default_text: "Seçiniz",<br>
>            selected_info_text: "Filtre Seçildi",<br>
>            callback: function(e){}<br>
>        });<br>
<br>

### view:
#### 1.
![alt text](https://raw.githubusercontent.com/PiriAykut/px-filter-box/master/screenshots/Screenshot_1.png)

<br>

#### 2.
![alt text](https://raw.githubusercontent.com/PiriAykut/px-filter-box/master/screenshots/Screenshot_2.png)

<br>
