"use client"
import React, { useEffect, useState } from 'react'

export default function Menu({menuItems, defaultActive = 0, style}) {
  const [active, setActive] = useState(defaultActive)
  useEffect(() => {
    const mainDiv = document.getElementById('mainDiv')
    const handleScroll = () => {
      const divs = document.querySelectorAll('.menuSection');
      const {top:mainContainer} = mainDiv.getBoundingClientRect()
      for(let i = 0; i < divs.length; i++) {
        const selectedDiv = divs[i].getBoundingClientRect()
        if((selectedDiv.y + divs[i].offsetHeight - 90) > mainContainer){
          const divIndex = menuItems.findIndex(item => item.path === '#' + divs[i].id)
          setActive(divIndex)
          break
        }
      }
      
    };

    mainDiv.addEventListener('scroll', handleScroll);

  }, []);
  return (
    <ul className="menu menu-vertical" style={style}>
      {
        menuItems && menuItems.map((item, idx) => (
          <div key={idx}>
            <li>
              <a href={item.path} className={active === idx ? 'text-primary' : ''}>{item.name}</a>
            </li>
              <span className={active === idx ? 'divider divider-primary m-0' : 'divider m-0'}></span>
          </div>
        ))
      }
    </ul>
  )
}
