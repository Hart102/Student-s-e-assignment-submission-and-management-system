// REDUX ACTIONS 
// FORM SWITCHER 
export const switch_forms = (action) => {
    return{
        type: "SWITCH_FORM",
        payload: action
    }
}

// Capturing loggedin user
export const login_action = (action) => {
    return{
        type: "LOGGED_USER",
        payload: action
    }
}


// ADMIN MENU ACTION
export const admin_menu = (action) => {
    return{
        type: "SWITCH_MENU",
        payload: action
    }
}


// PARTICIPATED STUDENTS
export const participated_students = (action) => {
    return{
        type: "PARTICIPATED_STUDENTS",
        payload: action
    }
}

// SORT PARTICIPANTS RESULT BEFORE DISPLAY
export const sort_participants_result = (action) => {
    return{
        type: "SORT_PARTICIPANTS_RESULT",
        payload: action
    }
}

// TOTAL NUMBER OF ASSESMENTS
export const total_assesments = (action) => {
    return{
        type: "TOTAL_ASSESMENTS",
        payload: action
    }
}