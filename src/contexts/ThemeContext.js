import React, { createContext, Component }  from 'react';

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
    state = { 
        isLightTheme : true,
        light: { syntax: '#555',ui: '#ddd',bg: '#eee',button:"",drop:'#fff'},
        dark: {syntax: '#ddd', ui: '#000', bg: '#222',button: "",drop:'#000'},
        
     } 
     toggletheme = () =>{
        this.setState({isLightTheme: !this.state.isLightTheme})
     }
    render() { 
        return (
            <ThemeContext.Provider value={{...this.state, toggletheme :this.toggletheme}}>
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}
 
export default ThemeContextProvider;