class Film{
    constructor(title,country,genre,scenario,producer,operator,compositor,budget,worldCash,ageRate,length,releaseDate,poster,...regisser)
    {
        this.title=title;
        this.country=country;
        this.genre=genre;
        this.regisser=regisser;
        this.scenario=scenario;
        this.producer=producer;
        this.operator=operator;
        this.compositor=compositor;
        this.budget=budget;
        this.worldCash=worldCash;
        this.ageRate=ageRate;
        this.length=length;
        this.releaseDate=releaseDate;
        this.poster=poster;
    }
}
let service=[]; //массив загруженных фильмов


//-------------API-------------------- 

//ключ API
let appId = 'eefa82a919e47d2a82e2e0c30b986c01';

//Метод для поиска погоды в конкретном городе
function searchWeather(city){
    let str='https://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=eefa82a919e47d2a82e2e0c30b986c01';
    console.log(str);
    var iChars = "0123456789~`!#$%^&*+=-[]()\\\';,/{}|\":<>?";
    for (var i = 0; i < city.length; i++) {
       if (iChars.indexOf(city.charAt(i)) != -1){
            alert("Пожалуйста, введите город без цифр и специальных символов");
       }
    }
    fetch(str).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}
//Обработка полученного результата погоды
function init(resultServer){
    console.log(resultServer);
    let weatherDesc = document.getElementById('description');
    let temperature = document.getElementById('temperature');
    let humidity = document.getElementById('humidity');
    let windSpeed = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('weatherIcon');
    //Устанавливаем источник иконки погоды и описание
    weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultServer.weather[0].icon + '.png';
    let resultDesc = resultServer.weather[0].description;
    //Первая буква заглавная
    weatherDesc.innerText = resultDesc.charAt(0).toUpperCase()+resultDesc.slice(1);
    //Отображение темпераутры, ветра и влажности
    temperature.innerHTML = Math.floor(resultServer.main.temp)-273 + '&#176';
    windSpeed.innerHTML = 'Winds at ' + Math.floor(resultServer.wind.speed) + ' m/s';
    cityHeader.innerHTML = resultServer.name;
    humidity.innerHTML = 'Humidity level at ' + resultServer.main.humidity + '%'

}
//Вызовем по клику на кнопку "поиск" метод для поиска погоды в введенном городе
document.getElementById('searchButton').addEventListener('click',()=>{
    let searchCity = document.getElementById('searchInput').value;
    if(searchCity) searchWeather(searchCity);
});
//------------------------------------ 


//добавить фильм
function addFilm(){
    document.getElementById('serviceAdding').addEventListener("submit", function(event){
        event.preventDefault();});
        if (document.getElementById('title').value!=''&&
            document.getElementById('country').value!=''&&
            document.getElementById('genre').value!=''&&
            document.getElementById('scenario').value!=''&&
            document.getElementById('producer').value!=''&&
            document.getElementById('operator').value!=''&&
            document.getElementById('compositor').value!=''&&
            document.getElementById('budget').value!=''&&
            document.getElementById('worldCash').value!=''&&
            document.getElementById('ageRate').value!=''&&
            document.getElementById('length').value!=''&&
            document.getElementById('releaseDate').value!=''&&
            document.getElementById('poster').value!=''&& 
            document.getElementById('regisser').value!=''
            ){
            service.push(new Film(
            document.getElementById('title').value,
            document.getElementById('country').value,
            document.getElementById('genre').value,
            document.getElementById('scenario').value,
            document.getElementById('producer').value,
            document.getElementById('operator').value,
            document.getElementById('compositor').value,
            document.getElementById('budget').value,
            document.getElementById('worldCash').value,
            document.getElementById('ageRate').value,
            document.getElementById('length').value,
            document.getElementById('releaseDate').value,
            document.getElementById('poster').value, 
            document.getElementById('regisser').value));
            try{
                let s=JSON.parse(localStorage.getItem("service"));
                console.log("service 0",JSON.parse(localStorage.getItem("service")));
                let s1=s.concat(service);
                localStorage.setItem("service", JSON.stringify(s1));
                console.log("service 1",JSON.parse(localStorage.getItem("service")));
            }
            catch{
                localStorage.setItem("service", JSON.stringify(service));
            }
            alert("Фильм успешно добавлен");
        } 
        
        else {
            alert("Введите информацию о фильме");
            console.log("НЕ service",JSON.parse(localStorage.getItem("service"))); 
            console.log("НЕ service1 ",JSON.parse(localStorage.getItem("service1")));
        }
}

