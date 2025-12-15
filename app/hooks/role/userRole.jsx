import Cookies from "js-cookie";
const useUserRole = (role) => {
  let currentRole = Cookies.get("userRole");

  if (!currentRole) {
    currentRole = role;
    Cookies.set("userRole", role, { expires: 7 });
  }

  function switchRole(role) {
    if (role === "employer") {
      Cookies.set("userRole", "professional", { expires: 7 });
    }
     else {
      Cookies.set("userRole", "employer", { expires: 7 });
    }
  }

  return { currentRole, switchRole };
};

export default useUserRole;
