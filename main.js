find =()=>{
    const word = document.querySelector('.word').value
    const display = document.querySelector('.display');

    const wordTrimmed = word.trim().toLowerCase();
   const url =` https://api.dictionaryapi.dev/api/v2/entries/en/${wordTrimmed}`;

   fetch(url)
   .then(response => response.json())
   .then(data => {

    let meaning = data[0].meanings[0].definitions[0].definition || 'Not found';

    let example = data[0].meanings[0].definitions[0].example ||'Example not found';

    let phonetics = data[0].phonetic || 'Not found';

    let audio = data[0].phonetics[0].audio || data[0].phonetics[1].audio || data[0].phonetics[2].audio || null

    let def1 = ``;
    let def2 = ``;
    let def3 = ``;
    let def4 = ``;

    if (data.length >= 2) {
        def1 = data[0].meanings[0].definitions[1]?.definition || '';
        def2 = data[1].meanings[0].definitions[2]?.definition || '';
        def3 = data[0].meanings[0].definitions[3]?.definition || '';
        def4 = data[2].meanings[0].definitions[4]?.definition || '';
    } else if (data.length <= 1 && data[0].meanings.length >= 2) {
       def1 = data[0].meanings[1].definitions[1]?.definition || '';
        def2 = data[0].meanings[2].definitions[2]?.definition || '';
        def3 = data[0].meanings[2].definitions[3]?.definition || '';
        def4 = data[0].meanings[3].definitions[2]?.definition || '';

    }


    display.innerHTML = `
    <p><b>Meaning: </b> ${meaning}</p>

    <p><b>Example:</b> ${example}</p>

    <p><b>Phonetics:</b> ${phonetics}</p>

    <div class="audio-container"> <audio controls>
        <source src="${audio}" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>
    </div>

    <div>
    <p><b>More definitions</b></p>
        <p>${def1}</p>
        <p>${def2}</p>
        <p>${def3}</p>
        <p>${def4}</p>
    </div>
    `;
    
    

    
    console.log(data);
   })
   /*.catch((error) => {
    display.innerHTML = `<p class="error">Something went wrong. <br>Please try again.</p>`;
});*/
}