function addCard(array){
    let container = document.getElementById('serials__elem');
    array.forEach(function(film){
            //КАРТОЧКИ ФИЛЬМОВ
            let poster = document.createElement("img");
            poster.src=film.poster;
            poster.style.height="500px";
            poster.style.width="auto";
            poster.classList.add('posterCard');
            
            let title=document.createElement('p');
            title.innerText=film.title;
            title.classList.add('titleCard');
            
            let mainDescrip=document.createElement('p');
            mainDescrip.innerText=
            "Страна: "+film.country +
            "\n Жанр: "+film.genre+
            "\n Дата выпуска: "+film.releaseDate;
            mainDescrip.classList.add('description');
            
            let people=document.createElement('p');
            people.innerText=
            "Продюсер: "+film.producer+
            "\n Оператор: "+film.operator+
            "\n Композитор: "+film.compositor+
            "\n Режиссеры: "+film.regisser;
            people.classList.add('description');

            let descrip = document.createElement('p');
            descrip.innerText=
            "Бюджет: "+film.budget+
            "\n Мировые сборы: "+film.worldCash+
            "\n Возрастное ограничение: "+film.ageRate+
            "\n Длительность: "+film.length+
            "\n Сюжет: "+film.scenario;
            descrip.classList.add('description');

            //ОТЗЫВЫ
            let otziv=document.createElement("button");
            otziv.innerText="Отзывы";
            otziv.style.margin="0 auto";
            otziv.onclick=function addOtziv(){
                otziv.disabled="true";
                let reviewContainer=document.createElement('div');
                reviewContainer.classList.add('reviewContainer');
                let form=document.createElement('form');
                //form.action="check.php";
                //form.method="post";
                form.classList.add('reviewForm');
                //поле имя
                let p1=document.createElement('p');
                p1.innerText="Имя (только буквы)";
                let nameInput=document.createElement('input');
                nameInput.type='text';
                nameInput.pattern="^[А-Яа-яЁё-A-Za-z\s]+$";
                nameInput.placeholder="Введите имя";
                nameInput.classList.add('nameInput');     
                    
                //поле рода деятельности
                let p2=document.createElement('p');
                p2.innerText="Род деятельности";
                let workInput=document.createElement('input');
                workInput.type='text';
                workInput.pattern="^[А-Яа-яЁё-A-Za-z\s]+$";
                workInput.placeholder="Род деятельности";
                workInput.classList.add('workInput');
                
                //поле оценки
                let p3=document.createElement('p');
                p3.innerText="Оценка из 10 баллов";
                let rateInput=document.createElement('input');
                rateInput.type='text';
                rateInput.pattern="[0-9]{1,2}";
                rateInput.placeholder=".../10";
                rateInput.classList.add('rateInput');
                
                //текстовое поле
                let p4=document.createElement('p');
                p4.innerText="Текст";
                let textInput=document.createElement('textarea');
                textInput.type='text';
                textInput.rows="5";
                textInput.placeholder="Введите ваш отзыв";
                textInput.classList.add('textInput');
                
                //кнопка отправить
                let sub = document.createElement('input');
                sub.type='submit'; 
                sub.id='reviewSub';
                //создание карточки и разблок для нового отзыва
                
                sub.onclick=function addReview(){
                    if(textInput.value==''||workInput.value==''||nameInput.value=='') alert("Заполните все поля");  
                    else{
                        let reviews=[];
                        reviews.push(new Review(film.title,nameInput.value,workInput.value,rateInput.value,textInput.value));
                        try{
                        let r=JSON.parse(localStorage.getItem("review"));
                        //console.log("review 0",JSON.parse(localStorage.getItem("review")));
                        let r1=r.concat(reviews);
                        localStorage.setItem("review", JSON.stringify(r1));
                        //console.log("review 1",JSON.parse(localStorage.getItem("review")));
                        }
                        catch{
                            localStorage.setItem("review", JSON.stringify(reviews));
                        }
                    }
                }
                //показ имеющихся отзывов
                let revi=JSON.parse(localStorage.getItem("review"));
                if (revi!=null)
                for(i=0;i<revi.length;i++){
                    if(revi[i].title==film.title){
                        let r1=document.createElement('p');
                        r1.innerText="Имя: "+revi[i].userName;
                        let r2=document.createElement('p');
                        r2.innerText="Род деятельности: "+revi[i].work;
                        let r3=document.createElement('p');
                        r3.innerText="Оценка: "+revi[i].rate+"/10";
                        let r4=document.createElement('p');
                        r4.innerText="Отзыв: "+revi[i].text;
                        let revDiv=document.createElement('div');
                        revDiv.classList.add('revDiv');
                        revDiv.appendChild(r1);
                        revDiv.appendChild(r2);
                        revDiv.appendChild(r3);
                        revDiv.appendChild(r4);
                        reviewContainer.appendChild(revDiv);
                        //console.log(revi[i],film);
                    }
                }

                reviewContainer.appendChild(form);
                form.appendChild(p1);
                form.appendChild(nameInput);
                form.appendChild(p2);
                form.appendChild(workInput);
                form.appendChild(p3);
                form.appendChild(rateInput);
                form.appendChild(p4);
                form.appendChild(textInput);
                form.appendChild(sub);
                answerContainer.appendChild(reviewContainer);
                
            }
            let answerContainer = document.createElement('div');
            answerContainer.classList.add('descripCard');
            answerContainer.appendChild(title);
            answerContainer.appendChild(poster);
            answerContainer.appendChild(mainDescrip);
            answerContainer.appendChild(people);
            answerContainer.appendChild(descrip);
            answerContainer.appendChild(otziv);
            container.appendChild(answerContainer);
    });
}

