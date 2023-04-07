import { faSearch, faUser, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import "./PendingApprovals.css";
import { Scrollbars } from "react-custom-scrollbars";
import Modal from "react-bootstrap/Modal";
import "./ClubMember.css";

const Admin = (props) => {
  const [searchval, setSearchVal] = useState("");
  const [data,setData]= useState([]);
  const [admin,setAdmin]= useState([]);
  const [id,setId]=useState();
  const [delshow,setDelShow]=useState(false);
  const [loading,setLoading]=useState(false)

  const handleDelClose=()=>{
    setDelShow(false);
  }

  const getUser = async () => {
    const result = await fetch(`http://localhost:8000/get`);
    const res = await result.json();
    let admin = [];
    res && res.map((data) => {
      if (data.role == 'Admin') {
        admin.push(data)
      }
    })
    setAdmin(admin);
    setData(admin);
  };

  useEffect(() => {
    getUser();
    setLoading(false);
  }, [props,loading])

  // search user
  const searchHandler = (e) => {
    let val = e.target.value;
    setSearchVal(e.target.value);
    if (e.target.value != "") {
      let matched = [];
      data.length > 0 &&
        data.forEach((user) => {
          const value = user.name.toLowerCase().includes(val.toLowerCase());
          if (value) {
            matched.push(user);
          }
        });
      setAdmin(matched);
    } else {
      setAdmin(data);
    }
  };

  const handleDeleteAdmin=async ()=>{
    const data = await fetch(`http://localhost:8000/updateDetail/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'Club_Member'})
    })
    const res = await data.json();
    console.log(res)
    setDelShow(false)
    setLoading(true)
  }

  return (
    <div>
      {/* search */}
      <div className="pending-approval-search">
        <div class="relative text-lg bg-transparent text-gray-800">
          <div class="flex items-center border-b-2 border-[#6F6F6F] py-2 mt-3">
            <input
              class="bg-transparent w-full  border-none mr-10 px-2 leading-tight focus:outline-none"
              type="text"
              value={searchval}
              onChange={searchHandler}
              placeholder="Search Member..."
            />
            <button type="submit" class="absolute right-0 top-2 mr-4 ">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>

      {/* table  */}
      <div className="lg:border">
        <Scrollbars style={{ height: "230px" }}>
            <table class="table-auto w-full max-w-[1300px]">
              <tbody class="text-sm divide-y  divide-gray-100 max-w-[1150px]">
                {admin.length>0 ?
                  admin.map((member) => (
                    <tr className="">
                      <td class=" p-2 w-[170px] lg:w-[400px] ">
                        <div className="flex items-center">
                          <img
                            class="rounded-full"
                            src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg"
                            width="40"
                            height="40"
                            alt="Alex Shatov"
                          />

                          <div className="ml-2"> {member.name} </div>
                        </div>
                      </td>
                      <td class="p-2 w-[170px] lg:w-[400px]  items-center mr-8 ">
                        <div class="font-medium text-gray-800">
                          {member.position}
                        </div>
                      </td>
                      <td className=" w-[100px] my-auto">
                      <div className="text-red-500" onClick={()=>{setDelShow(true); setId(member._id)}}>
                        <FontAwesomeIcon icon={faTrash} className="h-[20px] text-red-500" />
                      </div>
                      <Modal show={delshow} onHide={handleDelClose} className="club-member-modal" >
                        <form>
                          <Modal.Header
                            closeButton
                            className="club-member-modal-header"
                          >
                            Are you sure to make this lead as admin ?
                          </Modal.Header>
                          <Modal.Footer className="modal-footer club-member-modal-footer">
                            <div className="modal-footer-club-member-yes-no-div">
                              <div onClick={handleDeleteAdmin}>
                                Yes
                              </div>
                              <button onClick={(e) => { e.preventDefault(); setDelShow(false);}}>No</button>
                            </div>
                          </Modal.Footer>
                        </form>
                      </Modal>
                    </td>
                    </tr>
                  )) : 'No Admins...'}
              </tbody>
            </table>
        </Scrollbars>
      </div>
    </div>
  );
};

export default Admin;
