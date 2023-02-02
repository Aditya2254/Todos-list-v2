module.exports.getDate = getDate;

function getDate(){

    let today = new Date();
    
    const options={
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }
    
    return today.toLocaleDateString("en-US",options);
}

module.exports.getDay = getDay;

function getDay(){
    let today = new Date();

    const options={
        weekday: "long"
    }

    return today.toLocaleDateString("en-US",options)+",";
}