addCard(JSON.parse(localStorage.getItem("service")));

//создание карточки и разблок для нового отзыва
class Review{
    constructor(title,userName,work,rate,text){
        this.title=title;
        this.userName=userName;
        this.work=work;
        this.rate=rate;
        this.text=text;
    }
}

//удалить фильм
function deleteFilm(){
    filmTitle=document.getElementById('delFilm').value;
    let f=0;
    for (i=0;i<JSON.parse(localStorage.getItem("service")).length;i++){
        if(JSON.parse(localStorage.getItem("service"))[i].title==filmTitle){
            let s=JSON.parse(localStorage.getItem("service"));
            s.splice(i,1);
            localStorage.setItem("service", JSON.stringify(s));
            f++;
        } 
    }
    document.getElementById('deleteBlock').style.display="none";
    document.getElementById('deletee').style.display="none";
    document.getElementById('delFilm').style.display="none";
    if (f==0) confirm("Фильма с таким названием нет в фильмотеке");
    else confirm("Для внесения изменений страница будет обновлена");
}
function showDelete(){
    document.getElementById('deleteBlock').style.display="block";
    document.getElementById('deletee').style.display="block";
    document.getElementById('delFilm').style.display="block";
}

//фильтр по году выпуска, жанрам и странам
function Filter(){
    let g = document.getElementById("genres").value; //жанр
    let c = document.getElementById("cntry").value; //страна
    let y = document.getElementById("year").value; //год
    
    if(g!=-1){
        console.log('1');
        service=JSON.parse(localStorage.getItem("service")).filter(i=>i.genre==g); //по жанру
        if(c!='0') {
            service=JSON.parse(localStorage.getItem("service")).filter(i=>i.country==c && i.genre==g); //по жанру и стране
            if(y!='0'){
                service = JSON.parse(localStorage.getItem("service")).filter(function (item) { //по году, стране и жанру
                    var itemTime = new Date(item.releaseDate);
                    if (itemTime.getFullYear()==y && item.genre==g && item.country==c)
                    return item;
                });
            } 
        }   
        else if(y!='0'){
            service = JSON.parse(localStorage.getItem("service")).filter(function (item) { //по году и жанру
                var itemTime = new Date(item.releaseDate);
                if (itemTime.getFullYear()==y && item.genre==g )
                return item;
            });
        } 
    } 
    else if(c!='0'){
        console.log('2');
        service=JSON.parse(localStorage.getItem("service")).filter(i=>i.country==c); //по стране
        if(y!='0'){
            service = JSON.parse(localStorage.getItem("service")).filter(function (item) { //по стране и году
                var itemTime = new Date(item.releaseDate);
                if (itemTime.getFullYear()==y && item.country==c)
                return item;
            });
        }
    }
    else if(y!='0'){ 
        console.log('3');
        service = JSON.parse(localStorage.getItem("service")).filter(function (item) { //по году
            var itemTime = new Date(item.releaseDate);
            if (itemTime.getFullYear()==y)
            return item;
        });
    }
    let cont = document.getElementById('serials__elem');
    cont.innerHTML='';
    addCard(service);
    //console.log(service);
}


