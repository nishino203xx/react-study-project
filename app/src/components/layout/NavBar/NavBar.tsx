import { type ReactNode } from "react"
import { NavLink } from "react-router"
import styles from "./NavBar.module.scss"

type NavItemProps = {
  to: string
  children: ReactNode
}

function NavItem({ to, children }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? styles.active : styles.inactive)}
    >
      {children}
    </NavLink>
  )
}

export default function NavBar() {
  return (
    <header>
      <nav className={styles.root}>
        <div>My React App</div>

        <div className={styles.links}>
          <NavItem to={"/"}>ホーム</NavItem>
          <NavItem to={"/todos"}>ToDo</NavItem>
          <NavItem to={"/settings"}>設定</NavItem>
        </div>
      </nav>
    </header>
  )
}
