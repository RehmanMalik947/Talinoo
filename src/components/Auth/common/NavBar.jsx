import React from 'react';

function NavBar() {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <div>
        <img src="/brand.png" alt="Brand Logo" className="h-10 w-auto" />
      </div>

      <div className="flex space-x-6 font-medium text-gray-700 text-sm">
        <a href="#">Dashboard</a>
        <a href="#">Clients</a>
        <a href="#">Talents</a>
        <a href="#">Tasks</a>
        <a href="#">Payments</a>
        <a href="#">Plans</a>
      </div>
      <div>
        <img src="" alt="" />
      </div>
      
     

    </div>
  );
}

export default NavBar;
