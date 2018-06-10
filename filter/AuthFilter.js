
function AuthFilter(){

}

let isNeedAuthed = function(path){
    return /^\/personal/.test(path)
};

let isLogon = function(req){
    return !!(req.session&&req.session.user)
};

AuthFilter.filter =  function(req,res,next){
    let logonFlag = isLogon(req);
    if(logonFlag){
        res.locals.user = req.session.user;
    }

    if(isNeedAuthed(req.url)){
        if(logonFlag){
            next();
        }else{
            res.redirect('/logon');
        }
    }else{
        next();
    }
};

AuthFilter.personal = function(req,res,next){
  if(isLogon(req)){
      res.redirect('/');
  }else{
      next();
  }
};

module.exports = AuthFilter;
