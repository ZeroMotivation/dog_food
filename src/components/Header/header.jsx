import s from './index.module.css';
import cn from 'classnames';


function Header({children, user, onUpdateUser}) {


  return (
    <header className={cn(s.header,'cover')}>
      <div className="container">
        {user?.email && <span>{user?.email}</span>}
        {user?.name && <span>{user?.name}</span>}

        <div className={s.wrapper}>
          {children}
        </div>
      </div>
    </header>
  )
}

export default Header;
