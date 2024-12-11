import React, { useState } from 'react';
import NavigationSidebar from '../dashboard/SideBar';
import CreateBlog from '../dashboard/CreateBlog';
import MyProfile from '../dashboard/MyProfile';
import MyBlogs from '../dashboard/MyBlogs';
import UpdateBlogs from '../dashboard/UpdateBlog';
import ErrorNotFound from '../dashboard/ErrorNotFound';

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState('My Blogs');

  // Function to render the selected component using if-else conditions
  const renderComponent = () => {
    if (activeComponent === 'Create Blog') {
      return <CreateBlog />;
    } else if (activeComponent === 'My Profile') {
      return <MyProfile />;
    } else if (activeComponent === 'My Blogs') {
      return <MyBlogs />;
    } else if (activeComponent === 'Update Blogs') {
      return <UpdateBlogs />;
    } else {
      return <ErrorNotFound />;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar component */}
      <NavigationSidebar onSelectComponent={setActiveComponent} />

      {/* Dynamic content rendering based on selected sidebar option */}
      <div className="flex-grow p-6">
        {renderComponent()}
      </div>
    </div>
  );
}

export default Dashboard;
