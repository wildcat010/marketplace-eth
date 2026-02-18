import { useCoursesStore } from "./../../course/services/zustand";

const bytes16ToNumber = (hex) => {
  if (!hex) return 0;

  let str = "";
  for (let i = 2; i < hex.length; i += 2) {
    // skip "0x"
    const byte = parseInt(hex.substr(i, 2), 16);
    if (byte === 0) break; // stop at null byte
    str += String.fromCharCode(byte);
  }

  return Number(str);
};

export const useCoursesByEmail = (web3) => async (email) => {
  if (!web3 && !web3.contract) {
    return;
  }
  const addCourses = useCoursesStore.getState().addCourses;
  useCoursesStore.getState().clearCourses();
  let req;

  try {
    const emailHash = web3.web3.utils.sha3(email);

    req = await web3.contract.methods.getCoursesByEmail(emailHash).call();
    if (req) {
      const parsedCourses = req.map((c) => ({
        id: c[0],
        price: c[1].toString(),
        proof: c[2],
        owner: c[3],
        courseId: bytes16ToNumber(c[4]),
        state: Number(c[5]),
      }));

      addCourses(parsedCourses);
    }
  } catch (err) {
    console.log("error:", err);
  }
};
