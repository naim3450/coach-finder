/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem'
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    // font family start here
    fontFamily: {
      
     
      'Lato': ['"Lato", serif'],
    },
    // font family end here
    extend: {
      //color part start here
      colors: {
        primaryColor: '#222B60',
        BtnColor: '#EB3743',
        SecondaryColor: '#6A8DAB',
        HighlightColor: '#FDEBEC',
        BgColor: '#F5F5F5',
        BorderColor: '#AEB3B7',
        MenuHColor: ' #FDEBEC',
        h4Color: ' #060C3C',
        
      },
       //color part end here
    },
  },
  plugins: [],
}

 