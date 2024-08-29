import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../features/adminSlice';

const ProfileDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    dispatch(adminLogout());
  };

  return (
    <div className="relative">
      <FaUserCircle
        className="text-slate-700 w-8 h-8 cursor-pointer"
        onClick={handleDropdownToggle}
      />
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <ul className="py-1">
            <li
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
