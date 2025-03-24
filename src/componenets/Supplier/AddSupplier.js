import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/sidebar";
import { toast } from "react-toastify";

// Indonesian flag SVG component
const IndonesianFlag = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 3 2"
    width="24"
    height="16"
    className="mr-1"
  >
    <rect width="3" height="1" fill="#ff0000" />
    <rect width="3" height="1" y="1" fill="#ffffff" />
  </svg>
);

// Success Modal Component
const SuccessModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg
              className="h-10 w-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
            Success!
          </h3>
          <p className="text-sm text-gray-500 mb-4">{message}</p>
          <button
            type="button"
            onClick={onClose}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const SupplierProfile = () => {
  const [formData, setFormData] = useState({
    supplierId: "",
    name: "",
    email: "",
    phone: "",
    secondPhone: "",
    nameOrDepartment: "",
    address: "",
    warehouseLocation: "",
    bankAccount: "",
    bankName: "",
    emergencyContact: "",
    addedOn: new Date().toISOString().split("T")[0],
    profilePicture: null,
    idCardFront: null,
    idCardBack: null,
    passportFront: null,
    passportBack: null,
    status: "unblocked",
    assignedTo: "",
    activeInactive: "active",
    orders: [],
    orderedProducts: [],
    supplyProducts: [],
  });

  // Phone number state without country code
  const [phoneNumber, setPhoneNumber] = useState("");
  const [secondPhoneNumber, setSecondPhoneNumber] = useState("");

  const [previewUrls, setPreviewUrls] = useState({
    profilePicture: null,
    idCardFront: null,
    idCardBack: null,
    passportFront: null,
    passportBack: null,
  });

  const [errors, setErrors] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState({
    isOpen: false,
    message: "",
  });

  // Initialize phone values from formData
  useEffect(() => {
    if (formData.phone && formData.phone.startsWith("+62")) {
      setPhoneNumber(formData.phone.substring(3)); // Remove +62
    }

    if (formData.secondPhone && formData.secondPhone.startsWith("+62")) {
      setSecondPhoneNumber(formData.secondPhone.substring(3)); // Remove +62
    }
  }, []);

  // Handle phone number input change
  const handlePhoneChange = (e, field) => {
    const { value } = e.target;
    // Allow only numbers and limit to 11 digits
    const sanitizedValue = value.replace(/\D/g, "").substring(0, 11);

    if (field === "phone") {
      setPhoneNumber(sanitizedValue);
      setFormData((prev) => ({
        ...prev,
        phone: sanitizedValue ? `+62${sanitizedValue}` : "",
      }));

      // Clear error when field is edited
      if (errors.phone) {
        setErrors((prev) => ({ ...prev, phone: null }));
      }
    } else {
      setSecondPhoneNumber(sanitizedValue);
      setFormData((prev) => ({
        ...prev,
        secondPhone: sanitizedValue ? `+62${sanitizedValue}` : "",
      }));

      // Clear error when field is edited
      if (errors.secondPhone) {
        setErrors((prev) => ({ ...prev, secondPhone: null }));
      }
    }
  };

  // Validate Indonesian phone number
  const validateIndonesianPhone = (phone) => {
    // Indonesian phone numbers with +62 prefix
    return (
      phone &&
      phone.startsWith("+62") &&
      phone.length >= 10 &&
      phone.length <= 14
    );
  };

  // Validate email address
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!validateIndonesianPhone(formData.phone)) {
      newErrors.phone = "Please enter a valid Indonesian phone number";
    }

    if (
      formData.secondPhone &&
      !validateIndonesianPhone(formData.secondPhone)
    ) {
      newErrors.secondPhone = "Please enter a valid Indonesian phone number";
    }

    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.warehouseLocation.trim())
      newErrors.warehouseLocation = "Warehouse location is required";

    // Check if at least ID card or passport is uploaded
    const hasIdCard = formData.idCardFront && formData.idCardBack;
    const hasPassport = formData.passportFront && formData.passportBack;

    if (!hasIdCard && !hasPassport) {
      newErrors.documents =
        "Either ID card (both sides) or passport (both sides) is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setPreviewUrls((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(files[0]),
      }));

      // Clear document error if either ID or passport is now complete
      if (
        (name.includes("idCard") &&
          (name === "idCardFront" ? true : formData.idCardFront) &&
          (name === "idCardBack" ? true : formData.idCardBack)) ||
        (name.includes("passport") &&
          (name === "passportFront" ? true : formData.passportFront) &&
          (name === "passportBack" ? true : formData.passportBack))
      ) {
        setErrors((prev) => ({ ...prev, documents: null }));
      }
    }
  };

  // Remove uploaded image
  const handleRemoveImage = (name) => {
    // Revoke object URL to avoid memory leaks
    if (previewUrls[name]) {
      URL.revokeObjectURL(previewUrls[name]);
    }

    setFormData((prev) => ({ ...prev, [name]: null }));
    setPreviewUrls((prev) => ({ ...prev, [name]: null }));

    // Check if removing an image affects the document validation
    if (
      (name.includes("idCard") &&
        (!formData.passportFront || !formData.passportBack)) ||
      (name.includes("passport") &&
        (!formData.idCardFront || !formData.idCardBack))
    ) {
      // Set documents error if needed
      const hasIdCard =
        (name === "idCardFront" ? false : formData.idCardFront) &&
        (name === "idCardBack" ? false : formData.idCardBack);
      const hasPassport =
        (name === "passportFront" ? false : formData.passportFront) &&
        (name === "passportBack" ? false : formData.passportBack);

      if (!hasIdCard && !hasPassport) {
        setErrors((prev) => ({
          ...prev,
          documents:
            "Either ID card (both sides) or passport (both sides) is required",
        }));
      }
    }
  };

  const toggleBlockStatus = () => {
    const newStatus = formData.status === "unblocked" ? "blocked" : "unblocked";
    setFormData((prev) => ({ ...prev, status: newStatus }));
  };

  const toggleActiveStatus = () => {
    const newStatus =
      formData.activeInactive === "active" ? "inactive" : "active";
    setFormData((prev) => ({ ...prev, activeInactive: newStatus }));
  };

  // Close success modal
  const closeSuccessModal = () => {
    setSuccessModal({ isOpen: false, message: "" });
  };

  // Auto-close success modal after delay
  useEffect(() => {
    let timer;
    if (successModal.isOpen) {
      timer = setTimeout(() => {
        closeSuccessModal();
      }, 5000); // 5 seconds
    }
    return () => clearTimeout(timer);
  }, [successModal.isOpen]);

  // Modified handleSubmit function to properly handle file uploads
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      toast.error("Please correct the errors in the form");
      return;
    }

    setLoading(true);

    try {
      // Prepare form data for submission
      const submitData = new FormData();

      // Append all non-file form fields
      Object.keys(formData).forEach((key) => {
        // Skip appending arrays and files directly
        if (
          key !== "profilePicture" &&
          key !== "idCardFront" &&
          key !== "idCardBack" &&
          key !== "passportFront" &&
          key !== "passportBack" &&
          key !== "orders" &&
          key !== "orderedProducts" &&
          key !== "supplyProducts"
        ) {
          submitData.append(key, formData[key]);
        }
      });

      // For array fields, append as JSON strings
      if (formData.orders && formData.orders.length > 0) {
        submitData.append("orders", JSON.stringify(formData.orders));
      }

      if (formData.orderedProducts && formData.orderedProducts.length > 0) {
        submitData.append(
          "orderedProducts",
          JSON.stringify(formData.orderedProducts)
        );
      }

      if (formData.supplyProducts && formData.supplyProducts.length > 0) {
        submitData.append(
          "supplyProducts",
          JSON.stringify(formData.supplyProducts)
        );
      }

      // Properly append files with specific naming and handling
      if (formData.profilePicture) {
        // Ensure correct filename extension is preserved
        const profilePicFileName = `profile_${Date.now()}_${
          formData.profilePicture.name
        }`;
        // Create a new file object with proper name to ensure it's detected correctly on server
        const renamedProfilePic = new File(
          [formData.profilePicture],
          profilePicFileName,
          { type: formData.profilePicture.type }
        );
        submitData.append("profilePicture", renamedProfilePic);
      }

      // Apply the same pattern to other image files
      if (formData.idCardFront) {
        const idFrontFileName = `idfront_${Date.now()}_${
          formData.idCardFront.name
        }`;
        const renamedIdFront = new File(
          [formData.idCardFront],
          idFrontFileName,
          { type: formData.idCardFront.type }
        );
        submitData.append("idCardFront", renamedIdFront);
      }

      if (formData.idCardBack) {
        const idBackFileName = `idback_${Date.now()}_${
          formData.idCardBack.name
        }`;
        const renamedIdBack = new File([formData.idCardBack], idBackFileName, {
          type: formData.idCardBack.type,
        });
        submitData.append("idCardBack", renamedIdBack);
      }

      if (formData.passportFront) {
        const passportFrontFileName = `passportfront_${Date.now()}_${
          formData.passportFront.name
        }`;
        const renamedPassportFront = new File(
          [formData.passportFront],
          passportFrontFileName,
          { type: formData.passportFront.type }
        );
        submitData.append("passportFront", renamedPassportFront);
      }

      if (formData.passportBack) {
        const passportBackFileName = `passportback_${Date.now()}_${
          formData.passportBack.name
        }`;
        const renamedPassportBack = new File(
          [formData.passportBack],
          passportBackFileName,
          { type: formData.passportBack.type }
        );
        submitData.append("passportBack", renamedPassportBack);
      }

      // Add content type header for multipart/form-data
      const response = await fetch(
        "https://ultra-inquisitive-oatmeal.glitch.me/api/suppliers",
        {
          method: "POST",
          body: submitData,
          // Don't set Content-Type header manually as browser will set it with boundary
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save supplier profile");
      }

      // Show success modal
      setSuccessModal({
        isOpen: true,
        message: "Supplier profile has been added successfully!",
      });

      // Also show toast
      toast.success("Supplier profile saved successfully");

      // If we have a supplier ID from the server, update our state
      if (data.supplier && data.supplier._id) {
        setFormData((prev) => ({ ...prev, supplierId: data.supplier._id }));
      }

      // Optional: Log successful upload for debugging
      console.log("Images uploaded successfully:", data);

      // Set a timeout to reload the page after showing the success message
      setTimeout(() => {
        window.location.reload();
      }, 3000); // Reload after 3 seconds
    } catch (error) {
      console.error("Error saving supplier profile:", error);
      toast.error(error.message || "Failed to save supplier profile");
    } finally {
      setLoading(false);
    }
  };

  // Add this function to properly handle image display when viewing the supplier
  // This function should be called in the useEffect that loads supplier data
  const loadSupplierImages = (supplierData) => {
    // Check if supplier data has image URLs
    if (supplierData) {
      // Set preview URLs for the images if they exist in the data
      setPreviewUrls({
        profilePicture: supplierData.profilePicture
          ? supplierData.profilePicture
          : null,
        idCardFront: supplierData.idCardFront ? supplierData.idCardFront : null,
        idCardBack: supplierData.idCardBack ? supplierData.idCardBack : null,
        passportFront: supplierData.passportFront
          ? supplierData.passportFront
          : null,
        passportBack: supplierData.passportBack
          ? supplierData.passportBack
          : null,
      });
    }
  };

  // Add this useEffect to your component to load existing supplier data (if editing)
  useEffect(() => {
    // This function would be called when editing an existing supplier
    const fetchSupplierData = async () => {
      if (formData.supplierId) {
        try {
          const response = await fetch(
            `https://ultra-inquisitive-oatmeal.glitch.me/api/suppliers/${formData.supplierId}`
          );

          if (response.ok) {
            const data = await response.json();
            // Set form data from the retrieved supplier
            setFormData((prevData) => ({
              ...prevData,
              ...data.supplier,
            }));

            // Set preview URLs for the images
            loadSupplierImages(data.supplier);
          }
        } catch (error) {
          console.error("Error fetching supplier data:", error);
          toast.error("Failed to load supplier data");
        }
      }
    };

    // Call the function to fetch supplier data if we have an ID
    if (formData.supplierId) {
      fetchSupplierData();
    }
  }, [formData.supplierId]);
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Success Modal */}
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={closeSuccessModal}
        message={successModal.message}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content - adjusted with margin for sidebar */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-80" : "ml-0"
        }`}
      >
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-sm rounded-md my-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Supplier profile
            </h1>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className={`px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>

          <hr className="mb-6 border-gray-300" />

          {errors.documents && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
              <p>{errors.documents}</p>
            </div>
          )}

          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Column 1 - Basic Information */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Supplier ID (Automatically generated)
                  </label>
                  <input
                    type="text"
                    name="supplierId"
                    value={formData.supplierId}
                    className="w-full p-2 border border-gray-300 rounded bg-gray-50"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-2 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="bg-yellow-50 p-4 rounded">
                  <label className="block text-sm text-gray-700 mb-1">
                    Second Phone
                  </label>
                  <div className="flex">
                    <div className="flex items-center bg-white border border-r-0 border-gray-300 rounded-l px-2">
                      <IndonesianFlag />
                      <span className="text-gray-600">+62</span>
                    </div>
                    <input
                      type="text"
                      value={secondPhoneNumber}
                      onChange={(e) => handlePhoneChange(e, "secondPhone")}
                      className={`w-full p-2 border ${
                        errors.secondPhone
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-r`}
                      placeholder="Enter 11 digits"
                    />
                  </div>
                  {errors.secondPhone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.secondPhone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full p-2 border ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    } rounded`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Location of warehouse{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="warehouseLocation"
                    value={formData.warehouseLocation}
                    onChange={handleInputChange}
                    className={`w-full p-2 border ${
                      errors.warehouseLocation
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded`}
                  />
                  {errors.warehouseLocation && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.warehouseLocation}
                    </p>
                  )}
                </div>

                <div className="bg-yellow-50 p-4 rounded">
                  <label className="block text-sm text-gray-700 mb-1">
                    Bank Account
                  </label>
                  <input
                    type="text"
                    name="bankAccount"
                    value={formData.bankAccount}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              {/* Column 2 - Contact Information */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full p-2 border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } rounded`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <div className="flex items-center bg-white border border-r-0 border-gray-300 rounded-l px-2">
                      <IndonesianFlag />
                      <span className="text-gray-600">+62</span>
                    </div>
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => handlePhoneChange(e, "phone")}
                      className={`w-full p-2 border ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      } rounded-r`}
                      placeholder="Enter 11 digits"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                <div className="bg-yellow-50 p-4 rounded">
                  <label className="block text-sm text-gray-700 mb-1">
                    Name/Department/Responsible
                  </label>
                  <input
                    type="text"
                    name="nameOrDepartment"
                    value={formData.nameOrDepartment}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Contact in case of emergency
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Added on
                  </label>
                  <input
                    type="date"
                    name="addedOn"
                    value={formData.addedOn}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="bg-yellow-50 p-4 rounded">
                  <label className="block text-sm text-gray-700 mb-1">
                    Bank name
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              {/* Column 3 - Profile Picture */}
              <div>
                <div className="mb-6">
                  <label className="block text-sm text-gray-700 mb-1">
                    Profile Picture
                  </label>
                  <div className="relative">
                    <div className="w-full h-40 overflow-hidden rounded border border-gray-300">
                      {previewUrls.profilePicture ? (
                        <div className="relative h-full">
                          <img
                            src={previewUrls.profilePicture}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage("profilePicture")}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            title="Remove image"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      name="profilePicture"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ID Card and Passport Section */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Identification Documents
                <span className="text-red-500 text-sm ml-1">
                  (Either ID card OR passport is required)
                </span>
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    ID card front
                  </label>
                  <div className="relative">
                    <div className="w-full h-32 overflow-hidden rounded border border-gray-300">
                      {previewUrls.idCardFront ? (
                        <div className="relative h-full">
                          <img
                            src={previewUrls.idCardFront}
                            alt="ID Front"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage("idCardFront")}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            title="Remove image"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      name="idCardFront"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      accept="image/*"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    ID card back
                  </label>
                  <div className="relative">
                    <div className="w-full h-32 overflow-hidden rounded border border-gray-300">
                      {previewUrls.idCardBack ? (
                        <div className="relative h-full">
                          <img
                            src={previewUrls.idCardBack}
                            alt="ID Back"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage("idCardBack")}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            title="Remove image"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      name="idCardBack"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      accept="image/*"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Passport front
                  </label>
                  <div className="relative">
                    <div className="w-full h-32 overflow-hidden rounded border border-gray-300">
                      {previewUrls.passportFront ? (
                        <img
                          src={previewUrls.passportFront}
                          alt="Passport Front"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      name="passportFront"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      accept="image/*"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Passport back
                  </label>
                  <div className="relative">
                    <div className="w-full h-32 overflow-hidden rounded border border-gray-300">
                      {previewUrls.passportBack ? (
                        <img
                          src={previewUrls.passportBack}
                          alt="Passport Back"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      name="passportBack"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Status Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-b py-6 border-gray-300">
              <div>
                <button
                  type="button"
                  onClick={toggleBlockStatus}
                  className={
                    formData.status === "unblocked"
                      ? "bg-red-100 rounded-lg p-2 inline-block text-red-800 font-medium mb-2 hover:bg-red-200"
                      : "bg-red-600 rounded-lg p-2 inline-block text-white font-medium mb-2 hover:bg-red-700"
                  }
                >
                  {formData.status === "unblocked" ? "Block" : "Unblock"}
                </button>
                <div>
                  <input
                    type="text"
                    name="status"
                    value={
                      formData.status === "unblocked"
                        ? "Not blocked"
                        : "Blocked - click to unblock"
                    }
                    className="w-full p-2 border border-gray-300 rounded bg-gray-50"
                    readOnly
                  />
                </div>
              </div>

              <div>
                <div className="bg-green-500 rounded-lg p-2 inline-block text-white font-medium mb-2">
                  Activated
                </div>
                <div>
                  <input
                    type="text"
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Assigned"
                  />
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={toggleActiveStatus}
                  className={
                    formData.activeInactive === "active"
                      ? "bg-gray-200 rounded-lg p-2 inline-block text-gray-800 font-medium mb-2 hover:bg-gray-300"
                      : "bg-gray-600 rounded-lg p-2 inline-block text-white font-medium mb-2 hover:bg-gray-700"
                  }
                >
                  {formData.activeInactive === "active"
                    ? "Deactivate"
                    : "Activate"}
                </button>
                <div>
                  <input
                    type="text"
                    value={
                      formData.activeInactive === "active"
                        ? "Active"
                        : "Inactive"
                    }
                    className="w-full p-2 border border-gray-300 rounded bg-gray-50"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupplierProfile;
