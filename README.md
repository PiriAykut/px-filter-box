## description
>Used to group objects used jquery-filter-box filter. When the filtering objects are many, up to 2 or more lines, jquery-filter-box allows you to group these objects as many times as you want. For example, you can use Filter 1, Filter 2, Filter 3, Filter 4, Filter 5 ... objects as a single object with jquery-filter-box[Filter 1, Filter 2, Filter 3, Filter 4, Filter 5]. Sample images are available below.

## description TR
>jquery-filter-box filter için kullanılan nesneleri gruplamak için kullanılır.  Filtreleme nesneleri çok olduğunda 2 veya daha fazla satıra çıktığında jquery-filter-box bu nesneleri istediğiniz kadar gruplamanızı sağlar. Örneğin Filter 1, Filter 2, Filter 3, Filter 4, Filter 5 ... nesnelerini jquery-filter-box[Filter 1, Filter 2, Filter 3, Filter 4, Filter 5] ile tek nesne olarak kullanabilirsiniz. Örnek resimler aşağıda mevcut.

## install
> npm i jquery <br><br>
> npm i select2 <br><br>
> npm i px-jquery-filter-box


## html
> \<div class="my-filter-blok d-none"\><br>
>        \<label for="filter-sube" data-member-name="sube"\>Şube\</label\> <br>
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
> @import "~px-jquery-filter-box/px-filter-box.css";

## javascript - jquery
> require('px-jquery-filter-box');


### init
> $(".my-filter-blok").pxfilterbox({ <br>
>            show_selected_values: false,<br>
>            button: true,<br>
>            type: 'filter', //'filter' or 'sort'<br>
>            button_caption: "Filtreyi Uygula",<br>
>            clean_text: "Seçimleri Temizle",<br>
>            select_add_default_option: true,
>            select_default_text: "Seçiniz",<br>
>            selected_info_text: "Filtre Seçildi",<br>
>            callback: function(e){}<br>
>        });<br>
<br>

### calback result
>   result : {sube: "1", departman: null, durum: "1,2"}

<br>

### view:
#### 1.
![alt text](https://raw.githubusercontent.com/PiriAykut/px-filter-box/master/screenshots/Screenshot_1.png)

<br>

#### 2.
![alt text](https://raw.githubusercontent.com/PiriAykut/px-filter-box/master/screenshots/Screenshot_2.png)

<br>


