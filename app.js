$(document).ready(function(){        
    $('#firstModal').modal('show');
    }); 

let team = [];
let favoriteTeam = [];
function addFavoriteTeam (team){
    for(let i=0; i<team.length; i++){
        const fav = team[i];
        const $pic = $(`<img src=‘${fav}’>`)
        console.log($pic);
        const $image = $(`<img>`);
        $image.attr('src', $pic)
        console.log($image);

    // for(let i=0; i<team.length; i++){
    //     const fav = team[i];
    //     const $image = $(`<img src=‘${fav}’>`);
        
        //$image.click(function(){
           // favoriteTeam.push(fav);
        //})
        $('#favorites').append($image);
    }
}

$('#pokemon-search').submit(function(event){
    event.preventDefault();
    $('.poke-image').empty();
    $('.abilities').empty();
    $('.poke-name').empty();
    const userInput = $('#userInput').val();
    $('#userInput').val('');
    $('.type').empty();
    $('.abilities').append("<h5 id='Poke-Ab'>Pokémon's Abilities</h5>")


    $.ajax({
        url:"https://pokeapi.co/api/v2/pokemon/" + userInput,
        
       
    }).then(
        (response)=>{
            console.log(response)
            let pokeName = response.name;
            let upperPokeName = pokeName.toUpperCase();
            let id = response.id;
            $('.poke-name').append(`<h4>ID:${id} - ${upperPokeName}</h4>`)
            $('.poke-image').append(`<img src="${response.sprites.front_default}">`)
            let name = response.types[0].type.name
            var upper = name.toUpperCase();
            $('.type').append(`<p>I am an <b>${upper}</b> type Pokémon!</p>`)
            for(let i=0; i< response.abilities.length; i++){
                $('.abilities').append(`<li>${response.abilities[i].ability.name}</li>`)
            }

            $('img').on('click',function(){
                //$('.flex-container').append('<h6>My Team</h6>')      
                $('#pokeModal').modal('show');
                $('.btn').on('click',function(){
                    console.log(response.sprites.front_default);
                    team.push(response.sprites.front_default);
                    addFavoriteTeam(team);
                })
                
             
            })
            
        },
        ()=>{
            console.log('bad request');
            $('body').append('<h3>Error: Pokémon does not exist. Please re-enter your Pokémon selection. </h3>')
        }
    );
})




