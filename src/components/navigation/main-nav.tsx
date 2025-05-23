import { useState, useEffect } from "react"
import { MenuItem } from "./menu-item"
import { MobileSidebar } from "./mobile-sidebar"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export function MainNav({ menuData }) {
  const [isScrolled, setIsScrolled] = useState(false)

  const sortedMenuItems = [...menuData].sort((a, b) => a.order - b.order)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={classNames("relative z-10 transition-all duration-300", isScrolled && "shadow-sm")}>

      <MobileSidebar menuData={menuData} />

      <div className="hidden lg:block">
        <ul className="flex items-center space-x-1">
          {sortedMenuItems.map((item) => (
            <li key={`${item.title}-${item.order}`}>
              <MenuItem item={item} />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
