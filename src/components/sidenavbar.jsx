import { useState } from "react";
import { Home, Settings } from "lucide-react";
import { Inbox } from "lucide-react";
import { User , Calendar , Search , ArrowBigDown , FolderArchive } from "lucide-react";




const Sidenavbar = () => {

  
  const Menus = [
    { title: "Dashboard", src: <Home/> },
    { title: "Inbox", src: <Inbox/> },
    { title: "Accounts", src: <User/>, gap: true },
    { title: "Schedule ", src: <Calendar/> },
    { title: "Search", src: <Search/> },
    { title: "Analytics", src: <ArrowBigDown/> },
    { title: "Files ", src: <FolderArchive/>, gap: true },
    { title: "Setting", src: <Settings/> }
    
  ];
  const [open, setOpen] = useState(true);


  return (
    <div className="flex rounded-sm">
      <div
      style={{ backgroundColor: 'white', borderRadius: "20px"  }}
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-purple h-screen p-5 pt-8 relative duration-300`}
      >
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-black origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Dashboard
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-blue-300 text-black text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              {Menu.src}
              <span className={`${!open && "hidden"} origin-left duration-200 `}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
};
export default Sidenavbar;