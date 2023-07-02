import axios from "axios";
import ScrollableFeed from "react-scrollable-feed";
import { Drawer, Placeholder } from "rsuite";
import React, { useEffect, useState } from "react";
function Member({ handleClick, isOpen }) {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const fetchMembers = async () => {
    try {
      setIsloading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BACKEND_BASEURL}/api/users`
      );
      const usersData = data.data.users;
      setMembers(usersData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <Drawer
      onOpen={fetchMembers}
      open={isOpen}
      onClose={() => handleClick(false)}
      size="sm"
    >
      <Drawer.Body>
        {!isLoading ? (
          members.map((member) => <div>{member.name}</div>)
        ) : (
          <Placeholder></Placeholder>
        )}
      </Drawer.Body>
    </Drawer>
  );
}
export default Member;
