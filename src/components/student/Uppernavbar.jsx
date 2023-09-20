import React from 'react';
import { User } from 'lucide-react';

export default function Uppernavbar() {

const Details = [
  {
    id: 1,
    Rollno: "02614804922",
    Name: "Prakhar Sharma",
    College: "Maharaja Agrasen of institute of technology"
  },
  {
    id: 2,
    Rollno: "02714804922",
    Name: "Saksham Sharma",
    College: "Maharaja Agrasen of institute of technology"
  },
  {
    id: 3,
    Rollno: "02814804922",
    Name: "Shlok Sharma",
    College: "Maharaja Agrasen of institute of technology"
  },
]

const NewDetails = Details.filter((student) => student.id === 1);

  return (
    <div className="navbar"
    style={{ backgroundColor: '#E4F0FF'}}>
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><a>Item 1</a></li>
            <li>
              <a>Parent</a>
              <ul className="p-5">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
      </div>
      <div className="navbar-start hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex-nowrap">
          <li tabIndex={2}>
            <details>
              <summary><User color="black" size={20} />Profile</summary>
              <ul className="p-2">
              {NewDetails.map((student, index) => (
            <li key={index} className='font-bold'>
              <a>{student.Name}</a>
            </li>))}
                <li className='w-40 text-red-500 font-bold'><a >Sign out</a></li>
                <li><a>Settings</a></li>
              </ul>
            </details>
          </li>
          {NewDetails.map((student, index) => (
            <li key={index}>
              <a>{student.Rollno}</a>
            </li>
          ))}
           {NewDetails.map((student, index) => (
          <li key={index} className='font-bold'>
            <a>{student.College}</a>
          </li>
        ))}

        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn ">Button</a>
      </div>
    </div>
  );
}
