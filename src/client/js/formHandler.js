function handleSubmit(e) {
    e.preventDefault()
    
    const apiUrl = "https://api.meaningcloud.com/sentiment-2.1?key="
    // check what text was put into the form field
    const inputUrl = document.getElementById('name').value
    if (Client.validateUrl(inputUrl)) {
    Client.getKey()
    .then(function(key){
        
    Client.checkText(apiUrl, key.key, inputUrl)
    
    .then(function(data){
        const confidence = data.confidence;
        console.log("Confidence: ",confidence)
        const subjectivity = data.subjectivity;
        console.log("Subjectivity :", subjectivity)
        const score_tag = data.score_tag;
        console.log("Score :" , score_tag)
        // transform the score_tag
        let score = "str";
        switch(score_tag){
        case "P+":
            score = "Strong Positive";
            break
        case "P":
            score = "Positive";
            break;
        case "NEU":
            score = "Neutral";
            break;
        case "N":
            score = "Negative";
            break;
        case "N+":
            score = "Strong Negative";
            break;
        case "None":
            score = "Without Polarity";
            break;
        default:
            score = "Test for polarity failed"
        };
        // Update UI
        document.getElementById('result').innerHTML=`Confidence of the analysis (0-100): ${confidence}`;
        document.getElementById('objectivity').innerHTML=`Subjectivity: ${subjectivity}`;
        
        document.getElementById('score').innerHTML=`Polarity Score: ${score}`;
        
        
        })})
    } else {
        console.log('Please use a valid url');
        alert('Please use a valid url')
    }

    };

    
    /* Function to GET  API Data*/
    const checkText = async (apiUrl, apiKey, inputUrl) => {
        
        // fetch api
        const response = await fetch(`${apiUrl}${apiKey}&lang=auto&url=${inputUrl}`)
        //console.log("Response in checkText: ",response)
        try {
            const textData = await response.json();
            
            return textData;
        } catch(error){
            console.log('Error in checkText: ', error);
     }
    }
    
    const getKey = async () => {
        const request = await fetch('http://localhost:8081/all',
    //{
     //   mode: "no-cors",
    //    headers: {
     //       "Content-Type": "application/json",
     //       "Access-Control-Allow-Origin": "*"
    //    },        
    //}
    );
        //console.log(request)
        try {
            const apiKey = await request.json();
            //console.log(apiKey)
            return apiKey
        } catch(error){
            console.log('Error in getKey: ', error)
            }}

   
export { handleSubmit }
export { checkText }
export { getKey }

