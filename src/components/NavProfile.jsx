import React from 'react';

const NavProfile = () => {

    return (
        <div className="flex justify-center items-center ">
        <div className="avatar">
          <div className="w-14 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div className="">
          <ul className="menu menu-horizontal ">
            <li>
              <details>
                <summary className="font-semibold text-white">
                  Rafia Sultana
                </summary>
                <ul className="relative z-50 bg-base-100 rounded-t-none ">
                  <li>
                    <a href='/' className='font-semibold'>Logout</a>
                  </li>
                  <li>
                    <a>Link 2</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    );
};

export default NavProfile;