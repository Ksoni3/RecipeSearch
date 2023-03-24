const queryString ={
    app_id: process.env.REACT_APP_APP_ID,
    app_key: process.env.REACT_APP_API_KEY

}

export const fetchData = async(defaultQuery)=>{

    const {app_id, app_key} = queryString;
    try {
        const data = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${defaultQuery}&app_id=${app_id}&app_key=${app_key}`)
        const response = await data.json();
        return response;
        
    } catch (error) {
        console.log(error)
        
    }

}

export const fetchTabData = async(itemID)=>{

    const {app_id, app_key} = queryString;
    try {
        const data = await fetch( `https://api.edamam.com/api/recipes/v2/${itemID}?type=public&app_id=${app_id}&app_key=${app_key}`)
    
        const response = await data.json();
        return response;
        
    } catch (error) {
        console.log(error)
        
    }

}