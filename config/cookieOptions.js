//const cookieOptions={ httpOnly:true, sameSite:'None', secure:true};
const cookieOptions={ httpOnly:true};

const cookieOptionCreate={ ...cookieOptions,  maxAge: 24 * 60 * 60 * 1000};

module.exports = {cookieOptions, cookieOptionCreate};