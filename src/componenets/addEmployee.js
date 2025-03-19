import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ChevronDown, Upload, PlusCircle, X, AlertCircle } from "lucide-react";
import Sidebar from "./sidebar";

// Base URL for API requests
const API_BASE_URL = "https://ultra-inquisitive-oatmeal.glitch.me";

const AddEmployee = ({ employeeId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    emergencyContact: "",
    homeLocation: "",
    addedOn: new Date().toISOString().slice(0, 10),
    roles: [],
  });

  // Separate state for contacts
  const [contacts, setContacts] = useState([
    { name: "", relation: "", phoneNumber: "" },
  ]);

  const [profilePicture, setProfilePicture] = useState(null);
  const [idCardFront, setIdCardFront] = useState(null);
  const [idCardBack, setIdCardBack] = useState(null);
  const [passportFront, setPassportFront] = useState(null);
  const [passportBack, setPassportBack] = useState(null);
  const [otherDoc1, setOtherDoc1] = useState(null);
  const [otherDoc2, setOtherDoc2] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [validationError, setValidationError] = useState("");

  const [previewUrls, setPreviewUrls] = useState({
    profilePicture: null,
    idCardFront: null,
    idCardBack: null,
    passportFront: null,
    passportBack: null,
    otherDoc1: null,
    otherDoc2: null,
  });

  const [isActivated, setIsActivated] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  // Refs for file inputs
  const profilePictureRef = useRef(null);
  const idCardFrontRef = useRef(null);
  const idCardBackRef = useRef(null);
  const passportFrontRef = useRef(null);
  const passportBackRef = useRef(null);
  const otherDoc1Ref = useRef(null);
  const otherDoc2Ref = useRef(null);

  // Available roles
  const availableRoles = [
    { id: "add-products", name: "Add products" },
    { id: "product-list", name: "Product List" },
    { id: "finance", name: "Finance" },
    { id: "orders", name: "Orders" },
    { id: "customer-service", name: "Customer Service" },
  ];

  // Relation options
  const relationOptions = [
    "Parent",
    "Sibling",
    "Spouse",
    "Child",
    "Friend",
    "Relative",
    "Other",
  ];

  // Check if we're in edit mode and fetch employee data if so
  useEffect(() => {
    if (employeeId) {
      setIsEditMode(true);
      fetchEmployeeData(employeeId);
    }
  }, [employeeId]);

  const fetchEmployeeData = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/employees/${id}`);
      const employeeData = response.data;

      // Set form data
      setFormData({
        name: employeeData.name || "",
        email: employeeData.email || "",
        phone: employeeData.phone || "",
        address: employeeData.address || "",
        emergencyContact: employeeData.emergencyContact || "",
        homeLocation: employeeData.homeLocation || "",
        addedOn: employeeData.addedOn
          ? employeeData.addedOn.slice(0, 10)
          : new Date().toISOString().slice(0, 10),
        roles: employeeData.roles || [],
      });

      // Set contacts
      if (employeeData.contacts && employeeData.contacts.length > 0) {
        setContacts(employeeData.contacts);
      }

      // Set activation and block status
      setIsActivated(employeeData.isActivated !== false);
      setIsBlocked(employeeData.isBlocked === true);

      // Set preview URLs for existing images
      const updatedPreviewUrls = { ...previewUrls };

      // Helper function to set preview URL if image exists
      const setPreviewIfExists = (fieldName, imageUrl) => {
        if (imageUrl) {
          // Ensure the URL is absolute
          const fullUrl = imageUrl.startsWith("http")
            ? imageUrl
            : `${API_BASE_URL}${
                imageUrl.startsWith("/") ? "" : "/"
              }${imageUrl}`;

          updatedPreviewUrls[fieldName] = fullUrl;
        }
      };

      // Set preview URLs for all image fields
      setPreviewIfExists("profilePicture", employeeData.profilePicture);
      setPreviewIfExists("idCardFront", employeeData.idCardFront);
      setPreviewIfExists("idCardBack", employeeData.idCardBack);
      setPreviewIfExists("passportFront", employeeData.passportFront);
      setPreviewIfExists("passportBack", employeeData.passportBack);
      setPreviewIfExists("otherDoc1", employeeData.otherDoc1);
      setPreviewIfExists("otherDoc2", employeeData.otherDoc2);

      setPreviewUrls(updatedPreviewUrls);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      setErrorMessage("Failed to load employee data. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleContactChange = (index, field, value) => {
    const updatedContacts = [...contacts];
    updatedContacts[index][field] = value;
    setContacts(updatedContacts);
  };

  const addContact = () => {
    setContacts([...contacts, { name: "", relation: "", phoneNumber: "" }]);
  };

  const removeContact = (index) => {
    if (contacts.length > 1) {
      const updatedContacts = contacts.filter((_, i) => i !== index);
      setContacts(updatedContacts);
    }
  };

  const handleRoleToggle = (roleId) => {
    setFormData((prevData) => {
      if (prevData.roles.includes(roleId)) {
        return {
          ...prevData,
          roles: prevData.roles.filter((id) => id !== roleId),
        };
      } else {
        return {
          ...prevData,
          roles: [...prevData.roles, roleId],
        };
      }
    });
  };

  const handleFileChange = (e, setter, previewKey) => {
    const file = e.target.files[0];
    if (file) {
      setter(file);

      // If this is an ID or passport upload, clear any validation error
      if (["idCardFront", "passportFront"].includes(previewKey)) {
        setValidationError("");
      }

      // Create preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrls((prev) => ({
          ...prev,
          [previewKey]: fileReader.result,
        }));
      };
      fileReader.readAsDataURL(file);
    }
  };

  const triggerFileInput = (ref) => {
    ref.current.click();
  };

  // Validate that either ID card or passport is uploaded
  const validateIdentification = () => {
    // In edit mode, if we already have preview URLs, we don't need new uploads
    if (isEditMode && (previewUrls.idCardFront || previewUrls.passportFront)) {
      return true;
    }

    if (
      !idCardFront &&
      !passportFront &&
      !previewUrls.idCardFront &&
      !previewUrls.passportFront
    ) {
      setValidationError(
        "Please upload either an ID card or passport for identification"
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setValidationError("");

    // Validate identification documents
    if (!validateIdentification()) {
      // Scroll to the validation error
      window.scrollTo({
        top: document.querySelector(".id-docs-section").offsetTop - 100,
        behavior: "smooth",
      });
      return;
    }

    // Create form data to send files
    const submitData = new FormData();

    // Append all form fields
    Object.keys(formData).forEach((key) => {
      if (key === "roles") {
        submitData.append(key, JSON.stringify(formData[key]));
      } else {
        submitData.append(key, formData[key]);
      }
    });

    // Append contacts as JSON
    submitData.append("contacts", JSON.stringify(contacts));

    // Append files if they exist (only append new files, not existing ones)
    if (profilePicture) submitData.append("profilePicture", profilePicture);
    if (idCardFront) submitData.append("idCardFront", idCardFront);
    if (idCardBack) submitData.append("idCardBack", idCardBack);
    if (passportFront) submitData.append("passportFront", passportFront);
    if (passportBack) submitData.append("passportBack", passportBack);
    if (otherDoc1) submitData.append("otherDoc1", otherDoc1);
    if (otherDoc2) submitData.append("otherDoc2", otherDoc2);

    // For existing images that haven't been changed, pass the URLs
    if (!profilePicture && previewUrls.profilePicture)
      submitData.append("existingProfilePicture", previewUrls.profilePicture);
    if (!idCardFront && previewUrls.idCardFront)
      submitData.append("existingIdCardFront", previewUrls.idCardFront);
    if (!idCardBack && previewUrls.idCardBack)
      submitData.append("existingIdCardBack", previewUrls.idCardBack);
    if (!passportFront && previewUrls.passportFront)
      submitData.append("existingPassportFront", previewUrls.passportFront);
    if (!passportBack && previewUrls.passportBack)
      submitData.append("existingPassportBack", previewUrls.passportBack);
    if (!otherDoc1 && previewUrls.otherDoc1)
      submitData.append("existingOtherDoc1", previewUrls.otherDoc1);
    if (!otherDoc2 && previewUrls.otherDoc2)
      submitData.append("existingOtherDoc2", previewUrls.otherDoc2);

    submitData.append("isActivated", isActivated);
    submitData.append("isBlocked", isBlocked);

    try {
      let response;
      if (isEditMode) {
        // Update existing employee
        response = await axios.put(
          `${API_BASE_URL}/api/employees/${employeeId}`,
          submitData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // Create new employee
        response = await axios.post(
          `${API_BASE_URL}/api/employees`,
          submitData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (response.status === 200 || response.status === 201) {
        setShowSuccessMessage(true);

        // Show success message briefly and then refresh the page
        setTimeout(() => {
          window.location.reload(); // This will refresh the page
        }, 1500); // 1.5 seconds delay to show the success message
      }
    } catch (error) {
      console.error("Error saving employee:", error);
      setErrorMessage(
        error.response?.data?.message ||
          `Failed to ${
            isEditMode ? "update" : "add"
          } employee. Please try again.`
      );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main content area with proper margin */}
      <div
        className={`flex-1 transition-all duration-300 overflow-auto ${
          isSidebarOpen ? "lg:ml-80" : "ml-0"
        }`}
      >
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-sm rounded-lg my-6">
          {showSuccessMessage && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6"
              role="alert"
            >
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline">
                {" "}
                Employee {isEditMode ? "updated" : "added"} successfully.
                Refreshing...
              </span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  onClick={() => setShowSuccessMessage(false)}
                  className="fill-current h-6 w-6 text-green-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}

          {errorMessage && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {errorMessage}</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  onClick={() => setErrorMessage("")}
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}

          <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
            {isEditMode ? "EDIT EMPLOYEE DETAILS" : "ADD EMPLOYEE DETAILS"}
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="col-span-1">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee ID Automatically generated
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    disabled
                    placeholder={
                      isEditMode ? employeeId : "Will be auto-generated"
                    }
                    value={isEditMode ? employeeId : ""}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location of home
                  </label>
                  <input
                    type="text"
                    name="homeLocation"
                    value={formData.homeLocation}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>

              <div className="col-span-1">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact in case of emergency
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>

              <div className="col-span-1">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Picture
                  </label>
                  <div
                    className="border border-gray-300 rounded h-48 flex items-center justify-center overflow-hidden relative"
                    onClick={() => triggerFileInput(profilePictureRef)}
                  >
                    {previewUrls.profilePicture ? (
                      <img
                        src={previewUrls.profilePicture}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-4 cursor-pointer">
                        <Upload size={32} className="mx-auto text-gray-400" />
                        <p className="text-sm text-gray-500 mt-2">
                          Click to upload image
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      ref={profilePictureRef}
                      onChange={(e) =>
                        handleFileChange(e, setProfilePicture, "profilePicture")
                      }
                      className="hidden"
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Friend/Family Contacts Section */}
            <div className="border-t border-b py-6 my-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">
                  Friends/Family Contacts
                </h3>
                <button
                  type="button"
                  onClick={addContact}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <PlusCircle size={18} className="mr-1" /> Add Contact
                </button>
              </div>

              {contacts.map((contact, index) => (
                <div
                  key={index}
                  className="flex flex-wrap md:flex-nowrap gap-4 mb-4 pb-4 border-b border-gray-100 relative"
                >
                  <div className="w-full md:w-1/3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={contact.name}
                      onChange={(e) =>
                        handleContactChange(index, "name", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  <div className="w-full md:w-1/3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Relation
                    </label>
                    <div className="relative">
                      <select
                        value={contact.relation}
                        onChange={(e) =>
                          handleContactChange(index, "relation", e.target.value)
                        }
                        className="appearance-none w-full p-2 border border-gray-300 rounded pr-8"
                        required
                      >
                        <option value="">Select relation</option>
                        {relationOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={contact.phoneNumber}
                      onChange={(e) =>
                        handleContactChange(
                          index,
                          "phoneNumber",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  {contacts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeContact(index)}
                      className="absolute top-0 right-0 text-red-500 hover:text-red-700"
                      aria-label="Remove contact"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-b py-6 my-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Employee Roles
              </label>
              <div className="flex flex-wrap gap-2">
                {availableRoles.map((role) => (
                  <div
                    key={role.id}
                    onClick={() => handleRoleToggle(role.id)}
                    className={`px-3 py-1 rounded text-sm cursor-pointer ${
                      formData.roles.includes(role.id)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {role.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Added on
              </label>
              <input
                type="date"
                name="addedOn"
                value={formData.addedOn}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="border-t border-b py-6 my-6 id-docs-section">
              {/* Validation error message */}
              {validationError && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        {validationError}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    ID Card
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ID card front
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div
                        className={`border ${
                          validationError &&
                          !idCardFront &&
                          !passportFront &&
                          !previewUrls.idCardFront &&
                          !previewUrls.passportFront
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        } rounded h-32 flex items-center justify-center overflow-hidden relative`}
                        onClick={() => triggerFileInput(idCardFrontRef)}
                      >
                        {previewUrls.idCardFront ? (
                          <img
                            src={previewUrls.idCardFront}
                            alt="ID Card Front"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-4 cursor-pointer">
                            <Upload
                              size={24}
                              className="mx-auto text-gray-400"
                            />
                            <p className="text-xs text-gray-500 mt-1">Upload</p>
                          </div>
                        )}
                        <input
                          type="file"
                          ref={idCardFrontRef}
                          onChange={(e) =>
                            handleFileChange(e, setIdCardFront, "idCardFront")
                          }
                          className="hidden"
                          accept="image/*"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ID card back
                      </label>
                      <div
                        className="border border-gray-300 rounded h-32 flex items-center justify-center overflow-hidden relative"
                        onClick={() => triggerFileInput(idCardBackRef)}
                      >
                        {previewUrls.idCardBack ? (
                          <img
                            src={previewUrls.idCardBack}
                            alt="ID Card Back"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-4 cursor-pointer">
                            <Upload
                              size={24}
                              className="mx-auto text-gray-400"
                            />
                            <p className="text-xs text-gray-500 mt-1">Upload</p>
                          </div>
                        )}
                        <input
                          type="file"
                          ref={idCardBackRef}
                          onChange={(e) =>
                            handleFileChange(e, setIdCardBack, "idCardBack")
                          }
                          className="hidden"
                          accept="image/*"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Passport
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Passport front
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div
                        className={`border ${
                          validationError && !idCardFront && !passportFront
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        } rounded h-32 flex items-center justify-center overflow-hidden relative`}
                        onClick={() => triggerFileInput(passportFrontRef)}
                      >
                        {previewUrls.passportFront ? (
                          <img
                            src={previewUrls.passportFront}
                            alt="Passport Front"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-4 cursor-pointer">
                            <Upload
                              size={24}
                              className="mx-auto text-gray-400"
                            />
                            <p className="text-xs text-gray-500 mt-1">Upload</p>
                          </div>
                        )}
                        <input
                          type="file"
                          ref={passportFrontRef}
                          onChange={(e) =>
                            handleFileChange(
                              e,
                              setPassportFront,
                              "passportFront"
                            )
                          }
                          className="hidden"
                          accept="image/*"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Passport back
                      </label>
                      <div
                        className="border border-gray-300 rounded h-32 flex items-center justify-center overflow-hidden relative"
                        onClick={() => triggerFileInput(passportBackRef)}
                      >
                        {previewUrls.passportBack ? (
                          <img
                            src={previewUrls.passportBack}
                            alt="Passport Back"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-4 cursor-pointer">
                            <Upload
                              size={24}
                              className="mx-auto text-gray-400"
                            />
                            <p className="text-xs text-gray-500 mt-1">Upload</p>
                          </div>
                        )}
                        <input
                          type="file"
                          ref={passportBackRef}
                          onChange={(e) =>
                            handleFileChange(e, setPassportBack, "passportBack")
                          }
                          className="hidden"
                          accept="image/*"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                <span className="text-red-500">*</span> Please upload at least
                one form of identification (either ID card or passport)
              </p>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Any other doc
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    className="border border-gray-300 rounded h-32 flex items-center justify-center overflow-hidden relative"
                    onClick={() => triggerFileInput(otherDoc1Ref)}
                  >
                    {previewUrls.otherDoc1 ? (
                      <img
                        src={previewUrls.otherDoc1}
                        alt="Other Document 1"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-4 cursor-pointer">
                        <Upload size={24} className="mx-auto text-gray-400" />
                        <p className="text-xs text-gray-500 mt-1">Upload</p>
                      </div>
                    )}
                    <input
                      type="file"
                      ref={otherDoc1Ref}
                      onChange={(e) =>
                        handleFileChange(e, setOtherDoc1, "otherDoc1")
                      }
                      className="hidden"
                      accept="image/*,.pdf"
                    />
                  </div>

                  <div
                    className="border border-gray-300 rounded h-32 flex items-center justify-center overflow-hidden relative"
                    onClick={() => triggerFileInput(otherDoc2Ref)}
                  >
                    {previewUrls.otherDoc2 ? (
                      <img
                        src={previewUrls.otherDoc2}
                        alt="Other Document 2"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-4 cursor-pointer">
                        <Upload size={24} className="mx-auto text-gray-400" />
                        <p className="text-xs text-gray-500 mt-1">Upload</p>
                      </div>
                    )}
                    <input
                      type="file"
                      ref={otherDoc2Ref}
                      onChange={(e) =>
                        handleFileChange(e, setOtherDoc2, "otherDoc2")
                      }
                      className="hidden"
                      accept="image/*,.pdf"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t py-6 my-6">
              <div className="flex flex-col md:flex-row justify-start gap-8">
                <div>
                  <button
                    type="button"
                    onClick={() => setIsBlocked(!isBlocked)}
                    className={`px-4 py-2 rounded ${
                      isBlocked
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    Block
                  </button>
                  <div className="mt-4 p-3 bg-gray-100 border rounded">
                    <p className="text-sm text-gray-700">
                      {isBlocked ? "Blocked" : "Not blocked yet"}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsActivated(true)}
                      className={`px-4 py-2 rounded ${
                        isActivated
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      ✓ Activated
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsActivated(false)}
                      className={`px-4 py-2 rounded ${
                        !isActivated
                          ? "bg-gray-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      Deactivate
                    </button>
                  </div>
                  <div className="mt-4 p-3 bg-gray-100 border rounded">
                    <p className="text-sm text-gray-700">
                      {isActivated ? "Activated" : "Deactivated"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
