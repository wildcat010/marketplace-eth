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

export const useOwnedCourses = (web3) => async () => {
  if (!web3 && !web3.contract) {
    return;
  }
  let req;
  let coursesOwned = [];
  try {
    req = await web3.contract.methods.totalOwnedCourses().call();

    const nbr = parseInt(req);
    for (let i = nbr - 1; i > nbr - 5; i--) {
      if (i < 0) {
        break;
      }

      const myCourseOwned = await web3.contract.methods
        .getOwnedCourseHash(i)
        .call();

      const course = await web3.contract.methods
        .getOwnedCourse(myCourseOwned)
        .call();
      console.log("course", course);
      if (course) {
        course.courseId = bytes16ToNumber(course.courseId);
        coursesOwned.push(course);
      }
    }
  } catch (err) {
    console.log("error:", err);
  }

  if (req) {
    return {
      ownedCourses: req.toString(),
      courses: coursesOwned,
    };
  }
};
