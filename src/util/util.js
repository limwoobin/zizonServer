const util = {};

util.parseError = function(errors){
  const parsed = {};
  if(errors.name == 'ValidationError'){
    for(let name in errors.errors){
      let validationError = errors.errors[name];
      parsed[name] = { message:validationError.message };
    }
  }
  else if(errors.code == '11000' && errors.errmsg.indexOf('username') > 0) {
    parsed.username = { message:'This username already exists!' };
  }
  else {
    parsed.unhandled = JSON.stringify(errors);
  }
  return parsed;
}

util.isLoggedin = function(req, res, next){
  if(req.isAuthenticated()){
    next();
  }
  else {
    req.flash('errors', {login:'Please login first'});
    res.redirect('/login');
  }
}

util.noPermission = function(req, res){
  req.flash('errors', {login:"You don't have permission"});
  req.logout();
  res.redirect('/login');
}

util.getPostQueryString = function(req, res, next){
  res.locals.getPostQueryString = function(isAppended=false, overwrites={}){    
    const queryString = '';
    const queryArray = [];
    const page = overwrites.page?overwrites.page:(req.query.page?req.query.page:'');
    const limit = overwrites.limit?overwrites.limit:(req.query.limit?req.query.limit:'');
    const searchType = overwrites.searchType?overwrites.searchType:(req.query.searchType?req.query.searchType:'');
    const searchText = overwrites.searchText?overwrites.searchText:(req.query.searchText?req.query.searchText:'');

    if(page) queryArray.push('page='+page);
    if(limit) queryArray.push('limit='+limit);
    if(searchType) queryArray.push('searchType='+searchType);
    if(searchText) queryArray.push('searchText='+searchText);

    if(queryArray.length>0) queryString = (isAppended?'&':'?') + queryArray.join('&');

    return queryString;
  }
  next();
}

util.convertToTrees = function(array, idFieldName, parentIdFieldName, childrenFieldName){
    let cloned = array.slice();
  
    for(let i=cloned.length-1; i>-1; i--){
      let parentId = cloned[i][parentIdFieldName];
  
      if(parentId){
        let filtered = array.filter(function(elem){
          return elem[idFieldName].toString() == parentId.toString();
        });
  
        if(filtered.length){
          let parent = filtered[0];
  
          if(parent[childrenFieldName]){
            parent[childrenFieldName].push(cloned[i]);
          }
          else {
            parent[childrenFieldName] = [cloned[i]];
          }
  
        }
        cloned.splice(i,1);
      }
    }
  
    return cloned;
  }

module.exports = util;