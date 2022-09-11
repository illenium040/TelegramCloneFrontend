/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            backgroundImage: {
                "light-theme": "url('../../assets/images/bg.jpg')"
            },
            colors: {
                sidebar: "#293A4C",
                "sidebar-ico": "#8393A3",
                "sidebar-ico-focus": "#5EB5F7",
                "sidebar-focus": "#17212B",
                "sidebar-dark": "#0E1621",
                "side-chat-hover": "#F1F1F1",
                "side-gray": "#BBBBBB",
                "side-indicator-focus": "#C6E1F7",
                //dark-section
                "dark-sidebar-bg": "#0E1621",
                "dark-sidebar-bg-lighter": "#242F3D",
                "dark-sidebar-ico-bg-hover": "#0E1621",
                "dark-chat-unit-bg": "#17212B",
                "dark-chat-unit-focus": "#2B5278",
                "dark-chat-unit-hover": "#202B36"
            },
            gridTemplateColumns: {
                // Complex site-specific column configuration
                "side-container": "100px 1fr 3fr",
                "side-container-sm": "100px 1fr",
                "side-container-xs": "1fr",
                "chat-list-unit-col": "60px 1fr 3fr 50px"
            },
            gridTemplateRows: {
                "chat-list-unit-row": "30px 30px"
            }
        }
    },
    plugins: []
}
