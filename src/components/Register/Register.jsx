/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-target-blank */
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
// import { FaGoogle } from "react-icons/fa";
import SocialLogin from "../../pages/Shared/SocialLogin/SocialLogin";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  //  const location = useLocation();
  //  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
const onSubmit = (data) => {
  createUser(data.email, data.password).then((result) => {
    const loggedUser = result.user;
    console.log(loggedUser);

    // Extract relevant fields for updateUserProfile
    const { name, photoURL } = data;

    updateUserProfile(name, photoURL)
      .then(() => {
        // Prepare data for MongoDB
        const saveUser = {
          first_name: data.first_name,
          last_name: data.last_name,
          avatar: data.avatar,
          domain: data.domain,
          email: data.email,
          gender: data.gender,
          available: data.available,
          password: data.password,
        };

        // Save data to MongoDB
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              console.log(data);
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User created successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
      })
      .catch((error) => console.log(error));
  });
};


  // const onSubmit = (data) => {
  //   console.log(data)
  //   createUser(data.email, data.password).then((result) => {
  //     const loggedUser = result.user;
  //     console.log(loggedUser);

  //     updateUserProfile(data.name, data.photoURL)
  //       .then(() => {
  //         const saveUser = {
  //           name: data.name,
  //           email: data.email,

  //           profile: data.photoURL,
  //         };
  //         fetch("http://localhost:5000/users", {
  //           method: "POST",
  //           headers: {
  //             "content-type": "application/json",
  //           },
  //           body: JSON.stringify(saveUser),
  //         })
  //           .then((res) => res.json())
  //           .then((data) => {
  //             if (data.insertedId) {
  //               console.log(data)
  //               reset();
  //               Swal.fire({
  //                 position: "top-end",
  //                 icon: "success",
  //                 title: "User created successfully.",
  //                 showConfirmButton: false,
  //                 timer: 1500,
  //               });
  //               navigate("/");
  //             }
  //           });
  //       })
  //       .catch((error) => console.log(error));
  //   });
  // };

  const password = watch("password");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register a New Account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center gap-3">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    {...register("first_name", {
                      required: true,
                    })}
                    id="first_name"
                    name="first_name"
                    type="text"
                    placeholder="First Name"
                    autoComplete="first_name"
                    className="appearance-none  border-2 border-double border-red-500 animate-pulse block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-xs mt-1">
                      Please enter a valid email address.
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    {...register("last_name", {
                      required: true,
                    })}
                    id="last_name"
                    name="last_name"
                    type="last_name"
                    placeholder="Last Name"
                    autoComplete="last_name"
                    className="appearance-none  border-2 border-double border-red-500 animate-pulse block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-xs mt-1">
                      Please enter a valid email address.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="photoURL"
                className="block text-sm font-medium text-gray-700"
              >
                Photo URL
              </label>
              <div className="mt-1">
                <input
                  {...register("avatar", {
                    required: true,
                  })}
                  id="avatar"
                  name="avatar"
                  type="text"
                  placeholder="Your Profile Photo URL"
                  autoComplete="off"
                  className="appearance-none border-double border-orange-500 animate-pulse block w-full px-3 py-2 border-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.avatar && (
                  <p className="text-red-500 text-xs mt-1">
                    Please enter photoURL.
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="domain"
                className="block text-sm font-medium text-gray-700"
              >
                Domain
              </label>
              <div className="mt-1">
                <input
                  {...register("domain", {
                    required: true,
                  })}
                  id="domain"
                  name="domain"
                  type="domain"
                  placeholder="Enter Your domain"
                  autoComplete="domain"
                  className="appearance-none  border-2 border-double border-red-600 animate-pulse block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.domain && (
                  <p className="text-red-500 text-xs mt-1">
                    Please enter a valid domain address.
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                  })}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter Your Email"
                  autoComplete="email"
                  className="appearance-none  border-2 border-double border-red-600 animate-pulse block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    Please enter a valid email address.
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="max-w-2xl mx-auto">
                <label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Select your gender
                </label>
                <select
                  id="gender"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("gender", {
                    required: "Please choose your gender", // Adding a custom error message for required validation
                  })}
                >
                  <option value="">Choose your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>
              <div className="max-w-2xl mx-auto">
                <label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Available
                </label>
                <select
                  id="gender"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("available", {
                    required: "Please choose", // Adding a custom error message for required validation
                  })}
                >
                  <option value="">Select Your availablety</option>
                  <option value="Male">Available</option>
                  <option value="Female">Not Available</option>
                </select>

                {errors.available && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.available.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      pattern:
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/,
                    })}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    className="appearance-none border-green-700 animate-pulse block w-full px-3 py-2 border-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.password && errors.password.type === "required" && (
                    <p className="text-red-500 text-xs mt-1">
                      Please enter a password.
                    </p>
                  )}
                  {errors.password && errors.password.type === "minLength" && (
                    <p className="text-red-500 text-xs mt-1">
                      Password must be at least 6 characters long.
                    </p>
                  )}
                  {errors.password && errors.password.type === "pattern" && (
                    <p className="text-red-500 text-xs mt-1">
                      Password must contain at least one capital letter, one
                      special character, and one digit.
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    {...register("confirmPassword", {
                      required: true,
                      validate: (value) => value === password,
                    })}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                    className="appearance-none border-green-700 animate-pulse block w-full px-3 py-2 border-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.confirmPassword &&
                    errors.confirmPassword.type === "required" && (
                      <p className="text-red-500 text-xs mt-1">
                        Please confirm your password.
                      </p>
                    )}
                  {errors.confirmPassword &&
                    errors.confirmPassword.type === "validate" && (
                      <p className="text-red-500 text-xs mt-1">
                        Passwords do not match.
                      </p>
                    )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className=" text-center">
                <p className=" text-gray-600">
                  Already have an account?
                  <Link
                    to="/login"
                    href="/registration"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Login now
                  </Link>
                </p>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </button>
              </div>
            </div>
            <SocialLogin></SocialLogin>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
