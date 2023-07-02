import axios from "axios";
import ScrollableFeed from "react-scrollable-feed";
import React, { useEffect, useState } from "react";
function Member(props) {
  const [visible, setVisible] = useState(false);
  const [members, setMembers] = useState([]);
  const toggle = () => {
    setVisible((prevvisible) => !prevvisible);
  };
  const fetchMembers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BACKEND_BASEURL}/api/users`
      );
      const usersData = data.data.users;
      setMembers(usersData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="clr">
      <p className="member" onClick={toggle}>
        Members
      </p>
      {visible === true ? (
        <div className="toggle">
          <ScrollableFeed>
            {members &&
              members.length > 0 &&
              members.map((member) => (
                <div key={member._id}>
                  <div className="btn-group dropdown-center">
                    <a
                      className="dropdown-center btn-secondary dropdown-toggle mt-3"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {member.name}
                    </a>
                    <ul className="dropdown-menu ">
                      <li>
                        <button
                          onClick={props.fun}
                          className="btn btn-primary dropdown-item "
                          href="#"
                        >
                          New chat
                        </button>
                      </li>
                    </ul>
                  </div>
                  <br />
                </div>
              ))}
          </ScrollableFeed>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default Member;
