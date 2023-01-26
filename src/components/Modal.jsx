import React, { useReducer } from "react";
import { Button, Checkbox, Label, Modal, TextInput,Radio } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { useQuery } from "@tanstack/react-query";
import { Apis } from "../utils/apis";

const reducer = (state, action) => {
  switch (action.type) {
    case "merchantName":
      return { ...state, merchantName: action.payload };
    case "description":
      return { ...state, description: action.payload };

    case "userName":
      return { ...state, userName: action.payload };

    case "password":
      return { ...state, password: action.payload };

    case "admin":
      
      return { ...state, admin: action.payload,merchant:!action.payload,roleName:"Admin"};


    case "merchant":
      return { ...state, merchant: action.payload ,admin:!action.payload,roleName:"Merchant"};
    
    default:
      return state;
  }
};

const ModalComponent = ({ show: { show, process }, setShow ,modalItem}) => {
  const [initialState, dispatch] = useReducer(reducer, {
    merchantName: "",
    description: "",
    userName: "",
    password: "",
    admin: true,
    merchant:false,
    roleName:"Admin"
  });


  const { refetch: register, data } = useQuery(
    ["register"],
    () =>
      Apis.register({
        
        userName: initialState.userName,
        merchantName:initialState.merchantName,
        description:initialState.description,
        password:initialState.password,
        roleName:initialState.roleName
        
      }),
    {
      enabled: false,
    }
  );
  const { refetch: deleteMerchant, ...deleteData } = useQuery(
    ["register"],
    () =>
      Apis.deleteMerchant(modalItem.id),
    {
      enabled: false,
    }
  );
  const { refetch: editMerchant, ...editMerchantData } = useQuery(
    ["editMerchantData"],
    () =>
      Apis.editMerchant({
        id:modalItem.id,
        userName: initialState.userName,
        merchantName:initialState.merchantName,
        description:initialState.description,
        password:initialState.password,
        
        
      }),
    {
      enabled: false,
    }
  );
  const handleAdd=async()=>{
    register();
   
  }
  
   const handleDelete=async()=>{
    deleteMerchant();

   }
   const handleUpdate=()=>{
    editMerchant()
   }
   console.log(modalItem,"deletedId");
  return (
    <div>
      <Modal
        show={show}
        size="lg"
        popup={true}
        onClose={() => setShow({ show: false, process: "" })}
      >
        <Modal.Header />

        {process === "Add" ? (
          <Modal.Body>
            <div className="px-6 pb-4 space-y-6 sm:pb-6 lg:px-8 xl:pb-8">
              <div>
                <div className="block mb-2">
                  <Label value="Merchant Name" />
                </div>
                <TextInput
                  id="merchantName"
                  placeholder="Merchant Name"
                  value={initialState.merchantName}
                  required={true}
                  onChange={(e) =>
                    dispatch({ type: "merchantName", payload: e.target.value })
                  }
                />
              </div>
              <div>
                <div className="block mb-2">
                  <Label value="Description" />
                </div>
                <TextInput
                  id="description"
                  placeholder="Description"
                  value={initialState.description}
                  required={true}
                  onChange={(e) =>
                    dispatch({ type: "description", payload: e.target.value })
                  }
                />
              </div>
              <div>
                <div className="block mb-2">
                  <Label value="User Name" />
                </div>
                <TextInput
                  id="userName"
                  placeholder="User Name"
                  value={initialState.userName}
                  required={true}
                  onChange={(e) =>
                    dispatch({ type: "userName", payload: e.target.value })
                  }
                />
              </div>
              <div>
                <div className="block mb-2">
                  <Label value="Password" />
                </div>
                <TextInput
                  id="password"
                  placeholder="Password"
                  value={initialState.password}
                  required={true}
                  onChange={(e) =>
                    dispatch({ type: "password", payload: e.target.value })
                  }
                />
              </div>
              <div>
                <div className="block mb-2">
                  <Label value="Access" />
                </div>
                <div className="flex gap-8">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="Admin"
                      name="radio"
                      checked={initialState.admin}
                      onChange={(e) =>
                        dispatch({
                          type: "admin",
                          payload: e.target.checked,
                        })
                      }
                    />
                    <Label>Admin</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="Merchant"
                      name="radio"
                      checked={initialState.merchant}
                      onChange={(e) => {
                        dispatch({
                          type: "merchant",
                          payload: e.target.checked,
                        });
                      }}
                    />
                    <Label>Merchant</Label>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Button className="!bg-amber-500 hover:!bg-amber-600" onClick={handleAdd}>
                  Log in to your account
                </Button>
              </div>
            </div>
          </Modal.Body>
        ) : process === "onEdit" ? (
          <Modal.Body>
            <div className="px-6 pb-4 space-y-6 sm:pb-6 lg:px-8 xl:pb-8">
              <div>
                <div className="block mb-2">
                  <Label value="Merchant Name" />
                </div>
                <TextInput
                  id="merchantName"
                  placeholder="Merchant Name"
                  required={true}
                  value={modalItem.merchantName}
                  onChange={(e) =>
                    dispatch({ type: "merchantName", payload: e.target.value })
                  }
                />
              </div>
              <div>
                <div className="block mb-2">
                  <Label value="Description" />
                </div>
                <TextInput
                  id="description"
                  placeholder="Description"
                  required={true}
                  value={modalItem.description}
                  onChange={(e) =>
                    dispatch({ type: "description", payload: e.target.value })
                  }
                />
              </div>
              <div>
                <div className="block mb-2">
                  <Label value="User Name" />
                </div>
                <TextInput
                  id="userName"
                  placeholder="User Name"
                  required={true}
                  value={modalItem.userName}
                  onChange={(e) =>
                    dispatch({ type: "userName", payload: e.target.value })
                  }
                  
                />
              </div>
              <div>
                <div className="block mb-2">
                  <Label value="Password" />
                </div>
                <TextInput
                  id="password"
                  placeholder="Password"
                  required={true}
                  onChange={(e) =>
                    dispatch({ type: "password", payload: e.target.value })
                  }
                />
              </div>
              <div>
                {/* <div className="block mb-2">
                  <Label value="Access" />
                </div>
                <div className="flex gap-8">
                  <div className="flex items-center gap-2">
                    <Checkbox id="admin" />
                    <Label>Admin</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="merchant" />
                    <Label>Merchant</Label>
                  </div>
                </div> */}
              </div>
              <div className="flex justify-center">
                <Button className="!bg-amber-500 hover:!bg-amber-600" onClick={handleUpdate}>
               Update
                 
                </Button>
              </div>
            </div>
          </Modal.Body>
        ) : process === "onDelete" ? (
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this merchant?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure"  onClick={handleDelete}>
                  Yes, I'm sure
                </Button>
                <Button
                  color="gray"
                  onClick={()=>{setShow({ show: false, process: "" })}}
                >
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        ) : (
          ""
        )}
      </Modal>
    </div>
  );
};

export default ModalComponent;
