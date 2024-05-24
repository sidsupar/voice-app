import SwitchButton from "@repo/ui/switch-button";

const onEnableHandler: () => void = () => {
            document.documentElement.classList.remove('light')
            document.documentElement.classList.add('dark');
            localStorage.theme = "dark"
}
const onDisbleHandler: () => void = () => {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light')
            localStorage.theme = "light"
}

export default function SwitchTheme() {

    return (
      <div>
        <SwitchButton initialValue={localStorage.getItem("theme") == "dark" ? true : false} onEnableHandler={onEnableHandler} onDisbleHandler={onDisbleHandler} />
      </div>
    )
}