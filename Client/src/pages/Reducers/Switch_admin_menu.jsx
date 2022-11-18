
const Switch_admin_menu = (state = 'overview', action) => {
    switch (action.type) {
        case "SWITCH_MENU":
          return state = action.payload
    
      
        default:
            return state;
    }
}

export default Switch_admin_menu
