// Clear input function 
export const clearInput = (element) => document.getElementById(element).value = ''


// Date function 
export const date_function = () => {
    let today = new Date();
    let quarter = Math.floor((today.getMonth() + 3) / 3)
    let nextq;

    if (quarter == 4) {
        nextq = new Date(today.getFullYear() + 1, 1, 1);

    }else{
        nextq = new Date(today.getFullYear(), quarter * 3, 1);
    }

    return (
        nextq.toLocaleString('en-us', { weekday: 'long' }) + ', ' + nextq.toLocaleString('default', { month: 'long' }) + ' ' + ('0' + nextq.getDate()).slice(-2) + ', ' + nextq.getFullYear()
    )
}